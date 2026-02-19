import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import ProductModal from "./components/ProductModal";
import CartDrawer from "./components/CartDrawer"; // RESTORED  

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Shop from "./pages/Shop";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductManifest from "./pages/admin/ProductManifest";

// Styling & Notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Stores
import useAuthStore from "./store/useAuthStore";
import useProductStore from "./store/useProductStore";
import FacilityFooter from "./components/FacilityFooter";
import ScrollToTop from "./components/ScrolltoTop";

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
      {/* Navbar sits at z-[9999] */}
      <Navbar onCartOpen={() => setIsCartOpen(true)} />

      {/* CART DRAWER: Responds to Navbar trigger */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main className="relative">
        <ScrollToTop />
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

          {/* 404 FALLBACK: Facility Theme */}
          <Route
            path="*"
            element={
              <div className="min-h-[80vh] flex flex-col items-center justify-center text-white bg-black">
                <h1 className="text-6xl font-black tracking-tighter animate-pulse">
                  404
                </h1>
                <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-cyan-500 mt-4">
                  // Error: Node_Not_Found
                </p>
                <div className="mt-8 h-[1px] w-24 bg-white/20"></div>
              </div>
            }
          />
        </Routes>

        {/* Global Modals: Minimal product view */}
        <ProductModal />

        {/* TOAST NOTIFICATIONS */}
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          theme="dark"
          pauseOnHover
          closeOnClick
          toastStyle={{
            zIndex: 10005, // Higher than Modal/Cart for visibility
            backgroundColor: "#0a0a0a",
            border: "1px solid rgba(34,211,238,0.2)", // Subtle cyan border
            borderRadius: "4px",
            fontFamily: "monospace",
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        /> 
        <FacilityFooter />
      </main>
    </BrowserRouter>
  );
};

export default App;
