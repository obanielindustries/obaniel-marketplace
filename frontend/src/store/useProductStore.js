import { create } from "zustand";
import axios from "axios";
import { systemAlert } from "../utils/toastUtils";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  withCredentials: true,
});

const useProductStore = create((set, get) => ({
  // --- STATE ---
  products: [],
  filteredProducts: [],
  cart: [],
  loading: false,
  query: "",
  currentCategory: "all",
  selectedProduct: null,
  isSidebarOpen: false,

  // --- SIDEBAR ACTIONS ---
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  closeSidebar: () => set({ isSidebarOpen: false }),

  // --- CATEGORY ACTIONS ---
  setCategory: (cat) => {
    set({ currentCategory: cat });
    get().applyFilters();
  },

  // --- MODAL ACTIONS ---
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  closeModal: () => set({ selectedProduct: null }),

  // --- SEARCH & FILTER LOGIC ---
  setQuery: (val) => {
    set({ query: val });
    get().applyFilters();
  },

  applyFilters: () => {
    const { products, query, currentCategory } = get();
    let temp = [...products];

    if (query) {
      temp = temp.filter((p) =>
        (p.name || p.title || "").toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (currentCategory !== "all") {
      temp = temp.filter(
        (p) => p.category?.toLowerCase() === currentCategory.toLowerCase(),
      );
    }

    set({ filteredProducts: temp });
  },

  // --- API ACTIONS ---
  fetchProducts: async () => {
    set({ loading: true });
    try {
      const { data } = await API.get("/products");
      set({
        products: data,
        filteredProducts: data,
        loading: false,
        currentCategory: "all",
      });
    } catch (error) {
      set({ loading: false });
      systemAlert.error("ARCHIVE_SYNC_FAILURE");
    }
  },

  updateProduct: async (id, productData) => {
    set({ loading: true });
    try {
      const { data } = await API.put(`/products/${id}`, productData);
      set((state) => ({
        products: state.products.map((p) => (p._id === id ? data : p)),
        loading: false,
      }));
      get().applyFilters();
      systemAlert.success("MANIFEST_UPDATED");
      return { success: true };
    } catch (error) {
      set({ loading: false });
      systemAlert.error(error.response?.data?.message || "UPDATE_FAILED");
      return { success: false };
    }
  },

  // --- PERSISTENT CART ACTIONS ---

  fetchCart: async () => {
    try {
      const { data } = await API.get("/cart");
      // data.items contains the populated product objects
      set({ cart: data.items || [] });
    } catch (error) {
      console.error("CART_FETCH_ERROR", error);
    }
  },

  addToCart: async (product) => {
    try {
      const { data } = await API.post("/cart/add", { productId: product._id });
      // Backend returns populated cart: { user, items: [{ product: {}, quantity }] }
      set({ cart: data.items });
      systemAlert.success(`${product.name} QUEUED_FOR_PURCHASE`);
    } catch (error) {
      systemAlert.error("CART_UPDATE_FAILURE");
    }
  },

  removeFromCart: async (productId) => {
    try {
      const { data } = await API.delete(`/cart/${productId}`);
      set({ cart: data.items });
      systemAlert.success("MANIFEST_ITEM_REMOVED");
    } catch (error) {
      systemAlert.error("REMOVE_SYNC_FAILURE");
    }
  },
}));

export default useProductStore;
