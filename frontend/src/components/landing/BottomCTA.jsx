import { useNavigate } from "react-router-dom";
import { ShoppingBag, ChevronRight } from "lucide-react";

const BottomCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-32 border-t border-zinc-200 dark:border-zinc-900 bg-[var(--bg-primary)] overflow-hidden transition-colors duration-500">
      {/* Background Decorative Element: Subtle Glow - Made even subtler for light mode */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-96 bg-orange-600/5 dark:bg-orange-600/10 blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10 text-center space-y-12">
        <div className="flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-orange-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <ShoppingBag
              size={64}
              strokeWidth={0.5}
              className="text-zinc-400 dark:text-zinc-700 relative z-10 group-hover:text-orange-600 transition-colors"
            />
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-[var(--text-primary)]">
            Evolution is <br />
            <span className="text-orange-600">Non-Negotiable.</span>
          </h2>
          <p className="text-zinc-500 text-[11px] md:text-xs font-bold uppercase tracking-[0.3em] max-w-lg mx-auto">
            Secure your place in the collective. Access limited series drops and
            member-only data feeds.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <button
            onClick={() => navigate("/signup")}
            className="w-full sm:w-auto px-12 py-6 bg-[var(--text-primary)] text-[var(--bg-primary)] text-[11px] font-black uppercase tracking-[0.4em] rounded-full hover:bg-orange-600 hover:text-white transition-all active:scale-95 cursor-pointer shadow-2xl shadow-orange-900/20"
          >
            Initialize Membership
          </button>

          <button
            onClick={() => navigate("/products")}
            className="group flex items-center gap-3 px-8 py-6 text-[11px] font-black uppercase tracking-[0.4em] text-zinc-500 hover:text-orange-600 dark:hover:text-white transition-colors cursor-pointer"
          >
            Browse The Index{" "}
            <ChevronRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>

      {/* Aesthetic Metadata Ticker */}
      <div className="absolute bottom-8 left-0 w-full px-6 flex justify-between items-center opacity-40 dark:opacity-20">
        <span className="text-[8px] font-mono uppercase tracking-widest text-zinc-500">
          Auth_Protocol // OB-2026
        </span>
        <div className="h-px flex-1 mx-8 bg-zinc-200 dark:bg-zinc-800" />
        <span className="text-[8px] font-mono uppercase tracking-widest text-zinc-500">
          Status: Terminal_Active
        </span>
      </div>
    </section>
  );
};

export default BottomCTA;
