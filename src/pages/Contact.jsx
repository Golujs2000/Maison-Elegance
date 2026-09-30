import React, { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send, Clock, Check } from "lucide-react";
import { useSettings } from "../context/SettingsContext";
import { generateGeneralInquiryUrl } from "../utils/whatsapp";
import LocationMap from "../components/common/LocationMap";
import toast from "react-hot-toast";

export default function Contact() {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    salon: "Living Room",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Thank you. An atelier specialist will contact you within 24 hours.");
  };

  const whatsappUrl = generateGeneralInquiryUrl(
    settings?.whatsappNumber,
    "Hello Maison Élégance Team, I would like to schedule an interior design consultation."
  );

  return (
    <div className="bg-cream min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-gold-dark font-semibold block mb-2">
            Client Services & Atelier
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-primary font-normal mb-4">
            Connect with Our Curators
          </h1>
          <p className="text-sm text-charcoal-muted leading-relaxed">
            Whether inquiring about bespoke custom dimensions, fabric swatches, or visiting our Patna showroom, our advisory team is at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Details & WhatsApp Card */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct WhatsApp Callout */}
            <div className="bg-emerald-800 text-white p-6 sm:p-8 rounded-2xl shadow-luxury space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle size={22} className="fill-white" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold">Direct WhatsApp Chat</h3>
                  <p className="text-emerald-100 text-xs">Immediate Atelier Assistance</p>
                </div>
              </div>

              <p className="text-xs text-emerald-100 leading-relaxed">
                Connect directly with our furniture designers on WhatsApp for instant fabric finish photos, video walk-throughs, and trade discount inquiries.
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-white text-emerald-900 hover:bg-emerald-50 rounded-xl text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span>Launch WhatsApp Consultation</span>
              </a>
            </div>

            {/* Atelier Info Cards */}
            <div className="bg-white border border-sand p-6 rounded-2xl shadow-soft space-y-5 text-xs text-charcoal">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-gold-dark shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-primary">Patna Atelier Showroom</h4>
                  <p className="text-charcoal-muted mt-0.5">{settings?.storeAddress || "Nala Road, Patna, Bihar 800003, India"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock size={18} className="text-gold-dark shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-primary">Salon Viewing Hours</h4>
                  <p className="text-charcoal-muted mt-0.5">Monday – Sunday: 10:30 AM – 8:30 PM</p>
                  <p className="text-charcoal-muted">Private design consultations available on appointment</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={18} className="text-gold-dark shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-primary">Direct Telephone</h4>
                  <p className="text-charcoal-muted mt-0.5">{settings?.storePhone || "+91 (0612) 268 4500"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={18} className="text-gold-dark shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-primary">Atelier Correspondence</h4>
                  <p className="text-charcoal-muted mt-0.5">{settings?.storeEmail || "contact@maisonelegance.com"}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Consultation Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-sand p-8 rounded-2xl shadow-luxury space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-normal text-primary">
                  Inquiry & Commission Form
                </h3>
                <p className="text-xs text-charcoal-muted mt-1">
                  Fill in your details and piece requirements; an architectural specialist will respond promptly.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 text-center bg-cream-50 rounded-xl border border-sand space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                    <Check size={24} />
                  </div>
                  <h4 className="font-serif text-xl font-medium text-primary">Inquiry Received</h4>
                  <p className="text-xs text-charcoal-muted max-w-sm mx-auto">
                    Thank you, {formData.name}. Our curator will review your notes and reach out shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", phone: "", salon: "Living Room", message: "" });
                    }}
                    className="text-xs uppercase tracking-widest text-gold-dark font-semibold hover:underline pt-2 inline-block"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rahul Singhal"
                        className="w-full bg-cream-50 border border-sand rounded-lg px-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="w-full bg-cream-50 border border-sand rounded-lg px-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-1.5">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-cream-50 border border-sand rounded-lg px-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-1.5">
                        Salon Interest
                      </label>
                      <select
                        value={formData.salon}
                        onChange={(e) => setFormData({ ...formData, salon: e.target.value })}
                        className="w-full bg-cream-50 border border-sand rounded-lg px-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                      >
                        <option value="Living Room">Living Room Suites</option>
                        <option value="Dining">Dining & Entertaining</option>
                        <option value="Bedroom">Bedroom Sanctuaries</option>
                        <option value="Office">Executive Office</option>
                        <option value="Complete Home">Complete Residence Project</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-1.5">
                      Piece Requirements or Custom Dimensions
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please mention specific pieces, dimensions, or fabric finishes you wish to discuss..."
                      className="w-full bg-cream-50 border border-sand rounded-lg px-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-primary hover:bg-gold-dark text-cream-50 text-xs uppercase tracking-widest font-semibold rounded-lg shadow-luxury transition-all flex items-center justify-center gap-2"
                  >
                    <Send size={14} />
                    <span>Transmit Commission Request</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Patna Showroom Interactive Map Section */}
        <div className="pt-8 space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-[0.25em] text-gold-dark font-semibold block mb-1">
              Atelier Location & Map
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-primary font-normal">
              Visit Our Patna Showroom
            </h2>
            <p className="text-xs text-charcoal-muted mt-1.5">
              Experience the tactility of our fabrics and natural marbles in person on Nala Road, Patna.
            </p>
          </div>
          <LocationMap />
        </div>

      </div>
    </div>
  );
}
