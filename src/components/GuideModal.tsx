import React from "react";
import { 
  X, 
  BookOpen, 
  Clock, 
  CheckSquare, 
  AlertTriangle, 
  Printer, 
  Download, 
  Check, 
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { TechnicalGuide } from "../types";
import { triggerBrowserDownload } from "../utils/fileDownloader";

interface GuideModalProps {
  guide: TechnicalGuide | null;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ guide, onClose }) => {
  if (!guide) return null;

  const handleDownloadMarkdown = () => {
    const markdown = `# ${guide.title}
**Category:** ${guide.category} | **Last Updated:** ${guide.lastUpdated}
**Author:** Arbab Mukhtiar (BS Food Science & Technology, QA Officer at Murree Brewery Co.)
**Intended Audience:** ${guide.audience}

---

## Executive Summary
${guide.summary}

## Scope of Operation
${guide.content.scope}

## Critical Control Parameters
${guide.keyParameters.map(p => `- **${p.parameter}:** Standard: ${p.standard} | Critical Limit: ${p.criticalLimit}`).join("\n")}

## Step-by-Step Standard Operating Procedure
${guide.content.procedureSteps.map(s => `### Step ${s.step}: ${s.title}\n${s.detail}\n${s.warning ? `> **CRITICAL WARNING:** ${s.warning}\n` : ''}`).join("\n")}

## Monitoring & Record Keeping
${guide.content.monitoringAndRecords}

## Corrective Actions (Non-Conformance)
${guide.content.correctiveActions}

## Reference Standards
${guide.content.references.map(r => `- ${r}`).join("\n")}

---
*Generated from Arbab Mukhtiar's Food Science & Quality Assurance Knowledge Repository*
`;

    triggerBrowserDownload(`${guide.slug}.md`, markdown, "text/markdown");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 max-h-[92vh] flex flex-col overflow-hidden text-left"
        role="dialog"
        aria-modal="true"
        aria-labelledby="guide-modal-title"
      >
        
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 flex items-start justify-between bg-slate-50/80 gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                {guide.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="w-3.5 h-3.5" />
                {guide.readTime}
              </span>
              <span className="text-xs text-slate-400">• Updated {guide.lastUpdated}</span>
            </div>
            <h3 id="guide-modal-title" className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
              {guide.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Author: Arbab Mukhtiar (Quality Assurance Specialist, Murree Brewery)
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleDownloadMarkdown}
              className="p-2 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-slate-100 border border-slate-200 transition-colors"
              title="Download Guide Markdown"
              aria-label="Download guide"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors hidden sm:inline-flex"
              title="Print / Save as PDF"
              aria-label="Print guide"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close guide modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 print:p-0">
          
          {/* Summary & Target Audience */}
          <div className="bg-emerald-50/50 p-4 sm:p-5 rounded-xl border border-emerald-200/80">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-1">
              Operational Intent & Summary
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              {guide.summary}
            </p>
            <div className="mt-3 pt-3 border-t border-emerald-200/60 flex items-center justify-between text-xs text-slate-600">
              <span className="font-semibold text-emerald-900">Intended Facility Audience:</span>
              <span className="font-medium">{guide.audience}</span>
            </div>
          </div>

          {/* Critical Parameters Table */}
          <div>
            <h4 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              <span>Critical Testing Limits & Benchmarks</span>
            </h4>
            
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Quality Parameter</th>
                    <th className="p-3">Standard Operating Target</th>
                    <th className="p-3">Critical Action Limit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {guide.keyParameters.map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-900">{p.parameter}</td>
                      <td className="p-3 text-emerald-800 font-medium">{p.standard}</td>
                      <td className="p-3 text-rose-700 font-medium">{p.criticalLimit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Step-by-Step Procedure */}
          <div>
            <h4 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-emerald-700" />
              <span>Step-by-Step Standard Operating Procedure</span>
            </h4>

            <div className="space-y-4">
              {guide.content.procedureSteps.map((step) => (
                <div key={step.step} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center">
                      {step.step}
                    </span>
                    <h5 className="font-bold text-sm sm:text-base text-slate-900">
                      {step.title}
                    </h5>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-8">
                    {step.detail}
                  </p>
                  {step.warning && (
                    <div className="ml-8 mt-2 p-2.5 rounded-lg bg-amber-50 border border-amber-200 flex items-start gap-2 text-xs text-amber-900 font-medium">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{step.warning}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Monitoring & Corrective Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Monitoring & Record Keeping
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {guide.content.monitoringAndRecords}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 space-y-1.5">
              <p className="text-xs font-bold uppercase tracking-wider text-rose-900">
                Non-Conformance & Corrective Actions (CAPA)
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {guide.content.correctiveActions}
              </p>
            </div>
          </div>

          {/* References */}
          <div className="pt-4 border-t border-slate-200">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Regulatory References & Quality Compendia
            </p>
            <ul className="space-y-1">
              {guide.content.references.map((ref, idx) => (
                <li key={idx} className="text-xs text-slate-500 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  <span>{ref}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <p className="text-xs text-slate-500 font-medium hidden sm:block">
            Arbab Mukhtiar • BS Food Science & Technology • Murree Brewery
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={handleDownloadMarkdown}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download SOP (.md)</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
