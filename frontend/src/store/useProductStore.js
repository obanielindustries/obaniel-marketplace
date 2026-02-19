import { create } from "zustand";
import axios from "axios";
import { systemAlert } from "../utils/toastUtils";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  withCredentials: true,
});

// FIXED: Robust data flattener to prevent $NaN
const flattenCartData = (items) =>
  (items || []).map((item) => ({
    ...(item.product || {}),
    quantity: Number(item.quantity) || 0,
    _id: item.product?._id || item._id,
    price: Number(item.product?.price) || 0, // Forces number to prevent NaN
  }));

const useProductStore = create((set, get) => ({
  products: [],
  filteredProducts: [],
  cart: [],
  loading: false,
  query: "",
  currentCategory: "all",
  // RESTORED: All missing UI states
  selectedProduct: null,
  isSidebarOpen: false,

  // --- RESTORED UI ACTIONS ---
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  closeSidebar: () => set({ isSidebarOpen: false }),

  // FIXED: Renamed to clearSelectedProduct/setSelectedProduct to match standard
  // If your modal specifically calls "closeModal", keep this alias:
  closeModal: () => set({ selectedProduct: null }),
  setSelectedProduct: (product) => set({ selectedProduct: product }),

  // --- FILTER LOGIC ---
  setQuery: (q) => {
    set({ query: q });
    get().applyFilters();
  },

  setCategory: (category) => {
    set({ currentCategory: category.toLowerCase(), isSidebarOpen: false });
    get().applyFilters();
  },

  applyFilters: () => {
    const { products, query, currentCategory } = get();
    let filtered = [...products];

    if (currentCategory !== "all") {
      filtered = filtered.filter(
        (p) => p.category?.toLowerCase() === currentCategory,
      );
    }

    if (query) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()),
      );
    }
    set({ filteredProducts: filtered });
  },

  // --- PRODUCT FETCHING ---
  fetchProducts: async () => {
    set({ loading: true });
    try {
      const { data } = await API.get("/products");
      set({
        products: data,
        filteredProducts: data,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      systemAlert.error("ARCHIVE_SYNC_FAILURE");
    }
  },

  // --- CART ACTIONS (SYNCED WITH YOUR BACKEND) ---
  fetchCart: async () => {
    try {
      const { data } = await API.get("/cart");
      set({ cart: flattenCartData(data.items) });
    } catch (error) {
      console.error("Cart_Sync_Error", error);
    }
  },

  addToCart: async (product) => {
    // Optimistic Update
    const { cart } = get();
    const existing = cart.find((i) => i._id === product._id);
    if (existing) {
      set({
        cart: cart.map((i) =>
          i._id === product._id ? { ...i, quantity: i.quantity + 1 } : i,
        ),
      });
    } else {
      set({ cart: [...cart, { ...product, quantity: 1 }] });
    }

    try {
      const { data } = await API.post("/cart/add", { productId: product._id });
      set({ cart: flattenCartData(data.items) });
    } catch (error) {
      get().fetchCart(); // Rollback
    }
  },

  decrementCart: async (productId) => {
    const { cart } = get();
    const item = cart.find((i) => i._id === productId);
    if (!item) return;

    if (item.quantity <= 1) return get().removeFromCart(productId);

    // Optimistic UI Update (Fixes the "Stuck at 3" bug)
    set({
      cart: cart.map((i) =>
        i._id === productId ? { ...i, quantity: i.quantity - 1 } : i,
      ),
    });

    try {
      const { data } = await API.post(`/cart/decrement/${productId}`);
      set({ cart: flattenCartData(data.items) });
    } catch (error) {
      get().fetchCart();
    }
  },

  removeFromCart: async (productId) => {
    set((state) => ({ cart: state.cart.filter((i) => i._id !== productId) }));
    try {
      const { data } = await API.delete(`/cart/${productId}`);
      set({ cart: flattenCartData(data.items) });
      systemAlert.success("UNIT_DE-MANIFESTED");
    } catch (error) {
      get().fetchCart();
    }
  },

  // Manual input sync
  updateQuantityLocal: (productId, newQuantity) => {
    set((state) => ({
      cart: state.cart.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item,
      ),
    }));
  },

  syncQuantityWithServer: async (productId, newQuantity) => {
    try {
      const { data } = await API.put(`/cart/${productId}`, {
        quantity: newQuantity,
      });
      set({ cart: flattenCartData(data.items) });
    } catch (error) {
      get().fetchCart();
    }
  },
}));

export default useProductStore;
