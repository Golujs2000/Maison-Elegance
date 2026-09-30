import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  FolderTree,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useSettings } from "../../context/SettingsContext";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const { settings } = useSettings();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard, end: true },
    { name: "Manage Products", path: "/admin/products", icon: Package },
    { name: "Add Piece", path: "/admin/products/add", icon: PlusCircle },
    { name: "Salons & Categories", path: "/admin/categories", icon: FolderTree },
    { name: "WhatsApp & Settings", path: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-cream flex flex-col lg:flex-row">
      
      {/* Mobile Top Bar */}
      <div className="lg:hidden bg-white border-b border-sand px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <Link to="/admin" className="font-serif text-lg font-bold text-primary">
          Maison Admin
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 text-charcoal hover:text-gold-dark"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Admin Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-sand transform transition-transform duration-300 lg:translate-x-0 lg:static lg:h-screen lg:sticky lg:top-0 flex flex-col justify-between ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 space-y-8 overflow-y-auto">
          {/* Logo & Branding */}
          <div>
            <Link to="/admin" className="block">
              <span className="font-serif text-xl tracking-wider text-primary font-bold uppercase block">
                Maison Élégance
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-charcoal-muted">
                Atelier Curator Desk
              </span>
            </Link>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.end}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
                      isActive
                        ? "bg-primary text-cream-50 shadow-sm"
                        : "text-charcoal-muted hover:bg-cream-100 hover:text-primary"
                    }`
                  }
                >
                  <Icon size={16} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Quick WhatsApp indicator */}
          <div className="p-3.5 bg-cream-50 border border-sand rounded-xl space-y-1 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <MessageCircle size={14} />
              <span>WhatsApp Inquiries</span>
            </div>
            <p className="text-[11px] text-charcoal-muted font-mono truncate">
              {settings?.whatsappNumber || "Not configured"}
            </p>
          </div>
        </div>

        {/* Bottom User Area */}
        <div className="p-4 border-t border-sand bg-cream-50 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div className="truncate mr-2">
              <p className="font-semibold text-primary truncate">{user?.displayName || "Atelier Curator"}</p>
              <p className="text-[10px] text-charcoal-muted truncate">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-charcoal-muted hover:text-rose-700 transition-colors"
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>

          <Link
            to="/"
            target="_blank"
            className="w-full py-2 px-3 bg-white border border-sand hover:border-gold text-charcoal text-[11px] uppercase tracking-wider font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
          >
            <span>Live Showroom</span>
            <ExternalLink size={12} />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-8 lg:p-10 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
}
