import React, { useState, useRef, useEffect } from "react";
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
  ExternalLink,
  Camera,
  Maximize2,
  RefreshCw,
  Check
} from "lucide-react";
import { ARBAB_PROFILE } from "../data/profileData";

interface HeroProps {
  onNavigate: (tab: string) => void;
  onOpenConsultation: () => void;
}

type FramingMode = "focus-face" | "centered" | "full-fit";

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenConsultation }) => {
  // Candidate image sources in priority order:
  // 1. Direct GitHub URL from public repository: https://raw.githubusercontent.com/arbab768/arbab/main/public/photos/IMG_8075.JPG
  // 2. Local public repository path: /photos/IMG_8075.JPG
  // 3. Alternative GitHub URL: https://raw.githubusercontent.com/arbab768/arbab/main/photos/IMG_8075.JPG
  // 4. Bundled fallback
  const directGithubUrl = "https://raw.githubusercontent.com/arbab768/arbab/main/public/photos/IMG_8075.JPG";
  const localPhotoUrl = "/photos/IMG_8075.JPG";
  const altGithubUrl = "https://raw.githubusercontent.com/arbab768/arbab/main/photos/IMG_8075.JPG";
  const bundledFallback = ARBAB_PROFILE.heroImageFallback || "/src/assets/images/arbab_portrait_1789319098277.jpg";

  const [currentSrc, setCurrentSrc] = useState<string>(() => {
    return localStorage.getItem("arbab_hero_photo_custom") || directGithubUrl;
  });
  const [attemptIndex, setAttemptIndex] = useState<number>(0);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [framingMode, setFramingMode] = useState<FramingMode>("focus-face");
  const [showFramingMenu, setShowFramingMenu] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fallbackList = [
    directGithubUrl,
    localPhotoUrl,
    altGithubUrl,
    bundledFallback
  ];

  const handleImageError = () => {
    const nextIndex = attemptIndex + 1;
    if (nextIndex < fallbackList.length) {
      setAttemptIndex(nextIndex);
      setCurrentSrc(fallbackList[nextIndex]);
    }
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const resultStr = event.target.result as string;
          setCurrentSrc(resultStr);
          setImageLoaded(true);
          try {
            localStorage.setItem("arbab_hero_photo_custom", resultStr);
          } catch {
            // Storage quota warning - safe to ignore
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const resetToGithub = () => {
    localStorage.removeItem("arbab_hero_photo_custom");
    setAttemptIndex(0);
    setCurrentSrc(directGithubUrl);
    setImageLoaded(false);
  };

  // Determine styling class based on framing
  const getFramingClass = () => {
    switch (framingMode) {
      case "focus-face":
        return "w-full h-full object-cover object-[center_18%]";
      case "centered":
        return "w-full h-full object-cover object-center";
      case "full-fit":
        return "w-full h-full object-contain object-center bg-slate-950";
      default:
        return "w-full h-full object-cover object-[center_18%]";
    }
  };

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
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/90 shadow-2xl ring-1 ring-slate-900/5 group">
                
                {/* Hidden File Input for Direct Local Image Selection */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleCustomUpload}
                  accept="image/*"
                  className="hidden"
                  aria-label="Upload photo"
                />

                {/* Top Control Bar */}
                <div className="absolute top-3 inset-x-3 z-20 flex items-center justify-between pointer-events-auto">
                  {/* Photo Info Pill */}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-950/70 text-slate-200 backdrop-blur-md border border-white/10 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>IMG_8075.JPG</span>
                  </span>

                  {/* Right Action Tools: Framing & Upload */}
                  <div className="flex items-center gap-1.5 bg-slate-950/70 backdrop-blur-md p-1 rounded-xl border border-white/10 shadow-xs">
                    {/* Framing Mode Button */}
                    <button
                      type="button"
                      onClick={() => setShowFramingMenu(!showFramingMenu)}
                      className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/15 transition-colors text-xs flex items-center gap-1"
                      title="Adjust photo framing (Face focus / Centered / Fit)"
                      aria-label="Adjust framing"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Direct Upload / Replace Photo */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/15 transition-colors text-xs flex items-center gap-1"
                      title="Choose another photo from device"
                      aria-label="Choose photo from device"
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </button>

                    {/* Reset Button if custom override is active */}
                    {localStorage.getItem("arbab_hero_photo_custom") && (
                      <button
                        type="button"
                        onClick={resetToGithub}
                        className="p-1.5 rounded-lg text-amber-300 hover:text-amber-200 hover:bg-white/15 transition-colors text-xs"
                        title="Reset to GitHub image"
                        aria-label="Reset to GitHub photo"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Framing Mode Dropdown Menu */}
                {showFramingMenu && (
                  <div className="absolute top-12 right-3 z-30 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-xl p-1.5 shadow-xl text-left w-36 animate-in fade-in zoom-in-95 duration-150">
                    <p className="text-[10px] font-bold text-slate-400 px-2 py-1 uppercase tracking-wider">Framing Sizing</p>
                    <button
                      type="button"
                      onClick={() => { setFramingMode("focus-face"); setShowFramingMenu(false); }}
                      className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        framingMode === "focus-face" ? "bg-emerald-700 text-white font-semibold" : "text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      <span>Focus Face</span>
                      {framingMode === "focus-face" && <Check className="w-3 h-3" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setFramingMode("centered"); setShowFramingMenu(false); }}
                      className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        framingMode === "centered" ? "bg-emerald-700 text-white font-semibold" : "text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      <span>Centered</span>
                      {framingMode === "centered" && <Check className="w-3 h-3" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setFramingMode("full-fit"); setShowFramingMenu(false); }}
                      className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        framingMode === "full-fit" ? "bg-emerald-700 text-white font-semibold" : "text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      <span>Fit Whole Photo</span>
                      {framingMode === "full-fit" && <Check className="w-3 h-3" />}
                    </button>
                  </div>
                )}
                
                {/* Photo of Arbab Mukhtiar with 3:4 Native Aspect Ratio Sizing Optimization */}
                <div className="relative aspect-[3/4] w-full max-h-[580px] bg-slate-950 overflow-hidden flex items-center justify-center">
                  
                  {/* Shimmer skeleton while loading */}
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center gap-2 z-0 animate-pulse">
                      <div className="w-8 h-8 rounded-full border-2 border-emerald-500/30 border-t-emerald-400 animate-spin" />
                      <span className="text-xs text-slate-400 font-medium">Optimizing IMG_8075...</span>
                    </div>
                  )}

                  <img
                    key={currentSrc}
                    src={currentSrc}
                    alt="Arbab Mukhtiar, Quality Assurance Officer at Murree Brewery Co. and Food Technologist"
                    className={`${getFramingClass()} transition-all duration-500 select-none ${
                      imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
                    }`}
                    referrerPolicy="no-referrer"
                    loading="eager"
                    decoding="async"
                    onLoad={() => setImageLoaded(true)}
                    onError={handleImageError}
                  />
                  
                  {/* Subtle Gradient overlay at bottom of image for high-contrast typography */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent flex items-end p-4 sm:p-5 z-10 pointer-events-none">
                    <div className="text-white">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300 tracking-wide uppercase">
                        <Microscope className="w-3.5 h-3.5" />
                        Murree Brewery QA Laboratory
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-slate-200 mt-0.5">
                        In-line verification, microbiological surveillance & HACCP
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
