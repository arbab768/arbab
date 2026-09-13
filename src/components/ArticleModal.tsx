import React from "react";
import { 
  X, 
  Clock, 
  Calendar, 
  User, 
  Share2, 
  Check, 
  Tag,
  Building2,
  Bookmark
} from "lucide-react";
import { BlogPost } from "../types";
import { ARBAB_PROFILE } from "../data/profileData";

interface ArticleModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ post, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!post) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 max-h-[92vh] flex flex-col overflow-hidden text-left"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Bar */}
        <div className="p-5 sm:p-6 border-b border-slate-200 flex items-start justify-between bg-slate-50 gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                <Calendar className="w-3.5 h-3.5" />
                {post.publishDate}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
              {post.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleShare}
              className="p-2 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-slate-100 border border-slate-200 transition-colors"
              title="Copy Article Link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Author Byline Box */}
          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-11 h-11 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-sm shadow-xs">
              AM
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Arbab Mukhtiar</p>
              <p className="text-xs text-slate-500">
                Quality Assurance Officer at Murree Brewery Co. Ltd. • BS Food Science & Technology
              </p>
            </div>
          </div>

          {/* Excerpt Lead */}
          <p className="text-base sm:text-lg font-medium text-slate-700 italic border-l-4 border-emerald-600 pl-4 py-1 leading-relaxed">
            "{post.excerpt}"
          </p>

          {/* Body Prose */}
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-slate-700 leading-relaxed space-y-4">
            {post.content.split("\n\n").map((paragraph, pIdx) => {
              if (paragraph.startsWith("### ")) {
                return (
                  <h4 key={pIdx} className="text-lg font-bold text-slate-900 pt-4 pb-1 border-b border-slate-100">
                    {paragraph.replace("### ", "")}
                  </h4>
                );
              }
              if (paragraph.startsWith("1. ") || paragraph.startsWith("- ")) {
                return (
                  <div key={pIdx} className="pl-4 space-y-1">
                    {paragraph.split("\n").map((line, lIdx) => (
                      <p key={lIdx} className="text-slate-700">
                        {line}
                      </p>
                    ))}
                  </div>
                );
              }
              return (
                <p key={pIdx} className="text-slate-700">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-slate-200">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" />
                Tags:
              </span>
              {post.tags.map((tag, tIdx) => (
                <span key={tIdx} className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            Published in Arbab Mukhtiar's Food Science & Technology Journal
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            Close Article
          </button>
        </div>

      </div>
    </div>
  );
};
