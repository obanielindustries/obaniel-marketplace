import { Trash2, ArrowRight } from "lucide-react";
import useProductStore from "../store/useProductStore";
import { useNavigate } from "react-router-dom";

const CartDropdown = ({ isOpen, setIsOpen }) => {
  const { cart, removeFromCart } = useProductStore();
  const navigate = useNavigate();

  // Updated to access item.product.price
  const subtotal = cart.reduce(
    (acc, item) => acc + (item.product?.price || 0) * (item.quantity || 1),
    0,
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop to close when clicking outside */}
      <div className="fixed inset-0 z-[110]" onClick={() => setIsOpen(false)} />

      <div className="absolute right-0 mt-4 w-80 md:w-96 bg-[#0d0d0d] border border-white/10 rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] z-[120] overflow-hidden animate-in fade-in slide-in-from-top-3 duration-300">
        <div className="p-6 border-b border-white/5 bg-white/[0.01]">
          <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">
            Current_Manifest
          </h3>
        </div>

        <div className="max-h-[400px] overflow-y-auto custom-scrollbar p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest italic">
                Queue_is_Empty
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product?._id}
                className="flex gap-4 p-3 bg-white/[0.03] border border-white/5 rounded-2xl group transition-all hover:border-orange-600/30"
              >
                <div className="w-16 h-16 bg-zinc-900 rounded-xl overflow-hidden shrink-0">
                  <img
                    src={item.product?.image}
                    className="w-full h-full object-cover"
                    alt={item.product?.name}
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex justify-between items-start">
                    <h4 className="text-white text-[10px] font-black uppercase truncate pr-2">
                      {item.product?.name || "Unknown_Item"}
                    </h4>
                    <button
                      onClick={() => removeFromCart(item.product?._id)}
                      className="text-zinc-600 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-[10px] font-mono text-zinc-500">
                      QTY: {item.quantity || 1}
                    </p>
                    <p className="text-orange-600 font-bold text-xs">
                      $
                      {(
                        (item.product?.price || 0) * (item.quantity || 1)
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 bg-white/[0.02] border-t border-white/5 space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">
                Total_Payload
              </span>
              <span className="text-xl font-black text-white font-mono">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/checkout");
              }}
              className="w-full bg-white text-black py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-orange-600 hover:text-white transition-all flex items-center justify-center gap-2 group"
            >
              Initialize_Transfer{" "}
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDropdown;
