/* src/components/Footer.jsx */
import { Link } from "react-router-dom";
import { Globe, Instagram, Twitter, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-[#0a0a0a] border-t border-zinc-900 pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-[1800px] mx-auto">
        {/* TOP ROW: BRAND & NEWSLETTER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-24">
          <div className="lg:col-span-6 space-y-8">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
              Obaniel<span className="text-zinc-800">Store</span>
            </h2>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.3em] max-w-sm leading-relaxed">
              Curated artifacts for the digital vanguard. Designed in the void,
              distributed globally.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-end">
            <p className="text-[10px] font-black uppercase tracking-widest text-orange-600 mb-4">
              Newsletter_Sync
            </p>
            <form className="flex border-b border-zinc-800 pb-2 focus-within:border-white transition-colors">
              <input
                type="email"
                placeholder="ENTER_EMAIL_ADDRESS"
                className="bg-transparent border-none outline-none text-xs w-full font-bold uppercase tracking-widest"
              />
              <button className="text-xs font-black uppercase hover:text-orange-600 transition-colors cursor-pointer">
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* MIDDLE ROW: LINKS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-zinc-900 py-16">
          <div className="space-y-4">
            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em]">
              Navigation
            </p>
            <ul className="space-y-2 text-[11px] font-bold uppercase tracking-widest">
              <li>
                <Link
                  to="/products"
                  className="hover:text-orange-600 transition-colors"
                >
                  Archive
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="hover:text-orange-600 transition-colors"
                >
                  Membership
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:text-orange-600 transition-colors"
                >
                  Lookbook
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em]">
              Categories
            </p>
            <ul className="space-y-2 text-[11px] font-bold uppercase tracking-widest text-zinc-400">
              <li>
                <button className="hover:text-white cursor-pointer">
                  Laptops
                </button>
              </li>
              <li>
                <button className="hover:text-white cursor-pointer">
                  Fragrances
                </button>
              </li>
              <li>
                <button className="hover:text-white cursor-pointer">
                  Skincare
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em]">
              Social
            </p>
            <div className="flex gap-6 text-zinc-400">
              <Instagram
                size={18}
                className="hover:text-white cursor-pointer"
              />
              <Twitter size={18} className="hover:text-white cursor-pointer" />
              <Globe size={18} className="hover:text-white cursor-pointer" />
            </div>
          </div>

          <div className="flex items-end justify-end">
            <button
              onClick={scrollToTop}
              className="p-4 border border-zinc-800 rounded-full hover:bg-white hover:text-black transition-all group"
            >
              <ArrowUp
                size={20}
                className="group-hover:-translate-y-1 transition-transform"
              />
            </button>
          </div>
        </div>

        {/* BOTTOM ROW: METADATA */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-zinc-900">
          <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
            © 2026 Obaniel_Store // All Rights Reserved
          </span>
          <div className="flex gap-8 text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
            <span className="hover:text-white cursor-pointer underline decoration-zinc-800 underline-offset-4">
              Privacy_Policy
            </span>
            <span className="hover:text-white cursor-pointer underline decoration-zinc-800 underline-offset-4">
              Terms_Of_Service
            </span>
          </div>
          <span className="text-[9px] font-mono text-zinc-700">
            Local_Time: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
