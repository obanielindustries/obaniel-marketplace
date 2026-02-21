import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useProductStore from "../store/useProductStore";
import HeroCarousel from "../components/landing/HeroCarousel";
import FacilitySectors from "../components/landing/FacilitySections";
import LiveManifest from "../components/landing/LiveManifest";
import BottomCTA from "../components/landing/BottomCTA";

const Landing = () => {
  const navigate = useNavigate();
  const { products, fetchProducts, setCategory } = useProductStore();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await fetchProducts();
      setIsInitialLoad(false);
    };
    loadData();
  }, [fetchProducts]);

  const handleExplore = (cat) => {
    setCategory(cat);
    navigate("/products");
  };

  return (
    <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500 overflow-hidden">
      {/* HERO SECTION - We remove the 'null' return inside the component so the frame stays */}
      <section className="relative min-h-[60vh] md:min-h-screen bg-zinc-100 dark:bg-zinc-950/50">
        <HeroCarousel items={products} isLoading={isInitialLoad} />
      </section>

      <main className="flex flex-col gap-24 py-24">
        {/* FACILITY SECTORS - Structural placeholder prevents layout shift */}
        <section className="section-container min-h-[400px]">
          <FacilitySectors
            onExplore={handleExplore}
            isLoading={isInitialLoad}
          />
        </section>

        {/* LIVE MANIFEST - Always visible, providing immediate content */}
        <section className="section-container">
          <div className="flex flex-col mb-12">
            <span className="text-facility-cyan font-mono text-[10px] tracking-[0.5em] uppercase mb-2 animate-pulse">
              // SYSTEM_INITIALIZING...
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
              Live_Manifest
            </h2>
          </div>
          <LiveManifest />
        </section>

        <section className="section-container">
          <BottomCTA />
        </section>
      </main>
    </div>
  );
};

export default Landing;
