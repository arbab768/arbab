import React from "react";
import { ShieldCheck, Mail, MapPin, Award, ArrowUp } from "lucide-react";
import { ARBAB_PROFILE } from "../data/profileData";

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs sm:text-sm border-t border-slate-800 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Identity & Credentials */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-bold text-base tracking-tight">Arbab Mukhtiar</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              BS Food Science & Technology graduate and Quality Assurance Officer at Murree Brewery Co. Ltd. Advancing food safety, beverage microbiology, and industrial hygiene excellence.
            </p>
            <p className="text-[11px] text-slate-500 font-medium">
              From Azad Kashmir, Pakistan
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2.5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-200">Site Directory</p>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onNavigate("experience")} className="hover:text-emerald-400 transition-colors">
                  Murree Brewery QA Experience
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("certifications")} className="hover:text-emerald-400 transition-colors">
                  Certifications & Education
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("guides")} className="hover:text-emerald-400 transition-colors">
                  Food Safety & Nutrition Guides
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("resources")} className="hover:text-emerald-400 transition-colors">
                  Downloadable Resource Library
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("blog")} className="hover:text-emerald-400 transition-colors">
                  Technical Food Science Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Industry Tooling */}
          <div className="space-y-2.5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-200">QA Utilities</p>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onNavigate("tools")} className="hover:text-emerald-400 transition-colors">
                  Pasteurization Units (PU) Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("tools")} className="hover:text-emerald-400 transition-colors">
                  Brix & Specific Gravity Converter
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("tools")} className="hover:text-emerald-400 transition-colors">
                  CIP Chemical Dosing Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("tools")} className="hover:text-emerald-400 transition-colors">
                  AI Food Safety Guidance
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("portal")} className="hover:text-emerald-400 transition-colors text-emerald-400 font-semibold">
                  Secure Client Portal Access
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Verification */}
          <div className="space-y-2.5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-200">Direct Inquiries</p>
            <p className="text-xs text-slate-400">
              For audits, technical consultations, or academic collaboration:
            </p>
            <a 
              href={`mailto:${ARBAB_PROFILE.email}`} 
              className="text-xs font-semibold text-emerald-400 hover:underline block break-all"
            >
              {ARBAB_PROFILE.email}
            </a>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-800 text-emerald-400 border border-slate-700">
                <Award className="w-3 h-3 text-emerald-400" />
                HACCP Level 3 & ISO 22000
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Arbab Mukhtiar. All rights reserved. Food Science & Technology Professional Portal.</p>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-500">WCAG AA Compliant • Mobile Responsive</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Scroll to Top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
