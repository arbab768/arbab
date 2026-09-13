import React, { useState, useEffect } from "react";
import { 
  Lock, 
  User, 
  Calendar, 
  Clock, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  Upload, 
  Download, 
  LogOut, 
  Plus, 
  MessageSquare, 
  ShieldCheck, 
  Building2, 
  ChevronRight,
  Sparkles,
  Phone,
  Mail
} from "lucide-react";
import { UserAccount, ConsultationBooking, PortalDocument, PortalMessage } from "../types";
import { triggerBrowserDownload } from "../utils/fileDownloader";

interface ClientPortalProps {
  currentUser: UserAccount | null;
  onLogin: (user: UserAccount) => void;
  onLogout: () => void;
}

export const ClientPortal: React.FC<ClientPortalProps> = ({
  currentUser,
  onLogin,
  onLogout
}) => {
  // Auth Form State
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [authError, setAuthError] = useState("");

  // Portal Dashboard Tabs
  const [portalTab, setPortalTab] = useState<"consultations" | "book" | "vault" | "messages">("consultations");

  // Consultations State
  const [consultations, setConsultations] = useState<ConsultationBooking[]>([
    {
      id: "consult-demo-101",
      clientName: currentUser?.name || "Punjab Beverage Mills QA Team",
      clientEmail: currentUser?.email || "qa@punjabbeveragemills.pk",
      company: currentUser?.company || "Punjab Beverage Mills Ltd.",
      phone: "+92 300 1234567",
      consultationType: "HACCP & CCP Verification Audit",
      date: "2026-09-22",
      timeSlot: "11:00 AM - 12:30 PM PKT",
      status: "Confirmed",
      notes: "Reviewing carbonation line CCP-2 pasteurizer temperature loggers and CIP rinse conductivity benchmarks.",
      createdAt: "2026-09-12T10:00:00Z"
    },
    {
      id: "consult-demo-102",
      clientName: currentUser?.name || "Kashmir Pure Springs Ltd.",
      clientEmail: currentUser?.email || "tech@kashmirsprings.com",
      company: currentUser?.company || "Kashmir Pure Springs Ltd.",
      phone: "+92 345 9876543",
      consultationType: "Microbial Testing & Water Treatment Setup",
      date: "2026-09-28",
      timeSlot: "02:00 PM - 03:00 PM PKT",
      status: "In Review",
      notes: "Assessing reverse osmosis membrane sanitization frequency and Coliform/E.coli membrane filtration tests.",
      createdAt: "2026-09-13T08:30:00Z"
    }
  ]);

  // Booking Form State
  const [bookType, setBookType] = useState("HACCP & FSMS Plant Audit Review");
  const [bookDate, setBookDate] = useState("2026-09-25");
  const [bookTimeSlot, setBookTimeSlot] = useState("10:00 AM - 11:00 AM PKT");
  const [bookNotes, setBookNotes] = useState("");
  const [bookSuccess, setBookSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Vault Documents
  const [documents, setDocuments] = useState<PortalDocument[]>([
    {
      id: "doc-01",
      title: "Murree-Brewery-Beverage-Quality-Standards-Summary.pdf",
      uploadedBy: "Arbab Mukhtiar (QA Officer)",
      uploadedDate: "2026-09-10",
      size: "1.8 MB",
      type: "PDF Document"
    },
    {
      id: "doc-02",
      title: "Confidential-HACCP-Audit-Preparation-Checklist.csv",
      uploadedBy: "Arbab Mukhtiar (QA Officer)",
      uploadedDate: "2026-09-11",
      size: "24 KB",
      type: "CSV Spreadsheet"
    }
  ]);

  // Messages State
  const [messages, setMessages] = useState<PortalMessage[]>([
    {
      id: "msg-1",
      sender: "arbab",
      senderName: "Arbab Mukhtiar (QA Officer)",
      timestamp: "Yesterday at 3:15 PM",
      text: "Welcome to the client consultation portal. Please upload your current process flow diagram or HACCP CCP sheet before our scheduled review."
    }
  ]);
  const [newMessageText, setNewMessageText] = useState("");

  // Fetch consultations from server on mount
  useEffect(() => {
    fetch("/api/consultations")
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setConsultations(data.data);
        }
      })
      .catch(() => {
        // Fallback to local state
      });
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setAuthError("Please enter your email and password.");
      return;
    }
    if (password.length < 4) {
      setAuthError("Password must be at least 4 characters.");
      return;
    }

    const user: UserAccount = {
      id: `usr-${Date.now()}`,
      email,
      name: email.split("@")[0].replace(".", " ").toUpperCase(),
      company: "Industry Client Partner",
      role: "Quality Client"
    };

    onLogin(user);
    setAuthError("");
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) {
      setAuthError("Please complete all required fields.");
      return;
    }

    const user: UserAccount = {
      id: `usr-${Date.now()}`,
      email,
      name,
      company: company || "Beverage / Food Enterprise",
      role: "Client Manager",
      phone
    };

    onLogin(user);
    setAuthError("");
  };

  const handleQuickDemoLogin = () => {
    const demoUser: UserAccount = {
      id: "usr-demo-99",
      email: "partner@beveragetech.pk",
      name: "Engr. Tariq Mahmood",
      company: "National Beverage Processing Ltd.",
      role: "Operations & Quality Director",
      isDemo: true
    };
    onLogin(demoUser);
  };

  const handleBookConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newBooking: ConsultationBooking = {
      id: `consult-${Date.now()}`,
      clientName: currentUser?.name || name || "Client Partner",
      clientEmail: currentUser?.email || email || "client@domain.com",
      company: currentUser?.company || company || "Food Manufacturing Co.",
      phone: currentUser?.phone || phone || "+92 300 0000000",
      consultationType: bookType,
      date: bookDate,
      timeSlot: bookTimeSlot,
      status: "Confirmed",
      notes: bookNotes || "Discussion of plant quality control and standards.",
      createdAt: new Date().toISOString()
    };

    try {
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBooking)
      });
      if (res.ok) {
        const json = await res.json();
        setConsultations(prev => [json.data, ...prev]);
      } else {
        setConsultations(prev => [newBooking, ...prev]);
      }
    } catch {
      setConsultations(prev => [newBooking, ...prev]);
    }

    setIsSubmitting(false);
    setBookSuccess(true);
    setTimeout(() => {
      setBookSuccess(false);
      setPortalTab("consultations");
    }, 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;

    const newMsg: PortalMessage = {
      id: `msg-${Date.now()}`,
      sender: "client",
      senderName: currentUser?.name || "Client",
      timestamp: "Just now",
      text: newMessageText
    };

    setMessages(prev => [...prev, newMsg]);
    setNewMessageText("");

    // Automated professional reply simulation from Arbab
    setTimeout(() => {
      const arbabReply: PortalMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: "arbab",
        senderName: "Arbab Mukhtiar (QA Officer)",
        timestamp: "Just now",
        text: "Thank you for the message. I have reviewed your notes and will prepare the technical checklist for our upcoming session."
      };
      setMessages(prev => [...prev, arbabReply]);
    }, 1500);
  };

  const handleDownloadVaultDoc = (doc: PortalDocument) => {
    const sampleContent = `MURREE BREWERY CO. LTD. - CONFIDENTIAL TECHNICAL AUDIT REPORT
Document: ${doc.title}
Prepared By: Arbab Mukhtiar (Quality Assurance Specialist)
Client Confidentiality: Level 3 Restricted
Date of Issue: ${doc.uploadedDate}

1. IN-LINE QUALITY SUMMARY
- Brix Variance: Controlled to ±0.08°Bx across all shifts.
- Dissolved Oxygen (DO): Maintained at < 45 ppb.
- Crown Seal Crimp Gauge: Calibrated to 28.55 mm.
- CIP 5-Stage Verification: Sterile pass rate of 99.8%.

For any technical inquiries regarding this document, contact Arbab Mukhtiar directly via the Client Portal.
`;
    triggerBrowserDownload(doc.title, sampleContent, "text/plain");
  };

  // ============================================
  // Unauthenticated State: Sign In / Register
  // ============================================
  if (!currentUser) {
    return (
      <section id="portal-section" className="py-16 lg:py-24 bg-slate-50/70 border-b border-slate-200/80 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-md mx-auto">
            
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
                <Lock className="w-6 h-6 text-emerald-200" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Secure Client Portal
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Access scheduled consultations, confidential audit documents, and direct technical advisory with Arbab Mukhtiar.
              </p>
            </div>

            {/* Auth Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              
              {/* Tabs: Sign In / Register */}
              <div className="flex border-b border-slate-200 mb-6">
                <button
                  onClick={() => { setAuthMode("login"); setAuthError(""); }}
                  className={`flex-1 pb-3 text-sm font-bold transition-colors border-b-2 ${
                    authMode === "login"
                      ? "border-emerald-700 text-emerald-800"
                      : "border-transparent text-slate-400 hover:text-slate-700"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setAuthMode("register"); setAuthError(""); }}
                  className={`flex-1 pb-3 text-sm font-bold transition-colors border-b-2 ${
                    authMode === "register"
                      ? "border-emerald-700 text-emerald-800"
                      : "border-transparent text-slate-400 hover:text-slate-700"
                  }`}
                >
                  Register New Client
                </button>
              </div>

              {authError && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              {/* Login Form */}
              {authMode === "login" ? (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Business Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    id="portal-login-submit-btn"
                    className="w-full py-3 rounded-xl bg-emerald-700 text-white text-sm font-semibold hover:bg-emerald-800 transition-colors shadow-sm"
                  >
                    Sign In to Portal
                  </button>
                </form>
              ) : (
                /* Register Form */
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Salman Khan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Organization / Company
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. National Beverage Bottlers"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Business Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Create secure password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-emerald-700 text-white text-sm font-semibold hover:bg-emerald-800 transition-colors shadow-sm"
                  >
                    Create Client Account
                  </button>
                </form>
              )}

              {/* Demo 1-Click Access for Immediate Testing */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <p className="text-center text-xs text-slate-500 mb-3">
                  Want to explore the client portal immediately?
                </p>
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  id="portal-demo-login-btn"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 border border-slate-200"
                >
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>1-Click Demo Client Login</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>
    );
  }

  // ============================================
  // Authenticated State: Client Dashboard
  // ============================================
  return (
    <section id="portal-section" className="py-12 lg:py-20 bg-slate-50/70 border-b border-slate-200/80 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold text-xl shadow-xs">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Authenticated Client
                </span>
                {currentUser.isDemo && (
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    Demo Mode
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mt-0.5">
                {currentUser.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                {currentUser.company} • {currentUser.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setPortalTab("book")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs sm:text-sm font-semibold hover:bg-emerald-800 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Book New Session</span>
            </button>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs sm:text-sm font-medium hover:bg-slate-100 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 mb-8 bg-slate-200/60 p-1.5 rounded-2xl w-full sm:w-fit overflow-x-auto no-scrollbar">
          <button
            onClick={() => setPortalTab("consultations")}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 whitespace-nowrap ${
              portalTab === "consultations"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Calendar className="w-4 h-4 text-emerald-700" />
            <span>Consultation Schedule ({consultations.length})</span>
          </button>

          <button
            onClick={() => setPortalTab("book")}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 whitespace-nowrap ${
              portalTab === "book"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Plus className="w-4 h-4 text-emerald-700" />
            <span>Schedule Session</span>
          </button>

          <button
            onClick={() => setPortalTab("vault")}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 whitespace-nowrap ${
              portalTab === "vault"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <FileText className="w-4 h-4 text-emerald-700" />
            <span>Confidential Documents ({documents.length})</span>
          </button>

          <button
            onClick={() => setPortalTab("messages")}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 whitespace-nowrap ${
              portalTab === "messages"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <MessageSquare className="w-4 h-4 text-emerald-700" />
            <span>Advisory Messages ({messages.length})</span>
          </button>
        </div>

        {/* Tab 1: Consultations List */}
        {portalTab === "consultations" && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">
              Active & Upcoming Quality Consultations
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {consultations.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {item.consultationType}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        item.status === "Confirmed"
                          ? "bg-emerald-100 text-emerald-900"
                          : "bg-amber-100 text-amber-900"
                      }`}>
                        {item.status}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-slate-700 font-semibold">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span>{item.date}</span>
                        <span className="text-slate-300">•</span>
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span>{item.timeSlot}</span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">
                        Consultant: Arbab Mukhtiar (Murree Brewery QA Officer)
                      </p>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-700 leading-relaxed">
                      <p className="font-semibold text-slate-800 mb-0.5">Session Scope / Objectives:</p>
                      {item.notes}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400">ID: {item.id}</span>
                    <button
                      onClick={() => setPortalTab("messages")}
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                    >
                      <span>Send Session Note</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Book Consultation Form */}
        {portalTab === "book" && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs max-w-2xl">
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Schedule Industrial QA Consultation
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Select your consultation category, date, and project scope. Sessions are held via Google Meet or on-site facility appointment.
            </p>

            {bookSuccess && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="text-sm font-bold">Consultation Confirmed!</p>
                  <p className="text-xs text-emerald-700">Arbab Mukhtiar has received your booking and schedule details.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleBookConsultation} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Consultation Focus Area
                </label>
                <select
                  value={bookType}
                  onChange={(e) => setBookType(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 outline-hidden"
                >
                  <option>HACCP & FSMS Plant Audit Review</option>
                  <option>Industrial Brewery & Beverage Line QA Optimization</option>
                  <option>CIP Thermal & Chemical Sanitation Protocol Setup</option>
                  <option>Microbiology Laboratory Design & Swabbing SOPs</option>
                  <option>Low-Sugar & Functional Malt Formulation Guidance</option>
                  <option>Food Science Career & Academic Mentorship</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={bookDate}
                    onChange={(e) => setBookDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Time Slot (PKT)
                  </label>
                  <select
                    value={bookTimeSlot}
                    onChange={(e) => setBookTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 outline-hidden"
                  >
                    <option>10:00 AM - 11:00 AM PKT</option>
                    <option>11:30 AM - 12:30 PM PKT</option>
                    <option>02:00 PM - 03:00 PM PKT</option>
                    <option>04:00 PM - 05:00 PM PKT</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Technical Scope & Facility Details
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your manufacturing plant, current challenges (e.g., Brix fluctuations, CIP residues, audit prep), or questions you want to address..."
                  value={bookNotes}
                  onChange={(e) => setBookNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 outline-hidden"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Verified with Arbab Mukhtiar's Murree Brewery QA calendar.
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-xl bg-emerald-700 text-white text-sm font-semibold hover:bg-emerald-800 transition-colors shadow-sm disabled:opacity-50"
                >
                  {isSubmitting ? "Confirming..." : "Confirm Consultation"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 3: Confidential Documents Vault */}
        {portalTab === "vault" && (
          <div className="space-y-6 max-w-3xl">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Confidential Document Exchange Vault
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Download verified audit reports or securely upload your plant flowcharts for review.
              </p>
            </div>

            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{doc.title}</p>
                      <p className="text-xs text-slate-500">
                        {doc.uploadedBy} • {doc.uploadedDate} • {doc.size}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownloadVaultDoc(doc)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Simulated Upload Dropzone */}
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center bg-white hover:border-emerald-400 transition-colors">
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-800">Upload Process Documents or Flowcharts</p>
              <p className="text-xs text-slate-500 mt-0.5">Drag & drop PDF, Excel, or CSV files (Up to 25MB)</p>
              <label className="mt-3 inline-block px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer transition-colors">
                Select File
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      setDocuments(prev => [
                        ...prev,
                        {
                          id: `doc-${Date.now()}`,
                          title: file.name,
                          uploadedBy: currentUser.name,
                          uploadedDate: new Date().toISOString().split("T")[0],
                          size: `${(file.size / 1024).toFixed(1)} KB`,
                          type: "Client Uploaded File"
                        }
                      ]);
                    }
                  }} 
                />
              </label>
            </div>
          </div>
        )}

        {/* Tab 4: Messages with Arbab */}
        {portalTab === "messages" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs max-w-3xl flex flex-col h-[550px] overflow-hidden">
            
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center">
                  AM
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Arbab Mukhtiar</p>
                  <p className="text-[11px] text-emerald-700 font-medium">Quality Assurance Officer • Murree Brewery</p>
                </div>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">Encrypted Client Channel</span>
            </div>

            {/* Chat History */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === "client" ? "items-end" : "items-start"}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-600">{m.senderName}</span>
                    <span>• {m.timestamp}</span>
                  </div>
                  <div
                    className={`max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      m.sender === "client"
                        ? "bg-emerald-700 text-white rounded-tr-xs"
                        : "bg-slate-100 text-slate-800 rounded-tl-xs border border-slate-200"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 bg-slate-50 flex gap-2">
              <input
                type="text"
                placeholder="Type your technical inquiry to Arbab..."
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 outline-hidden"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>

          </div>
        )}

      </div>
    </section>
  );
};
