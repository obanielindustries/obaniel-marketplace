import { useMemo } from "react";
import { Cpu, ArrowRight, LayoutGrid } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useProductStore from "../../store/useProductStore";

const FacilitySectors = () => {
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

  if (realSectors.length === 0) return null;

  return (
    <section className="py-24 bg-[var(--bg-primary)] px-8 border-t border-zinc-200 dark:border-zinc-900 relative overflow-hidden transition-colors duration-500">
      {/* Blueprint Grid Overlay - Adjusted for Light Mode */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e905_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e905_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none opacity-50 dark:opacity-100"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER */}
        <div className="mb-16">
          <h2 className="text-[10px] font-mono text-cyan-500 tracking-[0.5em] uppercase mb-4">
            // Visual_Archive_Exposed
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

        {/* 3-ITEM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {realSectors.map((sector) => (
            <div
              key={sector.slug}
              onClick={() => handleSectorClick(sector.slug)}
              className="group bg-[var(--bg-primary)] p-8 md:p-10 transition-all relative overflow-hidden cursor-pointer min-h-[400px] flex flex-col justify-end border border-zinc-200 dark:border-zinc-900 hover:border-cyan-500/50 shadow-sm"
            >
              {/* --- IMAGE LAYER --- */}
              <div className="absolute inset-0 z-0 opacity-100 dark:opacity-40 group-hover:opacity-100 transition-all duration-700 bg-white">
                <img
                  src={sector.bgImage}
                  alt=""
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                />

                {/* Dynamic Gradient: Lighter in light mode to prevent "Black Box" feel */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/20 to-transparent dark:from-black dark:via-black/20 dark:to-transparent" />

                {/* Visual Scanning Effect */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-500 shadow-[0_0_15px_#0ea5e9] opacity-0 group-hover:opacity-100 group-hover:top-full transition-all duration-[2500ms] ease-in-out" />
              </div>

              {/* ID OVERLAY - Dynamic text color */}
              <span className="absolute top-4 right-6 text-black/5 dark:text-white/5 font-mono text-7xl md:text-8xl font-black group-hover:text-cyan-500/10 transition-all z-10">
                {sector.id}
              </span>

              <div className="relative z-20 space-y-4">
                {/* Sector Data Badge */}
                <div className="w-fit px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-md">
                  <p className="text-[8px] font-mono text-cyan-500 uppercase tracking-tighter">
                    Units_Detected: {sector.count}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="text-cyan-500 transition-transform duration-500 group-hover:-translate-y-1">
                    <Cpu size={24} />
                  </div>

                  <h3 className="text-2xl md:text-3xl font-black text-[var(--text-primary)] uppercase tracking-tight group-hover:text-cyan-500 transition-colors">
                    {sector.name}
                  </h3>

                  <div className="flex items-center gap-3 text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.3em]">
                    <span className="group-hover:text-cyan-500 transition-colors">
                      Authorize_Access
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-cyan-500 group-hover:translate-x-2 transition-transform"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER BUTTON */}
        <div className="mt-16 md:mt-24 flex justify-center px-4">
          <button
            onClick={() => {
              setCategory("");
              navigate("/products");
            }}
            className="group relative flex flex-row items-center justify-between md:justify-start gap-6 md:gap-16 bg-[var(--text-primary)] text-[var(--bg-primary)] pl-8 md:pl-12 pr-4 md:pr-6 py-4 md:py-6 rounded-full hover:bg-cyan-500 hover:text-black transition-all active:scale-95 w-full md:w-auto overflow-hidden shadow-xl"
          >
            <div className="text-left relative z-10">
              <p className="text-[8px] md:text-[10px] font-mono uppercase tracking-[0.4em] mb-1 opacity-60">
                Complete_Archive
              </p>
              <p className="text-lg md:text-2xl font-black uppercase tracking-tighter">
                View_All_Sectors
              </p>
            </div>

            <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] p-3 md:p-5 rounded-full group-hover:bg-black group-hover:text-cyan-500 transition-all relative z-10">
              <LayoutGrid size={20} md:size={28} />
            </div>

            <div className="absolute inset-0 bg-cyan-400 opacity-0 group-hover:opacity-20 blur-2xl transition-opacity"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FacilitySectors;
