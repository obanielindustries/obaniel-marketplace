import React, { useRef } from "react";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import useProductStore from "../store/useProductStore";

const CartDrawer = ({ isOpen, onClose }) => {
  const {
    cart,
    removeFromCart,
    addToCart,
    decrementCart,
    updateQuantityLocal,
    syncQuantityWithServer,
  } = useProductStore();

  const debounceTimer = useRef(null);

  const subtotal = cart.reduce(
    (acc, item) =>
      acc + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0,
  );

  const handleManualInput = (item, newVal) => {
    if (newVal === "") {
      updateQuantityLocal(item._id, "");
      return;
    }

    const val = parseInt(newVal);
    if (val === 0) return removeFromCart(item._id);
    if (isNaN(val) || val < 1) return;

    updateQuantityLocal(item._id, val);

    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      syncQuantityWithServer(item._id, val);
    }, 1000);
  };

  const handleIncrement = (item) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    addToCart(item);
  };

  const handleDecrement = (item) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    if (item.quantity <= 1) {
      removeFromCart(item._id);
    } else {
      decrementCart(item._id);
    }
  };

  return (
    <>
      {/* Background Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 dark:bg-black/90 backdrop-blur-md z-[10001] transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[var(--bg-primary)] border-l border-zinc-200 dark:border-zinc-900 z-[10002] transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-8 border-b border-zinc-200 dark:border-zinc-900 flex justify-between items-center">
            <div className="space-y-1">
              <h2 className="text-xl font-black text-[var(--text-primary)] flex items-center gap-3 uppercase tracking-tighter">
                <ShoppingBag size={18} className="text-cyan-500" />{" "}
                Facility_Manifest
              </h2>
              <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                Registry_Buffer_v.4.0
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-zinc-500 hover:text-cyan-500 transition-colors p-2 border border-zinc-200 dark:border-zinc-900 hover:border-cyan-500/30 rounded-sm"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center">
                <div className="w-12 h-12 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-full flex items-center justify-center mb-4 opacity-40">
                  <ShoppingBag size={20} className="text-zinc-400" />
                </div>
                <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.4em]">
                  Registry_Empty
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-6 group animate-in fade-in slide-in-from-right-4 duration-500"
                >
                  {/* Thumbnail: Uses bg-primary to blend white-bg images */}
                  <div className="w-24 h-24 bg-[var(--bg-primary)] border border-zinc-200 dark:border-zinc-900 shrink-0 overflow-hidden rounded-sm p-1">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex justify-between items-start gap-4">
                      <h4 className="text-[11px] font-bold text-[var(--text-primary)] uppercase tracking-tight leading-tight">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-zinc-300 dark:text-zinc-800 hover:text-rose-500 transition-colors shrink-0"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold">
                      ₦{Number(item.price).toLocaleString()}
                    </p>

                    {/* Quantity Control Terminal */}
                    <div className="flex items-center border border-zinc-200 dark:border-zinc-900 w-fit rounded-sm bg-[var(--bg-primary)] mt-3 overflow-hidden">
                      <button
                        onClick={() => handleDecrement(item)}
                        className="px-3 py-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-[var(--text-primary)] transition-all border-r border-zinc-200 dark:border-zinc-900"
                      >
                        {item.quantity <= 1 ? (
                          <Trash2
                            size={12}
                            className="text-rose-500 dark:text-rose-900"
                          />
                        ) : (
                          <Minus size={12} />
                        )}
                      </button>

                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleManualInput(item, e.target.value)
                        }
                        onBlur={() =>
                          item.quantity === "" && removeFromCart(item._id)
                        }
                        className="w-12 bg-transparent text-[10px] font-mono text-[var(--text-primary)] text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />

                      <button
                        onClick={() => handleIncrement(item)}
                        className="px-3 py-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-[var(--text-primary)] transition-all border-l border-zinc-200 dark:border-zinc-900"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Terminal */}
          {cart.length > 0 && (
            <div className="p-8 bg-[var(--bg-primary)] border-t border-zinc-200 dark:border-zinc-900 space-y-6">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">
                    Total_Registry_Value
                  </span>
                  <span className="text-3xl font-black text-[var(--text-primary)] tracking-tighter">
                    ₦
                    {subtotal.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>

              <button className="w-full bg-[var(--text-primary)] hover:bg-cyan-500 text-[var(--bg-primary)] hover:text-black py-5 font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-4 transition-all duration-500 group">
                Initialize_Transaction_Protocol
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
