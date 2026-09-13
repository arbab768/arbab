import React from "react";
import { 
  ShieldCheck, 
  MapPin, 
  Award, 
  Download, 
  CheckCircle2, 
  Calendar,
  Microscope,
  Sparkles,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { ARBAB_PROFILE } from "../data/profileData";

interface HeroProps {
  onNavigate: (tab: string) => void;
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenConsultation }) => {
  return (
    <section className="relative overflow-hidden bg-radial from-emerald-50/70 via-slate-50 to-white py-12 lg:py-20 border-b border-slate-200/80">
      
      {/* Decorative Grid / Accent lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Bio, Credentials & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Badges / Pill Tags */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100/80 text-emerald-900 border border-emerald-300/60 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                Active QA Officer @ Murree Brewery
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                Azad Kashmir, Pakistan
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200/70">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                2.5+ Years QA Experience
              </span>
            </div>

            {/* Main Name & Title */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                Arbab Mukhtiar
              </h1>
              <p className="text-lg sm:text-xl font-medium text-emerald-800">
                BS Food Science & Technology • Quality Assurance Specialist
              </p>
            </div>

            {/* Subtitle / Bio Paragraph */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              Dedicated Food Technologist safeguarding quality, food safety, and microbiological integrity in high-speed beverage manufacturing at <strong className="text-slate-800 font-semibold">Murree Brewery Co. Ltd.</strong> Specialized in HACCP implementation, in-line Brix/CO2 standardization, CIP validation, and ISO 22000 technical compliance.
            </p>

            {/* Core Verification Pill Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>HACCP Level 3 & ISO 22000 Auditor</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Beverage In-Line Testing & Sensory Analysis</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>CIP Sanitization & Biofilm Prevention</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Microbial Swabbing & Water Treatment QA</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-3.5">
              <button
                onClick={onOpenConsultation}
                id="hero-book-consult-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-700 text-white font-semibold text-sm hover:bg-emerald-800 transition-all shadow-md hover:shadow-lg focus:ring-4 focus:ring-emerald-700/20 active:scale-98"
              >
                <Calendar className="w-4 h-4" />
                <span>Book QA Consultation</span>
              </button>

              <button
                onClick={() => onNavigate("guides")}
                id="hero-explore-guides-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white text-slate-800 font-semibold text-sm hover:bg-slate-50 border border-slate-200 transition-all shadow-2xs hover:border-slate-300"
              >
                <span>Food Safety Guides</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </button>

              <button
                onClick={() => onNavigate("resources")}
                id="hero-download-res-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-slate-600 hover:text-emerald-800 font-medium text-sm transition-colors border border-transparent hover:border-slate-200"
              >
                <Download className="w-4 h-4 text-emerald-600" />
                <span>Download SOP Library</span>
              </button>
            </div>

          </div>

          {/* Right Column: Hero Portrait & Live Lab QA Verification Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            <div className="relative w-full max-w-md">
              
              {/* Glow Accent behind Photo */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-emerald-500/20 to-teal-400/20 rounded-3xl blur-xl" />

              {/* Photo Frame */}
              <div className="relative rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-xl">
                
                {/* Photo of Arbab Mukhtiar */}
                <div className="relative aspect-4/5 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={ARBAB_PROFILE.heroImage}
                    alt="Arbab Mukhtiar, Quality Assurance Officer at Murree Brewery Co. and Food Technologist"
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                    loading="eager"
                  />
                  
                  {/* Subtle Gradient overlay at bottom of image */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent flex items-end p-4">
                    <div className="text-white">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300 tracking-wide uppercase">
                        <Microscope className="w-3.5 h-3.5" />
                        Murree Brewery QA Laboratory
                      </div>
                      <p className="text-sm font-medium text-slate-100">
                        In-line verification & microbiological surveillance
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sub-Card: Live Professional Status Badge */}
                <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Current Industry Post</p>
                      <p className="text-xs text-slate-500">Murree Brewery Co. Ltd. (Rawalpindi)</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate("experience")}
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                  >
                    <span>View Projects</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

              </div>

              {/* Floating Stat Badge */}
              <div className="absolute -bottom-4 left-2 sm:-left-6 bg-white/95 backdrop-blur-md px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200/80 shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg">
                  2.5+
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Years Field Experience</p>
                  <p className="text-[11px] text-slate-500">Quality Assurance & Audits</p>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Bottom Metrics Bar */}
        <div className="mt-14 pt-8 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">BS Degree</p>
            <p className="text-xs sm:text-sm font-medium text-slate-500">Food Science & Technology</p>
            <p className="text-[11px] text-emerald-700 font-semibold">Distinction in Food Microbiology</p>
          </div>

          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">2.5+ Years</p>
            <p className="text-xs sm:text-sm font-medium text-slate-500">Murree Brewery Experience</p>
            <p className="text-[11px] text-emerald-700 font-semibold">In-Line Beverage QA & Testing</p>
          </div>

          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">6+ Accreditations</p>
            <p className="text-xs sm:text-sm font-medium text-slate-500">HACCP, ISO 22000 & GMP</p>
            <p className="text-[11px] text-emerald-700 font-semibold">Verified Professional Credentials</p>
          </div>

          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">100%</p>
            <p className="text-xs sm:text-sm font-medium text-slate-500">Audit Compliance Standard</p>
            <p className="text-[11px] text-emerald-700 font-semibold">Zero Microbial Incidents Across Audits</p>
          </div>

        </div>

      </div>
    </section>
  );
};
