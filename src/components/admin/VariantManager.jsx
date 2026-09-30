import React from "react";
import { Plus, Trash2, Palette } from "lucide-react";

export default function VariantManager({ variants = [], onChange }) {
  const handleAdd = () => {
    const newVariant = {
      color: "Natural Finish",
      colorHex: "#C5A880",
      size: "Standard",
      priceAdjustment: 0,
    };
    onChange([...variants, newVariant]);
  };

  const handleUpdate = (index, field, value) => {
    const updated = variants.map((v, idx) => {
      if (idx === index) {
        return {
          ...v,
          [field]: field === "priceAdjustment" ? Number(value) || 0 : value,
        };
      }
      return v;
    });
    onChange(updated);
  };

  const handleRemove = (index) => {
    onChange(variants.filter((_, idx) => idx !== index));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-charcoal-muted">
          Define custom color swatches, upholstery tones, configurations, and respective price adjustments.
        </p>
        <button
          type="button"
          onClick={handleAdd}
          className="px-3 py-1.5 bg-cream-100 hover:bg-sand text-primary border border-sand rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <Plus size={13} />
          <span>Add Variant</span>
        </button>
      </div>

      {variants.length === 0 ? (
        <div className="p-4 bg-cream-50 border border-dashed border-sand rounded-xl text-center text-xs text-charcoal-muted">
          No variants defined. This product will be offered in its standard singular finish.
        </div>
      ) : (
        <div className="space-y-2">
          {variants.map((variant, index) => (
            <div
              key={index}
              className="p-3 bg-white border border-sand rounded-xl shadow-sm grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
            >
              {/* Color Hex & Swatch */}
              <div className="sm:col-span-3 flex items-center gap-2">
                <input
                  type="color"
                  value={variant.colorHex || "#C5A880"}
                  onChange={(e) => handleUpdate(index, "colorHex", e.target.value)}
                  className="w-8 h-8 rounded-lg border border-sand cursor-pointer shrink-0 bg-transparent p-0"
                  title="Choose swatch hex color"
                />
                <input
                  type="text"
                  placeholder="Color Name (e.g. Oatmeal)"
                  value={variant.color}
                  onChange={(e) => handleUpdate(index, "color", e.target.value)}
                  className="w-full bg-cream-50 border border-sand rounded-lg px-2.5 py-1.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                />
              </div>

              {/* Size / Configuration */}
              <div className="sm:col-span-4">
                <input
                  type="text"
                  placeholder="Size / Dimensions / Style (e.g. 3-Seater)"
                  value={variant.size}
                  onChange={(e) => handleUpdate(index, "size", e.target.value)}
                  className="w-full bg-cream-50 border border-sand rounded-lg px-2.5 py-1.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                />
              </div>

              {/* Price adjustment */}
              <div className="sm:col-span-4 flex items-center gap-1.5">
                <span className="text-xs text-charcoal-muted shrink-0">Price +/-:</span>
                <input
                  type="number"
                  placeholder="0"
                  value={variant.priceAdjustment}
                  onChange={(e) => handleUpdate(index, "priceAdjustment", e.target.value)}
                  className="w-full bg-cream-50 border border-sand rounded-lg px-2.5 py-1.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                />
              </div>

              {/* Remove */}
              <div className="sm:col-span-1 text-right">
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="p-1.5 text-charcoal-muted hover:text-rose-700 transition-colors"
                  title="Remove variant"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
