import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, MessageCircle, Eye, ArrowUpRight } from "lucide-react";
import { formatPrice, calculateDiscount } from "../../utils/formatPrice";
import { PRODUCT_TAGS } from "../../utils/constants";
import { useCart } from "../../context/CartContext";
import { useSettings } from "../../context/SettingsContext";
import { generateProductInquiryUrl } from "../../utils/whatsapp";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { settings } = useSettings();

  const primaryImage =
    product.media?.find((m) => m.type === "image" && m.isPrimary)?.url ||
    product.media?.find((m) => m.type === "image")?.url ||
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80";

  const secondaryImage =
    product.media?.filter((m) => m.type === "image" && m.url !== primaryImage)[0]?.url ||
    primaryImage;

  const hasVideo = product.media?.some((m) => m.type === "video");
  const discountPercent = calculateDiscount(product.price, product.discountPrice);
  const effectivePrice = product.discountPrice || product.price;
  const isOutOfStock = product.stock <= 0;
  const isLowStock = !isOutOfStock && product.stock <= (product.lowStockThreshold || 3);

  const productUrl = `${window.location.origin}/product/${product.slug || product.id}`;
  const defaultVariant = product.variants?.[0] || null;

  const whatsappInquiryUrl = generateProductInquiryUrl({
    whatsappNumber: settings?.whatsappNumber,
    product,
    selectedVariant: defaultVariant,
    quantity: 1,
    currentUrl: productUrl,
  });

  return (
    <div className="group relative bg-white border border-sand/70 rounded-xl overflow-hidden hover:shadow-luxury-hover hover:border-gold-300 transition-all duration-500 flex flex-col justify-between">
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] bg-cream-100 overflow-hidden">
        <Link to={`/product/${product.slug || product.id}`} className="block w-full h-full">
          <img
            src={primaryImage}
            alt={product.name}
            loading="lazy"
            className={`w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 ${
              secondaryImage !== primaryImage ? "group-hover:opacity-0" : ""
            }`}
          />
          {secondaryImage !== primaryImage && (
            <img
              src={secondaryImage}
              alt={`${product.name} alternate view`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out group-hover:scale-105"
            />
          )}
        </Link>

        {/* Top Badges (Tags & Discounts) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {discountPercent > 0 && (
            <span className="px-2.5 py-1 bg-primary text-cream-50 text-[10px] uppercase font-bold tracking-wider rounded-md shadow-sm">
              Save {discountPercent}%
            </span>
          )}
          {product.tags &&
            product.tags.map((tagId) => {
              const tagInfo = PRODUCT_TAGS.find((t) => t.id === tagId);
              if (!tagInfo) return null;
              return (
                <span
                  key={tagId}
                  className={`px-2.5 py-0.5 text-[9px] uppercase font-semibold tracking-wider rounded-md border shadow-sm ${tagInfo.badgeClass}`}
                >
                  {tagInfo.label}
                </span>
              );
            })}
        </div>

        {/* Top Right Badges (Video indicator & Stock) */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5 z-10">
          {hasVideo && (
            <span className="px-2 py-0.5 bg-black/60 backdrop-blur-md text-white text-[9px] uppercase font-medium rounded tracking-wider">
              Video Tour
            </span>
          )}
          {isOutOfStock ? (
            <span className="px-2 py-0.5 bg-rose-600 text-white text-[9px] uppercase font-bold rounded">
              Bespoke Order
            </span>
          ) : isLowStock ? (
            <span className="px-2 py-0.5 bg-amber-500 text-white text-[9px] uppercase font-bold rounded animate-pulse">
              Only {product.stock} Left
            </span>
          ) : null}
        </div>

        {/* Quick Action Overlay Bar on Hover */}
        <div className="absolute inset-x-3 bottom-3 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-between gap-2 z-20">
          <Link
            to={`/product/${product.slug || product.id}`}
            className="flex-1 py-2 bg-white/95 backdrop-blur-md text-charcoal hover:text-primary text-xs font-medium rounded-lg text-center shadow-md flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye size={13} />
            <span>Examine</span>
          </Link>

          {!isOutOfStock && (
            <button
              onClick={() => addToCart(product, defaultVariant, 1)}
              className="py-2 px-3 bg-primary hover:bg-gold-dark text-white rounded-lg shadow-md transition-colors flex items-center gap-1 text-xs"
              title="Add to cart"
            >
              <ShoppingBag size={14} />
            </button>
          )}

          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-md transition-colors flex items-center gap-1 text-xs"
            title="Inquire on WhatsApp"
          >
            <MessageCircle size={14} />
          </a>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & SKU */}
          <div className="flex items-center justify-between text-[11px] text-charcoal-muted uppercase tracking-wider mb-1.5 font-medium">
            <span>{product.categoryName || "Haute Piece"}</span>
            {product.sku && <span className="text-[10px] text-charcoal-muted/70">{product.sku}</span>}
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-base sm:text-lg font-medium text-primary group-hover:text-gold-dark transition-colors line-clamp-1 mb-1">
            <Link to={`/product/${product.slug || product.id}`}>
              {product.name}
            </Link>
          </h3>

          {/* Material subtitle */}
          {product.material && (
            <p className="text-xs text-charcoal-muted line-clamp-1 mb-3 italic">
              {product.material}
            </p>
          )}

          {/* Variant swatches preview if available */}
          {product.variants && product.variants.length > 0 && (
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-[10px] uppercase tracking-wider text-charcoal-muted">Finishes:</span>
              <div className="flex items-center gap-1">
                {product.variants.slice(0, 4).map((v, idx) => (
                  <span
                    key={idx}
                    title={v.color}
                    className="w-3.5 h-3.5 rounded-full border border-sand/80 shadow-sm"
                    style={{ backgroundColor: v.colorHex || "#C5A880" }}
                  />
                ))}
                {product.variants.length > 4 && (
                  <span className="text-[10px] text-charcoal-muted">
                    +{product.variants.length - 4}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Pricing & Footer Actions */}
        <div className="pt-3 border-t border-sand/60 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-lg font-semibold text-primary">
              {formatPrice(effectivePrice)}
            </span>
            {product.discountPrice && (
              <span className="text-xs text-charcoal-muted line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 transition-colors uppercase tracking-wider"
          >
            <span>WhatsApp</span>
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
