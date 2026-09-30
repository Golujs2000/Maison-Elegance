import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ShoppingBag,
  MessageCircle,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  ChevronRight,
  Play,
  Sparkles,
  Info,
  Maximize2
} from "lucide-react";
import { getProductById, getProducts } from "../services/productService";
import { useCart } from "../context/CartContext";
import { useSettings } from "../context/SettingsContext";
import { generateProductInquiryUrl } from "../utils/whatsapp";
import { formatPrice, calculateDiscount } from "../utils/formatPrice";
import { PRODUCT_TAGS } from "../utils/constants";
import ProductCard from "../components/common/ProductCard";
import Loader from "../components/common/Loader";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Media selection
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  // Variant & purchase state
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description"); // description | specs | care

  const { addToCart } = useCart();
  const { settings } = useSettings();

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const item = await getProductById(id);
        if (item) {
          setProduct(item);
          // Set initial default variant
          if (item.variants && item.variants.length > 0) {
            setSelectedVariant(item.variants[0]);
          } else {
            setSelectedVariant(null);
          }
          setActiveMediaIndex(0);
          setQuantity(1);

          // Load related pieces in same category
          const all = await getProducts();
          const related = all
            .filter((p) => p.id !== item.id && p.category === item.category && p.status !== "draft")
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (err) {
        console.error("Error loading product:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  if (loading) return <Loader message="Retrieving architectural master..." />;

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 bg-cream">
        <h2 className="font-serif text-3xl text-primary mb-3">Masterpiece Not Found</h2>
        <p className="text-sm text-charcoal-muted mb-6">
          This piece may have been acquired by a private collector or relocated.
        </p>
        <Link
          to="/shop"
          className="px-6 py-2.5 bg-primary text-cream-50 text-xs uppercase tracking-widest rounded-lg"
        >
          Return to Atelier Catalog
        </Link>
      </div>
    );
  }

  // Media items list (ensures fallback if media array is empty)
  const mediaList = product.media && product.media.length > 0
    ? product.media
    : [
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
          source: "url",
        },
      ];

  const currentMedia = mediaList[activeMediaIndex] || mediaList[0];

  // Price calculations based on selected variant
  const baseEffectivePrice = product.discountPrice || product.price;
  const variantAdjustment = selectedVariant?.priceAdjustment || 0;
  const effectiveUnitPrice = baseEffectivePrice + variantAdjustment;
  const originalUnitPrice = product.price + variantAdjustment;
  const discountPercent = calculateDiscount(originalUnitPrice, effectiveUnitPrice);

  const isOutOfStock = product.stock <= 0;
  const isLowStock = !isOutOfStock && product.stock <= (product.lowStockThreshold || 3);

  // WhatsApp Inquiry URL
  const whatsappUrl = generateProductInquiryUrl({
    whatsappNumber: settings?.whatsappNumber,
    product,
    selectedVariant,
    quantity,
    currentUrl: window.location.href,
  });

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
  };

  return (
    <div className="bg-cream min-h-screen py-8 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center text-xs text-charcoal-muted tracking-wide mb-8 uppercase font-medium flex-wrap gap-2">
          <Link to="/" className="hover:text-primary transition-colors">Atelier</Link>
          <ChevronRight size={13} className="text-sand-dark" />
          <Link to="/shop" className="hover:text-primary transition-colors">Catalog</Link>
          <ChevronRight size={13} className="text-sand-dark" />
          <Link to={`/shop?category=${product.category}`} className="hover:text-primary transition-colors">
            {product.categoryName || product.category}
          </Link>
          <ChevronRight size={13} className="text-sand-dark" />
          <span className="text-primary truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Main Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Media Gallery */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Primary High-Res Viewport */}
            <div className="relative rounded-2xl overflow-hidden bg-cream-100 border border-sand aspect-[4/3] shadow-luxury flex items-center justify-center">
              {currentMedia.type === "video" ? (
                currentMedia.url.includes("youtube.com") || currentMedia.url.includes("youtu.be") ? (
                  <iframe
                    src={currentMedia.url.replace("watch?v=", "embed/")}
                    title={product.name}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video
                    controls
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover"
                    src={currentMedia.url}
                  >
                    Your browser does not support the video tag.
                  </video>
                )
              ) : (
                <img
                  src={currentMedia.url}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              )}

              {/* Tag Badges over image */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
                {product.tags &&
                  product.tags.map((tagId) => {
                    const tagInfo = PRODUCT_TAGS.find((t) => t.id === tagId);
                    if (!tagInfo) return null;
                    return (
                      <span
                        key={tagId}
                        className={`px-3 py-1 text-[10px] uppercase font-bold tracking-wider rounded-md border shadow-sm ${tagInfo.badgeClass}`}
                      >
                        {tagInfo.label}
                      </span>
                    );
                  })}
              </div>

              {/* Media indicator pill */}
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-[11px] px-3 py-1 rounded-full uppercase tracking-wider font-medium flex items-center gap-1.5 pointer-events-none">
                {currentMedia.type === "video" ? (
                  <>
                    <Play size={12} className="fill-white" />
                    <span>Video Tour</span>
                  </>
                ) : (
                  <span>Item {activeMediaIndex + 1} of {mediaList.length}</span>
                )}
              </div>
            </div>

            {/* Thumbnail Navigation Strip */}
            {mediaList.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                {mediaList.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveMediaIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      activeMediaIndex === idx
                        ? "border-primary shadow-sm ring-2 ring-gold/40 scale-102"
                        : "border-sand/70 opacity-70 hover:opacity-100"
                    }`}
                  >
                    {item.type === "video" ? (
                      <div className="w-full h-full bg-charcoal flex items-center justify-center text-white">
                        <Play size={18} />
                      </div>
                    ) : (
                      <img
                        src={item.url}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Atelier Assurance Box */}
            <div className="bg-white border border-sand rounded-xl p-5 shadow-soft grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-charcoal">
              <div className="flex items-start gap-2.5">
                <Truck size={18} className="text-gold-dark shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-primary">White Glove Delivery</h4>
                  <p className="text-charcoal-muted text-[11px] mt-0.5">Complimentary uncrating & room placement</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck size={18} className="text-gold-dark shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-primary">Artisan Warranty</h4>
                  <p className="text-charcoal-muted text-[11px] mt-0.5">{product.warranty || "5-Year Guarantee"}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Sparkles size={18} className="text-gold-dark shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-primary">Bespoke Customization</h4>
                  <p className="text-charcoal-muted text-[11px] mt-0.5">Custom fabric & dimension consultation</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Spec, Pricing, Variants & Purchase */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs text-charcoal-muted tracking-wider uppercase mb-2">
                <span>{product.categoryName || "Salon Collection"}</span>
                {product.sku && (
                  <span className="font-mono text-[11px] bg-sand/60 px-2 py-0.5 rounded">
                    SKU: {product.sku}
                  </span>
                )}
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-primary leading-tight mb-2">
                {product.name}
              </h1>

              {/* Stock Status Badge */}
              <div className="flex items-center gap-2 mt-2">
                {isOutOfStock ? (
                  <span className="px-2.5 py-1 bg-rose-50 text-rose-800 border border-rose-200 text-xs font-semibold rounded-md">
                    Made to Order (Bespoke Production)
                  </span>
                ) : isLowStock ? (
                  <span className="px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-300 text-xs font-semibold rounded-md animate-pulse">
                    ⚠️ Limited Stock: Only {product.stock} pieces remaining
                  </span>
                ) : (
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold rounded-md flex items-center gap-1">
                    <Check size={13} />
                    <span>In Stock — Ready for Dispatch</span>
                  </span>
                )}
              </div>
            </div>

            {/* Pricing Section */}
            <div className="p-4 bg-white border border-sand rounded-xl shadow-soft">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl font-semibold text-primary">
                  {formatPrice(effectiveUnitPrice)}
                </span>
                {discountPercent > 0 && (
                  <>
                    <span className="text-base text-charcoal-muted line-through">
                      {formatPrice(originalUnitPrice)}
                    </span>
                    <span className="px-2 py-0.5 bg-rose-100 text-rose-800 text-xs font-bold rounded">
                      Save {discountPercent}%
                    </span>
                  </>
                )}
              </div>
              <p className="text-[11px] text-charcoal-muted mt-1">
                Taxes included. Handcrafted upon specification.
              </p>
            </div>

            {/* Variant Selector: Colors & Configurations */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-4 p-4 bg-cream-50 border border-sand rounded-xl">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-primary uppercase tracking-wider">
                    Finish / Configuration
                  </span>
                  {selectedVariant && (
                    <span className="text-charcoal-muted font-medium">
                      Selected: <strong className="text-primary">{selectedVariant.color}</strong> {selectedVariant.size ? `(${selectedVariant.size})` : ""}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.variants.map((v, idx) => {
                    const isSelected =
                      selectedVariant?.color === v.color &&
                      selectedVariant?.size === v.size;

                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedVariant(v)}
                        className={`p-3 rounded-lg border text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? "bg-white border-primary shadow-sm ring-1 ring-primary"
                            : "bg-white/60 border-sand hover:border-gold-300"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-4 h-4 rounded-full border border-sand shadow-sm shrink-0"
                            style={{ backgroundColor: v.colorHex || "#C5A880" }}
                          />
                          <div>
                            <p className="text-xs font-semibold text-primary leading-tight">{v.color}</p>
                            {v.size && <p className="text-[10px] text-charcoal-muted">{v.size}</p>}
                          </div>
                        </div>

                        {v.priceAdjustment !== 0 && (
                          <span className="text-[11px] font-medium text-gold-dark">
                            {v.priceAdjustment > 0 ? `+${formatPrice(v.priceAdjustment)}` : formatPrice(v.priceAdjustment)}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Stepper & CTAs */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-primary">Quantity:</span>
                <div className="flex items-center border border-sand bg-white rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-charcoal hover:bg-cream-100 text-sm font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-semibold text-primary min-w-[32px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-charcoal hover:bg-cream-100 text-sm font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`py-3.5 px-6 rounded-lg text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-luxury transition-all duration-300 ${
                    isOutOfStock
                      ? "bg-sand text-charcoal-muted cursor-not-allowed"
                      : "bg-primary text-cream-50 hover:bg-gold-dark hover:scale-[1.01]"
                  }`}
                >
                  <ShoppingBag size={16} />
                  <span>{isOutOfStock ? "Bespoke Order Only" : "Add to Cart"}</span>
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-6 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-sm transition-all duration-300"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </div>

            {/* Architectural Specifications Tabs */}
            <div className="pt-6 border-t border-sand">
              <div className="flex border-b border-sand text-xs uppercase tracking-wider font-semibold text-charcoal-muted">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`pb-2.5 mr-6 transition-colors border-b-2 ${
                    activeTab === "description"
                      ? "border-primary text-primary"
                      : "border-transparent hover:text-primary"
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab("specs")}
                  className={`pb-2.5 mr-6 transition-colors border-b-2 ${
                    activeTab === "specs"
                      ? "border-primary text-primary"
                      : "border-transparent hover:text-primary"
                  }`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab("care")}
                  className={`pb-2.5 transition-colors border-b-2 ${
                    activeTab === "care"
                      ? "border-primary text-primary"
                      : "border-transparent hover:text-primary"
                  }`}
                >
                  Warranty & Care
                </button>
              </div>

              <div className="pt-4 text-xs text-charcoal-muted leading-relaxed">
                {activeTab === "description" && (
                  <p className="whitespace-pre-line text-charcoal">{product.description}</p>
                )}

                {activeTab === "specs" && (
                  <div className="space-y-2">
                    {product.material && (
                      <div className="flex justify-between py-1 border-b border-sand/60">
                        <span className="font-semibold text-primary">Materials:</span>
                        <span className="text-right max-w-xs">{product.material}</span>
                      </div>
                    )}
                    {product.dimensions && (
                      <div className="flex justify-between py-1 border-b border-sand/60">
                        <span className="font-semibold text-primary">Dimensions:</span>
                        <span>{product.dimensions}</span>
                      </div>
                    )}
                    {product.weight && (
                      <div className="flex justify-between py-1 border-b border-sand/60">
                        <span className="font-semibold text-primary">Weight:</span>
                        <span>{product.weight}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-1">
                      <span className="font-semibold text-primary">Custom Dimensions:</span>
                      <span className="text-gold-dark font-medium">Available upon request</span>
                    </div>
                  </div>
                )}

                {activeTab === "care" && (
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-semibold text-primary mb-1">Craft Warranty:</h5>
                      <p>{product.warranty || "5-Year Guarantee on structural timber frames and internal joints."}</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-primary mb-1">Care & Longevity:</h5>
                      <p>{product.careInstructions || "Dust regularly with soft brush. Blot spills immediately with dry microfiber."}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Related Pieces Recommendation */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-sand">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-gold-dark font-semibold block mb-1">
                  Harmonious Compositions
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-primary font-normal">
                  Pieces to Complement Your Salon
                </h2>
              </div>
              <Link
                to={`/shop?category=${product.category}`}
                className="text-xs uppercase tracking-widest text-primary hover:text-gold-dark font-medium"
              >
                View Salon →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
