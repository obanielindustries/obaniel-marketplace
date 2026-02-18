import { useNavigate } from "react-router-dom"; // Add this import
import useAuthStore from "../store/useAuthStore";
import useProductStore from "../store/useProductStore";

const CartDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { cart } = useProductStore();
  const { isAuthenticated } = useAuthStore();

  const handleCheckout = () => {
    onClose(); // Close the drawer first
    if (!isAuthenticated) {
      // If not logged in, send them to login
      navigate("/login");
    } else {
      // If logged in, proceed to checkout/session
      navigate("/checkout");
      // Or call a function like createOrder()
    }
  };

  // ... (Keep the rest of your CartDrawer code)

  return (
    // ... inside the footer area
    <button
      onClick={handleCheckout}
      className="w-full group bg-black text-white py-6 rounded-2xl flex items-center justify-center gap-3 hover:bg-orange-600 transition-all cursor-pointer"
    >
      <span className="text-[11px] font-black uppercase tracking-[0.3em]">
        {isAuthenticated ? "Initialize_Checkout" : "Login_to_Checkout"}
      </span>
    </button>
  );
};

export default CartDrawer