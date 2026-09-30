import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { useSettings } from "../../context/SettingsContext";
import { generateGeneralInquiryUrl } from "../../utils/whatsapp";

export default function CraftsmanshipStory() {
  const { settings } = useSettings();

  const consultationUrl = generateGeneralInquiryUrl(
    settings?.whatsappNumber,
    "Hello Maison Élégance Team, I would like to schedule a bespoke materials and finish consultation."
  );

  const pillars = [
    {
      title: "Sustainably Sourced European Hardwoods",
      description: "FSC-certified American white oak, walnut, and ash dried to ideal moisture levels for structural permanence.",
    },
    {
      title: "Hand-Turned Roman Travertine & Carrara",
      description: "Individual monolithic stone blocks inspected for natural veining and hand-honed to a smooth matte luster.",
    },
    {
      title: "Bespoke Custom Fabrications",
      description: "Any salon piece can be tailored in custom lengths, depths, and over 60 commercial-grade Italian upholstery fabrics.",
    },
  ];

  return (
    <section className="py-20 bg-cream-100 border-b border-sand overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Collage */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-luxury border-2 border-white aspect-[3/4] bg-sand">
                  <img
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80"
                    alt="Artisanal upholstery detail"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 bg-white rounded-xl border border-sand shadow-sm text-center">
                  <span className="font-serif text-3xl font-bold text-primary block">100%</span>
                  <span className="text-[11px] uppercase tracking-wider text-charcoal-muted">Solid Timber & Stone</span>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="p-4 bg-primary text-cream-50 rounded-xl shadow-luxury text-center">
                  <span className="font-serif text-3xl font-bold text-gold block">10 Yr</span>
                  <span className="text-[11px] uppercase tracking-wider text-cream-200">Structural Warranty</span>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-luxury border-2 border-white aspect-[3/4] bg-sand">
                  <img
                    src="https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=600&q=80"
                    alt="Marble craftsmanship joinery"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Editorial Story */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-gold-dark font-semibold block">
              Atelier Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary font-normal leading-tight">
              Furniture Crafted as Quiet Architectural Statements.
            </h2>
            <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
              We reject transient disposable trends in favor of quiet monumental forms.
              Every seam, radius, and joinery joint is executed by master cabinetmakers and
              upholstery artisans who have practiced the trade for decades.
            </p>

            <div className="space-y-4 pt-2">
              {pillars.map((p, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <CheckCircle2 size={18} className="text-gold-dark shrink-0 mt-1" />
                  <div>
                    <h3 className="text-sm font-semibold text-primary">{p.title}</h3>
                    <p className="text-xs text-charcoal-muted leading-relaxed mt-0.5">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/about"
                className="px-6 py-3 bg-primary text-cream-50 text-xs uppercase tracking-widest font-medium rounded-lg hover:bg-gold-dark transition-colors"
              >
                Read Atelier Journal
              </Link>
              <a
                href={consultationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-emerald-700 text-emerald-800 hover:bg-emerald-50 text-xs uppercase tracking-widest font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                <MessageCircle size={15} />
                <span>Custom Size Consultation</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
