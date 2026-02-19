import { useEffect, useState } from "react";
import useProductStore from "../store/useProductStore";
import ShopSidebar from "../components/ShopSidebar";
import ProductCard from "../components/ProductCard";
import {
  Search,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Archive,
  SlidersHorizontal,
} from "lucide-react";

const Shop = () => {
  const {
    filteredProducts,
    loading,
    fetchProducts,
    query,
    setQuery,
    toggleSidebar,
  } = useProductStore();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, filteredProducts.length]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPaginationRange = () => {
    const delta = window.innerWidth < 768 ? 1 : 2;
    const range = [];
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }
    if (currentPage > delta + 2) range.unshift("...");
    range.unshift(1);
    if (currentPage < totalPages - (delta + 1)) range.push("...");
    if (totalPages > 1) range.push(totalPages);
    return range;
  };

  return (
    <div className="flex min-h-screen bg-[var(--bg-primary)] transition-colors duration-500">
      <ShopSidebar />

      <main className="flex-1 w-full pt-32 pb-24 lg:pl-[300px] transition-all duration-500">
        <div className="px-6 md:px-12 max-w-[1600px] mx-auto">
          {/* HEADER SECTION */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 border-b border-zinc-200 dark:border-zinc-900 pb-12">
            <div className="flex flex-col w-full md:w-auto">
              <div className="flex justify-between items-center md:block">
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-[var(--text-primary)]">
                  Archive
                </h1>
                <button
                  onClick={toggleSidebar}
                  className="lg:hidden p-3 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-[var(--text-primary)]"
                >
                  <SlidersHorizontal size={18} />
                </button>
              </div>
              <p className="text-[9px] font-mono text-facility-cyan tracking-[0.5em] mt-2 uppercase font-bold">
                // Total_Units: {filteredProducts.length}
              </p>
            </div>

            {/* SEARCH MANIFEST */}
            <div className="relative w-full max-w-md group">
              <Search
                className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-facility-cyan transition-colors"
                size={16}
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="SEARCH_MANIFEST..."
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full py-4 pl-14 pr-6 text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)] focus:border-facility-cyan focus:ring-4 focus:ring-facility-cyan/5 outline-none transition-all placeholder:text-zinc-400"
              />
            </div>
          </div>

          {/* PRODUCT GRID */}
          {loading ? (
            <div className="flex flex-col justify-center items-center h-64 gap-4">
              <Loader2 className="text-facility-cyan animate-spin" size={32} />
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
                Initialising_Stream...
              </span>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
                {currentItems.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="mt-20 flex flex-col items-center gap-6">
                  <div className="flex items-center justify-center gap-2 flex-wrap max-w-full px-4">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => paginate(currentPage - 1)}
                      className="p-3 md:p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-400 hover:text-facility-cyan disabled:opacity-20 transition-all bg-[var(--bg-primary)]"
                    >
                      <ChevronLeft size={18} />
                    </button>

                    <div className="flex gap-1 md:gap-2">
                      {getPaginationRange().map((page, idx) => (
                        <button
                          key={idx}
                          disabled={page === "..."}
                          onClick={() => page !== "..." && paginate(page)}
                          className={`w-10 h-10 md:w-12 md:h-12 rounded-xl text-[10px] font-black transition-all border ${
                            currentPage === page
                              ? "bg-facility-cyan border-facility-cyan text-white shadow-lg shadow-facility-cyan/20"
                              : page === "..."
                                ? "border-transparent text-zinc-300 dark:text-zinc-700 cursor-default"
                                : "border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:border-facility-cyan bg-[var(--bg-primary)]"
                          }`}
                        >
                          {page === "..."
                            ? "..."
                            : String(page).padStart(2, "0")}
                        </button>
                      ))}
                    </div>

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => paginate(currentPage + 1)}
                      className="p-3 md:p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-400 hover:text-facility-cyan disabled:opacity-20 transition-all bg-[var(--bg-primary)]"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-400 dark:text-zinc-600 tracking-[0.3em] uppercase font-bold">
                    System_Page_Transfer
                  </span>
                </div>
              )}
            </>
          )}

          {/* EMPTY STATE */}
          {!loading && filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 border border-dashed border-zinc-200 dark:border-white/5 rounded-3xl bg-zinc-50/50 dark:bg-transparent">
              <Archive
                size={32}
                className="text-zinc-300 dark:text-zinc-800 mb-4"
              />
              <p className="text-zinc-400 font-mono text-xs uppercase tracking-widest font-bold">
                No_Data_Match_Found
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Shop;
