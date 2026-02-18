import { X, ShoppingCart, Star, ShieldCheck } from "lucide-react";
import useProductStore from "../store/useProductStore";

const QuickView = () => {
  const { selectedProduct, isModalOpen, closeModal } = useProductStore();

  if (!isModalOpen || !selectedProduct) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-obaniel-deep/40 backdrop-blur-md"
        onClick={closeModal}
      />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl flex flex-col md:flex-row animate-in zoom-in duration-300">
        <button
          onClick={closeModal}
          className="absolute top-6 right-6 z-10 p-2 bg-gray-50 rounded-full hover:bg-obaniel-rust hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Left: Image Section */}
        <div className="md:w-1/2 bg-[#F5F4F1] p-12 flex items-center justify-center">
          <img
            src={selectedProduct.thumbnail || selectedProduct.image}
            alt={selectedProduct.name}
            className="max-h-full w-auto object-contain hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Right: Info Section */}
        <div className="md:w-1/2 p-10 md:p-14 flex flex-col">
          <div className="mb-6">
            <p className="text-[10px] font-black text-obaniel-rust uppercase tracking-[0.3em] mb-2">
              {selectedProduct.category}
            </p>
            <h2 className="text-3xl font-black text-obaniel-deep leading-tight mb-4">
              {selectedProduct.name || selectedProduct.title}
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-black text-obaniel-deep">
                ${selectedProduct.price}
              </span>
              <div className="flex items-center gap-1 text-orange-400">
                <Star size={14} fill="currentColor" />
                <span className="text-xs font-bold text-gray-400">
                  4.9 (120 reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="flex-grow">
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              {selectedProduct.description}
            </p>

            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                <ShieldCheck size={18} className="text-obaniel-rust" /> 2-Year
                Obaniel Warranty
              </div>
            </div>
          </div>

          <button className="btn-obaniel py-5 text-sm">
            <ShoppingCart size={18} />
            Add to Bag — ${selectedProduct.price}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
