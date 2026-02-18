import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-[85vh] flex items-center overflow-hidden bg-obaniel-deep">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-obaniel-rust/20 to-transparent" />

      <div className="section-container relative z-10">
        <div className="max-w-2xl">
          <p className="text-obaniel-rust font-black uppercase tracking-[0.5em] text-[10px] mb-4">
            EST. 2026 — Obaniel Archive
          </p>
          <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
            REDEFINING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-obaniel-rust to-[#D4AF37]">
              MODERN LUXURY.
            </span>
          </h1>
          <p className="text-gray-400 text-lg mb-10 font-medium leading-relaxed max-w-lg">
            A curated selection of unique pieces designed for those who value
            craftsmanship over trends. Experience the Obaniel standard.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="group flex items-center gap-6 bg-white text-obaniel-deep px-8 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-obaniel-rust hover:text-white transition-all duration-500 shadow-2xl"
          >
            Explore Collection
            <div className="bg-obaniel-deep text-white p-2 rounded-full group-hover:bg-white group-hover:text-obaniel-rust transition-colors">
              <ArrowRight size={18} />
            </div>
          </button>
        </div>
      </div>

      {/* Floating Badge */}
      <div className="absolute bottom-12 right-12 hidden lg:block">
        <div className="w-32 h-32 border border-white/10 rounded-full flex items-center justify-center animate-spin-slow">
          <p className="text-[8px] text-white/40 font-bold tracking-widest uppercase text-center p-4">
            Premium Quality • Obaniel Store •
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
