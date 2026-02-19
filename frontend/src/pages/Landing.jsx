import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useProductStore from "../store/useProductStore";
import HeroCarousel from "../components/landing/HeroCarousel";
import FacilitySectors from "../components/landing/FacilitySections";
import LiveManifest from "../components/landing/LiveManifest";
import BottomCTA from "../components/landing/BottomCTA";

const Landing = () => {
  const navigate = useNavigate();
  const { products, fetchProducts, setCategory } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleExplore = (cat) => {
    setCategory(cat);
    navigate("/products");
  };

  return (
    <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500 overflow-hidden">
      {/* HERO SECTION - Usually spans full width */}
      <section className="relative">
        <HeroCarousel items={products.slice(0, 100)} />
        {/* Adjusted slice to 5 for performance, 100 might lag the carousel */}
      </section>

      {/* CONTENT SECTIONS - Wrapped in your global section-container */}
      <main className="flex flex-col gap-24 py-24">
        <section className="section-container">
          <FacilitySectors onExplore={handleExplore} />
        </section>

        <section className="section-container">
          <div className="flex flex-col mb-12">
            <span className="text-facility-cyan font-mono text-[10px] tracking-[0.5em] uppercase mb-2">
              // ACTIVE_STOCKS
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
