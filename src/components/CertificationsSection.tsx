import React, { useState } from "react";
import { 
  Award, 
  CheckCircle, 
  Shield, 
  ExternalLink, 
  Download, 
  GraduationCap, 
  FileCheck,
  CheckCircle2
} from "lucide-react";
import { CERTIFICATIONS, ARBAB_PROFILE } from "../data/profileData";
import { triggerBrowserDownload } from "../utils/fileDownloader";

export const CertificationsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "HACCP", "ISO & Standards", "Hygiene & GMP", "Laboratory & Quality"];

  const filteredCerts = activeCategory === "All" 
    ? CERTIFICATIONS 
    : CERTIFICATIONS.filter(c => c.category === activeCategory);

  const handleDownloadCredentialsSummary = () => {
    const content = `ACADEMIC & PROFESSIONAL CREDENTIAL SUMMARY
Arbab Mukhtiar | BS Food Science & Technology
Current Role: Quality Assurance Officer, Murree Brewery Co. Ltd.
Location: Azad Kashmir & Rawalpindi, Pakistan
Contact: ${ARBAB_PROFILE.email}

ACADEMIC QUALIFICATION:
- Bachelor of Science in Food Science and Technology (BS FST)
- Faculty of Agriculture & Food Sciences
- Core: Food Microbiology, Beverage Technology, Food Chemistry, HACCP, Sensory Analysis

PROFESSIONAL CERTIFICATIONS & LICENSES:
${CERTIFICATIONS.map(c => `
[${c.title}]
- Issuer: ${c.issuer} (${c.issueDate})
- Credential ID: ${c.credentialId}
- Focus: ${c.description}
- Skills: ${c.skills.join(", ")}
- Status: ${c.status}
`).join("\n")}

Verified by: Arbab Mukhtiar, Quality Assurance Specialist
Date of Verification: ${new Date().toLocaleDateString()}
`;

    triggerBrowserDownload("Arbab-Mukhtiar-Credentials-Summary.txt", content, "text/plain");
  };

  return (
    <section id="certifications-section" className="py-16 lg:py-24 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100/70 text-emerald-800 border border-emerald-300/60 mb-3">
              <Award className="w-3.5 h-3.5 text-emerald-700" />
              <span>Academic Standing & Industry Accreditations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Education & Professional Certifications
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              BS in Food Science and Technology complemented by rigorous certifications across ISO 9001 (QMS), ISO 45001 (OHSAS), ISO 22000 (FSMS), HACCP Level 3, and industrial CIP sanitation.
            </p>
          </div>

          <button
            onClick={handleDownloadCredentialsSummary}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-100 transition-colors shadow-2xs self-start md:self-auto"
            id="download-credentials-btn"
          >
            <Download className="w-4 h-4 text-emerald-700" />
            <span>Download Credentials Record</span>
          </button>
        </div>

        {/* Education Highlight Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-12 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6 text-emerald-700" />
              </div>
              <div>
                <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Degree Completed • Graduate
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  Bachelor of Science in Food Science and Technology
                </h3>
                <p className="text-sm font-semibold text-slate-600">
                  Faculty of Agriculture & Food Sciences • Azad Kashmir & Pakistan
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-100 self-start">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>High Academic Standing & Research Honors</span>
            </div>
          </div>

          {/* Academic Coursework Tags */}
          <div className="mt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Specialized Academic Coursework & Laboratory Modules
            </h4>
            <div className="flex flex-wrap gap-2">
              {ARBAB_PROFILE.education[0].keyCoursework.map((course, cIdx) => (
                <span key={cIdx} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200">
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Category Filters for Certifications */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => (
            <div 
              key={cert.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                    {cert.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {cert.status}
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900 leading-snug">
                  {cert.title}
                </h4>

                <p className="text-xs font-medium text-slate-500">
                  {cert.issuer} • <span className="text-slate-400">{cert.issueDate}</span>
                </p>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {cert.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <p className="text-[11px] font-semibold text-slate-400 mb-2">Verified Competencies:</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {cert.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 text-[11px] border border-slate-100">
                      {skill}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] font-mono text-slate-400">
                  ID: <span className="text-slate-600 font-semibold">{cert.credentialId}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
