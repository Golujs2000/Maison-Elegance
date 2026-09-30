import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Plus,
  Search,
  Filter,
  Trash2,
  Copy,
  Edit,
  ExternalLink,
  Star,
  Download,
  Upload,
  AlertTriangle,
  CheckSquare,
  Square,
  Check,
  X,
  FileSpreadsheet,
} from "lucide-react";
import {
  getProducts,
  deleteProduct,
  duplicateProduct,
  updateProduct,
  bulkDeleteProducts,
  bulkUpdateStatus,
  bulkUpdateCategory,
  createProduct,
} from "../../services/productService";
import { getCategories } from "../../services/categoryService";
import { exportProductsToCSV, parseCSVToProducts } from "../../services/csvService";
import { formatPrice } from "../../utils/formatPrice";
import { PRODUCT_TAGS } from "../../utils/constants";
import Loader from "../../components/common/Loader";
import toast from "react-hot-toast";

export default function ManageProducts() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState(
    searchParams.get("filter") === "low-stock" ? "low-stock" : "all"
  );

  // Bulk actions state
  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkCategoryTarget, setBulkCategoryTarget] = useState("");
  const csvInputRef = useRef(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [pList, cList] = await Promise.all([getProducts(), getCategories()]);
      setProducts(pList);
      setCategories(cList);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtered products calculation
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      if (categoryFilter !== "all" && item.category !== categoryFilter) return false;
      if (statusFilter !== "all" && item.status !== statusFilter) return false;
      if (stockFilter === "low-stock" && item.stock > (item.lowStockThreshold || 3)) return false;
      if (stockFilter === "out-of-stock" && item.stock > 0) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name?.toLowerCase().includes(q);
        const matchSku = item.sku?.toLowerCase().includes(q);
        const matchCat = item.categoryName?.toLowerCase().includes(q);
        if (!matchName && !matchSku && !matchCat) return false;
      }
      return true;
    });
  }, [products, categoryFilter, statusFilter, stockFilter, searchQuery]);

  // Checkbox Selection
  const isAllSelected =
    filteredProducts.length > 0 && selectedIds.length === filteredProducts.length;

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProducts.map((p) => p.id));
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Actions
  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from the atelier catalog?`)) {
      await deleteProduct(id);
      toast.success("Piece removed from catalog");
      loadData();
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleDuplicate = async (id) => {
    try {
      await duplicateProduct(id);
      toast.success("Piece duplicated as new draft");
      loadData();
    } catch (err) {
      toast.error("Failed to duplicate piece");
    }
  };

  const handleToggleFeatured = async (product) => {
    await updateProduct(product.id, { isFeatured: !product.isFeatured });
    toast.success(`${product.name} featured status updated`);
    loadData();
  };

  const handleStatusChange = async (product, newStatus) => {
    await updateProduct(product.id, { status: newStatus });
    toast.success(`${product.name} set to ${newStatus}`);
    loadData();
  };

  const handleSortOrderChange = async (product, newOrder) => {
    const num = Number(newOrder) || 100;
    await updateProduct(product.id, { sortOrder: num });
    loadData();
  };

  // Bulk Operations
  const handleBulkDelete = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedIds.length} selected pieces? This action is permanent.`
      )
    ) {
      await bulkDeleteProducts(selectedIds);
      toast.success(`Deleted ${selectedIds.length} pieces`);
      setSelectedIds([]);
      loadData();
    }
  };

  const handleBulkStatus = async (status) => {
    await bulkUpdateStatus(selectedIds, status);
    toast.success(`Updated status of ${selectedIds.length} pieces to ${status}`);
    setSelectedIds([]);
    loadData();
  };

  const handleBulkCategory = async () => {
    if (!bulkCategoryTarget) {
      toast.error("Please choose a category to assign");
      return;
    }
    const cat = categories.find((c) => c.slug === bulkCategoryTarget);
    if (!cat) return;

    await bulkUpdateCategory(selectedIds, cat.slug, cat.name);
    toast.success(`Assigned ${selectedIds.length} pieces to ${cat.name}`);
    setSelectedIds([]);
    setBulkCategoryTarget("");
    loadData();
  };

  // CSV Import
  const handleCSVImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const text = evt.target.result;
        const parsed = parseCSVToProducts(text);
        if (parsed.length === 0) {
          toast.error("No valid product rows found in CSV file.");
          return;
        }

        for (const item of parsed) {
          await createProduct(item);
        }

        toast.success(`Successfully imported ${parsed.length} pieces into catalog!`);
        loadData();
      } catch (err) {
        console.error(err);
        toast.error("Failed to parse CSV file");
      } finally {
        if (csvInputRef.current) csvInputRef.current.value = "";
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand pb-6">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-gold-dark font-semibold block mb-1">
            Inventory Management
          </span>
          <h1 className="font-serif text-3xl font-normal text-primary">
            Atelier Furniture Masterpieces ({products.length})
          </h1>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* CSV Import */}
          <input
            ref={csvInputRef}
            type="file"
            accept=".csv"
            onChange={handleCSVImport}
            className="hidden"
            id="csv-import-input"
          />
          <label
            htmlFor="csv-import-input"
            className="px-3.5 py-2.5 bg-white border border-sand hover:border-gold text-charcoal text-xs uppercase tracking-wider font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-2xs transition-colors"
          >
            <Upload size={14} className="text-gold-dark" />
            <span>Import CSV</span>
          </label>

          {/* CSV Export */}
          <button
            onClick={() => exportProductsToCSV(products)}
            className="px-3.5 py-2.5 bg-white border border-sand hover:border-gold text-charcoal text-xs uppercase tracking-wider font-semibold rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors"
          >
            <Download size={14} className="text-emerald-700" />
            <span>Export CSV</span>
          </button>

          {/* Add Product */}
          <Link
            to="/admin/products/add"
            className="px-4 py-2.5 bg-primary hover:bg-gold-dark text-cream-50 text-xs uppercase tracking-widest font-semibold rounded-xl flex items-center gap-1.5 shadow-luxury transition-all"
          >
            <Plus size={15} />
            <span>Add Piece</span>
          </Link>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-sand p-4 rounded-2xl shadow-soft flex flex-col md:flex-row items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="Search by piece title, SKU, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-cream-50 border border-sand rounded-xl pl-9 pr-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
          />
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-muted" />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-cream-50 border border-sand rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id || c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-cream-50 border border-sand rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active (Live)</option>
            <option value="draft">Draft (Hidden)</option>
          </select>

          {/* Stock Filter */}
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="bg-cream-50 border border-sand rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
          >
            <option value="all">All Stock Levels</option>
            <option value="low-stock">⚠️ Low Stock Only</option>
            <option value="out-of-stock">Out of Stock Only</option>
          </select>
        </div>
      </div>

      {/* Bulk Action Toolbar */}
      {selectedIds.length > 0 && (
        <div className="bg-primary text-cream-50 p-4 rounded-xl shadow-luxury flex flex-wrap items-center justify-between gap-4 animate-fade-in text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gold">{selectedIds.length} pieces selected</span>
            <button
              onClick={() => setSelectedIds([])}
              className="text-cream-300 hover:text-white underline text-[11px]"
            >
              Clear selection
            </button>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleBulkStatus("active")}
              className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-colors"
            >
              Publish Active
            </button>
            <button
              onClick={() => handleBulkStatus("draft")}
              className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-colors"
            >
              Set to Draft
            </button>

            {/* Category Assign in bulk */}
            <div className="flex items-center gap-1">
              <select
                value={bulkCategoryTarget}
                onChange={(e) => setBulkCategoryTarget(e.target.value)}
                className="bg-charcoal text-cream-50 rounded-lg px-2.5 py-1.5 text-xs border border-charcoal-light focus:outline-none"
              >
                <option value="">Move to Category...</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleBulkCategory}
                className="px-2.5 py-1.5 bg-gold text-primary font-bold rounded-lg hover:bg-gold-dark transition-colors"
              >
                Apply
              </button>
            </div>

            <button
              onClick={handleBulkDelete}
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-medium transition-colors flex items-center gap-1"
            >
              <Trash2 size={13} />
              <span>Delete</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Products Table */}
      <div className="bg-white border border-sand rounded-2xl shadow-soft overflow-hidden">
        {loading ? (
          <Loader message="Fetching inventory table..." />
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 p-6 space-y-3">
            <p className="font-serif text-xl text-primary">No products match your criteria</p>
            <p className="text-xs text-charcoal-muted">
              Adjust your search keywords or clear your active filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-cream-50 text-charcoal-muted uppercase text-[10px] tracking-wider border-b border-sand">
                <tr>
                  <th className="py-3 px-4 w-10">
                    <button
                      type="button"
                      onClick={handleSelectAll}
                      className="text-charcoal-muted hover:text-primary"
                    >
                      {isAllSelected ? <CheckSquare size={16} /> : <Square size={16} />}
                    </button>
                  </th>
                  <th className="py-3 px-4">Piece & SKU</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price / Discount</th>
                  <th className="py-3 px-4">Stock</th>
                  <th className="py-3 px-4">Priority (Sort)</th>
                  <th className="py-3 px-4">Featured</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand/60">
                {filteredProducts.map((p) => {
                  const isSelected = selectedIds.includes(p.id);
                  const isLow = p.stock <= (p.lowStockThreshold || 3);
                  const img =
                    p.media?.find((m) => m.type === "image")?.url ||
                    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=100&q=80";

                  return (
                    <tr
                      key={p.id}
                      className={`hover:bg-cream-50/60 transition-colors ${
                        isSelected ? "bg-gold-50/50" : ""
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-3 px-4">
                        <button
                          type="button"
                          onClick={() => handleToggleSelect(p.id)}
                          className="text-charcoal-muted hover:text-primary"
                        >
                          {isSelected ? (
                            <CheckSquare size={16} className="text-primary" />
                          ) : (
                            <Square size={16} />
                          )}
                        </button>
                      </td>

                      {/* Piece info */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={img}
                            alt={p.name}
                            className="w-12 h-12 rounded-lg object-cover bg-sand shrink-0"
                          />
                          <div>
                            <Link
                              to={`/admin/products/edit/${p.id}`}
                              className="font-semibold text-primary hover:text-gold-dark transition-colors line-clamp-1"
                            >
                              {p.name}
                            </Link>
                            <p className="text-[10px] text-charcoal-muted font-mono">{p.sku || "—"}</p>
                            {/* Tags preview */}
                            {p.tags && p.tags.length > 0 && (
                              <div className="flex gap-1 mt-0.5">
                                {p.tags.map((t) => (
                                  <span
                                    key={t}
                                    className="text-[9px] bg-sand/60 px-1.5 py-0.2 rounded text-charcoal font-medium"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4 text-charcoal-muted">
                        {p.categoryName || p.category}
                      </td>

                      {/* Price */}
                      <td className="py-3 px-4">
                        <span className="font-serif font-semibold text-primary">
                          {formatPrice(p.discountPrice || p.price)}
                        </span>
                        {p.discountPrice && (
                          <span className="text-[10px] text-charcoal-muted line-through block">
                            {formatPrice(p.price)}
                          </span>
                        )}
                      </td>

                      {/* Stock Level */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
                              p.stock <= 0
                                ? "bg-rose-100 text-rose-800"
                                : isLow
                                ? "bg-amber-100 text-amber-800"
                                : "bg-emerald-100 text-emerald-800"
                            }`}
                          >
                            {p.stock} units
                          </span>
                          {isLow && p.stock > 0 && (
                            <span title="Low stock threshold met">
                              <AlertTriangle size={13} className="text-amber-600" />
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Sort Order Input */}
                      <td className="py-3 px-4">
                        <input
                          type="number"
                          defaultValue={p.sortOrder || 100}
                          onBlur={(e) => handleSortOrderChange(p, e.target.value)}
                          className="w-16 bg-cream-50 border border-sand rounded px-2 py-1 text-xs text-charcoal text-center"
                          title="Display priority (lower numbers show first)"
                        />
                      </td>

                      {/* Featured Star Toggle */}
                      <td className="py-3 px-4">
                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(p)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            p.isFeatured
                              ? "text-gold-dark bg-gold-100"
                              : "text-charcoal-muted hover:text-charcoal hover:bg-cream-100"
                          }`}
                          title={p.isFeatured ? "Featured Piece (Click to unset)" : "Set as Featured"}
                        >
                          <Star size={15} fill={p.isFeatured ? "currentColor" : "none"} />
                        </button>
                      </td>

                      {/* Status Toggle Dropdown */}
                      <td className="py-3 px-4">
                        <select
                          value={p.status}
                          onChange={(e) => handleStatusChange(p, e.target.value)}
                          className={`text-[10px] font-semibold uppercase px-2 py-1 rounded-md border focus:outline-none ${
                            p.status === "active"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                              : "bg-charcoal/10 text-charcoal border-charcoal/20"
                          }`}
                        >
                          <option value="active">Active</option>
                          <option value="draft">Draft</option>
                        </select>
                      </td>

                      {/* Action buttons */}
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <Link
                            to={`/admin/products/edit/${p.id}`}
                            className="p-1.5 text-charcoal-muted hover:text-primary hover:bg-cream-100 rounded-md transition-colors"
                            title="Edit Piece"
                          >
                            <Edit size={14} />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDuplicate(p.id)}
                            className="p-1.5 text-charcoal-muted hover:text-gold-dark hover:bg-cream-100 rounded-md transition-colors"
                            title="Duplicate Piece"
                          >
                            <Copy size={14} />
                          </button>
                          <Link
                            to={`/product/${p.slug || p.id}`}
                            target="_blank"
                            className="p-1.5 text-charcoal-muted hover:text-emerald-700 hover:bg-cream-100 rounded-md transition-colors"
                            title="View in Showroom"
                          >
                            <ExternalLink size={14} />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(p.id, p.name)}
                            className="p-1.5 text-charcoal-muted hover:text-rose-700 hover:bg-rose-50 rounded-md transition-colors"
                            title="Delete Piece"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
