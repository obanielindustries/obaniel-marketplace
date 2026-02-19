import { useEffect, useMemo } from "react";
import useProductStore from "../../store/useProductStore";
import { Link } from "react-router-dom";
import { ArrowRight, Activity, ShieldCheck } from "lucide-react";

const LiveManifest = () => {
  const { products, fetchProducts, loading } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const categoryLeads = useMemo(() => {
    if (!products || products.length === 0) return [];

    const uniqueMap = products.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = product;
      }
      return acc;
    }, {});

    return Object.values(uniqueMap).slice(0, 3);
  }, [products]);

  if (loading) return null;

  return (
    <section className="py-24 bg-[var(--bg-primary)] border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-8 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-l-2 border-cyan-500 pl-8">
          <div>
            <h2 className="text-[10px] font-mono text-cyan-500 tracking-[0.6em] uppercase flex items-center gap-3">
              <Activity size={14} className="animate-pulse" />
              Cross_Sector_Manifest
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] uppercase tracking-tighter mt-4 leading-none">
              Primary_
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1px var(--text-primary)" }}
              >
                Lead_Units
              </span>
            </h3>
          </div>

          <Link
            to="/products"
            className="mt-8 md:mt-0 text-[10px] font-mono bg-[var(--text-primary)] text-[var(--bg-primary)] px-8 py-4 font-black hover:bg-cyan-500 hover:text-black transition-all flex items-center gap-4 rounded-full group shadow-xl"
          >
            OPEN_FULL_INVENTORY
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {/* 3-ITEM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categoryLeads.map((product) => (
            <div
              key={product._id}
              className="group relative bg-[var(--bg-primary)] border border-zinc-200 dark:border-zinc-900 p-3 hover:border-cyan-500/40 transition-all duration-700"
            >
              <div className="absolute top-6 left-6 z-20">
                <span className="bg-cyan-500 text-black text-[8px] font-black px-3 py-1 uppercase tracking-widest">
                  ID: {product.category.replace("-", "_")}
                </span>
              </div>

              {/* IMAGE BOX: Switched from bg-zinc-950 to var(--bg-primary) */}
              <div className="aspect-[3/4] overflow-hidden bg-[var(--bg-primary)] relative border border-zinc-100 dark:border-zinc-800">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover opacity-100 group-hover:scale-110 transition-all duration-1000 grayscale group-hover:grayscale-0"
                />

                <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-[85%] h-[85%] border border-cyan-500/20 flex items-center justify-center">
                    <ShieldCheck size={48} className="text-cyan-500/20" />
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h4 className="text-xl font-black text-[var(--text-primary)] uppercase tracking-tight group-hover:text-cyan-500 transition-colors">
                    {product.name}
                  </h4>
                  <div className="text-right">
                    <span className="block font-mono text-cyan-500 text-lg font-bold">
                      #{product.price?.toLocaleString()}
                    </span>
                  </div>
                </div>

                <p className="text-[10px] text-zinc-500 font-mono uppercase leading-relaxed line-clamp-2 border-t border-zinc-100 dark:border-zinc-900 pt-4">
                  {product.description ||
                    "Hardware_Unit_Verified_For_Immediate_Deployment."}
                </p>

                <Link
                  to={`/products`}
                  className="w-full block py-4 bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-center text-[9px] font-mono text-zinc-500 dark:text-zinc-400 tracking-[0.3em] uppercase hover:bg-cyan-500 hover:text-black transition-all"
                >
                  Inspect_Unit_Serial
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveManifest;
