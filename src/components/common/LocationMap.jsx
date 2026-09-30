import React from "react";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { useSettings } from "../../context/SettingsContext";

export default function LocationMap({ className = "", showInfoCard = true }) {
  const { settings } = useSettings();
  const address = settings?.storeAddress || "Nala Road, Patna, Bihar 800003, India";
  const phone = settings?.storePhone || "+91 (0612) 268 4500";

  const mapQueryUrl = encodeURIComponent("Nala Road, Patna, Bihar, India");
  const googleMapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQueryUrl}`;

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-sand bg-white shadow-soft ${className}`}>
      {/* Interactive Google Map embed */}
      <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[460px] bg-sand/30">
        <iframe
          title="Maison Élégance Atelier Location - Nala Road, Patna"
          src={`https://maps.google.com/maps?q=${mapQueryUrl}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full grayscale-[25%] contrast-[1.05]"
        ></iframe>

        {/* Floating Atelier Location Card */}
        {showInfoCard && (
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 max-w-sm bg-white/95 backdrop-blur-md border border-sand p-5 rounded-2xl shadow-luxury z-10 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold-dark"></span>
              <span className="text-[10px] uppercase tracking-widest text-gold-dark font-semibold">
                Patna Atelier Showroom
              </span>
            </div>

            <div>
              <h4 className="font-serif text-base font-semibold text-primary">
                Maison Élégance
              </h4>
              <p className="text-xs text-charcoal-muted mt-1 flex items-start gap-1.5 leading-relaxed">
                <MapPin size={14} className="text-gold-dark shrink-0 mt-0.5" />
                <span>{address}</span>
              </p>
            </div>

            <div className="pt-2 border-t border-sand/60 space-y-1.5 text-xs text-charcoal">
              <p className="flex items-center gap-1.5 text-charcoal-muted">
                <Clock size={13} className="text-gold-dark shrink-0" />
                <span>Monday – Sunday: 10:30 AM – 8:30 PM</span>
              </p>
              <p className="flex items-center gap-1.5 text-charcoal-muted">
                <Phone size={13} className="text-gold-dark shrink-0" />
                <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="hover:text-primary transition-colors">
                  {phone}
                </a>
              </p>
            </div>

            <a
              href={googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 bg-primary hover:bg-gold-dark text-cream-50 text-[11px] uppercase tracking-widest font-semibold rounded-lg shadow-sm transition-colors mt-1"
            >
              <Navigation size={13} />
              <span>Get Directions</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
