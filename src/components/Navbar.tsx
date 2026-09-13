import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  Menu, 
  X, 
  BookOpen, 
  Briefcase, 
  Award, 
  Calculator, 
  Mail,
  FileText,
  ChevronRight,
  MapPin
} from "lucide-react";
import { ARBAB_PROFILE } from "../data/profileData";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isLoggedIn?: boolean;
  onOpenPortal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Grouped Navigation Structure for Mobile Drawer
  const navCategories = [
    {
      title: "Portfolio & Industrial Role",
      items: [
        { 
          id: "home", 
          label: "Overview", 
          desc: "Professional bio & core competencies",
          icon: ShieldCheck 
        },
        { 
          id: "experience", 
          label: "Murree Brewery QA", 
          desc: "2.5+ years of in-line beverage QA & audits",
          icon: Briefcase,
          badge: "Active"
        },
        { 
          id: "certifications", 
          label: "Certifications", 
          desc: "BS Degree, HACCP & ISO 22000 accreditations",
          icon: Award 
        },
      ]
    },
    {
      title: "Technical Knowledge",
      items: [
        { 
          id: "guides", 
          label: "Safety Guides", 
          desc: "HACCP, CIP & beverage processing SOPs",
          icon: BookOpen 
        },
        { 
          id: "blog", 
          label: "Technical Blog", 
          desc: "Industry articles & food science perspectives",
          icon: FileText 
        },
      ]
    },
    {
      title: "Tools & Advisory",
      items: [
        { 
          id: "tools", 
          label: "QA Calculators & AI", 
          desc: "Pasteurization (PU), Brix & CIP dosing tools",
          icon: Calculator,
          badge: "Interactive"
        },
        { 
          id: "contact", 
          label: "Contact & Consultation", 
          desc: "Direct advisory & inquiries",
          icon: Mail 
        },
      ]
    }
  ];

  // Streamlined links for desktop navigation bar
  const flatNavLinks = [
    { id: "home", label: "Overview", icon: ShieldCheck },
    { id: "experience", label: "Brewery QA", icon: Briefcase },
    { id: "certifications", label: "Certifications", icon: Award },
    { id: "guides", label: "Safety Guides", icon: BookOpen },
    { id: "blog", label: "Blog", icon: FileText },
    { id: "tools", label: "Calculators", icon: Calculator },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.location.hash = id === "home" ? "" : id;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20 gap-3">
            
            {/* Brand & Identity */}
            <button 
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-2.5 sm:gap-3 text-left group focus:outline-hidden shrink-0"
              id="brand-logo-btn"
              aria-label="Arbab Mukhtiar - Home"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-base sm:text-lg shadow-sm group-hover:bg-emerald-800 transition-colors shrink-0">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-100" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors whitespace-nowrap">
                    Arbab Mukhtiar
                  </span>
                  <span className="hidden 2xl:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 whitespace-nowrap">
                    Murree Brewery QA
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-normal whitespace-nowrap">
                  BS Food Science & Tech • QA Specialist
                </p>
              </div>
            </button>

            {/* Desktop Navigation Links - Clean, evenly spaced, no wrapping */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 min-w-0" aria-label="Main Navigation">
              {flatNavLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    id={`nav-link-${link.id}`}
                    onClick={() => handleNavClick(link.id)}
                    className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-2 rounded-xl text-xs xl:text-sm font-medium transition-all whitespace-nowrap ${
                      isActive
                        ? "text-emerald-900 bg-emerald-50 font-semibold border border-emerald-200/80 shadow-2xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-emerald-700" : "text-slate-400"}`} />
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Desktop Right Action Bar: Direct Contact CTA */}
            <div className="hidden lg:flex items-center shrink-0">
              {/* Contact Button */}
              <button
                onClick={() => handleNavClick("contact")}
                id="nav-contact-btn"
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all shadow-xs whitespace-nowrap ${
                  activeTab === "contact"
                    ? "bg-emerald-800 text-white shadow-emerald-700/20"
                    : "bg-emerald-700 text-white hover:bg-emerald-800 active:scale-98"
                }`}
              >
                <Mail className="w-4 h-4 text-emerald-100 shrink-0" />
                <span>Contact</span>
              </button>
            </div>

            {/* Mobile / Tablet Right Controls */}
            <div className="flex items-center lg:hidden shrink-0">
              {/* Mobile Menu Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                id="mobile-menu-toggle-btn"
                className="w-10 h-10 flex items-center justify-center text-slate-800 hover:bg-slate-100 rounded-xl transition-colors focus:outline-hidden border border-slate-200/80 active:scale-95"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer & Backdrop */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end sm:justify-start">
          
          {/* Dark Backdrop Overlay */}
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Container */}
          <div 
            className="relative z-10 w-full bg-white shadow-2xl flex flex-col max-h-[90vh] sm:max-h-[85vh] rounded-t-3xl sm:rounded-b-2xl sm:rounded-t-none border-t sm:border-b border-slate-200 overflow-hidden animate-in slide-in-from-bottom-6 sm:slide-in-from-top-6 duration-200 text-left"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            
            {/* Top Bar inside Drawer */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Arbab Mukhtiar</h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Murree Brewery QA Officer</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Navigation Groups */}
            <div className="px-4 py-3 space-y-5 overflow-y-auto max-h-[calc(90vh-220px)] sm:max-h-[calc(85vh-220px)]">
              {navCategories.map((category, catIdx) => (
                <div key={catIdx} className="space-y-1">
                  <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {category.title}
                  </p>
                  <div className="space-y-1 pt-1">
                    {category.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          id={`mobile-nav-${item.id}`}
                          onClick={() => handleNavClick(item.id)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all min-h-[48px] ${
                            isActive
                              ? "bg-emerald-50 text-emerald-950 font-bold border border-emerald-200/80 shadow-2xs"
                              : "hover:bg-slate-50 text-slate-700 active:bg-slate-100"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                              isActive ? "bg-emerald-700 text-white" : "bg-slate-100 text-slate-600"
                            }`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <p className={`text-sm tracking-tight ${isActive ? "text-emerald-900 font-bold" : "text-slate-800 font-semibold"}`}>
                                {item.label}
                              </p>
                              <p className="text-[11px] text-slate-500 truncate">
                                {item.desc}
                              </p>
                            </div>
                          </div>

                          {item.badge ? (
                            <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0">
                              {item.badge}
                            </span>
                          ) : (
                            <ChevronRight className="w-4 h-4 text-slate-300 shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions inside Drawer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200/80 space-y-2.5 mt-auto">
              
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleNavClick("contact");
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-700 text-white font-semibold text-sm shadow-sm hover:bg-emerald-800 active:scale-98 transition-all"
              >
                <Mail className="w-4 h-4 text-emerald-200" />
                <span>Contact & Inquiries</span>
              </button>

              {/* Quick Direct Info Bar */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1 px-1">
                <span className="flex items-center gap-1 text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  Azad Kashmir & Rawalpindi
                </span>
                <a 
                  href={`mailto:${ARBAB_PROFILE.email}`}
                  className="font-medium text-emerald-700 hover:underline"
                >
                  {ARBAB_PROFILE.email}
                </a>
              </div>

            </div>

          </div>

        </div>
      )}
    </>
  );
};
