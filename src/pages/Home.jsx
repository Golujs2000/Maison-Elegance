import React from "react";
import HeroSection from "../components/home/HeroSection";
import CategoriesShowcase from "../components/home/CategoriesShowcase";
import FeaturedProducts from "../components/home/FeaturedProducts";
import CraftsmanshipStory from "../components/home/CraftsmanshipStory";
import Testimonials from "../components/home/Testimonials";
import LocationMap from "../components/common/LocationMap";

export default function Home() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <CategoriesShowcase />
      <FeaturedProducts />
      <CraftsmanshipStory />
      <Testimonials />

      {/* Showroom Location Map Section */}
      <section className="py-20 bg-cream-50 border-t border-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.25em] text-gold-dark font-semibold block mb-2">
              Patna Atelier & Showroom
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary font-normal">
              Experience the Craft in Person
            </h2>
            <p className="text-sm text-charcoal-muted mt-2 leading-relaxed">
              Step into our Patna gallery on Nala Road to inspect custom marble slabs, feel Italian bouclé textures, and discuss bespoke architectural commissions.
            </p>
          </div>

          <LocationMap />
        </div>
      </section>
    </div>
  );
}
