import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import useProductStore from "../store/useProductStore";
import useAuthStore from "../store/useAuthStore";
import CartDropdown from "./CartDropDown";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuthStore();
  const { isSidebarOpen, toggleSidebar, cart } = useProductStore();

  const isOnProductsPage =
    location.pathname === "/products" || location.pathname === "/";

  // Calculate cart total items
  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <nav className="fixed top-0 w-full z-[100] bg-black/90 backdrop-blur-md border-b border-white/5 px-6 md:px-12 py-5 flex justify-between items-center">
      <div className="flex items-center gap-4">
        {/* SIDEBAR TRIGGER - Visible only on Products page + Mobile */}
        {isOnProductsPage && (
          <button
            onClick={() => toggleSidebar()}
            className="lg:hidden p-2 text-white bg-white/5 rounded-lg border border-white/10 transition-all active:scale-95"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        )}

        <Link
          to="/"
          className="text-2xl font-black italic tracking-tighter text-white uppercase"
        >
          OBANIEL.
        </Link>
      </div>

      <div className="flex items-center gap-6">
        {/* USER IDENTITY SECTION */}
        {user && (
          <div className="hidden sm:flex items-center gap-3 pr-4 border-r border-white/5">
            <div className="text-right">
              <p className="text-[8px] font-mono text-zinc-500 uppercase tracking-[0.2em] leading-none mb-1">
                Active_Operator
              </p>
              <p className="text-[10px] font-black text-white uppercase tracking-widest">
                {user.name || "Unknown_Entity"}
              </p>
            </div>
          </div>
        )}

        {/* CART & MENU */}
        <div className="flex items-center gap-2">
          {/* CART BUTTON WITH DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="p-3 text-zinc-400 hover:text-white transition-colors relative group"
            >
              <ShoppingCart
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-orange-600 text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-black animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </button>

            {/* CART DROPDOWN COMPONENT */}
            <CartDropdown isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
          </div>

          <UserMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
