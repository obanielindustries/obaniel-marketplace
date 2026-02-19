import useProductStore from "../store/useProductStore";
import { X, ShoppingBag, ArrowLeft } from "lucide-react";

const ProductModal = () => {
  const selectedProduct = useProductStore((state) => state.selectedProduct);
  const closeModal = useProductStore((state) => state.closeModal);
  const addToCart = useProductStore((state) => state.addToCart);

  if (!selectedProduct) return null;

  return (
    <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4 lg:p-10">
      {/* BACKGROUND OVERLAY */}
      <div
        className="absolute inset-0 bg-black/80 dark:bg-black/95 backdrop-blur-md dark:backdrop-blur-xl transition-all"
        onClick={closeModal}
      />

      {/* MODAL CONTAINER */}
      <div className="relative bg-[var(--bg-primary)] border border-zinc-200 dark:border-white/10 w-full max-w-5xl rounded-[2rem] lg:rounded-[3rem] overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300 max-h-[90vh] md:max-h-none shadow-2xl">
        {/* TOP CLOSE BUTTON */}
        <button
          onClick={closeModal}
          className="absolute top-6 right-6 text-zinc-400 hover:text-[var(--text-primary)] z-20 bg-zinc-100/50 dark:bg-black/50 p-2 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        {/* PRODUCT IMAGE - Updated to Pure White */}
        <div className="w-full md:w-1/2 bg-white h-[300px] md:h-auto overflow-hidden flex items-center justify-center">
          <img
            src={selectedProduct.image}
            className="w-full h-full object-contain p-8 md:p-12"
            alt="manifest_preview"
          />
        </div>

        {/* CONTENT AREA */}
        <div className="w-full md:w-1/2 p-8 lg:p-16 flex flex-col overflow-y-auto">
          <span className="text-facility-cyan text-[9px] font-black tracking-[0.4em] uppercase mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-facility-cyan animate-pulse" />
            UNIT_SPECIFICATIONS
          </span>

          <h2 className="text-3xl lg:text-5xl font-black text-[var(--text-primary)] uppercase tracking-tighter mb-6 leading-none">
            {selectedProduct.name}
          </h2>

          <p className="text-zinc-500 dark:text-zinc-400 text-xs md:text-sm leading-relaxed mb-10 font-medium font-mono">
            {selectedProduct.description ||
              "NO_DESCRIPTION_UPLOADED_TO_MANIFEST"}
          </p>

          {/* ACTIONS AREA */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-auto pt-8 border-t border-zinc-100 dark:border-white/5 gap-6">
            <div className="flex flex-col">
              <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest mb-1">
                Market_Value
              </span>
              <span className="text-3xl font-mono text-[var(--text-primary)] font-bold">
                ₦{selectedProduct.price?.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={closeModal}
                className="flex-1 sm:flex-none px-6 py-4 rounded-xl border border-zinc-200 dark:border-white/10 text-zinc-400 hover:text-[var(--text-primary)] hover:bg-zinc-50 dark:hover:bg-white/5 font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft size={14} /> Cancel
              </button>

              <button
                onClick={() => {
                  addToCart(selectedProduct);
                  closeModal();
                }}
                className="flex-[2] sm:flex-none bg-facility-cyan text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] hover:shadow-xl transition-all flex items-center justify-center gap-3 group"
              >
                <ShoppingBag
                  size={16}
                  className="group-hover:scale-110 transition-transform"
                />
                Add_To_Queue
              </button>
            </div>  
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
