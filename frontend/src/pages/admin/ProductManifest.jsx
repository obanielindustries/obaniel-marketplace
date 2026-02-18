import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Boxes,
  Search,
  Filter,
  Loader2,
  Archive,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import useProductStore from "../../store/useProductStore";

import AddProductSlideOver from "./AddProductSlideOver";

const ProductManifest = () => {
  const {
    products,
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

  // Handler for Opening "Add" mode
  const handleAddNew = () => {
    setSelectedProduct(null); // Clear selection for new entry
    setIsSlideOverOpen(true);
  };

  // Handler for Opening "Edit" mode
  const handleEdit = (product) => {
    setSelectedProduct(product); // Pass product to the slide-over
    setIsSlideOverOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("CRITICAL: De-manifest item from database?")) {
      deleteProduct(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-28 px-6 lg:px-12 pb-20 selection:bg-orange-600 selection:text-white">
      {/* Slide-over Component for Add/Edit */}
      <AddProductSlideOver
        isOpen={isSlideOverOpen}
        setIsOpen={setIsSlideOverOpen}
        editData={selectedProduct}
      />

      <div className="max-w-7xl mx-auto">
        {/* TOP SYSTEM NAV */}
        <div className="flex gap-10 mb-12 border-b border-white/5">
          <Link
            to="/admin/dashboard"
            className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] pb-5 hover:text-zinc-300 transition-all"
          >
            Identity_Directory
          </Link>
          <Link
            to="/admin/products"
            className="text-[10px] font-black text-white uppercase tracking-[0.4em] border-b-2 border-orange-600 pb-5"
          >
            Product_Manifest
          </Link>
        </div>

        {/* SYSTEM HEADER */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-orange-600 animate-pulse rounded-full" />
              <span className="text-[10px] font-mono text-orange-600 tracking-[0.4em] uppercase">
                Inventory_Node_01 // Live
              </span>
            </div>
            <h1 className="text-6xl font-black text-white uppercase tracking-tighter leading-none">
              Global_Archive
            </h1>
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto">
            {/* Search Bar for Admin */}
            <div className="relative flex-1 lg:w-80 group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-orange-600 transition-colors"
                size={16}
              />
              <input
                type="text"
                placeholder="FILTER_MANIFEST..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-[10px] font-bold text-white uppercase tracking-widest outline-none focus:border-orange-600/50 transition-all"
              />
            </div>

            <button
              onClick={handleAddNew}
              className="bg-white text-black px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-orange-600 hover:text-white transition-all duration-500 shadow-xl shadow-white/5"
            >
              <Plus size={18} /> Add_Item
            </button>
          </div>
        </div>

        {/* MAIN DATA LISTING */}
        {loading && filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="animate-spin text-orange-600" size={40} />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Syncing_Nodes...
            </span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="border border-dashed border-white/10 rounded-[3rem] py-32 flex flex-col items-center justify-center text-center">
            <Archive size={48} className="text-zinc-800 mb-6" />
            <h3 className="text-zinc-500 font-black uppercase tracking-widest text-sm">
              No_Items_Found
            </h3>
            <p className="text-zinc-700 text-[10px] mt-2 uppercase tracking-tighter">
              Inventory_Database_Empty_Or_Filtered
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Table Headers */}
            <div className="grid grid-cols-12 gap-4 px-10 py-4 text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em]">
              <div className="col-span-1">Img</div>
              <div className="col-span-4">Technical_Description</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">In_Stock</div>
              <div className="col-span-3 text-right">Operations</div>
            </div>

            {/* Product Rows */}
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="grid grid-cols-12 gap-4 px-10 py-6 items-center bg-white/[0.02] border border-white/5 rounded-[2rem] hover:bg-white/[0.04] hover:border-white/10 transition-all group"
              >
                {/* Image */}
                <div className="col-span-1">
                  <div className="w-14 h-14 bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 group-hover:scale-105 transition-transform duration-500">
                    <img
                      src={product.image}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      alt="product"
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="col-span-4">
                  <h4 className="text-white text-sm font-black uppercase tracking-tight truncate">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[9px] text-zinc-600 font-mono tracking-tighter uppercase">
                      {product.brand}
                    </span>
                    <span className="w-1 h-1 bg-zinc-800 rounded-full" />
                    <span className="text-[9px] text-orange-600/60 font-black uppercase tracking-widest">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-2 text-center">
                  <span className="text-sm font-mono font-bold text-white">
                    ${product.price}
                  </span>
                </div>

                {/* Stock */}
                <div className="col-span-2 text-center">
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-mono ${product.countInStock > 0 ? "border-emerald-500/20 text-emerald-500 bg-emerald-500/5" : "border-red-500/20 text-red-500 bg-red-500/5"}`}
                  >
                    <Boxes size={12} />
                    {product.countInStock}
                  </div>
                </div>

                {/* Actions */}
                <div className="col-span-3 flex justify-end gap-3">
                  <button
                    onClick={() => handleEdit(product)}
                    className="p-4 bg-zinc-900 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-2xl transition-all border border-transparent hover:border-white/10"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="p-4 bg-zinc-900 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all border border-transparent hover:border-red-500/20"
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
