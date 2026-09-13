import React, { useState } from "react";
import { 
  FileText, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Tag, 
  Search,
  Sparkles,
  BookOpen
} from "lucide-react";
import { BLOG_POSTS } from "../data/blogData";
import { BlogPost } from "../types";
import { ArticleModal } from "./ArticleModal";

export const BlogSection: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Beverage Technology", "Food Microbiology", "Quality Systems"];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="blog-section" className="py-16 lg:py-24 bg-white border-b border-slate-200/80 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100/70 text-emerald-800 border border-emerald-300/60 mb-3">
              <FileText className="w-3.5 h-3.5 text-emerald-700" />
              <span>Industry Insights & Editorial</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Food Science & Quality Assurance Blog
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Technical articles exploring dissolved oxygen control, beverage microbiology, FSSC 22000 readiness, and sensory standardization.
            </p>
          </div>

          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles & topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-emerald-300 hover:shadow-lg transition-all"
            >
              <div className="space-y-4">
                
                {/* Meta */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tag Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.tags.slice(0, 3).map((tag, tIdx) => (
                    <span key={tIdx} className="text-[11px] font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                      #{tag}
                    </span>
                  ))}
                </div>

              </div>

              {/* Read More Trigger */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {post.publishDate}
                </span>

                <button
                  onClick={() => setActiveArticle(post)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 group-hover:translate-x-1 transition-all"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </article>
          ))}
        </div>

      </div>

      {/* Article Full Reader Modal */}
      {activeArticle && (
        <ArticleModal post={activeArticle} onClose={() => setActiveArticle(null)} />
      )}

    </section>
  );
};
