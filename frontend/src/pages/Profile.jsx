import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock, ShieldCheck, ChevronLeft } from "lucide-react";
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
      systemAlert.error("Upated_Failed_Restriced_Access");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md">
        <Link
          to="/products"
          className="group inline-flex items-center gap-2 mb-10 text-zinc-500 hover:text-white"
        >
          <ChevronLeft size={16} />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
            Back_To_Archive
          </span>
        </Link>

        <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[3rem]">
          <div className="text-center mb-8">
            <ShieldCheck size={40} className="text-orange-600 mx-auto mb-4" />
            <h1 className="text-2xl font-black uppercase text-white">
              Edit_Identity
            </h1>
            <p className="text-[9px] text-zinc-500 tracking-widest mt-2 uppercase">
              Modifying_User_Manifest
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div className="relative">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                size={16}
              />
              <input
                className="w-full bg-black/40 border border-zinc-800 rounded-2xl py-4 pl-12 text-white text-[10px] font-bold"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="UPDATE_NAME"
              />
            </div>
            {/* Email Input */}
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                size={16}
              />
              <input
                className="w-full bg-black/40 border border-zinc-800 rounded-2xl py-4 pl-12 text-white text-[10px] font-bold"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="UPDATE_EMAIL"
              />
            </div>
            {/* Password Input */}
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                size={16}
              />
              <input
                type="password"
                className="w-full bg-black/40 border border-zinc-800 rounded-2xl py-4 pl-12 text-white text-[10px] font-bold"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="NEW_ACCESS_KEY_(OPTIONAL)"
              />
            </div>

            <button className="w-full bg-white text-black py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all">
              {loading ? "Syncing..." : "Update_Manifest"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
