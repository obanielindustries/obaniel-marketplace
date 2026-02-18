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
      // Navigate to the root Archive/Landing page
      systemAlert.success("Profile Created Successfully. Welcome Onboard");
      navigate("/products");
    }
  };

  return (
    <div className="min-h-screen pt-20 flex flex-col items-center justify-center px-6 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Aesthetic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[150px]" />

      <div className="w-full max-w-md z-10">
        {/* STYLISH RETURN BUTTON */}
        <Link
          to="/"
          className="group inline-flex items-center gap-2 mb-10 text-zinc-500 hover:text-white transition-colors duration-300"
        >
          <div className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center group-hover:border-orange-600 group-hover:bg-orange-600/10 transition-all">
            <ChevronLeft
              size={16}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
            Abort_Identity_Creation
          </span>
        </Link>

        <div className="bg-white/[0.02] backdrop-blur-md border border-white/5 p-10 rounded-[3rem]">
          <div className="text-center mb-10">
            <Fingerprint
              size={48}
              className="text-orange-600 mx-auto mb-4 animate-pulse"
            />
            <h1 className="text-3xl font-black uppercase tracking-tighter text-white">
              Create_Manifest
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative group">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-orange-600 transition-colors"
                size={16}
              />
              <input
                type="text"
                placeholder="FULL_NAME"
                className="w-full bg-black/40 border border-zinc-800 rounded-2xl py-4 pl-12 pr-6 text-[10px] font-bold uppercase tracking-widest text-white focus:border-orange-600 outline-none transition-all"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                required
              />
            </div>

            <div className="relative group">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-orange-600 transition-colors"
                size={16}
              />
              <input
                type="email"
                placeholder="EMAIL_GATEWAY"
                className="w-full bg-black/40 border border-zinc-800 rounded-2xl py-4 pl-12 pr-6 text-[10px] font-bold uppercase tracking-widest text-white focus:border-orange-600 outline-none transition-all"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-orange-600 transition-colors"
                size={16}
              />
              <input
                type="password"
                placeholder="CREATE_ACCESS_KEY"
                className="w-full bg-black/40 border border-zinc-800 rounded-2xl py-4 pl-12 pr-6 text-[10px] font-bold uppercase tracking-widest text-white focus:border-orange-600 outline-none transition-all"
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
              className="w-full bg-orange-600 text-white py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all duration-500 cursor-pointer font-black text-[10px] uppercase tracking-[0.3em]"
            >
              {loading ? "Registering..." : "Establish_Identity"}
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="mt-8 text-center text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
            Already verified?{" "}
            <Link
              to="/login"
              className="text-white hover:text-orange-600 transition-colors ml-1 border-b border-zinc-800 hover:border-orange-600 pb-1"
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
