import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory consultations store
const consultationsStore = [
  {
    id: "consult-demo-101",
    clientName: "Punjab Beverage Mills QA Team",
    clientEmail: "qa@punjabbeveragemills.pk",
    consultationType: "HACCP & CCP Verification Audit",
    date: "2026-09-22",
    timeSlot: "11:00 AM - 12:30 PM PKT",
    status: "Confirmed",
    notes: "Reviewing carbonation line CCP-2 pasteurizer temperature loggers and CIP rinse conductivity benchmarks.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "consult-demo-102",
    clientName: "Kashmir Pure Springs Ltd.",
    clientEmail: "tech@kashmirsprings.com",
    consultationType: "Microbial Testing & Water Treatment Setup",
    date: "2026-09-28",
    timeSlot: "02:00 PM - 03:00 PM PKT",
    status: "In Review",
    notes: "Assessing reverse osmosis membrane sanitization frequency and Coliform/E.coli membrane filtration tests.",
    createdAt: new Date().toISOString(),
  }
];

// Health Check
app.get("/api/health", (_req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Consultation endpoints
app.get("/api/consultations", (_req, res) => {
  res.json({ success: true, data: consultationsStore });
});

app.post("/api/consultations", (req, res) => {
  const { clientName, clientEmail, consultationType, date, timeSlot, notes, company, phone } = req.body;
  
  if (!clientName || !clientEmail || !consultationType || !date) {
    return res.status(400).json({ success: false, error: "Missing required fields." });
  }

  const newBooking = {
    id: `consult-${Date.now()}`,
    clientName,
    clientEmail,
    company: company || "Independent Professional",
    phone: phone || "Not specified",
    consultationType,
    date,
    timeSlot: timeSlot || "10:00 AM - 11:00 AM PKT",
    status: "Confirmed",
    notes: notes || "Initial technical consultation booking with Arbab Mukhtiar.",
    createdAt: new Date().toISOString(),
  };

  consultationsStore.unshift(newBooking);
  res.status(201).json({ success: true, data: newBooking });
});

// AI Food Safety & HACCP Guidance Assistant
app.post("/api/ai/ask-food-safety", async (req, res) => {
  const { question, context } = req.body;
  if (!question) {
    return res.status(400).json({ error: "Question is required." });
  }

  // If GEMINI_API_KEY is available, use GoogleGenAI
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `You are the AI Food Safety & QA Consultant for Arbab Mukhtiar's professional website. Arbab is a Food Scientist (BS Food Science & Technology) and Quality Assurance Officer at Murree Brewery Co. with 2.5+ years of industry experience.
Provide precise, industry-standard technical advice adhering to HACCP, ISO 22000, Codex Alimentarius, FDA/WHO, and industrial beverage/food QA standards. Include critical control points (CCPs), target temperatures, pH, Brix, or microbiological thresholds where applicable. Keep the tone authoritative, scientific, and clear.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [{ text: `${systemInstruction}\n\nContext: ${context || 'General Food Safety / Brewing QA'}\nQuestion: ${question}` }]
          }
        ]
      });

      const reply = response.text || "No response generated.";
      return res.json({ success: true, answer: reply, source: "gemini-2.5-flash" });
    } catch (err: any) {
      console.warn("Gemini API call failed, falling back to expert QA rules engine:", err?.message);
    }
  }

  // Fallback intelligent QA responses based on Arbab's Murree Brewery QA & Food Science Knowledge Base
  const lower = question.toLowerCase();
  let answer = "";

  if (lower.includes("pasteur") || lower.includes("pu") || lower.includes("temperature")) {
    answer = `**Pasteurization & Thermal Process Standard (Beverage & Brewing QA):**
- **Pasteurization Units (PU) Formula:** $PU = t \\times 1.393^{(T - 60)}$ where $t$ is holding time in minutes and $T$ is temperature in °C.
- **For Carbonated Malt & Beer Beverages:** Typical target is **15 to 25 PU** (ensuring inactivation of wild yeast like *Saccharomyces diastaticus* and spoilage bacteria like *Lactobacillus* and *Pediococcus*).
- **For Non-Carbonated Juices/Syrups:** Hot-fill holding at 85°C–88°C for 30–60 seconds, or 90°C for high-acid beverages ($pH < 4.2$).
- **Critical Limits:** Under-pasteurization ($<10 PU$) risks refermentation and bottle bursting; over-pasteurization ($>35 PU$) induces Maillard thermal staling and cardboard off-flavors.`;
  } else if (lower.includes("brix") || lower.includes("sugar") || lower.includes("refractometer")) {
    answer = `**Brix & Specific Gravity Standard (In-Line Beverage QA):**
- **Instrument Calibration:** Calibrate optical and digital benchtop refractometers (e.g. Anton Paar) daily using double-distilled deionized water ($0.00 \\pm 0.02^{\\circ}Bx$ at 20.0°C reference temperature).
- **Temperature Compensation:** Always apply automatic temperature compensation (ATC) or thermal equilibrium water bath.
- **Inversion Correction:** In sucrose-sweetened beverages with organic acidulants (citric, phosphoric), sucrose hydrolyzes into glucose and fructose over shelf life, causing an apparent Brix shift (+0.1 to +0.3°Bx). Standardize sampling at 20°C after complete degassing via vacuum filtration or ultrasonic bath.`;
  } else if (lower.includes("cip") || lower.includes("clean") || lower.includes("sanitiz") || lower.includes("caustic")) {
    answer = `**Clean-In-Place (CIP) 5-Step Validation Protocol:**
1. **Pre-Rinse:** Ambient potable water for 10–15 mins to purge 90% of organic residues.
2. **Caustic Wash:** 1.5% - 2.5% Sodium Hydroxide ($NaOH$) at 75°C - 80°C for 25–40 minutes (effective organic & protein dissolution).
3. **Intermediate Rinse:** Soft water flush until effluent pH reaches neutral ($pH \\le 7.5$).
4. **Acid Wash (Periodic/Scale):** 0.8% - 1.2% Nitric or Phosphoric acid at 60°C for 15–20 minutes to eliminate calcium oxalate ("beer stone") and mineral scale.
5. **Sanitization:** Peracetic Acid (PAA) at 150–250 ppm or hot water ($>85^{\\circ}C$ for 20 minutes). Verify final rinse with ATP bioluminescence swab ($< 10$ RLU target).`;
  } else if (lower.includes("haccp") || lower.includes("ccp") || lower.includes("iso 22000")) {
    answer = `**HACCP & CCP Identification in Beverage Processing:**
- **CCP 1 - Water Purification & Carbon Filtration:** Continuous monitoring of free chlorine ($< 0.02 ppm$ post-carbon filter) and UV intensity ($> 400 J/m^2$) to eliminate pathogens without leaving chlorinated halophenols.
- **CCP 2 - Final Membrane Filtration / Tunnel Pasteurization:** Differential pressure limit across 0.45 µm cartridge filters, and calibrated PU loggers on every lane.
- **CCP 3 - Foreign Body / Crown Cap Inspection:** High-speed in-line camera and under-crown vacuum/pressure rejection sensors.
- **Verification Audit:** Daily review of continuous sensor logs, positive swab verification, and monthly challenge testing of rejection solenoids.`;
  } else if (lower.includes("micro") || lower.includes("bacteria") || lower.includes("coliform") || lower.includes("yeast")) {
    answer = `**Microbiological Specifications for Bottled Beverages & Water:**
- **Total Viable Count (TVC):** $< 100 CFU/mL$ in treated process water; $< 10 CFU/mL$ in carbonated beverages.
- **Total Coliforms & E. coli:** $0 CFU / 100 mL$ (Membrane filtration using m-Endo or Chromogenic media).
- **Yeast & Mould:** $< 1 CFU / 100 mL$ (incubated on Sabouraud Dextrose Agar / YPD at 25°C for 5 days).
- **Lactic Acid Bacteria (*Lactobacillus, Pediococcus*):** Absent in beer and malt beverages (anaerobic incubation in MRS agar with actidione).`;
  } else {
    answer = `**Food Safety & Quality Assurance Advisory from Arbab Mukhtiar:**
Food safety excellence in modern industrial plants requires strict synergy between:
1. **Prerequisite Programs (PRPs/GMP):** Facility sanitary zoning, positive air pressurization in filling halls, pest control exclusion, and rigorous personnel hygiene.
2. **Process Validation:** Verifying that critical heating, filtration, and CIP regimes consistently achieve the required 5-log microbial reduction.
3. **Data Integrity & Traceability:** Automated logging of batch numbers, raw material COAs, packaging lot codes, and warehouse temperature controls.

Feel free to schedule a dedicated technical consultation in the Client Portal for custom plant audits, HACCP design, or lab SOP setup!`;
  }

  return res.json({
    success: true,
    answer,
    source: "arbab-expert-qa-engine",
    note: "Response grounded in Arbab Mukhtiar's Murree Brewery QA & Food Science knowledge base."
  });
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Arbab Mukhtiar QA Site server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
