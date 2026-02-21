import { create } from "zustand";
import axios from "axios";
import { systemAlert } from "../utils/toastUtils";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  withCredentials: true,
});

// Forces numbers to prevent NaN in calculations
const flattenCartData = (items) =>
  (items || []).map((item) => ({
    ...(item.product || {}),
    quantity: Number(item.quantity) || 0,
    _id: item.product?._id || item._id,
    price: Number(item.product?.price) || 0,
  }));

const useProductStore = create((set, get) => ({
  products: [],
  filteredProducts: [],
  cart: [],
  loading: false,
  query: "",
  currentCategory: "all",
  selectedProduct: null,
  isSidebarOpen: false,

  // --- UI ACTIONS ---
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  closeSidebar: () => set({ isSidebarOpen: false }),
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

  // --- CRUD OPERATIONS (FULLY IMPLEMENTED) ---
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

  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const { data } = await API.post("/products", productData);
      set((state) => {
        const updated = [data, ...state.products];
        return {
          products: updated,
          filteredProducts: updated,
          loading: false,
        };
      });
      return data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  updateProduct: async (id, productData) => {
    set({ loading: true });
    try {
      const { data } = await API.put(`/products/${id}`, productData);
      set((state) => {
        const updated = state.products.map((p) => (p._id === id ? data : p));
        return {
          products: updated,
          filteredProducts: updated,
          loading: false,
        };
      });
      return data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  deleteProduct: async (id) => {
    try {
      await API.delete(`/products/${id}`);
      set((state) => {
        const updated = state.products.filter((p) => p._id !== id);
        return {
          products: updated,
          filteredProducts: updated,
        };
      });
      systemAlert.success("UNIT_DE-MANIFESTED");
    } catch (error) {
      systemAlert.error("TERMINATION_FAILED");
    }
  },

  // --- CART ACTIONS ---
  fetchCart: async () => {
    try {
      const { data } = await API.get("/cart");
      set({ cart: flattenCartData(data.items) });
    } catch (error) {
      console.error("Cart_Sync_Error", error);
    }
  },

  addToCart: async (product) => {
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
      get().fetchCart();
    }
  },

  decrementCart: async (productId) => {
    const { cart } = get();
    const item = cart.find((i) => i._id === productId);
    if (!item) return;
    if (item.quantity <= 1) return get().removeFromCart(productId);

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
      systemAlert.success("UNIT_REMOVED");
    } catch (error) {
      get().fetchCart();
    }
  },

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
