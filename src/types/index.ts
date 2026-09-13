export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  category: "HACCP" | "ISO & Standards" | "Hygiene & GMP" | "Laboratory & Quality" | "Auditing";
  description: string;
  skills: string[];
  status: "Active" | "Verified";
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  duration: string;
  type: "Full-time" | "Project" | "Academic";
  summary: string;
  responsibilities: string[];
  laboratoryEquipment: string[];
  keyAchievements: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  company: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics: { label: string; value: string }[];
  tags: string[];
}

export interface TechnicalGuide {
  id: string;
  slug: string;
  title: string;
  category: "Brewery & Beverage QA" | "HACCP & Compliance" | "Microbiology & Hygiene" | "Nutrition & Health" | "Standard Operating Procedures";
  readTime: string;
  lastUpdated: string;
  summary: string;
  audience: string;
  keyParameters: { parameter: string; standard: string; criticalLimit: string }[];
  content: {
    introduction: string;
    scope: string;
    procedureSteps: { step: number; title: string; detail: string; warning?: string }[];
    monitoringAndRecords: string;
    correctiveActions: string;
    references: string[];
  };
}

export interface DownloadableResource {
  id: string;
  title: string;
  category: "Audit Checklists" | "SOP Templates" | "QA Daily Logs" | "Calculators & Spreadsheets" | "Regulatory Standards";
  fileType: "CSV / Excel" | "PDF Document" | "Markdown / SOP" | "JSON Template";
  fileSize: string;
  downloadsCount: number;
  description: string;
  contentGenerator: () => { filename: string; mimeType: string; content: string };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishDate: string;
  readTime: string;
  category: "Beverage Technology" | "Food Microbiology" | "Quality Systems" | "Nutrition Trends";
  tags: string[];
  coverImage?: string;
  content: string;
}

export interface UserAccount {
  id: string;
  email: string;
  name: string;
  company: string;
  role: string;
  phone?: string;
  isDemo?: boolean;
}

export interface ConsultationBooking {
  id: string;
  clientName: string;
  clientEmail: string;
  company: string;
  phone?: string;
  consultationType: string;
  date: string;
  timeSlot: string;
  status: "Confirmed" | "In Review" | "Completed" | "Rescheduled";
  notes: string;
  createdAt: string;
  attachments?: string[];
}

export interface PortalDocument {
  id: string;
  title: string;
  uploadedBy: string;
  uploadedDate: string;
  size: string;
  type: string;
  downloadUrl?: string;
}

export interface PortalMessage {
  id: string;
  sender: "client" | "arbab";
  senderName: string;
  timestamp: string;
  text: string;
}
