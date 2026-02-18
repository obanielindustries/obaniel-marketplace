import { useEffect, useState } from "react";
import { ShoppingBag, ArrowRight, X } from "lucide-react";
import useProductStore from "../store/useProductStore";

const CartNotification = () => {
  const cart = useProductStore((state) => state.cart);
  const [isVisible, setIsVisible] = useState(false);
  const [lastItem, setLastItem] = useState(null);

  // Trigger whenever the cart length increases
  useEffect(() => {
    if (cart.length > 0) {
      setLastItem(cart[cart.length - 1]);
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 4000); // Visible for 4 seconds

      return () => clearTimeout(timer);
    }
  }, [cart.length]);

  if (!lastItem) return null;

  return (
    <div
      className={`fixed bottom-10 left-10 z-[200] transition-all duration-500 ease-in-out transform ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
    >
      <div className="bg-white rounded-3xl p-2 pr-6 shadow-2xl flex items-center gap-4 border border-zinc-200">
        {/* Product Thumbnail */}
        <div className="w-16 h-16 bg-zinc-100 rounded-2xl overflow-hidden">
          <img
            src={lastItem.image}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <span className="text-[8px] font-black text-orange-600 uppercase tracking-widest mb-1">
            Added_to_Manifest
          </span>
          <h4 className="text-black text-xs font-black uppercase truncate max-w-[120px]">
            {lastItem.name}
          </h4>
          <p className="text-zinc-500 font-mono text-[10px]">
            ${lastItem.price}
          </p>
        </div>

        {/* Action Button */}
        <button className="ml-4 p-3 bg-black text-white rounded-full hover:bg-orange-600 transition-all group">
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>

        {/* Close */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 bg-zinc-100 p-1 rounded-full text-zinc-400 hover:text-black border border-zinc-200"
        >
          <X size={12} />
        </button>
      </div>
    </div>
  );
};

export default CartNotification;
