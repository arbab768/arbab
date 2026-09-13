import React, { useState, useEffect } from "react";
import { Search, X, BookOpen, Download, FileText, ArrowRight } from "lucide-react";
import { TECHNICAL_GUIDES } from "../data/guidesData";
import { DOWNLOADABLE_RESOURCES } from "../data/resourcesData";
import { BLOG_POSTS } from "../data/blogData";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (tab: string, itemSlug?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult
}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  const matchedGuides = cleanQuery 
    ? TECHNICAL_GUIDES.filter(g => g.title.toLowerCase().includes(cleanQuery) || g.summary.toLowerCase().includes(cleanQuery))
    : TECHNICAL_GUIDES.slice(0, 3);

  const matchedResources = cleanQuery
    ? DOWNLOADABLE_RESOURCES.filter(r => r.title.toLowerCase().includes(cleanQuery) || r.description.toLowerCase().includes(cleanQuery))
    : DOWNLOADABLE_RESOURCES.slice(0, 2);

  const matchedPosts = cleanQuery
    ? BLOG_POSTS.filter(p => p.title.toLowerCase().includes(cleanQuery) || p.excerpt.toLowerCase().includes(cleanQuery))
    : BLOG_POSTS.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 p-4 animate-in fade-in duration-150">
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-left"
        role="dialog"
        aria-modal="true"
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-emerald-700 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Type to search SOPs, HACCP plans, brewery logs, articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm sm:text-base text-slate-800 placeholder-slate-400 outline-hidden font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-2 py-1 bg-slate-200/70 rounded-lg"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-6">
          
          {/* Guides Section */}
          {matchedGuides.length > 0 && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                <span>Food Safety & Nutrition Guides</span>
              </p>
              <div className="space-y-1.5">
                {matchedGuides.map((guide) => (
                  <button
                    key={guide.id}
                    onClick={() => {
                      onSelectResult("guides", guide.slug);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-between group border border-transparent hover:border-slate-200"
                  >
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-emerald-700">
                        {guide.title}
                      </p>
                      <p className="text-[11px] text-slate-400">{guide.category} • {guide.readTime}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Resources Section */}
          {matchedResources.length > 0 && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5 text-emerald-600" />
                <span>Downloadable Checklists & SOP Templates</span>
              </p>
              <div className="space-y-1.5">
                {matchedResources.map((res) => (
                  <button
                    key={res.id}
                    onClick={() => {
                      onSelectResult("resources");
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-between group border border-transparent hover:border-slate-200"
                  >
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-emerald-700">
                        {res.title}
                      </p>
                      <p className="text-[11px] text-slate-400">{res.fileType} • {res.fileSize}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Blog Section */}
          {matchedPosts.length > 0 && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-600" />
                <span>Technical Blog Articles</span>
              </p>
              <div className="space-y-1.5">
                {matchedPosts.map((post) => (
                  <button
                    key={post.id}
                    onClick={() => {
                      onSelectResult("blog", post.slug);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-between group border border-transparent hover:border-slate-200"
                  >
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-emerald-700">
                        {post.title}
                      </p>
                      <p className="text-[11px] text-slate-400">{post.category} • {post.readTime}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500">
          Tip: Press <kbd className="px-1.5 py-0.5 bg-slate-200 rounded-md font-mono text-[11px]">ESC</kbd> anytime to exit search
        </div>
      </div>
    </div>
  );
};
