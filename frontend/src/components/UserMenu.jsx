import { useState, useRef, useEffect } from "react";
import { LogOut, User, Settings, ChevronDown, ShieldAlert } from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 cursor-pointer group outline-none"
      >
        {/* AVATAR CONTAINER - Dynamic Border */}
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-zinc-200 dark:border-white/10 flex items-center justify-center text-[var(--text-primary)] bg-zinc-50 dark:bg-white/5 group-hover:border-facility-cyan/50 transition-all shadow-sm">
          <User
            size={20}
            strokeWidth={1.5}
            className="group-hover:text-facility-cyan transition-colors"
          />
        </div>
        <ChevronDown
          size={14}
          className={`text-zinc-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* DROPDOWN MENU - Adaptive Theme */}
      {isOpen && (
        <div className="absolute right-0 mt-4 w-64 bg-[var(--bg-primary)] border border-zinc-200 dark:border-white/10 rounded-2xl shadow-2xl z-[110] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {/* USER IDENTITY SECTION */}
          <div className="p-5 border-b border-zinc-100 dark:border-white/5 bg-zinc-50/50 dark:bg-white/[0.02]">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[8px] font-mono text-facility-cyan font-bold uppercase tracking-[0.3em]">
                // Operator_ID
              </p>
              {user?.isAdmin && (
                <span className="text-[7px] bg-rose-500/10 text-rose-600 dark:text-rose-500 px-2 py-0.5 rounded-sm font-black tracking-widest uppercase border border-rose-500/20">
                  Admin
                </span>
              )}
            </div>
            <p className="text-xs font-black text-[var(--text-primary)] truncate uppercase tracking-tight">
              {user?.name || "Unverified_Unit"}
            </p>
            <p className="text-[9px] text-zinc-400 font-mono truncate mt-1">
              {user?.email}
            </p>
          </div>

          <div className="p-2">
            {/* ADMIN ACCESS */}
            {user?.isAdmin && (
              <button
                onClick={() => {
                  navigate("/admin/dashboard");
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-rose-600 dark:text-rose-500 hover:bg-rose-500 dark:hover:bg-rose-500 hover:text-white rounded-xl transition-all text-[10px] font-black uppercase tracking-widest mb-1 group"
              >
                <ShieldAlert
                  size={14}
                  className="group-hover:rotate-12 transition-transform"
                />
                Admin_Console
              </button>
            )}

            <button
              onClick={() => {
                navigate("/profile");
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 dark:text-zinc-400 hover:text-[var(--text-primary)] hover:bg-zinc-100 dark:hover:bg-white/5 rounded-xl transition-all text-[10px] font-bold uppercase tracking-widest"
            >
              <Settings size={14} /> Profile_Settings
            </button>

            <div className="my-1 border-t border-zinc-100 dark:border-white/5" />

            <button
              onClick={() => {
                logout();
                navigate("/login");
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-rose-500 hover:bg-rose-500/5 rounded-xl transition-all text-[10px] font-bold uppercase tracking-widest"
            >
              <LogOut size={14} /> Terminate_Session
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
