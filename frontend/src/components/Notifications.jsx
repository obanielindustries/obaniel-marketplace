import { Package, AlertTriangle, X } from "lucide-react";

const Notification = ({ message, type, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-10 right-8 z-[10000] facility-toast">
      <div className="relative bg-[var(--bg-primary)] border border-zinc-200 dark:border-white/10 p-5 min-w-[320px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden transition-colors duration-300">
        {/* Animated Scanline - Custom utility from index.css */}
        <div
          className={`scanline-effect ${type === "success" ? "bg-facility-cyan" : "bg-rose-500"}`}
        />

        <div className="flex items-center gap-4">
          {/* Icon logic with semantic coloring */}
          <div
            className={`p-2 rounded-sm ${
              type === "success"
                ? "bg-facility-cyan/10 text-facility-cyan"
                : "bg-rose-500/10 text-rose-500"
            }`}
          >
            {type === "success" ? (
              <Package size={20} />
            ) : (
              <AlertTriangle size={20} />
            )}
          </div>

          <div className="flex-1">
            <h4 className="text-[8px] font-mono text-zinc-500 uppercase tracking-[0.3em] mb-1 font-bold">
              {type === "success" ? "LOG_CONFIRMED" : "TERMINAL_ERROR"}
            </h4>
            <p className="text-[11px] font-black text-[var(--text-primary)] uppercase tracking-wider">
              {message}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-facility-cyan transition-colors p-1"
          >
            <X size={14} />
          </button>
        </div>

        {/* Technical Progress Bar (Decorative) */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-zinc-100 dark:bg-white/5 w-full">
          <div
            className={`h-full ${type === "success" ? "bg-facility-cyan" : "bg-rose-500"} shadow-[0_0_10px] shadow-current`}
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Notification;
