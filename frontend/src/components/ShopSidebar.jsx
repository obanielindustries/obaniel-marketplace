import useProductStore from "../store/useProductStore";
import { Database, Zap } from "lucide-react";

const ShopSidebar = () => {
  const isSidebarOpen = useProductStore((state) => state.isSidebarOpen);
  const toggleSidebar = useProductStore((state) => state.toggleSidebar);
  const { products, currentCategory, setCategory } = useProductStore();

  // Dynamic Category Extraction
  const categories = [
    "all",
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  return (
    <>
      {/* 1. FIXED BACKDROP */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[110] lg:hidden transition-opacity duration-500 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      />

      {/* 2. SIDEBAR */}
      <aside
        className={`
        fixed top-0 left-0 h-full bg-[var(--bg-primary)] border-r border-zinc-200 dark:border-white/5 z-[120] w-[300px]
        transition-transform duration-500 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0
      `}
      >
        <div className="p-8 pt-40 lg:pt-32 h-full flex flex-col">
          <h3 className="text-[9px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.4em] mb-10 flex items-center gap-2">
            <Database size={10} className="text-facility-cyan" />
            Sector_Manifest
          </h3>

          <div className="space-y-2 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  if (window.innerWidth < 1024) toggleSidebar();
                }}
                className={`w-full group flex items-center justify-between px-5 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300
                  ${
                    currentCategory === cat
                      ? "bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                      : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-[var(--text-primary)]"
                  }`}
              >
                <span>{cat.replace("_", " ")}</span>
                {currentCategory === cat && (
                  <Zap size={10} className="animate-pulse" />
                )}
              </button>
            ))}
          </div>

          {/* SYSTEM INFO FOOTER */}
          <div className="mt-10 pt-6 border-t border-zinc-100 dark:border-white/5">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-1 rounded-full bg-facility-cyan animate-ping" />
              <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">
                System_Node_Active
              </span>
            </div>
            <p className="text-[7px] font-mono text-zinc-400 dark:text-zinc-800 leading-tight uppercase">
              Obaniel_Industrial_OS <br />
              V.2026.4.0
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ShopSidebar;
