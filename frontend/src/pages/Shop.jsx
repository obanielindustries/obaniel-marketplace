/* src/pages/Shop.jsx */
import { useEffect } from "react";
import useProductStore from "../store/useProductStore";
import ShopSidebar from "../components/ShopSidebar";
import ProductCard from "../components/ProductCard";
import { Search, Loader2 } from "lucide-react";

const Shop = () => {
  const { filteredProducts, loading, fetchProducts, query, setQuery } =
    useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      {/* 1. SIDEBAR MOUNTED HERE */}
      <ShopSidebar />

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 px-6 md:px-12 pt-32 pb-24 lg:ml-[300px] transition-all duration-500">
        <div className="max-w-[1600px] mx-auto">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 border-b border-zinc-900 pb-12">
            <h1 className="text-6xl font-black uppercase tracking-tighter text-white">
              Archive
            </h1>

            <div className="relative w-full max-w-md">
              <Search
                className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600"
                size={16}
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="SEARCH_MANIFEST..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-4 pl-14 pr-6 text-[10px] font-black uppercase tracking-widest text-white focus:border-orange-600 outline-none transition-all"
              />
            </div>
          </div>

          {/* GRID */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="text-orange-600 animate-spin" size={32} />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Shop;
