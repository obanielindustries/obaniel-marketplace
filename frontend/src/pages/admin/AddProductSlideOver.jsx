import { useState, useEffect } from "react";
import { X, Save, RefreshCcw } from "lucide-react";
import useProductStore from "../../store/useProductStore";

const AddProductSlideOver = ({ isOpen, setIsOpen, editData }) => {
  // Grab actions safely from store
  const createProduct = useProductStore((state) => state.createProduct);
  const updateProduct = useProductStore((state) => state.updateProduct);
  const loading = useProductStore((state) => state.loading);

  const initialState = {
    name: "",
    price: "",
    image: "",
    brand: "",
    category: "",
    countInStock: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialState);

  // Sync form when editData changes or panel opens
  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name || "",
        price: editData.price || "",
        image: editData.image || "",
        brand: editData.brand || "",
        category: editData.category || "",
        countInStock: editData.countInStock || "",
        description: editData.description || "",
      });
    } else {
      setFormData(initialState);
    }
  }, [editData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure numbers are actually numbers
    const submissionData = {
      ...formData,
      price: Number(formData.price),
      countInStock: Number(formData.countInStock),
    };

    let result;
    if (editData && editData._id) {
      result = await updateProduct(editData._id, submissionData);
    } else {
      result = await createProduct(submissionData);
    }

    if (result && result.success) {
      setIsOpen(false);
      setFormData(initialState);
    }
  };

  // Helper for cleaner inputs
  const inputClass =
    "w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 px-5 text-white text-xs font-bold focus:border-orange-600 outline-none transition-all placeholder:text-zinc-700";

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] transition-all duration-500 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-xl bg-[#0a0a0a] border-l border-white/10 z-[110] transition-transform duration-500 ease-in-out transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-10 h-full flex flex-col">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                {editData ? "Edit_Manifest" : "New_Entry"}
              </h2>
              <p className="text-[9px] text-orange-600 font-mono tracking-[0.4em] uppercase mt-2">
                {editData
                  ? `NODE_ID: ${editData._id.slice(-8)}`
                  : "AWAITING_DATA_INPUT"}
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-3 hover:bg-white/5 rounded-full text-zinc-500 hover:text-white transition-all"
            >
              <X size={24} />
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 overflow-y-auto flex-1 pr-4 custom-scrollbar"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">
                  Product_Title
                </label>
                <input
                  required
                  className={inputClass}
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">
                  Price ($)
                </label>
                <input
                  required
                  className={inputClass}
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">
                  Stock_Units
                </label>
                <input
                  required
                  className={inputClass}
                  type="number"
                  value={formData.countInStock}
                  onChange={(e) =>
                    setFormData({ ...formData, countInStock: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">
                Image_URL
              </label>
              <input
                required
                className={inputClass}
                type="text"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">
                  Brand
                </label>
                <input
                  required
                  className={inputClass}
                  type="text"
                  value={formData.brand}
                  onChange={(e) =>
                    setFormData({ ...formData, brand: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">
                  Category
                </label>
                <input
                  required
                  className={inputClass}
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">
                Technical_Description
              </label>
              <textarea
                required
                className={`${inputClass} h-32 resize-none`}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black hover:bg-orange-600 hover:text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] transition-all duration-500 flex items-center justify-center gap-3 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                "SYNCING..."
              ) : editData ? (
                <>
                  <RefreshCcw size={18} /> Update_Manifest
                </>
              ) : (
                <>
                  <Save size={18} /> Establish_Manifest
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProductSlideOver;
