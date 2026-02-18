import useProductStore from "../store/useProductStore";
import { Database } from "lucide-react";

const ShopSidebar = () => {
  const isSidebarOpen = useProductStore((state) => state.isSidebarOpen);
  const toggleSidebar = useProductStore((state) => state.toggleSidebar);
  const { products, currentCategory, setCategory } = useProductStore();

  const categories = [
    "all",
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  return (
    <>
      {/* Mobile-only backdrop */}
      <div
        className={`fixed inset-0 bg-black/90 z-[110] lg:hidden transition-opacity ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={toggleSidebar}
      />

      <aside
        className={`
        fixed top-0 left-0 h-full bg-[#080808] border-r border-white/5 z-[120] w-[300px]
        transition-transform duration-500 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0
      `}
      >
        <div className="p-8 pt-32 lg:pt-12">
          <h3 className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-10 flex items-center gap-2">
            <Database size={10} /> Data_Archive
          </h3>

          <div className="space-y-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  if (window.innerWidth < 1024) toggleSidebar(); // Auto-close on selection for mobile
                }}
                className={`w-full text-left px-5 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all
                  ${currentCategory === cat ? "bg-white text-black" : "text-zinc-500 hover:bg-white/5"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default ShopSidebar;
