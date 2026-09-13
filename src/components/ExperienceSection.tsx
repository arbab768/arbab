import React, { useState } from "react";
import { 
  Building2, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Wrench, 
  TrendingUp, 
  FileCheck, 
  Layers, 
  ShieldCheck
} from "lucide-react";
import { EXPERIENCES, CASE_STUDIES } from "../data/profileData";

export const ExperienceSection: React.FC = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<string>(CASE_STUDIES[0].id);

  const activeCase = CASE_STUDIES.find((c) => c.id === selectedCaseStudy) || CASE_STUDIES[0];

  return (
    <section id="experience-section" className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Industrial Career & Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Murree Brewery Quality Assurance Experience
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Over 2.5 years of continuous industrial oversight at Pakistan’s premier beverage manufacturer. Managing physical, chemical, and microbiological compliance from raw materials to final packaged dispatch.
          </p>
        </div>

        {/* Primary Role Card: Murree Brewery Co. Ltd. */}
        <div className="bg-slate-50/80 rounded-2xl border border-slate-200 p-6 sm:p-8 lg:p-10 mb-16 shadow-xs">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-700 text-white">
                  Active Position
                </span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Full-Time Industrial QA
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                Quality Assurance Officer
              </h3>
              <p className="text-base font-semibold text-emerald-800">
                Murree Brewery Co. Ltd.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>2024 - Present (2.5+ Years Cumulative)</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Rawalpindi, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Role Summary & Core Pillars */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Responsibilities */}
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>Core Quality Assurance Mandates</span>
              </h4>

              <ul className="space-y-2.5">
                {EXPERIENCES[0].responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>

              {/* Highlight Achievements */}
              <div className="pt-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Key Operational Achievements
                </h5>
                <div className="space-y-2">
                  {EXPERIENCES[0].keyAchievements.map((achieve, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm font-medium text-emerald-900 bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-200/60">
                      <TrendingUp className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                      <span>{achieve}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Laboratory Instrumentation & Quality Tooling */}
            <div className="lg:col-span-5 bg-white rounded-xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-emerald-700" />
                <span>Laboratory Equipment Handled</span>
              </h4>

              <p className="text-xs text-slate-500">
                Daily hands-on calibration, maintenance, and precision operation:
              </p>

              <div className="space-y-2.5">
                {EXPERIENCES[0].laboratoryEquipment.map((equip, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs font-medium text-slate-800">
                    <div className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                    <span>{equip}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>Methodology Compliance</span>
                  <span className="text-emerald-700 font-bold">ASBC & ISO 22000</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Interactive Case Studies: Real Impact Led by Arbab Mukhtiar */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                Industrial QA Case Studies & Technical Impact
              </h3>
              <p className="text-sm text-slate-500">
                Real engineering problem-solving on active bottling and processing lines.
              </p>
            </div>

            {/* Case Study Tabs */}
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
              {CASE_STUDIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCaseStudy(c.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    selectedCaseStudy === c.id
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {c.id === "case-cip-optimization" ? "CIP Thermal Optimization" : "CO2 & Brix Precision"}
                </button>
              ))}
            </div>
          </div>

          {/* Active Case Study Detail Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-900 text-white">
                {activeCase.company}
              </span>
              {activeCase.tags.map((tag, tIdx) => (
                <span key={tIdx} className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                  {tag}
                </span>
              ))}
            </div>

            <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
              {activeCase.title}
            </h4>

            {/* Challenge & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200/70">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                  Industrial Challenge
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {activeCase.challenge}
                </p>
              </div>

              <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200/70">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-1 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-700" />
                  Engineered QA Solution
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {activeCase.solution}
                </p>
              </div>
            </div>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-slate-900 text-white mb-6">
              {activeCase.metrics.map((m, mIdx) => (
                <div key={mIdx} className="text-center">
                  <p className="text-xl sm:text-2xl font-extrabold text-emerald-400">{m.value}</p>
                  <p className="text-[11px] sm:text-xs text-slate-300 font-medium">{m.label}</p>
                </div>
              ))}
            </div>

            {/* Results Bullet Points */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Documented Production Outcomes
              </p>
              <ul className="space-y-1.5">
                {activeCase.results.map((res, rIdx) => (
                  <li key={rIdx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
