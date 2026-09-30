import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Sparkles, Shield, Compass, Truck } from "lucide-react";
import { useSettings } from "../../context/SettingsContext";
import { generateGeneralInquiryUrl } from "../../utils/whatsapp";

export default function HeroSection() {
  const { settings } = useSettings();

  const advisoryUrl = generateGeneralInquiryUrl(
    settings?.whatsappNumber,
    "Hello Maison Élégance Team, I would like to consult with a curator for custom furniture curation."
  );

  return (
    <section className="relative overflow-hidden min-h-[580px] lg:min-h-[720px] flex items-center border-b border-sand">
      {/* Full-bleed Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero background pic.png"
          alt="Maison Élégance Luxury Atelier Showroom"
          className="w-full h-full object-cover object-center lg:object-right"
        />
        {/* Soft, warm luxury gradient overlay to ensure crystal clear typography on the left while keeping the light theme */}
        <div className="absolute inset-0 bg-gradient-to-r from-cream-50/95 via-cream-50/80 to-cream-50/30 lg:from-cream-50/95 lg:via-cream-50/70 lg:to-transparent"></div>
        {/* Subtle bottom vignette to blend seamlessly into next section */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cream via-cream/40 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text & CTA Content */}
          <div className="lg:col-span-7 space-y-6 text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-sand text-xs tracking-widest uppercase font-medium text-charcoal shadow-sm">
              <Sparkles size={13} className="text-gold-dark" />
              <span>The 2026 Architectural Living Collection</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-primary font-normal leading-[1.15] tracking-tight">
              Sculptural Forms. <br />
              <span className="italic font-normal font-serif text-gold-dark">
                Tactile Luxury
              </span>{" "}
              for Refined Living.
            </h1>

            <p className="text-base sm:text-lg text-charcoal-muted max-w-xl leading-relaxed">
              Curated architectural furniture handcrafted from Italian bouclé, Roman travertine slabs,
              and quarter-sawn hardwoods. Tailored bespoke for timeless contemporary residences.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/shop"
                className="px-8 py-3.5 bg-primary hover:bg-gold-dark text-cream-50 font-medium text-xs uppercase tracking-widest rounded-lg shadow-luxury transition-all duration-300 flex items-center gap-2 group"
              >
                <span>Explore Salon Pieces</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href={advisoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs uppercase tracking-widest rounded-lg shadow-sm transition-all duration-300 flex items-center gap-2"
              >
                <MessageCircle size={16} />
                <span>WhatsApp Advisory</span>
              </a>
            </div>

            {/* Trust Pillars */}
            <div className="pt-8 border-t border-sand/80 grid grid-cols-3 gap-4 text-xs text-charcoal-muted">
              <div className="flex items-center gap-2">
                <Shield size={18} className="text-gold-dark shrink-0" />
                <span className="font-medium">10-Yr Craft Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-gold-dark shrink-0" />
                <span className="font-medium">White-Glove Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Compass size={18} className="text-gold-dark shrink-0" />
                <span className="font-medium">Bespoke Dimensions</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
