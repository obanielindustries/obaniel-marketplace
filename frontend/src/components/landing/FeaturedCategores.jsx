import { Plus } from "lucide-react";

const FeaturedCategories = ({ products, onExplore }) => {
  // Finding the first item in the laptop category
  const laptop = products.find((p) => p.category.toLowerCase() === "laptops");

  return (
    <section className="py-32 px-6 md:px-12 max-w-[1800px] mx-auto space-y-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div
          onClick={() => onExplore("laptops")} // Consistency is key
          className="lg:col-span-7 aspect-video rounded-[2rem] overflow-hidden group cursor-pointer relative bg-zinc-900"
        >
          <img
            src={laptop?.thumbnail || laptop?.image} // Dynamic fallback
            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700"
            alt="PC"
          />
          <div className="absolute bottom-10 left-10">
            <h2 className="text-6xl font-black uppercase leading-none">
              LAPTOPS
            </h2>
            <p className="text-orange-600 font-bold text-xs mt-2 uppercase tracking-widest">
              Series_01
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-4xl font-black uppercase leading-tight">
            {laptop?.title || laptop?.name || "Next Gen Gear"}
          </h3>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
            {laptop?.description ||
              "High-performance hardware synthesized for the digital archive."}
          </p>
          <button
            onClick={() => onExplore("laptops")} // Matches the div click
            className="text-orange-600 font-black text-[10px] uppercase tracking-[0.3em] border-b-2 border-orange-600 pb-2 flex items-center gap-2 hover:text-white hover:border-white transition-all cursor-pointer"
          >
            Access Collection <Plus size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
