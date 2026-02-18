import { create } from "zustand";
import axios from "axios";
import { systemAlert } from "../utils/toastUtils";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  withCredentials: true,
});

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  allUsers: [],
  isAuthenticated: !!localStorage.getItem("user"),
  loading: false,

  login: async (credentials) => {
    set({ loading: true });
    try {
      const { data } = await API.post("/users/auth", credentials);
      localStorage.setItem("user", JSON.stringify(data));
      set({ user: data, isAuthenticated: true, loading: false });
      systemAlert.success(`Identity_Verified: Welcome ${data.name}`);
      return { success: true };
    } catch (error) {
      set({ loading: false });
      systemAlert.error(error.response?.data?.message || "Login Failed");
      return { success: false };
    }
  },

  signup: async (userData) => {
    set({ loading: true });
    try {
      const payload = {
        name: userData.fullName,
        email: userData.email,
        password: userData.password,
      };
      const { data } = await API.post("/users", payload);
      localStorage.setItem("user", JSON.stringify(data));
      set({ user: data, isAuthenticated: true, loading: false });
      systemAlert.success("Identity_Established");
      return { success: true };
    } catch (error) {
      set({ loading: false });
      systemAlert.error(error.response?.data?.message || "Signup Failed");
      return { success: false };
    }
  },

  getUsers: async () => {
    set({ loading: true });
    try {
      const { data } = await API.get("/users");
      set({ allUsers: data, loading: false });
    } catch (error) {
      set({ loading: false });
      systemAlert.error("Failed_To_Sync_Directory");
    }
  },

  updateProfile: async (updatedData) => {
    set({ loading: true });
    try {
      const { data } = await API.put("/users/profile", updatedData);
      localStorage.setItem("user", JSON.stringify(data));
      set({ user: data, loading: false });
      systemAlert.success("Manifest_Updated");
      return { success: true };
    } catch (error) {
      set({ loading: false });
      systemAlert.error(error.response?.data?.message || "Update Failed");
      return { success: false };
    }
  },

  deleteUser: async (id) => {
    set({ loading: true });
    try {
      await API.delete(`/users/${id}`);
      set((state) => ({
        allUsers: state.allUsers.filter((u) => u._id !== id),
        loading: false,
      }));
      return { success: true };
    } catch (error) {
      set({ loading: false });
      return {
        success: false,
        message: error.response?.data?.message || "Termination_Failed",
      };
    }
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null, isAuthenticated: false, allUsers: [] });
    systemAlert.info("Session_Terminated");
  },
}));

export default useAuthStore;
