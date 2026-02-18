import { Eye, Plus, Star } from "lucide-react";
import useProductStore from "../store/useProductStore";

const ProductCard = ({ product }) => {
  // Use specific selectors for performance
  const setSelectedProduct = useProductStore(
    (state) => state.setSelectedProduct,
  );
  const addToCart = useProductStore((state) => state.addToCart);

  return (
    <div className="group relative bg-[#0f0f0f] rounded-[2rem] overflow-hidden border border-zinc-900/50 hover:border-orange-600/30 transition-all duration-500">
      <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900">
        <img
          src={product.thumbnail || product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* OVERLAY ACTIONS */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="p-4 bg-white text-black rounded-full hover:bg-orange-600 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0"
          >
            <Eye size={20} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="p-4 bg-white text-black rounded-full hover:bg-orange-600 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 delay-75"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-2">
        <p className="text-[9px] font-black text-orange-600 uppercase tracking-widest">
          {product.category}
        </p>
        <div className="flex justify-between items-center">
          <h3 className="text-white font-black uppercase tracking-tighter truncate w-2/3">
            {product.name}
          </h3>
          <span className="text-white font-mono font-bold">
            ${product.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
