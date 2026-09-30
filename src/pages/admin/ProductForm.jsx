import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, Sparkles, Check } from "lucide-react";
import MediaUploader from "../../components/admin/MediaUploader";
import VariantManager from "../../components/admin/VariantManager";
import { getCategories } from "../../services/categoryService";
import { PRODUCT_TAGS, STATUS_OPTIONS } from "../../utils/constants";
import toast from "react-hot-toast";

export default function ProductForm({ initialData = null, onSave, title = "New Piece" }) {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    slug: "",
    description: "",
    category: "living-room",
    categoryName: "Living Room",
    price: "",
    discountPrice: "",
    stock: 5,
    lowStockThreshold: 3,
    material: "",
    dimensions: "",
    weight: "",
    warranty: "5-Year Structural Frame & Joint Warranty",
    careInstructions: "Dust regularly. Blot spills immediately with clean dry cloth.",
    tags: ["new-arrival"],
    isFeatured: false,
    status: "active",
    sortOrder: 100,
    media: [],
    variants: [],
  });

  useEffect(() => {
    getCategories().then((cats) => {
      setCategories(cats || []);
    });

    if (initialData) {
      setFormData({
        ...initialData,
        price: initialData.price || "",
        discountPrice: initialData.discountPrice || "",
        stock: initialData.stock !== undefined ? initialData.stock : 5,
        lowStockThreshold: initialData.lowStockThreshold || 3,
        tags: initialData.tags || [],
        media: initialData.media || [],
        variants: initialData.variants || [],
      });
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCategoryChange = (e) => {
    const slug = e.target.value;
    const cat = categories.find((c) => c.slug === slug);
    setFormData((prev) => ({
      ...prev,
      category: slug,
      categoryName: cat ? cat.name : slug,
    }));
  };

  const handleTagToggle = (tagId) => {
    setFormData((prev) => {
      const exists = prev.tags?.includes(tagId);
      const updated = exists
        ? prev.tags.filter((t) => t !== tagId)
        : [...(prev.tags || []), tagId];
      return { ...prev, tags: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Please enter a piece name");
      return;
    }
    if (!formData.price) {
      toast.error("Please enter a price");
      return;
    }

    setSaving(true);
    try {
      await onSave(formData);
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save piece");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto pb-16">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand pb-6">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/products"
            className="p-2 bg-white border border-sand hover:border-gold rounded-xl text-charcoal transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-gold-dark font-semibold block mb-0.5">
              Atelier Catalog
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-normal text-primary">
              {title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/products"
            className="px-4 py-2.5 bg-white border border-sand text-charcoal text-xs uppercase tracking-wider font-semibold rounded-xl hover:bg-cream-100 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-primary hover:bg-gold-dark text-cream-50 text-xs uppercase tracking-widest font-semibold rounded-xl shadow-luxury transition-all flex items-center gap-2"
          >
            <Save size={15} />
            <span>{saving ? "Preserving..." : "Publish Masterpiece"}</span>
          </button>
        </div>
      </div>

      {/* Form sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Core Fields */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Basic Information */}
          <div className="bg-white border border-sand p-6 rounded-2xl shadow-soft space-y-4">
            <h3 className="font-serif text-lg font-semibold text-primary border-b border-sand pb-3">
              Piece Identity
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-1.5">
                  Piece Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aurelia Bouclé Curved Sectional"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full bg-cream-50 border border-sand rounded-xl px-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold font-medium"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-1.5">
                  Internal SKU *
                </label>
                <input
                  type="text"
                  placeholder="ME-SEC-001"
                  value={formData.sku}
                  onChange={(e) => handleChange("sku", e.target.value)}
                  className="w-full bg-cream-50 border border-sand rounded-xl px-3 py-2.5 text-xs text-charcoal font-mono uppercase focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-1.5">
                Architectural Description
              </label>
              <textarea
                rows={4}
                placeholder="Describe silhouettes, timber origins, fabric tactility, and spatial intent..."
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="w-full bg-cream-50 border border-sand rounded-xl px-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold leading-relaxed"
              ></textarea>
            </div>
          </div>

          {/* Pricing & Stock Inventory */}
          <div className="bg-white border border-sand p-6 rounded-2xl shadow-soft space-y-4">
            <h3 className="font-serif text-lg font-semibold text-primary border-b border-sand pb-3">
              Pricing & Inventory
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-1.5">
                  Regular Price (₹) *
                </label>
                <input
                  type="number"
                  required
                  placeholder="185000"
                  value={formData.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  className="w-full bg-cream-50 border border-sand rounded-xl px-3 py-2.5 text-xs text-charcoal font-medium focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-1.5">
                  Discount Price (₹)
                </label>
                <input
                  type="number"
                  placeholder="169000 (Optional)"
                  value={formData.discountPrice}
                  onChange={(e) => handleChange("discountPrice", e.target.value)}
                  className="w-full bg-cream-50 border border-sand rounded-xl px-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-1.5">
                  Stock Units *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.stock}
                  onChange={(e) => handleChange("stock", e.target.value)}
                  className="w-full bg-cream-50 border border-sand rounded-xl px-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold font-medium"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-1.5">
                  Low Stock Threshold
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.lowStockThreshold}
                  onChange={(e) => handleChange("lowStockThreshold", e.target.value)}
                  className="w-full bg-cream-50 border border-sand rounded-xl px-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                />
              </div>
            </div>
          </div>

          {/* Media Manager (Images, Video Upload, URLs) */}
          <div className="bg-white border border-sand p-6 rounded-2xl shadow-soft space-y-4">
            <h3 className="font-serif text-lg font-semibold text-primary border-b border-sand pb-3">
              Media Showcase (Images, Videos & Direct URLs)
            </h3>
            <MediaUploader
              media={formData.media}
              onChange={(updatedMedia) => handleChange("media", updatedMedia)}
            />
          </div>

          {/* Variants & Custom Finishes */}
          <div className="bg-white border border-sand p-6 rounded-2xl shadow-soft space-y-4">
            <h3 className="font-serif text-lg font-semibold text-primary border-b border-sand pb-3">
              Color Swatches & Size Variants
            </h3>
            <VariantManager
              variants={formData.variants}
              onChange={(updatedVariants) => handleChange("variants", updatedVariants)}
            />
          </div>

          {/* Specifications, Warranty & Care */}
          <div className="bg-white border border-sand p-6 rounded-2xl shadow-soft space-y-4">
            <h3 className="font-serif text-lg font-semibold text-primary border-b border-sand pb-3">
              Materials, Dimensions & Warranty
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-1.5">
                  Primary Materials
                </label>
                <input
                  type="text"
                  placeholder="e.g. Italian Bouclé, Solid Ash, Brass"
                  value={formData.material}
                  onChange={(e) => handleChange("material", e.target.value)}
                  className="w-full bg-cream-50 border border-sand rounded-xl px-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-1.5">
                  Dimensions
                </label>
                <input
                  type="text"
                  placeholder="e.g. 320 cm W × 165 cm D × 74 cm H"
                  value={formData.dimensions}
                  onChange={(e) => handleChange("dimensions", e.target.value)}
                  className="w-full bg-cream-50 border border-sand rounded-xl px-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-1.5">
                  Weight
                </label>
                <input
                  type="text"
                  placeholder="e.g. 88 kg"
                  value={formData.weight}
                  onChange={(e) => handleChange("weight", e.target.value)}
                  className="w-full bg-cream-50 border border-sand rounded-xl px-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-1.5">
                  Warranty Coverage
                </label>
                <input
                  type="text"
                  placeholder="e.g. 5-Year Structural Frame Warranty"
                  value={formData.warranty}
                  onChange={(e) => handleChange("warranty", e.target.value)}
                  className="w-full bg-cream-50 border border-sand rounded-xl px-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-1.5">
                  Care & Maintenance Instructions
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dry clean bouclé only. Blot spills immediately."
                  value={formData.careInstructions}
                  onChange={(e) => handleChange("careInstructions", e.target.value)}
                  className="w-full bg-cream-50 border border-sand rounded-xl px-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Taxonomy, Status & Settings */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Organization & Category */}
          <div className="bg-white border border-sand p-6 rounded-2xl shadow-soft space-y-4">
            <h3 className="font-serif text-lg font-semibold text-primary border-b border-sand pb-3">
              Taxonomy & Salon
            </h3>

            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-1.5">
                Salon Space / Category *
              </label>
              <select
                value={formData.category}
                onChange={handleCategoryChange}
                className="w-full bg-cream-50 border border-sand rounded-xl px-3 py-2.5 text-xs text-charcoal font-medium focus:outline-none focus:border-gold"
              >
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-2">
                Editorial Badges / Tags
              </label>
              <div className="space-y-1.5">
                {PRODUCT_TAGS.map((tag) => {
                  const isChecked = formData.tags?.includes(tag.id);
                  return (
                    <label
                      key={tag.id}
                      onClick={() => handleTagToggle(tag.id)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                        isChecked
                          ? "bg-sand/40 border-gold-dark font-medium"
                          : "border-sand/70 hover:bg-cream-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${tag.badgeClass}`}></span>
                        <span>{tag.label}</span>
                      </div>
                      {isChecked && <Check size={14} className="text-gold-dark" />}
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Visibility & Display Priority */}
          <div className="bg-white border border-sand p-6 rounded-2xl shadow-soft space-y-4">
            <h3 className="font-serif text-lg font-semibold text-primary border-b border-sand pb-3">
              Visibility & Priority
            </h3>

            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-1.5">
                Publish Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="w-full bg-cream-50 border border-sand rounded-xl px-3 py-2.5 text-xs text-charcoal font-semibold uppercase focus:outline-none focus:border-gold"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-1.5">
                Catalog Display Priority (Sort Order)
              </label>
              <input
                type="number"
                value={formData.sortOrder}
                onChange={(e) => handleChange("sortOrder", e.target.value)}
                placeholder="1 (Shows first), 2, 3..."
                className="w-full bg-cream-50 border border-sand rounded-xl px-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
              />
              <p className="text-[10px] text-charcoal-muted mt-1">
                Lower numbers (e.g. 1, 2) display first on the showroom catalog.
              </p>
            </div>

            <div className="pt-2 border-t border-sand">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => handleChange("isFeatured", e.target.checked)}
                  className="accent-primary rounded mt-0.5"
                />
                <div>
                  <span className="text-xs font-semibold text-primary block">
                    Feature on Homepage Carousel
                  </span>
                  <span className="text-[11px] text-charcoal-muted">
                    Highlights this piece in the signature atelier highlights section.
                  </span>
                </div>
              </label>
            </div>
          </div>

        </div>

      </div>

    </form>
  );
}
