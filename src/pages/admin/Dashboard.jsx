import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  FolderTree,
  AlertTriangle,
  Sparkles,
  Plus,
  ArrowRight,
  Edit2,
  ExternalLink,
  MessageCircle,
  FileSpreadsheet,
} from "lucide-react";
import { getProducts } from "../../services/productService";
import { getCategories } from "../../services/categoryService";
import { exportProductsToCSV } from "../../services/csvService";
import { formatPrice } from "../../utils/formatPrice";
import Loader from "../../components/common/Loader";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [pList, cList] = await Promise.all([getProducts(), getCategories()]);
        setProducts(pList);
        setCategories(cList);
      } catch (err) {
        console.error("Dashboard data load error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <Loader message="Compiling atelier metrics..." />;

  const lowStockItems = products.filter(
    (p) => p.stock <= (p.lowStockThreshold || 3) && p.status === "active"
  );
  const featuredCount = products.filter((p) => p.isFeatured).length;
  const recentProducts = [...products].slice(0, 5);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand pb-6">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-gold-dark font-semibold block mb-1">
            Overview
          </span>
          <h1 className="font-serif text-3xl font-normal text-primary">
            Curator Intelligence Center
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => exportProductsToCSV(products)}
            className="px-4 py-2.5 bg-white border border-sand hover:border-gold text-charcoal text-xs uppercase tracking-wider font-semibold rounded-xl flex items-center gap-2 transition-colors shadow-2xs"
          >
            <FileSpreadsheet size={15} className="text-emerald-700" />
            <span>Export CSV</span>
          </button>
          <Link
            to="/admin/products/add"
            className="px-5 py-2.5 bg-primary hover:bg-gold-dark text-cream-50 text-xs uppercase tracking-widest font-semibold rounded-xl flex items-center gap-2 shadow-luxury transition-all"
          >
            <Plus size={15} />
            <span>Add Masterpiece</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Pieces */}
        <div className="bg-white border border-sand p-6 rounded-2xl shadow-soft space-y-2">
          <div className="flex items-center justify-between text-charcoal-muted">
            <span className="text-xs uppercase tracking-wider font-semibold">Total Catalog</span>
            <div className="w-8 h-8 rounded-lg bg-cream-100 flex items-center justify-center text-primary">
              <Package size={17} />
            </div>
          </div>
          <p className="font-serif text-3xl font-semibold text-primary">{products.length}</p>
          <p className="text-[11px] text-charcoal-muted">Handcrafted furniture pieces</p>
        </div>

        {/* Salons / Categories */}
        <div className="bg-white border border-sand p-6 rounded-2xl shadow-soft space-y-2">
          <div className="flex items-center justify-between text-charcoal-muted">
            <span className="text-xs uppercase tracking-wider font-semibold">Salons Active</span>
            <div className="w-8 h-8 rounded-lg bg-cream-100 flex items-center justify-center text-primary">
              <FolderTree size={17} />
            </div>
          </div>
          <p className="font-serif text-3xl font-semibold text-primary">{categories.length}</p>
          <p className="text-[11px] text-charcoal-muted">Living, dining, bedroom suites</p>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white border border-sand p-6 rounded-2xl shadow-soft space-y-2">
          <div className="flex items-center justify-between text-charcoal-muted">
            <span className="text-xs uppercase tracking-wider font-semibold">Low Stock Notices</span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
              <AlertTriangle size={17} />
            </div>
          </div>
          <p className="font-serif text-3xl font-semibold text-amber-900">{lowStockItems.length}</p>
          <p className="text-[11px] text-amber-800">Pieces requiring replenishment</p>
        </div>

        {/* Featured Pieces */}
        <div className="bg-white border border-sand p-6 rounded-2xl shadow-soft space-y-2">
          <div className="flex items-center justify-between text-charcoal-muted">
            <span className="text-xs uppercase tracking-wider font-semibold">Signature Featured</span>
            <div className="w-8 h-8 rounded-lg bg-gold-100 flex items-center justify-center text-gold-dark">
              <Sparkles size={17} />
            </div>
          </div>
          <p className="font-serif text-3xl font-semibold text-primary">{featuredCount}</p>
          <p className="text-[11px] text-charcoal-muted">Highlighted on storefront homepage</p>
        </div>

      </div>

      {/* Low Stock Warning Alert Banner */}
      {lowStockItems.length > 0 && (
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-amber-900">
              <AlertTriangle size={20} className="shrink-0" />
              <h3 className="font-serif text-lg font-semibold">
                Attention Required: {lowStockItems.length} Piece(s) at or below stock threshold
              </h3>
            </div>
            <Link
              to="/admin/products?filter=low-stock"
              className="text-xs text-amber-900 font-semibold hover:underline"
            >
              View in Table →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {lowStockItems.map((item) => (
              <div
                key={item.id}
                className="bg-white/80 p-3 rounded-xl border border-amber-200 flex items-center justify-between"
              >
                <div>
                  <h4 className="font-medium text-xs text-primary truncate max-w-[180px]">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-charcoal-muted font-mono">{item.sku || "No SKU"}</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 bg-amber-200 text-amber-900 text-xs font-bold rounded">
                    {item.stock} left
                  </span>
                  <Link
                    to={`/admin/products/edit/${item.id}`}
                    className="block text-[10px] text-primary hover:underline mt-1"
                  >
                    Edit Stock
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Masterpieces Table */}
      <div className="bg-white border border-sand rounded-2xl shadow-soft overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl font-normal text-primary">
            Recent Catalog Additions
          </h3>
          <Link
            to="/admin/products"
            className="text-xs uppercase tracking-wider text-gold-dark hover:underline font-semibold"
          >
            Manage All Inventory →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-cream-50 text-charcoal-muted uppercase text-[10px] tracking-wider border-b border-sand">
              <tr>
                <th className="py-3 px-4">Piece</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand/60">
              {recentProducts.map((p) => {
                const img =
                  p.media?.find((m) => m.type === "image")?.url ||
                  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=100&q=80";

                return (
                  <tr key={p.id} className="hover:bg-cream-50/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={img}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover bg-sand shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-primary text-xs">{p.name}</p>
                          <p className="text-[10px] text-charcoal-muted font-mono">{p.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-charcoal-muted">{p.categoryName || p.category}</td>
                    <td className="py-3 px-4 font-serif font-medium text-primary">
                      {formatPrice(p.discountPrice || p.price)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          p.stock <= 0
                            ? "bg-rose-100 text-rose-800"
                            : p.stock <= (p.lowStockThreshold || 3)
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {p.stock} units
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                          p.status === "active"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-charcoal/10 text-charcoal border border-charcoal/20"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          to={`/admin/products/edit/${p.id}`}
                          className="p-1.5 text-charcoal-muted hover:text-primary hover:bg-cream-100 rounded-md transition-colors"
                          title="Edit Piece"
                        >
                          <Edit2 size={14} />
                        </Link>
                        <Link
                          to={`/product/${p.slug || p.id}`}
                          target="_blank"
                          className="p-1.5 text-charcoal-muted hover:text-gold-dark hover:bg-cream-100 rounded-md transition-colors"
                          title="View on Store"
                        >
                          <ExternalLink size={14} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
