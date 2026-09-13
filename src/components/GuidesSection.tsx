import React, { useState } from "react";
import { 
  BookOpen, 
  Search, 
  Clock, 
  ArrowRight, 
  CheckCircle, 
  Layers, 
  ShieldCheck, 
  FileText,
  Filter
} from "lucide-react";
import { TECHNICAL_GUIDES } from "../data/guidesData";
import { TechnicalGuide } from "../types";
import { GuideModal } from "./GuideModal";

export const GuidesSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeGuide, setActiveGuide] = useState<TechnicalGuide | null>(null);

  const categories = [
    "All",
    "Brewery & Beverage QA",
    "HACCP & Compliance",
    "Microbiology & Hygiene",
    "Nutrition & Health"
  ];

  const filteredGuides = TECHNICAL_GUIDES.filter((guide) => {
    const matchesCategory = selectedCategory === "All" || guide.category === selectedCategory;
    const matchesSearch = 
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="guides-section" className="py-16 lg:py-24 bg-white border-b border-slate-200/80 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100/70 text-emerald-800 border border-emerald-300/60 mb-3">
              <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
              <span>Technical SOPs & Guides Repository</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Food Safety, HACCP & Nutrition Best Practices
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Standard Operating Procedures and operational guidelines curated for food technologist peers, QA inspectors, and beverage manufacturing professionals.
            </p>
          </div>

          {/* Search Field */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search guides, SOPs, CCPs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 mb-8 border-b border-slate-100 pb-3 sm:pb-4 overflow-x-auto no-scrollbar">
          <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              className="group bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 flex flex-col justify-between hover:border-emerald-300 hover:shadow-lg transition-all"
            >
              <div className="space-y-4">
                
                {/* Category & Read Time */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {guide.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    {guide.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                  {guide.title}
                </h3>

                {/* Summary */}
                <p className="text-sm text-slate-600 leading-relaxed">
                  {guide.summary}
                </p>

                {/* Critical Parameters Preview */}
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 space-y-1.5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Monitored Critical Parameters:
                  </p>
                  <div className="space-y-1">
                    {guide.keyParameters.slice(0, 2).map((p, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-700">{p.parameter}:</span>
                        <span className="text-emerald-700 font-mono text-[11px] font-medium">{p.standard}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Target: <strong className="text-slate-600 font-semibold">{guide.audience.split(",")[0]}</strong>
                </span>

                <button
                  onClick={() => setActiveGuide(guide)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
                >
                  <span>Read Full SOP</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Empty state if search finds nothing */}
        {filteredGuides.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
            <FileText className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-800">No matching technical guides found</h4>
            <p className="text-xs text-slate-500 mt-1">Try clearing your search query or selecting "All" categories.</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
              className="mt-3 px-3 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Guide Detail Modal */}
      {activeGuide && (
        <GuideModal guide={activeGuide} onClose={() => setActiveGuide(null)} />
      )}

    </section>
  );
};
