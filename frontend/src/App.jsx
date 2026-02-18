import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react"; // Added useEffect

// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Shop from "./pages/Shop";

import AdminDashboard from "./pages/admin/AdminDashboard";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminRoute from "./components/AdminRoute";
import ProductManifest from "./pages/admin/ProductManifest";
import ProductModal from "./components/ProductModal";
import CartNotification from "./components/CartNotifications";

// Stores
import useAuthStore from "./store/useAuthStore";
import useProductStore from "./store/useProductStore";

const App = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user } = useAuthStore();
  const fetchCart = useProductStore((state) => state.fetchCart);

  // CART HEARTBEAT: Sync with DB when user is authenticated
  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user, fetchCart]);

  return (
    <BrowserRouter>
      <Navbar onCartOpen={() => setIsCartOpen(true)} />
      <CartNotification />

      <main>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<Shop />} />

          {/* PROTECTED ROUTES */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <ProductManifest />
              </AdminRoute>
            }
          />

          {/* 404 FALLBACK */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center text-white font-black uppercase tracking-widest bg-black">
                404 // Node_Not_Found
              </div>
            }
          />
        </Routes>

        <ProductModal />

        <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
      </main>
    </BrowserRouter>
  );
}

export default App;
