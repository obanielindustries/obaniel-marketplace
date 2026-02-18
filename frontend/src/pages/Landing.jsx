import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // FIXED
import useProductStore from "../store/useProductStore";
import HeroCarousel from "../components/landing/HeroCarousel";

import FeaturedCategories from "../components/landing/FeaturedCategores";

import BottomCTA from "../components/landing/BottomCTA";

const Landing = () => {
  const navigate = useNavigate(); //
  const { products, fetchProducts, setCategory } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleExplore = (cat) => {
    setCategory(cat);
    navigate("/products");
  };

  return (
    <div className="bg-[#0a0a0a] text-white">
      <HeroCarousel items={products.slice(0, 10)} />
      <FeaturedCategories products={products} onExplore={handleExplore} />
      <BottomCTA />
    </div>
  );
};

export default Landing;
