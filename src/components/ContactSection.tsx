import React, { useState } from "react";
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  CheckCircle2, 
  Building2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  ShieldCheck
} from "lucide-react";
import { ARBAB_PROFILE } from "../data/profileData";

export const ContactSection: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Technical Inquiry");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "What types of industrial quality assurance advisory do you provide?",
      a: "I provide comprehensive technical advisory covering HACCP system design, beverage line Brix/CO2 stabilization, CIP chemical and thermal validation, microbiological water and air testing setup, and ISO 22000 / FSSC 22000 audit readiness for beverage and food processing plants."
    },
    {
      q: "Can you assist students and early-career food technologists in Pakistan?",
      a: "Yes! Having graduated with a BS in Food Science & Technology and transitioned directly into Murree Brewery QA operations, I provide active career mentorship, thesis advisory, and laboratory test guidance to students across Azad Kashmir and Pakistan."
    },
    {
      q: "How can I book a facility audit or consultation?",
      a: "You can schedule directly through our secure Client Portal or submit the inquiry form below. I typically respond to all corporate and professional inquiries within 24 business hours."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
    }, 1000);
  };

  return (
    <section id="contact-section" className="py-16 lg:py-24 bg-white text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100/70 text-emerald-800 border border-emerald-300/60 mb-3">
            <Mail className="w-3.5 h-3.5 text-emerald-700" />
            <span>Connect Directly</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Get in Touch with Arbab Mukhtiar
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Have a question about food safety regulations, industrial beverage processing, or quality assurance protocols? Send a message or schedule a direct consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Info & FAQs */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Contact Cards */}
            <div className="space-y-4">
              
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-100/70 text-emerald-800 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Official Direct Email</p>
                  <a 
                    href={`mailto:${ARBAB_PROFILE.email}`} 
                    className="text-sm sm:text-base font-bold text-slate-900 hover:text-emerald-700 transition-colors"
                  >
                    {ARBAB_PROFILE.email}
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">Average response within 24 hours</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-100/70 text-emerald-800 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Industry Base</p>
                  <p className="text-sm font-bold text-slate-900">Murree Brewery Co. Ltd.</p>
                  <p className="text-xs text-slate-500">Quality Assurance Department, Rawalpindi</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-100/70 text-emerald-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Regional Roots</p>
                  <p className="text-sm font-bold text-slate-900">Azad Kashmir, Pakistan</p>
                  <p className="text-xs text-slate-500">Serving manufacturing facilities across Pakistan</p>
                </div>
              </div>

            </div>

            {/* FAQs Accordion */}
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-700" />
                <span>Frequently Asked Questions</span>
              </h3>

              <div className="space-y-2.5">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="rounded-xl border border-slate-200 overflow-hidden bg-white">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full p-3.5 text-left text-xs sm:text-sm font-bold text-slate-800 flex items-center justify-between gap-2 hover:bg-slate-50 transition-colors"
                    >
                      <span>{faq.q}</span>
                      {openFaq === idx ? (
                        <ChevronUp className="w-4 h-4 text-emerald-700 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {openFaq === idx && (
                      <div className="px-3.5 pb-3.5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2 bg-slate-50/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7 bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Send a Direct Message
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Leave your project details and inquiry below.
            </p>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-emerald-900">Message Dispatched Successfully!</h4>
                <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                  Thank you for reaching out. Arbab Mukhtiar will review your inquiry and follow up at <strong className="font-semibold">{email || "your email address"}</strong>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 px-4 py-2 bg-emerald-700 text-white text-xs font-semibold rounded-lg hover:bg-emerald-800"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Aamir Ali"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Subject / Area of Interest
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 outline-hidden"
                  >
                    <option>HACCP & FSMS Plant Audit Preparation</option>
                    <option>Industrial Brewery & Beverage Line QA Consultation</option>
                    <option>CIP Validation & Hygiene Standards Inquiry</option>
                    <option>Technical Documentation & SOP Commissioning</option>
                    <option>Academic or Career Mentorship</option>
                    <option>Other General Technical Question</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Your Message / Project Details
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Provide details on your facility, food safety requirements, or questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 outline-hidden"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Direct confidential delivery to Arbab Mukhtiar.
                  </span>

                  <button
                    type="submit"
                    id="contact-form-submit-btn"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 text-white text-sm font-semibold hover:bg-emerald-800 transition-colors shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
