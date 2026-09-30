import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { getCategories } from "../../services/categoryService";
import Loader from "../common/Loader";

export default function CategoriesShowcase() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getCategories();
        setCategories(data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <Loader message="Arranging salons..." />;

  return (
    <section className="py-20 bg-cream-50 border-b border-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-gold-dark font-semibold block mb-2">
              Curated Salons
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary font-normal">
              Explore by Architectural Space
            </h2>
          </div>
          <Link
            to="/shop"
            className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-primary hover:text-gold-dark font-medium transition-colors"
          >
            <span>View Full Catalog</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <Link
              key={cat.id || index}
              to={`/shop?category=${cat.slug}`}
              className="group relative h-80 rounded-2xl overflow-hidden bg-sand border border-sand/80 shadow-soft hover:shadow-luxury-hover transition-all duration-500"
            >
              {/* Image */}
              <img
                src={cat.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"}
                alt={cat.name}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent"></div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-cream-50">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-serif text-2xl font-medium tracking-wide group-hover:text-gold-200 transition-colors">
                    {cat.name}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-gold group-hover:text-primary transition-all">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                {cat.description && (
                  <p className="text-xs text-cream-200/90 line-clamp-2 font-sans font-light">
                    {cat.description}
                  </p>
                )}

                <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between text-[11px] uppercase tracking-widest text-cream-300">
                  <span>Explore Salon</span>
                  <span>{cat.productCount ? `${cat.productCount} Pieces` : "Bespoke Collection"}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
