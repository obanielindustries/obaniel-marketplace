import { useState, useEffect, useMemo } from "react";
import { Scan, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useProductStore from "../../store/useProductStore";

const HeroCarousel = ({ items = [] }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();
  const { setCategory, setQuery } = useProductStore();

  const carouselData = useMemo(() => {
    if (!items || items.length === 0) return [];
    const uniqueCategories = [...new Set(items.map((item) => item.category))];

    return uniqueCategories
      .map((cat) => {
        const catItems = items.filter((item) => item.category === cat);
        return {
          category: cat,
          featured: catItems[0],
          displayImg: catItems[0]?.image || catItems[0]?.thumbnail,
        };
      })
      .filter((s) => s.displayImg);
  }, [items]);

  useEffect(() => {
    if (carouselData.length <= 1) return;

    const interval = setInterval(() => {
      setActiveSlide((prev) => {
        const isMobile = window.innerWidth < 768;
        const maxSlides = isMobile
          ? Math.min(carouselData.length, 4)
          : carouselData.length;
        return (prev + 1) % maxSlides;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [carouselData]);

  const handleExplore = (sector) => {
    setCategory(sector.category);
    setQuery("");
    navigate("/products");
  };

  if (carouselData.length === 0) return null;
  const current = carouselData[activeSlide];

  return (
    <section className="relative min-h-screen w-full bg-[var(--bg-primary)] flex flex-col md:flex-row overflow-hidden border-b border-zinc-200 dark:border-zinc-900 transition-colors duration-500">
      {/* 1. SECTOR STREAM (The box on the right) */}
      <div className="order-1 md:order-2 relative w-full md:flex-1 h-[45vh] md:h-screen bg-[var(--bg-primary)] flex items-center overflow-x-auto md:overflow-hidden px-6 md:px-12 scrollbar-hide border-b md:border-b-0 md:border-l border-zinc-200 dark:border-zinc-900 snap-x snap-mandatory">
        <div className="flex gap-4 w-full h-full py-8 md:py-0 items-center min-w-max md:min-w-0">
          {carouselData.map((sector, idx) => (
            <div
              key={sector.category}
              onClick={() => setActiveSlide(idx)}
              className={`relative cursor-pointer snap-center transition-all duration-1000 ease-in-out overflow-hidden border border-zinc-200 dark:border-zinc-800 h-[30vh] md:h-[60vh] ${
                activeSlide === idx
                  ? "w-[240px] md:flex-[3] opacity-100 grayscale-0 border-orange-600/50"
                  : "w-[80px] md:flex-1 opacity-20 grayscale hover:opacity-40"
              } ${idx > 3 ? "hidden md:block" : "block"}`}
            >
              <img
                src={sector.displayImg}
                className="w-full h-full object-cover"
                alt={sector.category}
              />
              <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    activeSlide === idx
                      ? "bg-orange-600 animate-pulse"
                      : "bg-zinc-400"
                  }`}
                />
                <span className="text-[8px] font-mono text-zinc-500 dark:text-white/60 uppercase tracking-widest truncate max-w-[100px]">
                  {sector.category}
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* 2. COMMAND ZONE (The area on the left) */}
      <div className="order-2 md:order-1 relative z-20 w-full md:w-[35%] flex flex-col justify-center p-8 md:p-16 bg-[var(--bg-primary)] min-h-[55vh] md:min-h-screen">
        <div className="w-full max-w-[1200px] mx-auto space-y-8">
          <div className="flex items-center gap-3 text-orange-600">
            <Scan size={18} className="animate-pulse" />
            <span className="text-[10px] tracking-[0.5em] font-mono uppercase font-bold">
              Sector_Control // 0{activeSlide + 1}
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-[13vw] md:text-[4.5vw] font-black leading-[0.8] uppercase tracking-tighter text-[var(--text-primary)]">
              {current.category.replace("-", " ").split(" ")[0]}
              <br />
              <span className="text-stroke text-transparent">
                {current.category.replace("-", " ").split(" ")[1] || "ARCHIVE"}
              </span>
            </h1>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
            <p className="text-zinc-500 text-[11px] md:text-xs md:max-w-[400px] leading-relaxed uppercase tracking-[0.2em] font-medium border-l-2 border-orange-600 pl-6">
              {current.featured?.description?.substring(0, 120)}... [SECTOR_ID:{" "}
              {current.featured?._id?.slice(-5)}]
            </p>

            <button
              onClick={() => handleExplore(current)}
              className="group flex items-center justify-between gap-10 bg-[var(--text-primary)] text-[var(--bg-primary)] pl-8 pr-2 py-2 rounded-full transition-all hover:bg-orange-600 hover:text-white active:scale-95 w-fit shadow-lg"
            >
              <span className="text-[10px] font-black uppercase tracking-widest">
                Authorize_Entry
              </span>
              <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] p-3 rounded-full group-hover:bg-white group-hover:text-orange-600 transition-all">
                <ArrowUpRight size={20} />
              </div>
            </button>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-zinc-200 dark:bg-zinc-950">
          <div
            className="h-full bg-orange-600 transition-all duration-[6000ms] ease-linear shadow-[0_0_15px_#ea580c]"
            style={{
              width: `${
                ((activeSlide + 1) /
                  (window.innerWidth < 768
                    ? Math.min(carouselData.length, 4)
                    : carouselData.length)) *
                100
              }%`,
            }}
          />
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `,
        }}
      />
    </section>
  );
};

export default HeroCarousel;
