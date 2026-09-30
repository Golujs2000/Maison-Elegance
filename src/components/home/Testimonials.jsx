import React from "react";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      quote: "The Aurelia Sectional completed our South Mumbai penthouse living salon with breathtaking grace. The Italian bouclé is extraordinarily plush yet resilient to daily living.",
      author: "Radhika Kothari",
      role: "Principal Architect, Studio Kothari",
      project: "South Mumbai Residence",
      rating: 5,
    },
    {
      quote: "The Carrara slab on the Solano dining table is flawless. Their white-glove delivery team assembled the 140kg piece with absolute precision and care.",
      author: "Vikramaditya Singhania",
      role: "Private Collector & Patron",
      project: "Alibaug Villa",
      rating: 5,
    },
    {
      quote: "Working with the Maison WhatsApp advisory team made specifying custom dimensions for our boardroom executive table seamless. Exceptional attention to joinery details.",
      author: "Ananya Desai",
      role: "Interior Director, Atelier Design Co.",
      project: "Bespoke Commercial Atelier",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-cream border-b border-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-gold-dark font-semibold block mb-2">
            Patron Voices
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-primary font-normal">
            Appreciated by Discerning Curators & Architects
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, index) => (
            <div
              key={index}
              className="bg-white border border-sand/80 p-8 rounded-2xl shadow-soft hover:shadow-luxury transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-gold-dark mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>
                <Quote size={28} className="text-sand-dark mb-2" />
                <p className="text-sm text-charcoal-muted leading-relaxed italic mb-6">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-sand/60">
                <p className="font-serif text-base font-semibold text-primary">{rev.author}</p>
                <p className="text-xs text-charcoal-muted">{rev.role}</p>
                <p className="text-[11px] text-gold-dark font-medium mt-0.5">{rev.project}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
