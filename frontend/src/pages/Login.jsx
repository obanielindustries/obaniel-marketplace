import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, ArrowRight, ShieldCheck, ChevronLeft } from "lucide-react";
import useAuthStore from "../store/useAuthStore";

import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login, loading } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData);

    if (result.success) {
      // Navigating to "/" because that's where your products/Landing page is
      toast.success(`Identify_Verified: Welcome back, ${result.user.name}`);
      navigate("/products");
    } else {
      toast.error(result.message || "Access Denied, Invalid login credentials");
    }
  };

  return (
    <div className="min-h-screen pt-20 flex flex-col items-center justify-center px-6 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Aesthetic Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-white/5 rounded-full blur-[120px]" />

      <div className="w-full max-w-md z-10">
        {/* STYLISH RETURN BUTTON */}
        <Link
          to="/products"
          className="group inline-flex items-center gap-2 mb-12 text-zinc-500 hover:text-white transition-colors duration-300"
        >
          <div className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center group-hover:border-orange-600 group-hover:bg-orange-600/10 transition-all">
            <ChevronLeft
              size={16}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
            Return_To_Archive
          </span>
        </Link>

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-white/5 border border-white/10 mb-6">
            <ShieldCheck size={32} className="text-orange-600" />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-white">
            Identity_Auth
          </h1>
          <p className="text-[10px] font-mono text-zinc-500 mt-2 uppercase tracking-[0.3em]">
            Accessing_Secure_Node_01
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-orange-600 transition-colors"
                size={18}
              />
              <input
                type="email"
                placeholder="EMAIL_ADDRESS"
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl py-4 pl-12 pr-6 text-[11px] font-bold tracking-widest text-white focus:border-orange-600 outline-none transition-all"
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
                size={18}
              />
              <input
                type="password"
                placeholder="ACCESS_KEY"
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl py-4 pl-12 pr-6 text-[11px] font-bold tracking-widest text-white focus:border-orange-600 outline-none transition-all"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-orange-600 hover:text-white transition-all duration-300 cursor-pointer group"
          >
            <span className="text-[11px] font-black uppercase tracking-[0.3em]">
              {loading ? "Verifying_Credentials..." : "Initialize_Session"}
            </span>
            <ArrowRight
              size={18}
              className="group-hover:translate-x-2 transition-transform"
            />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            New to the archive?{" "}
            <Link
              to="/signup"
              className="text-white hover:text-orange-600 transition-colors ml-2 border-b border-zinc-800 hover:border-orange-600 pb-1"
            >
              Create_Identity
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
