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
        className="flex items-center gap-2 cursor-pointer group"
      >
        <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-600/20">
          <User size={16} />
        </div>
        <ChevronDown
          size={14}
          className={`text-zinc-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-4 w-52 bg-zinc-950 border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] z-[110] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {/* USER IDENTITY SECTION */}
          <div className="p-4 border-b border-white/5 bg-white/[0.01]">
            <div className="flex justify-between items-start mb-1">
              <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.2em]">
                Operator
              </p>
              {user?.isAdmin && (
                <span className="text-[8px] bg-orange-600/20 text-orange-500 px-2 py-0.5 rounded-full font-black tracking-tighter uppercase border border-orange-600/30">
                  Admin
                </span>
              )}
            </div>
            <p className="text-xs font-bold text-white truncate">
              {user?.name}
            </p>
          </div>

          <div className="p-2">
            {/* ADMIN ACCESS ROUTE - Only renders if isAdmin is true */}
            {user?.isAdmin && (
              <button
                onClick={() => {
                  navigate("/admin/dashboard");
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-3 text-orange-500 hover:bg-orange-600 hover:text-white rounded-xl transition-all text-[10px] font-black uppercase tracking-widest mb-1 group"
              >
                <ShieldAlert
                  size={14}
                  className="group-hover:scale-110 transition-transform"
                />
                Admin_Console
              </button>
            )}

            <button
              onClick={() => {
                navigate("/profile");
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all text-[10px] font-bold uppercase"
            >
              <Settings size={14} /> Profile
            </button>

            <div className="my-1 border-t border-white/5" />

            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="w-full flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-all text-[10px] font-bold uppercase"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
