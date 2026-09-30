import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, FolderTree, Image as ImageIcon, Save, X } from "lucide-react";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../../services/categoryService";
import Loader from "../../components/common/Loader";
import toast from "react-hot-toast";

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const list = await getCategories();
      setCategories(list);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ name: "", slug: "", description: "", image: "" });
    setFormOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingId(cat.id);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || "",
      image: cat.image || "",
    });
    setFormOpen(true);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to remove the salon category "${name}"?`)) {
      await deleteCategory(id);
      toast.success("Category deleted");
      loadData();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    try {
      if (editingId) {
        await updateCategory(editingId, formData);
        toast.success("Category updated");
      } else {
        await createCategory(formData);
        toast.success("New salon category established");
      }
      setFormOpen(false);
      loadData();
    } catch (err) {
      console.error(err);
      toast.error("Error saving category");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand pb-6">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-gold-dark font-semibold block mb-1">
            Spatial Organization
          </span>
          <h1 className="font-serif text-3xl font-normal text-primary">
            Salons & Collections ({categories.length})
          </h1>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-primary hover:bg-gold-dark text-cream-50 text-xs uppercase tracking-widest font-semibold rounded-xl flex items-center gap-1.5 shadow-luxury transition-all self-start sm:self-auto"
        >
          <Plus size={15} />
          <span>New Salon Space</span>
        </button>
      </div>

      {/* Add / Edit Form Modal */}
      {formOpen && (
        <div className="bg-white border border-sand p-6 rounded-2xl shadow-luxury animate-fade-in space-y-4">
          <div className="flex items-center justify-between border-b border-sand pb-3">
            <h3 className="font-serif text-lg font-semibold text-primary">
              {editingId ? "Edit Salon Space" : "Create New Salon Space"}
            </h3>
            <button onClick={() => setFormOpen(false)} className="text-charcoal-muted hover:text-charcoal">
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-1">
                  Salon Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Architectural Terrace"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-cream-50 border border-sand rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-1">
                  Slug / URL Identifier
                </label>
                <input
                  type="text"
                  placeholder="e.g. architectural-terrace"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full bg-cream-50 border border-sand rounded-xl px-3 py-2 text-xs text-charcoal font-mono focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-1">
                Showcase Cover Image URL
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full bg-cream-50 border border-sand rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-1">
                Architectural Description
              </label>
              <textarea
                rows={2}
                placeholder="Brief summary of the spatial ambiance and pieces in this salon..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-cream-50 border border-sand rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
              ></textarea>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="px-4 py-2 border border-sand text-xs font-semibold rounded-lg hover:bg-cream-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-primary text-cream-50 text-xs uppercase tracking-wider font-semibold rounded-lg hover:bg-gold-dark"
              >
                {editingId ? "Save Changes" : "Create Salon"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories Grid */}
      {loading ? (
        <Loader message="Arranging categories..." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white border border-sand rounded-2xl overflow-hidden shadow-soft flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] bg-cream-100 overflow-hidden">
                <img
                  src={cat.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80"}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded">
                  {cat.slug}
                </span>
              </div>

              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-medium text-primary">{cat.name}</h3>
                  {cat.description && (
                    <p className="text-xs text-charcoal-muted line-clamp-2 mt-1">
                      {cat.description}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-sand flex items-center justify-between text-xs">
                  <span className="text-charcoal-muted font-medium">
                    {cat.productCount ? `${cat.productCount} pieces` : "Active salon"}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(cat)}
                      className="p-1.5 text-charcoal-muted hover:text-primary hover:bg-cream-100 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id, cat.name)}
                      className="p-1.5 text-charcoal-muted hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
