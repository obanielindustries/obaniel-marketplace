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
  }, [getUsers]);

  const handleDelete = async (id) => {
    if (window.confirm("CRITICAL: Terminate this identity manifest?")) {
      const result = await deleteUser(id);
      if (result.success) systemAlert.success("Node_Terminated");
      else systemAlert.error(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-20 md:pt-28 px-4 sm:px-6 md:px-10 pb-10 transition-colors duration-500">
      {/* 1. RESPONSIVE TABS */}
      <div className="flex gap-6 mb-8 overflow-x-auto no-scrollbar border-b border-zinc-200 dark:border-white/5 whitespace-nowrap">
        <Link
          to="/admin/dashboard"
          className="text-[10px] font-bold tracking-widest border-b-2 border-orange-600 pb-2 text-[var(--text-primary)]"
        >
          USER_DIRECTORY
        </Link>
        <Link
          to="/admin/products"
          className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 hover:text-[var(--text-primary)] pb-2 transition-all"
        >
          PRODUCT_MANIFEST
        </Link>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* BACK NAVIGATION */}
        <Link
          to="/"
          className="group inline-flex items-center gap-2 mb-8 text-zinc-500 hover:text-[var(--text-primary)] transition-all"
        >
          <ChevronLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
            Exit_Root_Directory
          </span>
        </Link>

        {/* 2. HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-zinc-200 dark:border-white/5 pb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-[var(--text-primary)] uppercase tracking-tighter">
              Identity_Directory
            </h1>
            <p className="text-[10px] text-zinc-500 tracking-[0.3em] mt-2 uppercase">
              Authorized_Access_Only
            </p>
          </div>

          {/* USER COUNT BADGE */}
          <div className="bg-orange-600/5 dark:bg-orange-600/10 border border-orange-600/20 p-4 rounded-2xl flex items-center justify-center md:justify-start gap-3 w-full md:w-auto">
            <Users className="text-orange-600" size={20} />
            <span className="text-[var(--text-primary)] font-bold text-sm tracking-widest">
              {loading ? "SYNCING..." : `${allUsers?.length || 0} ACTIVE_NODES`}
            </span>
          </div>
        </div>

        {/* LOADING STATE */}
        {loading && (!allUsers || allUsers.length === 0) ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-orange-600" size={40} />
          </div>
        ) : (
          <div className="grid gap-4">
            {allUsers?.map((u) => (
              /* 3. CARD LOGIC */
              <div
                key={u._id}
                className="bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 p-4 md:p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group hover:border-orange-600/30 transition-all duration-500 shadow-sm dark:shadow-none"
              >
                {/* USER INFO SECTION */}
                <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
                  <div
                    className={`shrink-0 w-12 h-12 rounded-xl border flex items-center justify-center transition-colors ${
                      u.isAdmin
                        ? "bg-orange-600/10 border-orange-600/30"
                        : "bg-zinc-200 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800"
                    }`}
                  >
                    {u.isAdmin ? (
                      <Shield size={20} className="text-orange-600" />
                    ) : (
                      <User size={20} className="text-zinc-500" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-[var(--text-primary)] font-bold text-sm uppercase tracking-wider truncate">
                      {u.name}
                    </h3>
                    <p className="text-zinc-500 text-[10px] font-mono mt-1 tracking-tight truncate">
                      {u.email}
                    </p>
                  </div>
                </div>

                {/* ACTION SECTION */}
                <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto border-t border-zinc-200 dark:border-white/5 md:border-none pt-4 md:pt-0">
                  <span
                    className={`text-[9px] font-black px-3 py-1 rounded-full border tracking-[0.2em] whitespace-nowrap ${
                      u.isAdmin
                        ? "border-orange-600/30 text-orange-600"
                        : "border-zinc-300 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500"
                    }`}
                  >
                    {u.isAdmin ? "ROOT_NODE" : "USER_NODE"}
                  </span>

                  {!u.isAdmin && (
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="p-3 text-zinc-400 dark:text-zinc-700 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                      aria-label="Terminate Node"
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
