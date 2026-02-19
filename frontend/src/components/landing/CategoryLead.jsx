import { useEffect } from "react";
import useProductStore from "../../store/useProductStore";
import { Link } from "react-router-dom";
import { Plus, ArrowRight } from "lucide-react";

const CategoryGrid = () => {
  const { products, fetchProducts, loading } = useProductStore();

  useEffect(() => {
    fetchProducts(); // Direct sync with your MongoDB collection
  }, [fetchProducts]);

  // Logic to grab one lead unit per category, capped at 4 for desktop balance
  const leadUnits = Object.values(
    products.reduce((acc, product) => {
      if (!acc[product.category] && Object.keys(acc).length < 4) {
        acc[product.category] = product;
      }
      return acc;
    }, {}),
  );

  if (loading) return null; // Silent load to keep the facility clean

  return (
    <section className="py-20 bg-black">
      <div className="max-w-[1600px] mx-auto px-8">
        {/* THE GRID: 4 Columns on Desktop, 1 on Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {leadUnits.map((unit) => (
            <Link
              to="/products"
              key={unit._id}
              className="group relative bg-[#0a0a0a] border border-white/5 overflow-hidden hover:border-cyan-500/40 transition-all duration-500"
            >
              {/* Sector Identification */}
              <div className="absolute top-4 left-4 z-20 flex flex-col">
                <span className="text-[8px] font-mono text-cyan-500 tracking-[0.3em] uppercase mb-1">
                  Sector_{unit.category?.substring(0, 3)}
                </span>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">
                  {unit.category}
                </span>
              </div>

              {/* Product Visual */}
              <div className="aspect-square bg-[#111] overflow-hidden">
                <img
                  src={unit.image}
                  alt={unit.name}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 brightness-75 group-hover:brightness-100"
                />
              </div>

              {/* Unit Meta */}
              <div className="p-5 flex justify-between items-center bg-black/40 backdrop-blur-sm border-t border-white/5">
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-white uppercase truncate max-w-[120px]">
                    {unit.name}
                  </span>
                  <span className="text-[10px] font-mono text-gray-500">
                    ID: {unit._id?.substring(0, 8)}
                  </span>
                </div>
                <div className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-all">
                  <Plus size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* BROWSE MORE ACTION */}
        <div className="flex justify-center">
          <Link
            to="/products"
            className="group flex items-center gap-4 px-10 py-4 bg-transparent border border-white/10 text-white font-mono text-[10px] tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all duration-300"
          >
            Access_Full_Inventory
            <ArrowRight
              size={14}
              className="group-hover:translate-x-2 transition-transform"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
