import { useState, useEffect } from "react";
import { Scan, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroCarousel = ({ items }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (items.length === 0) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [items]);

  const current = items[activeSlide];

  return (
    <section className="relative h-screen flex flex-col justify-end p-6 md:p-12 overflow-hidden border-b border-zinc-800">
      <div className="absolute inset-0">
        {items.map((item, i) => (
          <div
            key={item._id}
            className={`absolute inset-0 transition-opacity duration-1000 ${activeSlide === i ? "opacity-40 scale-100" : "opacity-0 scale-110"}`}
          >
            <img
              src={item.thumbnail || item.image}
              className="w-full h-full object-cover grayscale"
              alt="hero"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent" />
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-[1800px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-orange-600">
            <Scan size={20} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">
              Live_Feed // {activeSlide + 1} / {items.length}
            </span>
          </div>
          <h1 className="text-[10vw] font-black leading-[0.75] uppercase">
            {current?.category}
            <br />
            <span className="text-zinc-600">Archive</span>
          </h1>
        </div>
        <button
          onClick={() => navigate("/products")}
          className="btn-obaniel bg-white text-black hover:bg-orange-600 hover:text-white transition-all"
        >
          Explore {current?.name || "Archive"} <ArrowUpRight size={18} />
        </button>
      </div>
    </section>
  );
};

export default HeroCarousel;
