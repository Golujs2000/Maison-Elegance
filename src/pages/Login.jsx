import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck, Lock, Mail, ArrowRight, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      navigate("/admin");
    }
  };

  const handleFillDemo = () => {
    setEmail("admin@maisonelegance.com");
    setPassword("admin123");
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-block mb-3">
          <span className="font-serif text-3xl tracking-widest text-primary font-bold uppercase block">
            Maison Élégance
          </span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-charcoal-muted">
            Atelier Management Portal
          </span>
        </Link>
        <h2 className="mt-4 font-serif text-xl font-normal text-primary">
          Sign In to Access Atelier Admin
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white border border-sand py-8 px-6 shadow-luxury rounded-2xl sm:px-10 space-y-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-1.5">
                Curator Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@maisonelegance.com"
                  className="w-full bg-cream-50 border border-sand rounded-lg pl-10 pr-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                />
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-muted" />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-1.5">
                Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-cream-50 border border-sand rounded-lg pl-10 pr-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                />
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-muted" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-primary hover:bg-gold-dark text-cream-50 text-xs uppercase tracking-widest font-semibold rounded-lg shadow-luxury transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>{loading ? "Authenticating..." : "Enter Atelier Portal"}</span>
              <ArrowRight size={14} />
            </button>
          </form>

          {/* Quick Demo Credentials Autofill Helper */}
          <div className="pt-4 border-t border-sand text-center space-y-2">
            <button
              type="button"
              onClick={handleFillDemo}
              className="w-full py-2 px-3 bg-cream-50 border border-sand hover:border-gold text-charcoal text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 font-medium"
            >
              <Sparkles size={13} className="text-gold-dark" />
              <span>Use Quick Demo Credentials</span>
            </button>
            <p className="text-[11px] text-charcoal-muted">
              Demo: <code className="bg-cream-100 px-1 py-0.5 rounded">admin@maisonelegance.com</code> / <code className="bg-cream-100 px-1 py-0.5 rounded">admin123</code>
            </p>
          </div>

          <div className="text-center pt-2">
            <Link to="/" className="text-xs text-charcoal-muted hover:text-primary transition-colors">
              ← Return to Public Showroom
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
