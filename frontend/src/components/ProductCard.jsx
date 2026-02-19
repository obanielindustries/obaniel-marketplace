import { ShoppingCart, Eye } from "lucide-react";
import useProductStore from "../store/useProductStore";

const ProductCard = ({ product }) => {
  const { addToCart, setSelectedProduct } = useProductStore();

  return (
    <div className="group relative bg-[var(--bg-primary)] border border-zinc-100 dark:border-white/5 overflow-hidden transition-all duration-500 flex flex-col h-full hover:shadow-2xl">
      {/* THE SMART CONTAINER */}
      <div
        className="product-image-container"
        onClick={() => setSelectedProduct(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="product-image-render"
        />

        {/* OVERLAY ACTIONS (Desktop) */}
        <div className="absolute inset-0 bg-black/5 dark:bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 hidden lg:flex">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="p-4 bg-facility-cyan text-white rounded-full hover:scale-110 shadow-xl"
          >
            <ShoppingCart size={20} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="p-4 bg-white text-black rounded-full hover:scale-110 shadow-xl"
          >
            <Eye size={20} />
          </button>
        </div>
      </div>

      {/* INFO AREA */}
      <div className="p-5 flex flex-col flex-grow bg-[var(--bg-primary)]">
        <div className="flex justify-between items-start mb-4 gap-2">
          <h3 className="text-[11px] font-black text-[var(--text-primary)] uppercase tracking-tight leading-tight">
            {product.name}
          </h3>
          <span className="text-[11px] font-mono text-facility-cyan font-bold whitespace-nowrap">
            ₦{product.price?.toLocaleString()}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-white/5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-facility-cyan" />
            <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">
              {product.category?.substring(0, 3)}
            </span>
          </div>
          <span className="text-[8px] text-zinc-300 dark:text-zinc-600 font-mono">
            {product._id?.substring(0, 8)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
