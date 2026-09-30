import React, { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { useSettings } from "../../context/SettingsContext";
import { generateGeneralInquiryUrl } from "../../utils/whatsapp";

export default function FloatingWhatsApp() {
  const { settings } = useSettings();
  const [showTooltip, setShowTooltip] = useState(true);

  // Auto-hide the design advisory tooltip after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappUrl = generateGeneralInquiryUrl(
    settings?.whatsappNumber,
    "Hello Maison Élégance Team, I would like to inquire about your furniture collections and bespoke options."
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end flex-col">
      {/* Tooltip greeting bubble */}
      {showTooltip && (
        <div className="relative mb-3 bg-white border border-sand px-4 py-2.5 rounded-2xl shadow-luxury max-w-xs animate-fade-in text-xs text-charcoal">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-1.5 -left-1.5 bg-cream border border-sand text-charcoal-muted hover:text-charcoal rounded-full p-0.5"
            title="Dismiss"
          >
            <X size={12} />
          </button>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <p className="font-medium text-charcoal">Design Advisory Online</p>
          </div>
          <p className="text-charcoal-muted mt-1">
            Need custom dimensions or finish consultation? Chat directly on WhatsApp.
          </p>
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Maison Élégance"
        className="group relative flex items-center justify-center w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-luxury-hover hover:scale-105 transition-all duration-300"
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-pulse-subtle -z-10"></span>
        <MessageCircle size={28} className="fill-white/20" />
        
        {/* Hover label */}
        <span className="sr-only">WhatsApp Inquiry</span>
      </a>
    </div>
  );
}
