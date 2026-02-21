import { useState, useEffect, useMemo } from "react";
import { Scan, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useProductStore from "../../store/useProductStore";

const HeroCarousel = ({ items = [], isLoading }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();
  const { setCategory, setQuery } = useProductStore();

  const carouselData = useMemo(() => {
    if (!items || items.length === 0) return [];

    const uniqueCategories = [...new Set(items.map((item) => item.category))];
    const data = uniqueCategories
      .map((cat) => {
        const catItems = items.filter((item) => item.category === cat);
        return {
          category: cat,
          featured: catItems[0],
          displayImg: catItems[0]?.image || catItems[0]?.thumbnail,
        };
      })
      .filter((s) => s.displayImg);

    // LOGIC FIX: Limit to 4 max on mobile to prevent "Bunch of lines" effect
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    return isMobile ? data.slice(0, 4) : data;
  }, [items]);

  useEffect(() => {
    if (carouselData.length <= 1) return;

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselData.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [carouselData]);

  const handleExplore = (sector) => {
    if (isLoading) return;
    setCategory(sector.category);
    setQuery("");
    navigate("/products");
  };

  // Fallback for loading state or empty data
  const current = carouselData[activeSlide] || {
    category: "LOADING...",
    featured: { description: "Establishing uplink to marketplace servers..." },
  };

  return (
    <section className="relative min-h-screen w-full bg-[var(--bg-primary)] flex flex-col md:flex-row overflow-hidden border-b border-zinc-200 dark:border-zinc-900 transition-colors duration-500">
      {/* 1. SECTOR STREAM (The Visual Grid) */}
      <div className="order-1 md:order-2 relative w-full md:flex-1 h-[40vh] md:h-screen bg-[var(--bg-primary)] flex items-center px-4 md:px-12 border-b md:border-b-0 md:border-l border-zinc-200 dark:border-zinc-900">
        <div className="flex gap-2 md:gap-4 w-full h-full py-4 md:py-0 items-center justify-center">
          {isLoading
            ? [1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex-1 h-[25vh] md:h-[60vh] bg-zinc-200 dark:bg-zinc-900 animate-pulse border border-zinc-300 dark:border-zinc-800"
                />
              ))
            : carouselData.map((sector, idx) => (
                <div
                  key={sector.category}
                  onClick={() => setActiveSlide(idx)}
                  className={`relative cursor-pointer transition-all duration-700 ease-in-out overflow-hidden border ${
                    activeSlide === idx
                      ? "flex-[4] md:flex-[3] opacity-100 grayscale-0 border-orange-600 shadow-[0_0_20px_rgba(234,88,12,0.2)]"
                      : "flex-1 opacity-30 grayscale hover:opacity-50 border-zinc-200 dark:border-zinc-800"
                  } h-[25vh] md:h-[60vh]`}
                >
                  <img
                    src={sector.displayImg}
                    className="w-full h-full object-cover"
                    alt={sector.category}
                  />
                  {/* Active Indicator for Mobile */}
                  {activeSlide === idx && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-orange-600 text-[8px] font-mono text-white uppercase">
                      Active
                    </div>
                  )}
                </div>
              ))}
        </div>
      </div>

      {/* 2. COMMAND ZONE (Content Area) */}
      <div className="order-2 md:order-1 relative z-20 w-full md:w-[38%] flex flex-col justify-center p-8 md:p-16 bg-[var(--bg-primary)] min-h-[50vh] md:min-h-screen">
        <div className="w-full space-y-6 md:space-y-8">
          <div className="flex items-center gap-3 text-orange-600">
            <Scan
              size={18}
              className={isLoading ? "animate-spin" : "animate-pulse"}
            />
            <span className="text-[10px] tracking-[0.4em] font-mono uppercase font-bold">
              {isLoading
                ? "Uplink_Syncing"
                : `Sector_Control // 0${activeSlide + 1}`}
            </span>
          </div>

          <div className="space-y-1">
            <h1 className="text-[12vw] md:text-[4.5vw] font-black leading-[0.85] uppercase tracking-tighter text-[var(--text-primary)]">
              {current.category.replace("-", " ").split(" ")[0]}
              <br />
              <span
                className="text-stroke text-transparent"
                style={{ WebkitTextStroke: "1px var(--text-primary)" }}
              >
                {current.category.replace("-", " ").split(" ")[1] || "SYSTEM"}
              </span>
            </h1>
          </div>

          <div className="flex flex-col gap-6 md:gap-10">
            <p className="text-zinc-500 text-[10px] md:text-xs md:max-w-[350px] leading-relaxed uppercase tracking-[0.15em] font-medium border-l-2 border-orange-600 pl-4 md:pl-6">
              {current.featured?.description?.substring(0, 110) ||
                "Syncing sector data from the primary manifest..."}
              ...
            </p>

            <button
              onClick={() => handleExplore(current)}
              disabled={isLoading}
              className="group flex items-center justify-between gap-6 bg-[var(--text-primary)] text-[var(--bg-primary)] pl-6 pr-2 py-2 rounded-full transition-all hover:bg-orange-600 hover:text-white active:scale-95 w-fit shadow-lg disabled:opacity-50"
            >
              <span className="text-[9px] font-black uppercase tracking-widest">
                Authorize_Entry
              </span>
              <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] p-2 rounded-full group-hover:bg-white group-hover:text-orange-600 transition-all">
                <ArrowUpRight size={18} />
              </div>
            </button>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-zinc-200 dark:bg-zinc-900">
          <div
            className="h-full bg-orange-600 transition-all duration-[6000ms] ease-linear"
            style={{
              width: `${((activeSlide + 1) / carouselData.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .text-stroke { -webkit-text-stroke: 1px var(--text-primary); }
      `,
        }}
      />
    </section>
  );
};

export default HeroCarousel;
