import React, { useState, useEffect } from "react";
import { Save, MessageCircle, Store, Bell, Check, ShieldCheck } from "lucide-react";
import { useSettings } from "../../context/SettingsContext";
import toast from "react-hot-toast";

export default function Settings() {
  const { settings, updateStoreSettings, loading } = useSettings();
  const [formData, setFormData] = useState({
    whatsappNumber: "",
    whatsappMessage: "",
    storeName: "",
    storeTagline: "",
    storePhone: "",
    storeEmail: "",
    storeAddress: "",
    lowStockThreshold: 4,
    currency: "₹",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData({
        whatsappNumber: settings.whatsappNumber || "+919876543210",
        whatsappMessage: settings.whatsappMessage || "Hello Maison Élégance Team, I would like to inquire about:",
        storeName: settings.storeName || "Maison Élégance",
        storeTagline: settings.storeTagline || "Timeless Architecture for Contemporary Living",
        storePhone: settings.storePhone || "+91 (0612) 268 4500",
        storeEmail: settings.storeEmail || "contact@maisonelegance.com",
        storeAddress: settings.storeAddress || "Nala Road, Patna, Bihar 800003, India",
        lowStockThreshold: settings.lowStockThreshold || 4,
        currency: settings.currency || "₹",
      });
    }
  }, [settings]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await updateStoreSettings(formData);
    setSaving(false);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Top Header */}
      <div className="border-b border-sand pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-gold-dark font-semibold block mb-1">
            Configuration
          </span>
          <h1 className="font-serif text-3xl font-normal text-primary">
            Atelier & Store Settings
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* WhatsApp Inquiry Configuration */}
        <div className="bg-white border border-sand p-6 rounded-2xl shadow-soft space-y-4">
          <div className="flex items-center gap-2.5 text-emerald-800 border-b border-sand pb-3">
            <MessageCircle size={20} />
            <h3 className="font-serif text-lg font-semibold">WhatsApp Inquiry Channel</h3>
          </div>

          <p className="text-xs text-charcoal-muted">
            All customer inquiries dispatched from product pages, the floating WhatsApp button, and cart checkouts will be routed directly to this WhatsApp business number.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-1">
                WhatsApp Phone Number (with Country Code) *
              </label>
              <input
                type="text"
                required
                placeholder="+91 98765 43210"
                value={formData.whatsappNumber}
                onChange={(e) => handleChange("whatsappNumber", e.target.value)}
                className="w-full bg-cream-50 border border-sand rounded-xl px-3 py-2.5 text-xs text-charcoal font-mono font-medium focus:outline-none focus:border-gold"
              />
              <p className="text-[10px] text-charcoal-muted mt-1">
                Include country code without special characters (e.g. +91 for India).
              </p>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-1">
                Default Inquiry Greeting
              </label>
              <input
                type="text"
                placeholder="Hello Maison Élégance Team..."
                value={formData.whatsappMessage}
                onChange={(e) => handleChange("whatsappMessage", e.target.value)}
                className="w-full bg-cream-50 border border-sand rounded-xl px-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
              />
            </div>
          </div>
        </div>

        {/* Atelier Identity & Flagship Coordinates */}
        <div className="bg-white border border-sand p-6 rounded-2xl shadow-soft space-y-4">
          <div className="flex items-center gap-2.5 text-primary border-b border-sand pb-3">
            <Store size={20} />
            <h3 className="font-serif text-lg font-semibold">Flagship Atelier Identity</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-1">
                Atelier Brand Name
              </label>
              <input
                type="text"
                value={formData.storeName}
                onChange={(e) => handleChange("storeName", e.target.value)}
                className="w-full bg-cream-50 border border-sand rounded-xl px-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold font-medium"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-1">
                Curator Brand Tagline
              </label>
              <input
                type="text"
                value={formData.storeTagline}
                onChange={(e) => handleChange("storeTagline", e.target.value)}
                className="w-full bg-cream-50 border border-sand rounded-xl px-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-1">
                Direct Hotline Telephone
              </label>
              <input
                type="text"
                value={formData.storePhone}
                onChange={(e) => handleChange("storePhone", e.target.value)}
                className="w-full bg-cream-50 border border-sand rounded-xl px-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-1">
                Official Atelier Email
              </label>
              <input
                type="email"
                value={formData.storeEmail}
                onChange={(e) => handleChange("storeEmail", e.target.value)}
                className="w-full bg-cream-50 border border-sand rounded-xl px-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-1">
              Physical Showroom Address (Displayed in Footer & Inquiries)
            </label>
            <input
              type="text"
              value={formData.storeAddress}
              onChange={(e) => handleChange("storeAddress", e.target.value)}
              className="w-full bg-cream-50 border border-sand rounded-xl px-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
            />
          </div>
        </div>

        {/* Global Inventory Thresholds */}
        <div className="bg-white border border-sand p-6 rounded-2xl shadow-soft space-y-4">
          <div className="flex items-center gap-2.5 text-amber-800 border-b border-sand pb-3">
            <Bell size={20} />
            <h3 className="font-serif text-lg font-semibold">Inventory Alert Thresholds</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-1">
                Default Low Stock Trigger (Units)
              </label>
              <input
                type="number"
                min="1"
                value={formData.lowStockThreshold}
                onChange={(e) => handleChange("lowStockThreshold", Number(e.target.value))}
                className="w-full bg-cream-50 border border-sand rounded-xl px-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
              />
              <p className="text-[10px] text-charcoal-muted mt-1">
                Products with inventory equal to or lower than this will trigger warning banners on the dashboard.
              </p>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-1">
                Display Currency Symbol
              </label>
              <input
                type="text"
                value={formData.currency}
                onChange={(e) => handleChange("currency", e.target.value)}
                className="w-full bg-cream-50 border border-sand rounded-xl px-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-primary hover:bg-gold-dark text-cream-50 text-xs uppercase tracking-widest font-semibold rounded-xl shadow-luxury transition-all flex items-center gap-2"
          >
            <Save size={15} />
            <span>{saving ? "Updating..." : "Save Settings"}</span>
          </button>
        </div>

      </form>

    </div>
  );
}
