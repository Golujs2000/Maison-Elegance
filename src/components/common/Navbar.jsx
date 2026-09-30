import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, Menu, X, ShieldCheck, Phone, Heart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useSettings } from "../../context/SettingsContext";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { cartCount } = useCart();
  const { settings } = useSettings();
  const { isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Collection", path: "/shop" },
    { name: "Living", path: "/shop?category=living-room" },
    { name: "Dining", path: "/shop?category=dining" },
    { name: "Bedroom", path: "/shop?category=bedroom" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Top Luxury Announcement Bar */}
      <div className="bg-primary text-cream-100 text-xs py-2 px-4 border-b border-charcoal-light/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="tracking-widest uppercase font-sans text-[11px] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
            Complimentary White Glove Delivery on all curated suites across India
          </p>
          <div className="hidden md:flex items-center gap-6 text-[11px] text-cream-300">
            <a
              href={`tel:${settings?.storePhone || "+919876543210"}`}
              className="hover:text-gold flex items-center gap-1.5 transition-colors"
            >
              <Phone size={12} className="text-gold" />
              <span>Direct: {settings?.storePhone || "+91 (0612) 268 4500"}</span>
            </a>
            <Link
              to="/admin"
              className="hover:text-gold flex items-center gap-1 transition-colors text-gold-300"
            >
              <ShieldCheck size={13} />
              <span>{isAdmin ? "Admin Dashboard" : "Admin Portal"}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "glass-panel shadow-soft border-b border-sand py-3"
            : "bg-cream-50/95 border-b border-sand/60 py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-charcoal hover:text-gold transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Left: Desktop Nav Links */}
            <nav className="hidden lg:flex items-center space-x-7">
              {navLinks.slice(0, 5).map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-xs uppercase tracking-widest transition-colors font-medium ${
                      isActive
                        ? "text-gold-dark border-b border-gold-dark pb-0.5"
                        : "text-charcoal hover:text-gold-dark"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Center: Brand Logo */}
            <div className="text-center">
              <Link to="/" className="inline-block group">
                <span className="block font-serif text-2xl sm:text-3xl tracking-widest text-primary font-semibold uppercase group-hover:text-gold-dark transition-colors">
                  Maison Élégance
                </span>
                <span className="block text-[9px] tracking-[0.3em] uppercase text-charcoal-muted font-sans font-light">
                  Haute Mobilier · Atelier
                </span>
              </Link>
            </div>

            {/* Right: Actions (Search, Nav, Cart) */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              <nav className="hidden lg:flex items-center space-x-6">
                {navLinks.slice(5).map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                      `text-xs uppercase tracking-widest transition-colors font-medium ${
                        isActive
                          ? "text-gold-dark border-b border-gold-dark pb-0.5"
                          : "text-charcoal hover:text-gold-dark"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </nav>

              {/* Search Toggle */}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-charcoal hover:text-gold-dark transition-colors"
                aria-label="Search Collection"
              >
                <Search size={20} />
              </button>

              {/* Cart Button */}
              <Link
                to="/cart"
                className="relative p-2 text-charcoal hover:text-gold-dark transition-colors flex items-center"
                aria-label="View Shopping Cart"
              >
                <ShoppingBag size={21} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-primary font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-pulse-subtle">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Quick Search Bar Drawer */}
          {searchOpen && (
            <div className="pt-4 pb-2 animate-fade-in border-t border-sand mt-4">
              <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Search dining tables, bouclé sectionals, walnut desks, travertine..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-white border border-sand rounded-full py-2.5 pl-11 pr-24 text-sm text-charcoal placeholder-charcoal-muted focus:outline-none focus:border-gold shadow-sm"
                />
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-muted"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-primary text-cream-50 text-xs font-medium rounded-full hover:bg-gold-dark transition-colors"
                >
                  Search
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-sand bg-cream-50 px-6 py-6 space-y-4 animate-fade-in">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-sm uppercase tracking-widest py-2 border-b border-sand/40 ${
                      isActive ? "text-gold-dark font-semibold" : "text-charcoal"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs uppercase tracking-widest py-2 text-gold-dark flex items-center gap-2 pt-2"
              >
                <ShieldCheck size={16} />
                <span>Admin Management Panel</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
