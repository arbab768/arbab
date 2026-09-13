import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ExperienceSection } from "./components/ExperienceSection";
import { CertificationsSection } from "./components/CertificationsSection";
import { GuidesSection } from "./components/GuidesSection";
import { ResourcesSection } from "./components/ResourcesSection";
import { BlogSection } from "./components/BlogSection";
import { QAToolsSection } from "./components/QAToolsSection";
import { ClientPortal } from "./components/ClientPortal";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { SearchModal } from "./components/SearchModal";
import { UserAccount } from "./types";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem("arbab_portal_user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  // Handle SEO-friendly hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "").trim();
      if (hash && ["home", "experience", "certifications", "guides", "resources", "blog", "tools", "portal", "contact"].includes(hash)) {
        setActiveTab(hash);
      } else if (!hash) {
        setActiveTab("home");
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Update URL hash when tab changes
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === "home") {
      history.pushState(null, "", window.location.pathname);
    } else {
      window.location.hash = tabId;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogin = (user: UserAccount) => {
    setCurrentUser(user);
    localStorage.setItem("arbab_portal_user", JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("arbab_portal_user");
  };

  const handleOpenConsultation = () => {
    setActiveTab("portal");
    window.location.hash = "portal";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectSearchResult = (tab: string) => {
    handleTabChange(tab);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Top Main Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenSearch={() => setSearchOpen(true)}
        isLoggedIn={!!currentUser}
        onOpenPortal={() => handleTabChange("portal")}
      />

      {/* Main Content View Container */}
      <main className="flex-1">
        {activeTab === "home" && (
          <>
            <Hero 
              onNavigate={handleTabChange} 
              onOpenConsultation={handleOpenConsultation} 
            />
            <ExperienceSection />
            <CertificationsSection />
            <GuidesSection />
            <ResourcesSection />
            <BlogSection />
            <QAToolsSection />
            <ContactSection />
          </>
        )}

        {activeTab === "experience" && (
          <>
            <div className="bg-slate-900 text-white py-10 px-4 text-center">
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">Industrial Portfolio</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">Murree Brewery QA Operations & Experience</h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-2">
                Detailed breakdown of Arbab Mukhtiar's 2.5+ years of quality assurance, in-line testing, and HACCP compliance.
              </p>
            </div>
            <ExperienceSection />
            <ContactSection />
          </>
        )}

        {activeTab === "certifications" && (
          <>
            <div className="bg-slate-900 text-white py-10 px-4 text-center">
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">Qualifications</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">Education & Professional Accreditations</h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-2">
                BS Food Science & Technology graduate with verified credentials in HACCP, ISO 22000, and GMP.
              </p>
            </div>
            <CertificationsSection />
            <ContactSection />
          </>
        )}

        {activeTab === "guides" && (
          <>
            <div className="bg-slate-900 text-white py-10 px-4 text-center">
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">Knowledge Hub</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">Food Safety & Nutrition Best Practices Guides</h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-2">
                Comprehensive Standard Operating Procedures (SOPs) and critical limit documentation for industry peers.
              </p>
            </div>
            <GuidesSection />
            <ResourcesSection />
          </>
        )}

        {activeTab === "resources" && (
          <>
            <div className="bg-slate-900 text-white py-10 px-4 text-center">
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">Toolkit</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">Downloadable QA Resource Library</h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-2">
                Standard shift logs, HACCP worksheets, GMP audit checklists, and sensory scorecards.
              </p>
            </div>
            <ResourcesSection />
            <GuidesSection />
          </>
        )}

        {activeTab === "blog" && (
          <>
            <div className="bg-slate-900 text-white py-10 px-4 text-center">
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">Editorial</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">Technical Food Science & QA Blog</h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-2">
                In-depth articles authored by Arbab Mukhtiar on beverage bottling, microbiology, and standards.
              </p>
            </div>
            <BlogSection />
            <ContactSection />
          </>
        )}

        {activeTab === "tools" && (
          <>
            <div className="bg-slate-900 text-white py-10 px-4 text-center">
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">Calculators & AI</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">Food Safety & QA Engineering Tools</h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-2">
                Interactive Pasteurization Unit calculator, Brix conversion, CIP dosing, and Gemini AI QA assistant.
              </p>
            </div>
            <QAToolsSection />
            <GuidesSection />
          </>
        )}

        {activeTab === "portal" && (
          <ClientPortal
            currentUser={currentUser}
            onLogin={handleLogin}
            onLogout={handleLogout}
          />
        )}

        {activeTab === "contact" && (
          <>
            <div className="bg-slate-900 text-white py-10 px-4 text-center">
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">Get In Touch</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">Direct Contact & Technical Inquiries</h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-2">
                Connect with Arbab Mukhtiar for plant audits, advisory sessions, or professional collaborations.
              </p>
            </div>
            <ContactSection />
          </>
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleTabChange} />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectResult={handleSelectSearchResult}
      />

    </div>
  );
}
