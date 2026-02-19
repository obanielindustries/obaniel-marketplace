import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Edit3,
  Boxes,
  Search,
  Loader2,
  Archive,
} from "lucide-react";
import { Link } from "react-router-dom";
import useProductStore from "../../store/useProductStore";
import AddProductSlideOver from "./AddProductSlideOver";

const ProductManifest = () => {
  const {
    fetchProducts,
    deleteProduct,
    loading,
    filteredProducts,
    setQuery,
    query,
  } = useProductStore();

  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddNew = () => {
    setSelectedProduct(null);
    setIsSlideOverOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsSlideOverOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("CRITICAL: De-manifest item from database?")) {
      deleteProduct(id);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-20 md:pt-28 px-4 sm:px-6 lg:px-12 pb-20 selection:bg-orange-600 selection:text-white transition-colors duration-500">
      <AddProductSlideOver
        isOpen={isSlideOverOpen}
        setIsOpen={setIsSlideOverOpen}
        editData={selectedProduct}
      />

      <div className="max-w-7xl mx-auto">
        {/* NAV: Updated borders for light mode visibility */}
        <div className="flex gap-6 md:gap-10 mb-8 md:mb-12 border-b border-zinc-200 dark:border-white/5 overflow-x-auto no-scrollbar whitespace-nowrap">
          <Link
            to="/admin/dashboard"
            className="text-[10px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.4em] pb-5 hover:text-[var(--text-primary)] transition-all"
          >
            Identity_Directory
          </Link>
          <Link
            to="/admin/products"
            className="text-[10px] font-black text-[var(--text-primary)] uppercase tracking-[0.4em] border-b-2 border-orange-600 pb-5"
          >
            Product_Manifest
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12 md:mb-16">
          <div className="space-y-4 w-full">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-orange-600 animate-pulse rounded-full" />
              <span className="text-[10px] font-mono text-orange-600 tracking-[0.4em] uppercase">
                Inventory_Node_01 // Live
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] uppercase tracking-tighter leading-none">
              Global_Archive
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            {/* SEARCH: Added bg-zinc-100 for light mode visibility */}
            <div className="relative w-full sm:flex-1 lg:w-80 group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-600 group-focus-within:text-orange-600 transition-colors"
                size={16}
              />
              <input
                type="text"
                placeholder="FILTER_MANIFEST..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-zinc-100 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/5 rounded-2xl py-4 pl-12 pr-4 text-[10px] font-bold text-[var(--text-primary)] uppercase tracking-widest outline-none focus:border-orange-600/50 transition-all"
              />
            </div>

            <button
              onClick={handleAddNew}
              className="w-full sm:w-auto bg-[var(--text-primary)] text-[var(--bg-primary)] px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-orange-600 hover:text-white transition-all duration-500"
            >
              <Plus size={18} /> Add_Item
            </button>
          </div>
        </div>

        {loading && (!filteredProducts || filteredProducts.length === 0) ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="animate-spin text-orange-600" size={40} />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Syncing_Nodes...
            </span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="border border-dashed border-zinc-200 dark:border-white/10 rounded-[2rem] md:rounded-[3rem] py-20 md:py-32 flex flex-col items-center justify-center text-center px-4">
            <Archive
              size={48}
              className="text-zinc-300 dark:text-zinc-800 mb-6"
            />
            <h3 className="text-zinc-400 dark:text-zinc-500 font-black uppercase tracking-widest text-sm">
              No_Items_Found
            </h3>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-3">
            <div className="hidden md:grid grid-cols-12 gap-4 px-10 py-4 text-[9px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.3em]">
              <div className="col-span-1">Img</div>
              <div className="col-span-4">Technical_Description</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">In_Stock</div>
              <div className="col-span-3 text-right">Operations</div>
            </div>

            {filteredProducts.map((product) => (
              /* CARD: Changed bg-white/[0.02] to bg-zinc-50 for light mode contrast */
              <div
                key={product._id}
                className="flex flex-col md:grid md:grid-cols-12 gap-4 p-5 md:px-10 md:py-6 items-start md:items-center bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 rounded-3xl md:rounded-[2rem] hover:bg-zinc-100 dark:hover:bg-white/[0.04] hover:border-orange-600/20 dark:hover:border-white/10 transition-all group shadow-sm dark:shadow-none"
              >
                <div className="flex items-center gap-4 w-full md:col-span-5">
                  <div className="w-16 h-16 md:w-14 md:h-14 bg-[var(--bg-primary)] rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/5 shrink-0">
                    <img
                      src={product.image}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      alt="product"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="text-[var(--text-primary)] text-sm font-black uppercase tracking-tight truncate">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] text-zinc-400 dark:text-zinc-600 font-mono tracking-tighter uppercase truncate">
                        {product.brand}
                      </span>
                      <span className="w-1 h-1 bg-zinc-300 dark:bg-zinc-800 rounded-full" />
                      <span className="text-[9px] text-orange-600/60 font-black uppercase tracking-widest">
                        {product.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full md:contents">
                  <div className="md:col-span-2 md:text-center">
                    <span className="text-[9px] md:hidden block text-zinc-400 font-black uppercase mb-1">
                      Price
                    </span>
                    <span className="text-sm font-mono font-bold text-[var(--text-primary)]">
                      ₦{product.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="md:col-span-2 md:text-center">
                    <span className="text-[9px] md:hidden block text-zinc-400 font-black uppercase mb-1">
                      Stock
                    </span>
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-mono ${
                        product.countInStock > 0
                          ? "border-emerald-500/20 text-emerald-600 dark:text-emerald-500 bg-emerald-500/5"
                          : "border-red-500/20 text-red-600 dark:text-red-500 bg-red-500/5"
                      }`}
                    >
                      <Boxes size={12} />
                      {product.countInStock}
                    </div>
                  </div>
                </div>

                {/* OPERATIONS: Updated button colors for light mode depth */}
                <div className="flex items-center justify-end gap-3 w-full md:col-span-3 border-t border-zinc-200 dark:border-white/5 md:border-none pt-4 md:pt-0">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 md:flex-none flex justify-center p-4 bg-zinc-200/50 dark:bg-zinc-900 text-zinc-500 hover:text-[var(--text-primary)] hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-2xl transition-all border border-transparent hover:border-zinc-300 dark:hover:border-white/10"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex-1 md:flex-none flex justify-center p-4 bg-zinc-200/50 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-700 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all border border-transparent hover:border-red-500/20"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManifest;
