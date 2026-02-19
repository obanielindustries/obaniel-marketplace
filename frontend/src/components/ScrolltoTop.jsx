import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Standard instant reset
    window.scrollTo(0, 0);

    // Optional: If you want a "Mainframe Loading" feel,
    // you can use { top: 0, behavior: 'smooth' },
    // but instant (0, 0) is usually better for technical UIs.
  }, [pathname]);

  return null;
};

export default ScrollToTop;
