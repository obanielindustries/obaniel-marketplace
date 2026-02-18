import { useEffect } from "react";
import {
  Users,
  Trash2,
  Shield,
  User,
  ChevronLeft,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import { systemAlert } from "../../utils/toastUtils";

const AdminDashboard = () => {
  const { getUsers, deleteUser, allUsers, loading } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("CRITICAL: Terminate this identity manifest?")) {
      const result = await deleteUser(id);
      if (result.success) systemAlert.success("Node_Terminated");
      else systemAlert.error(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-28 px-10">
      <div className="flex gap-4 mb-8">
        <Link
          to="/admin/dashboard"
          className="text-[10px] font-bold tracking-widest border-b-2 border-orange-600 pb-2 text-white"
        >
          USER_DIRECTORY
        </Link>
        <Link
          to="/admin/products"
          className="text-[10px] font-bold tracking-widest text-zinc-500 hover:text-white pb-2 transition-all"
        >
          PRODUCT_MANIFEST
        </Link>
      </div>
      <div className="max-w-6xl mx-auto">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 mb-10 text-zinc-500 hover:text-white transition-all"
        >
          <ChevronLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
            Exit_Root_Directory
          </span>
        </Link>

        <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-8">
          <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
              Identity_Directory
            </h1>
            <p className="text-[10px] text-zinc-500 tracking-[0.3em] mt-2 uppercase">
              Authorized_Access_Only
            </p>
          </div>
          <div className="bg-orange-600/10 border border-orange-600/20 p-4 rounded-2xl flex items-center gap-3">
            <Users className="text-orange-600" size={20} />
            <span className="text-white font-bold text-sm tracking-widest">
              {loading ? "SYNCING..." : `${allUsers?.length || 0} ACTIVE_NODES`}
            </span>
          </div>
        </div>

        {loading && allUsers.length === 0 ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-orange-600" size={40} />
          </div>
        ) : (
          <div className="grid gap-4">
            {allUsers?.map((u) => (
              <div
                key={u._id}
                className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex items-center justify-between group hover:border-orange-600/30 transition-all duration-500"
              >
                <div className="flex items-center gap-6">
                  <div
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-colors ${u.isAdmin ? "bg-orange-600/10 border-orange-600/30" : "bg-zinc-900 border-zinc-800"}`}
                  >
                    {u.isAdmin ? (
                      <Shield size={20} className="text-orange-600" />
                    ) : (
                      <User size={20} className="text-zinc-500" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm uppercase tracking-wider">
                      {u.name}
                    </h3>
                    <p className="text-zinc-500 text-[10px] font-mono mt-1 tracking-tight">
                      {u.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`text-[9px] font-black px-3 py-1 rounded-full border tracking-[0.2em] ${u.isAdmin ? "border-orange-600/30 text-orange-600" : "border-zinc-800 text-zinc-500"}`}
                  >
                    {u.isAdmin ? "ROOT_NODE" : "USER_NODE"}
                  </span>
                  {!u.isAdmin && (
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="p-3 text-zinc-700 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
