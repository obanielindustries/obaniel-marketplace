import useProductStore from "../store/useProductStore";
import { X, ShoppingBag } from "lucide-react";

const ProductModal = () => {
  const selectedProduct = useProductStore((state) => state.selectedProduct);
  const closeModal = useProductStore((state) => state.closeModal);
  const addToCart = useProductStore((state) => state.addToCart);

  if (!selectedProduct) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 lg:p-10">
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        onClick={closeModal}
      />

      <div className="relative bg-[#0d0d0d] border border-white/10 w-full max-w-5xl rounded-[3rem] overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
        <button
          onClick={closeModal}
          className="absolute top-8 right-8 text-zinc-500 hover:text-white z-20 bg-black/50 p-2 rounded-full"
        >
          <X size={24} />
        </button>

        <div className="w-full md:w-1/2 bg-zinc-900/50">
          <img
            src={selectedProduct.image}
            className="w-full h-full object-cover"
            alt="manifest_preview"
          />
        </div>

        <div className="w-full md:w-1/2 p-12 lg:p-16 flex flex-col justify-center">
          <span className="text-orange-600 text-[10px] font-black tracking-[0.4em] uppercase mb-4">
            Product_Details
          </span>
          <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-6">
            {selectedProduct.name}
          </h2>
          <p className="text-zinc-500 text-sm leading-relaxed mb-10 font-medium">
            {selectedProduct.description}
          </p>

          <div className="flex items-center justify-between mt-auto pt-10 border-t border-white/5">
            <span className="text-3xl font-mono text-white font-bold">
              ${selectedProduct.price}
            </span>
            <button
              onClick={() => {
                addToCart(selectedProduct);
                closeModal();
              }}
              className="bg-white text-black px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-orange-600 hover:text-white transition-all flex items-center gap-3"
            >
              <ShoppingBag size={18} /> Add_To_Queue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
