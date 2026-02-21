import { useMemo } from "react";
import { Cpu, ArrowRight, LayoutGrid } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useProductStore from "../../store/useProductStore";

const SectorSkeleton = () => (
  <div className="bg-zinc-100 dark:bg-zinc-900/50 p-8 md:p-10 min-h-[400px] border border-zinc-200 dark:border-zinc-800 animate-pulse flex flex-col justify-end space-y-4">
    <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
    <div className="w-3/4 h-8 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
    <div className="w-1/2 h-4 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
  </div>
);

const FacilitySectors = ({ isLoading }) => {
  const navigate = useNavigate();
  const { products = [], setCategory, setQuery } = useProductStore();

  const realSectors = useMemo(() => {
    if (!products || products.length === 0) return [];
    const categories = [
      ...new Set(products.map((p) => p.category).filter(Boolean)),
    ].sort(() => 0.5 - Math.random());
    return categories.slice(0, 3).map((cat, idx) => {
      const sectorProducts = products.filter((p) => p.category === cat);
      const randomProduct =
        sectorProducts[Math.floor(Math.random() * sectorProducts.length)];
      return {
        id: String(idx + 1).padStart(2, "0"),
        name: cat.replace("-", " "),
        slug: cat,
        count: sectorProducts.length,
        bgImage: randomProduct?.image || randomProduct?.thumbnail,
      };
    });
  }, [products]);

  const handleSectorClick = (slug) => {
    setCategory(slug);
    setQuery("");
    navigate("/products");
    window.scrollTo(0, 0);
  };

  return (
    <section className="py-24 bg-[var(--bg-primary)] px-8 border-t border-zinc-200 dark:border-zinc-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e905_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e905_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none opacity-50"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <h2 className="text-[10px] font-mono text-cyan-500 tracking-[0.5em] uppercase mb-4">
            // {isLoading ? "Sensing_Environment..." : "Visual_Archive_Exposed"}
          </h2>
          <p className="text-4xl md:text-5xl font-black text-[var(--text-primary)] uppercase tracking-tighter">
            Primary{" "}
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1px var(--text-primary)" }}
            >
              Access
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading || realSectors.length === 0
            ? [1, 2, 3].map((i) => <SectorSkeleton key={i} />)
            : realSectors.map((sector) => (
                <div
                  key={sector.slug}
                  onClick={() => handleSectorClick(sector.slug)}
                  className="group bg-[var(--bg-primary)] p-8 md:p-10 transition-all relative overflow-hidden cursor-pointer min-h-[400px] flex flex-col justify-end border border-zinc-200 dark:border-zinc-900 hover:border-cyan-500/50"
                >
                  <div className="absolute inset-0 z-0 opacity-100 dark:opacity-40 group-hover:opacity-100 transition-all duration-700">
                    <img
                      src={sector.bgImage}
                      alt=""
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/20 to-transparent dark:from-black dark:via-black/20" />
                  </div>
                  <div className="relative z-20 space-y-4">
                    <h3 className="text-2xl md:text-3xl font-black uppercase text-[var(--text-primary)] group-hover:text-cyan-500">
                      {sector.name}
                    </h3>
                    <div className="flex items-center gap-3 text-[10px] font-mono text-zinc-400 uppercase tracking-[0.3em]">
                      <span>Authorize_Access</span>
                      <ArrowRight
                        size={14}
                        className="text-cyan-500 group-hover:translate-x-2 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default FacilitySectors;
