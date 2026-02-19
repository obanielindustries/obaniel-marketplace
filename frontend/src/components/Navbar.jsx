import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import useProductStore from "../store/useProductStore";
import {
  ShoppingCart,
  LogIn,
  Cpu,
  Menu,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";
import MainLogo from "../assets/logo.png";
import UserMenu from "./UserMenu";

const Navbar = ({ onCartOpen }) => {
  const { user } = useAuthStore();
  const { cart, toggleSidebar } = useProductStore();
  const cartCount = cart?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("facility-theme") || "dark",
  );

  // System Theme Logic
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.remove("light", "dark");
      root.classList.add(systemTheme);
    } else {
      root.classList.remove("light", "dark");
      root.classList.add(theme);
    }
    localStorage.setItem("facility-theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const modes = ["dark", "light", "system"];
    const nextMode = modes[(modes.indexOf(theme) + 1) % modes.length];
    setTheme(nextMode);
  };

  return (
    <header
      className={`sticky top-0 z-[9999] w-full transition-all duration-500 ${
        isScrolled
          ? "bg-[var(--bg-primary)]/95 backdrop-blur-md border-b border-facility-cyan/30 shadow-xl"
          : "bg-[var(--bg-primary)] border-b border-zinc-200 dark:border-white/5"
      }`}
    >
      {/* Top Status Bar: Semantic colors */}
      <div className="hidden sm:flex justify-between items-center px-8 py-1 border-b border-zinc-200 dark:border-white/5 text-[9px] uppercase tracking-[0.3em] text-zinc-500 font-mono">
        <div className="flex gap-4">
          <span className="flex items-center gap-2">
            <span className="h-1 w-1 bg-green-500 rounded-full animate-pulse"></span>
            Facility_Live
          </span>
          <span className="opacity-40">SECURE_ENCRYPTION: AES-256</span>
          <span className="text-facility-cyan font-bold">
            ACTIVE_THEME: {theme.toUpperCase()}
          </span>
        </div>
        <span className="opacity-30">©2026_OBANIEL_INDUSTRIES</span>
      </div>

      <nav className="max-w-[1600px] mx-auto flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex items-center gap-2 sm:gap-6">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-1.5 sm:p-2 text-zinc-500 hover:text-facility-cyan transition-colors"
          >
            <Menu size={24} />
          </button>

          <Link to="/" className="flex items-center gap-3 sm:gap-5 group">
            <img
              src={MainLogo}
              alt="Logo"
              className="h-10 sm:h-16 w-auto object-contain dark:brightness-125 transition-all duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col border-l border-zinc-300 dark:border-white/20 pl-3 sm:pl-5 py-1">
              <span className="text-sm sm:text-2xl font-black tracking-tighter text-[var(--text-primary)] leading-none">
                OBaniel<span className=" xs:inline">.store</span>
              </span>
              <span className="text-[6px] sm:text-[8px] tracking-[0.3em] sm:tracking-[0.6em] uppercase text-facility-cyan font-mono font-black mt-1 whitespace-nowrap">
                Tech_Facility
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex ml-8 border-l border-zinc-200 dark:border-white/10 pl-8">
            <Link
              to="/products"
              className="text-[11px] uppercase tracking-[0.25em] font-bold text-zinc-500 hover:text-[var(--text-primary)] flex items-center gap-2 transition-colors"
            >
              <Cpu size={14} className="text-facility-cyan" /> Inventory
            </Link>
          </div>
        </div>

        {/* ACTIONS AREA */}
        <div className="flex items-center gap-2 sm:gap-6">
          {/* THEME TOGGLE: Using Facility Colors */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 hover:border-facility-cyan/40 transition-all group"
          >
            <div className="relative">
              {theme === "dark" && (
                <Moon size={16} className="text-facility-cyan" />
              )}
              {theme === "light" && (
                <Sun size={16} className="text-facility-orange" />
              )}
              {theme === "system" && (
                <Monitor size={16} className="text-purple-500" />
              )}
            </div>
            <span className="hidden md:block text-[9px] font-mono font-bold text-zinc-500 group-hover:text-[var(--text-primary)] uppercase tracking-tighter">
              Mode_{theme}
            </span>
          </button>

          <div className="hidden md:flex flex-col items-end font-mono mr-2">
            <span className="text-[9px] text-zinc-400 uppercase">
              Auth_Level
            </span>
            <span className="text-[12px] text-[var(--text-primary)] uppercase font-black tracking-widest leading-none">
              {user ? user.name : "Unverified"}
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 border-l border-zinc-200 dark:border-white/10 pl-3 sm:pl-6">
            {user?.isAdmin && (
              <Link
                to="/admin/dashboard"
                className="hidden xl:block text-[10px] uppercase tracking-widest text-rose-500 font-black mr-2"
              >
                [OVERRIDE]
              </Link>
            )}

            {user ? (
              <UserMenu />
            ) : (
              <Link
                to="/login"
                className="text-zinc-500 hover:text-facility-cyan transition-colors"
              >
                <LogIn size={22} strokeWidth={1.5} />
              </Link>
            )}

            {/* CART TRIGGER */}
            <button
              onClick={onCartOpen}
              className="relative group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 hover:border-facility-cyan/50 shadow-sm transition-all"
            >
              <ShoppingCart
                size={20}
                className="text-[var(--text-primary)] group-hover:text-facility-cyan"
              />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-facility-cyan text-white text-[8px] sm:text-[10px] font-black h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center rounded-full border-2 border-[var(--bg-primary)]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
