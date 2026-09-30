import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useSettings } from "../context/SettingsContext";
import { generateCartInquiryUrl } from "../utils/whatsapp";
import { formatPrice } from "../utils/formatPrice";

export default function Cart() {
  const { cart, cartSubtotal, cartCount, updateQuantity, removeFromCart, clearCart } = useCart();
  const { settings } = useSettings();
  const [showPreview, setShowPreview] = useState(false);

  const whatsappInquiryUrl = generateCartInquiryUrl({
    whatsappNumber: settings?.whatsappNumber,
    cartItems: cart,
    totalAmount: cartSubtotal,
  });

  if (cart.length === 0) {
    return (
      <div className="bg-cream min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-cream-100 border border-sand flex items-center justify-center text-charcoal-muted mb-6 shadow-soft">
          <ShoppingBag size={32} />
        </div>
        <span className="text-xs uppercase tracking-[0.25em] text-gold-dark font-semibold block mb-2">
          Your Curated Selection
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-primary font-normal mb-3">
          Your Salon is Awaiting Its First Masterpiece
        </h1>
        <p className="text-sm text-charcoal-muted max-w-md mb-8">
          Explore our architectural living, dining, and bedroom suites to curate your personalized sanctuary.
        </p>
        <Link
          to="/shop"
          className="px-8 py-3.5 bg-primary hover:bg-gold-dark text-cream-50 text-xs uppercase tracking-widest font-semibold rounded-lg shadow-luxury transition-all duration-300 flex items-center gap-2"
        >
          <span>Explore Furniture Catalog</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-sand pb-6 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-gold-dark font-semibold block mb-1">
              Cart Review
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-primary font-normal">
              Your Curated Pieces ({cartCount})
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-rose-700 hover:text-rose-900 font-medium flex items-center gap-1 self-start sm:self-auto"
          >
            <RotateCcw size={13} />
            <span>Clear Selection</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item.cartItemId}
                className="bg-white border border-sand p-4 sm:p-6 rounded-2xl shadow-soft flex flex-col sm:flex-row items-center gap-6"
              >
                {/* Thumbnail */}
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-cream-100 border border-sand shrink-0">
                  <img
                    src={item.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 text-center sm:text-left space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-charcoal-muted">
                      {item.sku ? `SKU: ${item.sku}` : "Curated Piece"}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-charcoal-muted hover:text-rose-700 transition-colors p-1"
                      title="Remove piece"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <h3 className="font-serif text-lg font-medium text-primary">
                    <Link to={`/product/${item.slug || item.productId}`} className="hover:text-gold-dark transition-colors">
                      {item.name}
                    </Link>
                  </h3>

                  {item.variant && (
                    <div className="inline-flex items-center gap-2 py-0.5 px-2 bg-cream-50 border border-sand/70 rounded text-xs text-charcoal-muted">
                      {item.variant.colorHex && (
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-sand"
                          style={{ backgroundColor: item.variant.colorHex }}
                        />
                      )}
                      <span>{item.variant.color}</span>
                      {item.variant.size && <span>• {item.variant.size}</span>}
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between sm:justify-start gap-6">
                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-sand rounded-lg bg-cream-50">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="px-2.5 py-1 text-charcoal hover:bg-white text-xs font-bold"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-xs font-semibold text-primary">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="px-2.5 py-1 text-charcoal hover:bg-white text-xs font-bold"
                      >
                        +
                      </button>
                    </div>

                    {/* Pricing */}
                    <div>
                      <span className="font-serif text-base font-semibold text-primary">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-[11px] text-charcoal-muted block">
                          ({formatPrice(item.price)} each)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Trust Banner */}
            <div className="bg-sand/40 border border-sand/80 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-muted">
              <div className="flex items-center gap-3">
                <Truck size={20} className="text-gold-dark shrink-0" />
                <span>Complimentary White-Glove Uncrating & Room Placement across India</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck size={20} className="text-gold-dark shrink-0" />
                <span>10-Year Craftsmanship Frame Warranty</span>
              </div>
            </div>
          </div>

          {/* Right Summary & WhatsApp Inquiry */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-sand p-6 rounded-2xl shadow-luxury space-y-5">
              <h3 className="font-serif text-xl font-medium text-primary border-b border-sand pb-3">
                Investment Summary
              </h3>

              <div className="space-y-3 text-xs text-charcoal">
                <div className="flex justify-between">
                  <span className="text-charcoal-muted">Total Pieces:</span>
                  <span className="font-medium">{cartCount} items</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-muted">White-Glove Delivery:</span>
                  <span className="text-emerald-700 font-semibold">Complimentary</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-muted">Bespoke Fabrication:</span>
                  <span className="text-primary font-medium">Included</span>
                </div>
                <div className="pt-3 border-t border-sand flex justify-between items-baseline">
                  <span className="font-serif text-sm font-semibold text-primary">Estimated Total:</span>
                  <span className="font-serif text-2xl font-bold text-primary">
                    {formatPrice(cartSubtotal)}
                  </span>
                </div>
              </div>

              {/* WhatsApp Inquiry CTA */}
              <div className="pt-3 space-y-2">
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-luxury-hover hover:scale-[1.01] transition-all duration-300"
                >
                  <MessageCircle size={18} />
                  <span>Send Selection to WhatsApp</span>
                </a>
                
                <p className="text-[11px] text-charcoal-muted text-center leading-relaxed">
                  Our design advisory team will immediately verify fabrication lead times, finish swatches, and logistics.
                </p>
              </div>

              {/* Message preview toggle */}
              <div className="pt-2 border-t border-sand/60">
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="text-[11px] text-gold-dark hover:underline flex items-center justify-between w-full"
                >
                  <span>{showPreview ? "Hide WhatsApp message preview" : "View WhatsApp message format"}</span>
                  <Sparkles size={12} />
                </button>

                {showPreview && (
                  <div className="mt-3 bg-cream-50 p-3 rounded-lg border border-sand text-[11px] text-charcoal-muted font-mono whitespace-pre-wrap leading-relaxed">
                    {decodeURIComponent(whatsappInquiryUrl.split("text=")[1] || "")}
                  </div>
                )}
              </div>

            </div>

            {/* Advisory Hotline */}
            <div className="p-4 bg-cream-50 border border-sand rounded-xl text-xs text-charcoal-muted text-center space-y-1">
              <p className="font-serif text-primary font-medium">Need immediate consultation?</p>
              <p>Call our Atelier: {settings?.storePhone || "+91 (022) 8876 5400"}</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
