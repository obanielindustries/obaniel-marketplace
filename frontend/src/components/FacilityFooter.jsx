import { Link } from "react-router-dom";
import {
  Terminal,
  Shield,
  Globe,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";

const FacilityFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--bg-primary)] border-t border-zinc-200 dark:border-zinc-900 pt-24 pb-12 px-8 relative overflow-hidden transition-colors duration-500">
      {/* Aesthetic Grid Lines - Visible in both but subtler in light */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-zinc-200 dark:bg-zinc-900/30 hidden md:block" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-zinc-200 dark:bg-zinc-900/30 hidden md:block" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-12 mb-24">
          {/* 1. BRAND & STATUS */}
          <div className="col-span-1 md:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--text-primary)] flex items-center justify-center rounded-sm transition-colors">
                <Terminal size={24} className="text-[var(--bg-primary)]" />
              </div>
              <span className="text-2xl font-black text-[var(--text-primary)] uppercase tracking-tighter">
                OBANIEL_<span className="text-facility-cyan">IND</span>
              </span>
            </div>

            <p className="text-[11px] font-mono text-zinc-500 uppercase leading-relaxed max-w-sm tracking-widest">
              Autonomous_Industrial_Control // Sector_Inventory_Mainframe
              <br />
              All assets processed under encryption_std.04. Deployment origin:{" "}
              <span className="text-[var(--text-primary)] font-bold">
                West_African_Division
              </span>
            </p>

            <div className="inline-flex items-center gap-4 bg-zinc-100 dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/5 p-3 rounded-sm">
              <div className="flex flex-col">
                <span className="text-[8px] font-mono text-zinc-400 dark:text-zinc-600 uppercase">
                  Registry_Location
                </span>
                <span className="text-[10px] font-mono text-facility-cyan uppercase flex items-center gap-2 font-bold">
                  <Globe size={10} />
                  Region: NIGERIA_NG
                </span>
              </div>
            </div>
          </div>

          {/* 2. CONTACT CHANNELS */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-mono text-[var(--text-primary)] uppercase tracking-[0.4em] border-b border-zinc-200 dark:border-zinc-900 pb-4 flex items-center gap-2 font-bold">
              <Shield size={12} className="text-facility-cyan" /> //
              Access_Nodes
            </h4>
            <div className="space-y-4">
              <div className="group cursor-pointer">
                <span className="block text-[8px] font-mono text-zinc-400 dark:text-zinc-600 uppercase">
                  Primary_Comm
                </span>
                <a
                  href="mailto:obanielindustries@gmail.com"
                  className="text-[11px] font-mono text-zinc-500 group-hover:text-facility-cyan transition-colors"
                >
                  obanielindustries@gmail.com
                </a>
              </div>

              <div className="group cursor-pointer">
                <span className="block text-[8px] font-mono text-zinc-400 dark:text-zinc-600 uppercase">
                  Neural_Line_01
                </span>
                <a
                  href="tel:+2348151974556"
                  className="text-[11px] font-mono text-zinc-500 group-hover:text-facility-cyan transition-colors"
                >
                  +234 (0) 815 197 4556
                </a>
              </div>

              <div className="group cursor-pointer">
                <span className="block text-[8px] font-mono text-zinc-400 dark:text-zinc-600 uppercase">
                  Neural_Line_02
                </span>
                <a
                  href="tel:+2349066535064"
                  className="text-[11px] font-mono text-zinc-500 group-hover:text-facility-cyan transition-colors"
                >
                  +234 (0) 906 653 5064
                </a>
              </div>
            </div>
          </div>

          {/* 3. QUICK LINKS */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-mono text-[var(--text-primary)] uppercase tracking-[0.4em] border-b border-zinc-200 dark:border-zinc-900 pb-4 font-bold">
              // Navigation
            </h4>
            <ul className="space-y-3">
              {["Product_Registry", "Sector_Map", "Clearance_Terms"].map(
                (link) => (
                  <li key={link}>
                    <Link
                      to="/products"
                      className="text-[11px] font-mono text-zinc-500 hover:text-facility-cyan transition-colors flex items-center justify-between group"
                    >
                      {link}
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 group-hover:opacity-100 transition-all translate-x-[-4px] group-hover:translate-x-0"
                      />
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        {/* BOTTOM AUTHENTICATION BAR */}
        <div className="pt-12 border-t border-zinc-200 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            {[Github, Twitter, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="text-zinc-400 hover:text-facility-cyan transition-all hover:scale-110"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

          <div className="text-center md:text-right">
            <span className="block text-[9px] font-mono text-zinc-400 dark:text-zinc-700 uppercase tracking-[0.3em]">
              © {currentYear} OBANIEL_INDUSTRIES_MAINFRAME
            </span>
            <span className="text-[8px] font-mono text-zinc-300 dark:text-cyan-900 uppercase font-bold">
              Encrypted_By_Facility_OS // Port_8080_Active
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FacilityFooter;
