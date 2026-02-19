import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Fingerprint,
  ChevronLeft,
} from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import { systemAlert } from "../utils/toastUtils";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { signup, loading } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signup(formData);
    if (result.success) {
      systemAlert.success("Profile Created Successfully. Welcome Onboard");
      navigate("/products");
    }
  };

  return (
    <div className="min-h-screen pt-20 flex flex-col items-center justify-center px-6 bg-[var(--bg-primary)] relative overflow-hidden transition-colors duration-500">
      {/* Background Aesthetic - Subtle radial pulse */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-facility-orange/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-md z-10">
        {/* STYLISH RETURN BUTTON */}
        <Link
          to="/"
          className="group inline-flex items-center gap-2 mb-10 text-zinc-500 hover:text-[var(--text-primary)] transition-colors duration-300"
        >
          <div className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:border-facility-orange group-hover:bg-facility-orange/10 transition-all">
            <ChevronLeft
              size={16}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
            Abort_Identity_Creation
          </span>
        </Link>

        {/* Signup Card Container */}
        <div className="bg-white/50 dark:bg-white/[0.02] backdrop-blur-md border border-zinc-200 dark:border-white/5 p-10 rounded-[3rem] shadow-xl shadow-black/5 dark:shadow-none transition-all">
          <div className="text-center mb-10">
            <Fingerprint
              size={48}
              className="text-facility-orange mx-auto mb-4 animate-pulse"
            />
            <h1 className="text-3xl font-black uppercase tracking-tighter text-[var(--text-primary)]">
              Create_Manifest
            </h1>
            <p className="text-[9px] font-mono text-zinc-500 mt-2 uppercase tracking-[0.3em] font-bold">
              Secure_Registry_V4
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* FULL NAME */}
            <div className="relative group">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-facility-orange transition-colors"
                size={16}
              />
              <input
                type="text"
                placeholder="FULL_NAME"
                className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-4 pl-12 pr-6 text-[10px] font-bold uppercase tracking-widest text-[var(--text-primary)] focus:border-facility-orange outline-none transition-all placeholder:text-zinc-400"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                required
              />
            </div>

            {/* EMAIL */}
            <div className="relative group">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-facility-orange transition-colors"
                size={16}
              />
              <input
                type="email"
                placeholder="EMAIL_GATEWAY"
                className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-4 pl-12 pr-6 text-[10px] font-bold uppercase tracking-widest text-[var(--text-primary)] focus:border-facility-orange outline-none transition-all placeholder:text-zinc-400"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-facility-orange transition-colors"
                size={16}
              />
              <input
                type="password"
                placeholder="CREATE_ACCESS_KEY"
                className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-4 pl-12 pr-6 text-[10px] font-bold uppercase tracking-widest text-[var(--text-primary)] focus:border-facility-orange outline-none transition-all placeholder:text-zinc-400"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-facility-orange text-white py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all duration-500 cursor-pointer font-black text-[10px] uppercase tracking-[0.3em] shadow-lg shadow-facility-orange/20"
            >
              {loading ? "Registering..." : "Establish_Identity"}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </form>

          <p className="mt-8 text-center text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
            Already verified?{" "}
            <Link
              to="/login"
              className="text-[var(--text-primary)] hover:text-facility-orange transition-colors ml-1 border-b border-zinc-200 dark:border-zinc-800 hover:border-facility-orange pb-1"
            >
              Sign_In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
