import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  ShieldCheck,
  ChevronLeft,
  RefreshCcw,
} from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import { systemAlert } from "../utils/toastUtils";

const Profile = () => {
  const { userInfo, updateProfile, loading } = useAuthStore();
  const [formData, setFormData] = useState({
    name: userInfo?.name || "",
    email: userInfo?.email || "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateProfile(formData);
    if (result.success) {
      systemAlert.success("Manifest_Updated_Successfully");
    } else {
      systemAlert.error("Update_Failed_Restricted_Access");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center px-6 transition-colors duration-500">
      <div className="w-full max-w-md">
        {/* BACK NAVIGATION */}
        <Link
          to="/products"
          className="group inline-flex items-center gap-2 mb-10 text-zinc-500 hover:text-[var(--text-primary)] transition-colors"
        >
          <ChevronLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">
            Back_To_Archive
          </span>
        </Link>

        {/* PROFILE CARD */}
        <div className="bg-[var(--bg-primary)] border border-zinc-200 dark:border-white/5 p-10 rounded-[3rem] shadow-2xl dark:shadow-none relative overflow-hidden">
          {/* Decorative Corner Accent */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-facility-orange/5 rounded-bl-full -mr-10 -mt-10" />

          <div className="text-center mb-8">
            <div className="relative inline-block">
              <ShieldCheck
                size={40}
                className="text-facility-orange mx-auto mb-4 relative z-10"
              />
              <div className="absolute inset-0 bg-facility-orange/20 blur-xl rounded-full" />
            </div>
            <h1 className="text-2xl font-black uppercase text-[var(--text-primary)] tracking-tighter">
              Edit_Identity
            </h1>
            <p className="text-[9px] text-zinc-500 font-mono tracking-widest mt-2 uppercase">
              Modifying_User_Manifest // UID_{userInfo?._id?.substring(0, 8)}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div className="relative group">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-facility-orange transition-colors"
                size={16}
              />
              <input
                className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-[var(--text-primary)] text-[11px] font-bold focus:border-facility-orange outline-none transition-all"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="UPDATE_NAME"
              />
            </div>

            {/* Email Input */}
            <div className="relative group">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-facility-orange transition-colors"
                size={16}
              />
              <input
                className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-[var(--text-primary)] text-[11px] font-bold focus:border-facility-orange outline-none transition-all"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="UPDATE_EMAIL"
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-facility-orange transition-colors"
                size={16}
              />
              <input
                type="password"
                className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-[var(--text-primary)] text-[11px] font-bold focus:border-facility-orange outline-none transition-all"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="NEW_ACCESS_KEY_(OPTIONAL)"
              />
            </div>

            <button
              disabled={loading}
              className="group w-full bg-[var(--text-primary)] text-[var(--bg-primary)] py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-facility-orange hover:text-white transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <RefreshCcw size={14} className="animate-spin" />
              ) : (
                "Update_Manifest"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
