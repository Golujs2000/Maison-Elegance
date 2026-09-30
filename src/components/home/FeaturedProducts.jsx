import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getProducts } from "../../services/productService";
import ProductCard from "../common/ProductCard";
import Loader from "../common/Loader";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("featured");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        let list = await getProducts();
        setProducts(list.filter((p) => p.status !== "draft"));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredProducts = products.filter((p) => {
    if (activeFilter === "featured") return p.isFeatured;
    if (activeFilter === "best-sellers") return p.tags?.includes("best-seller");
    if (activeFilter === "new-arrivals") return p.tags?.includes("new-arrival");
    return true;
  });

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-gold-dark font-semibold block mb-2">
              Atelier Highlights
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary font-normal">
              Signature Masterpieces
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 p-1 bg-sand/60 rounded-xl border border-sand">
            <button
              onClick={() => setActiveFilter("featured")}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-lg transition-all ${
                activeFilter === "featured"
                  ? "bg-white text-primary shadow-sm font-semibold"
                  : "text-charcoal-muted hover:text-charcoal"
              }`}
            >
              Curated Picks
            </button>
            <button
              onClick={() => setActiveFilter("best-sellers")}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-lg transition-all ${
                activeFilter === "best-sellers"
                  ? "bg-white text-primary shadow-sm font-semibold"
                  : "text-charcoal-muted hover:text-charcoal"
              }`}
            >
              Best Sellers
            </button>
            <button
              onClick={() => setActiveFilter("new-arrivals")}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-lg transition-all ${
                activeFilter === "new-arrivals"
                  ? "bg-white text-primary shadow-sm font-semibold"
                  : "text-charcoal-muted hover:text-charcoal"
              }`}
            >
              New Arrivals
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        {loading ? (
          <Loader message="Revealing handcrafted pieces..." />
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-cream-50 rounded-2xl border border-sand">
            <p className="font-serif text-lg text-charcoal">No pieces matching this selection currently.</p>
            <Link
              to="/shop"
              className="mt-4 inline-block text-xs uppercase tracking-widest text-gold-dark font-semibold hover:underline"
            >
              Browse Full Inventory →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-primary text-primary hover:bg-primary hover:text-white text-xs uppercase tracking-widest font-medium rounded-lg transition-all duration-300"
          >
            <span>View All Architectural Pieces</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  );
}
