import React, { useState } from "react";
import { 
  Download, 
  FileSpreadsheet, 
  FileText, 
  CheckCircle2, 
  Eye, 
  Filter, 
  Check, 
  Sparkles,
  Layers,
  X
} from "lucide-react";
import { DOWNLOADABLE_RESOURCES } from "../data/resourcesData";
import { DownloadableResource } from "../types";
import { triggerBrowserDownload } from "../utils/fileDownloader";

export const ResourcesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);
  const [previewResource, setPreviewResource] = useState<{ resource: DownloadableResource; generated: ReturnType<DownloadableResource["contentGenerator"]> } | null>(null);

  const categories = ["All", "Audit Checklists", "QA Daily Logs", "SOP Templates"];

  const filteredResources = activeCategory === "All"
    ? DOWNLOADABLE_RESOURCES
    : DOWNLOADABLE_RESOURCES.filter(r => r.category === activeCategory);

  const handleDownload = (resource: DownloadableResource) => {
    const generated = resource.contentGenerator();
    triggerBrowserDownload(generated.filename, generated.content, generated.mimeType);
    setDownloadSuccessId(resource.id);
    setTimeout(() => {
      setDownloadSuccessId(null);
    }, 2500);
  };

  const handlePreview = (resource: DownloadableResource) => {
    const generated = resource.contentGenerator();
    setPreviewResource({ resource, generated });
  };

  return (
    <section id="resources-section" className="py-16 lg:py-24 bg-slate-50/70 border-b border-slate-200/80 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100/70 text-emerald-800 border border-emerald-300/60 mb-3">
              <Download className="w-3.5 h-3.5 text-emerald-700" />
              <span>Free Industrial Quality Toolkit</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Downloadable Food Science & QA Resource Library
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Standardized shift logs, GMP audit checklists, HACCP worksheets, and sensory evaluation templates ready for immediate plant deployment.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              1,300+ Total Downloads Across Industry
            </span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Resources Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredResources.map((res) => {
            const isDownloaded = downloadSuccessId === res.id;
            const isSpreadsheet = res.fileType.includes("CSV") || res.fileType.includes("Excel");

            return (
              <div
                key={res.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  
                  {/* File Metadata Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold ${
                        isSpreadsheet ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"
                      }`}>
                        {isSpreadsheet ? (
                          <FileSpreadsheet className="w-5 h-5" />
                        ) : (
                          <FileText className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-800">{res.fileType}</span>
                        <p className="text-[11px] text-slate-400 font-mono">{res.fileSize}</p>
                      </div>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                      {res.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {res.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {res.description}
                  </p>

                </div>

                {/* Bottom Actions */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => handlePreview(res)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick Preview</span>
                  </button>

                  <button
                    onClick={() => handleDownload(res)}
                    id={`download-btn-${res.id}`}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-xs ${
                      isDownloaded
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-900 text-white hover:bg-emerald-700 active:scale-98"
                    }`}
                  >
                    {isDownloaded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Downloaded!</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Template</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Preview Modal */}
      {previewResource && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 max-h-[85vh] flex flex-col overflow-hidden text-left">
            
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">File Content Preview</span>
                <h4 className="text-lg font-bold text-slate-900">{previewResource.generated.filename}</h4>
              </div>
              <button
                onClick={() => setPreviewResource(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto font-mono text-xs text-slate-800 bg-slate-950 text-slate-100 rounded-b-xl whitespace-pre-wrap leading-relaxed max-h-[60vh]">
              {previewResource.generated.content}
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <span className="text-xs text-slate-500">MIME: {previewResource.generated.mimeType}</span>
              <button
                onClick={() => {
                  triggerBrowserDownload(previewResource.generated.filename, previewResource.generated.content, previewResource.generated.mimeType);
                  setPreviewResource(null);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save to Device</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
