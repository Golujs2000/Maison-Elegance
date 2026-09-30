import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Compass, Shield, Award, Sparkles } from "lucide-react";
import { useSettings } from "../context/SettingsContext";
import { generateGeneralInquiryUrl } from "../utils/whatsapp";

export default function About() {
  const { settings } = useSettings();

  const appointmentUrl = generateGeneralInquiryUrl(
    settings?.whatsappNumber,
    "Hello Maison Élégance Team, I would like to reserve a private viewing at your Patna showroom."
  );

  return (
    <div className="bg-cream min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Hero Section */}
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.25em] text-gold-dark font-semibold block mb-3">
            Atelier Heritage
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-primary font-normal leading-[1.15] mb-6">
            Where Architecture Meets Master Cabinetry.
          </h1>
          <p className="text-base sm:text-lg text-charcoal-muted leading-relaxed">
            Founded with an unyielding reverence for spatial serenity, Maison Élégance creates
            monumental furniture silhouettes that balance tactile richness with timeless structural permanence.
          </p>
        </div>

        {/* Big Editorial Imagery Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 rounded-2xl overflow-hidden shadow-luxury border-4 border-white aspect-[16/10] bg-sand">
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
              alt="Maison Elegance Living Salon interior design"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:col-span-5 space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl text-primary font-normal">
              An Architectural Approach to Living.
            </h2>
            <p className="text-sm text-charcoal-muted leading-relaxed">
              We collaborate exclusively with multi-generational sawmills, stone quarries in Tivoli and Carrara,
              and Belgian textile weavers. We reject synthetic fast furniture in pursuit of heirloom pieces
              that accrue dignity and patina with time.
            </p>
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary hover:text-gold-dark font-semibold transition-colors"
              >
                <span>Explore Salon Pieces</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-sand">
          <div className="bg-white border border-sand p-8 rounded-2xl shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center text-gold-dark">
              <Compass size={24} />
            </div>
            <h3 className="font-serif text-xl font-medium text-primary">Sculptural Rigor</h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Every curve, chamfered edge, and joinery reveal is calculated to engage with changing natural sunlight throughout the day.
            </p>
          </div>

          <div className="bg-white border border-sand p-8 rounded-2xl shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center text-gold-dark">
              <Shield size={24} />
            </div>
            <h3 className="font-serif text-xl font-medium text-primary">Heirloom Integrity</h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Mortise-and-tenon construction, kiln-dried hardwoods, and certified natural stones guaranteed for a decade of living.
            </p>
          </div>

          <div className="bg-white border border-sand p-8 rounded-2xl shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center text-gold-dark">
              <Sparkles size={24} />
            </div>
            <h3 className="font-serif text-xl font-medium text-primary">Bespoke Atelier</h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Tailored dimensioning, custom upholstery selections, and direct private advisory support via WhatsApp.
            </p>
          </div>
        </div>

        {/* Flagship Showroom Invitation */}
        <div className="bg-cream-100 border border-sand rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="text-xs uppercase tracking-widest text-gold-dark font-semibold">Flagship Gallery</span>
            <h3 className="font-serif text-2xl sm:text-3xl text-primary font-normal">
              Experience the Collections in Person
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-muted">
              Visit our Patna Showroom on Nala Road to inspect Carrara marble slabs, touch Italian bouclé samples, and speak with our spatial curators.
            </p>
          </div>
          <a
            href={appointmentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 bg-primary hover:bg-gold-dark text-cream-50 text-xs uppercase tracking-widest font-semibold rounded-xl shadow-luxury transition-all whitespace-nowrap"
          >
            Reserve Private Viewing
          </a>
        </div>

      </div>
    </div>
  );
}
