import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle, ArrowRight, Check } from "lucide-react";
import { useSettings } from "../../context/SettingsContext";
import { generateGeneralInquiryUrl } from "../../utils/whatsapp";
import toast from "react-hot-toast";

export default function Footer() {
  const { settings } = useSettings();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes("@")) {
      setSubscribed(true);
      toast.success("Thank you for subscribing to our Gazette.");
      setNewsletterEmail("");
    }
  };

  const whatsappUrl = generateGeneralInquiryUrl(
    settings?.whatsappNumber,
    "Hello Maison Élégance Team, I would like to consult with an interior stylist."
  );

  return (
    <footer className="bg-cream-100 text-charcoal border-t border-sand pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-2xl tracking-widest text-primary font-bold uppercase block">
              Maison Élégance
            </span>
            <p className="text-sm text-charcoal-muted leading-relaxed max-w-sm">
              Conceived for those who revere spatial serenity and enduring craftsmanship.
              Each artifact balances sculptural form with the tactile warmth of Italian bouclé,
              Roman travertine, and quarter-sawn European woods.
            </p>
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full text-xs uppercase tracking-wider font-medium transition-all shadow-sm"
              >
                <MessageCircle size={16} />
                <span>WhatsApp Consultation</span>
              </a>
            </div>
          </div>

          {/* Collections Column */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-primary font-sans">
              Curated Salons
            </h4>
            <ul className="space-y-2 text-sm text-charcoal-muted">
              <li>
                <Link to="/shop?category=living-room" className="hover:text-gold-dark transition-colors">
                  Living Room Suites
                </Link>
              </li>
              <li>
                <Link to="/shop?category=dining" className="hover:text-gold-dark transition-colors">
                  Dining & Entertaining
                </Link>
              </li>
              <li>
                <Link to="/shop?category=bedroom" className="hover:text-gold-dark transition-colors">
                  Bedroom Sanctuaries
                </Link>
              </li>
              <li>
                <Link to="/shop?category=office" className="hover:text-gold-dark transition-colors">
                  Executive Atelier
                </Link>
              </li>
              <li>
                <Link to="/shop?category=lighting-decor" className="hover:text-gold-dark transition-colors">
                  Lighting & Sculptural Decor
                </Link>
              </li>
            </ul>
          </div>

          {/* Boutique Atelier Info */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-primary font-sans">
              Flagship Atelier
            </h4>
            <ul className="space-y-2.5 text-xs text-charcoal-muted">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-gold-dark shrink-0 mt-0.5" />
                <span>{settings?.storeAddress || "Nala Road, Patna, Bihar 800003, India"}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-gold-dark shrink-0" />
                <span>{settings?.storePhone || "+91 (0612) 268 4500"}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-gold-dark shrink-0" />
                <span>{settings?.storeEmail || "contact@maisonelegance.com"}</span>
              </li>
            </ul>
          </div>

          {/* Gazette Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-primary font-sans">
              The Maison Gazette
            </h4>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Receive private previews of limited edition furniture releases and architectural journal articles.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200">
                <Check size={14} />
                <span>You are registered for our private previews.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full bg-white border border-sand rounded-lg px-3 py-2 text-xs text-charcoal placeholder-charcoal-muted focus:outline-none focus:border-gold"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-primary text-cream-50 rounded-md hover:bg-gold-dark transition-colors flex items-center justify-center"
                    aria-label="Subscribe to Gazette"
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-sand/70 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal-muted gap-4">
          <p>© {new Date().getFullYear()} Maison Élégance Inc. All rights reserved.</p>
          <div className="flex items-center space-x-6 text-xs">
            <Link to="/about" className="hover:text-gold-dark transition-colors">Our Philosophy</Link>
            <Link to="/contact" className="hover:text-gold-dark transition-colors">Client Services</Link>
            <Link to="/admin" className="text-gold-dark font-medium hover:underline">Atelier Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
