import React, { useState } from "react";
import { 
  Calculator, 
  Flame, 
  Droplet, 
  FlaskConical, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  RefreshCw,
  Cpu
} from "lucide-react";

export const QAToolsSection: React.FC = () => {
  const [activeTool, setActiveTool] = useState<"pu" | "brix" | "cip" | "ai">("pu");

  // 1. PU Calculator State
  const [tempC, setTempC] = useState<number>(63.5);
  const [timeMin, setTimeMin] = useState<number>(12);

  // Formula: PU = t * 1.393^(T - 60)
  const calculatePU = () => {
    if (tempC < 50) return 0;
    const pu = timeMin * Math.pow(1.393, tempC - 60);
    return Math.round(pu * 10) / 10;
  };

  const calculatedPU = calculatePU();

  // 2. Brix Converter State
  const [inputBrix, setInputBrix] = useState<number>(11.2);
  // SG approx: 1 + (Brix / (258.6 - ((Brix / 258.2) * 227.1)))
  const calculateSG = (brix: number) => {
    const sg = 1 + (brix / (258.6 - ((brix / 258.2) * 227.1)));
    return Math.round(sg * 10000) / 10000;
  };
  const calculatedSG = calculateSG(inputBrix);
  const sugarGPerL = Math.round(inputBrix * 10 * calculatedSG * 10) / 10;

  // 3. CIP Dosing Calculator State
  const [tankVolumeL, setTankVolumeL] = useState<number>(5000);
  const [chemicalType, setChemicalType] = useState<"caustic" | "paa">("caustic");
  const [targetConc, setTargetConc] = useState<number>(2.0); // 2.0% for caustic or 200 ppm for PAA

  const calculateCIPDose = () => {
    if (chemicalType === "caustic") {
      // Stock Caustic is usually 50% w/w liquid NaOH (~density 1.52)
      // Volume needed = (Tank Volume * Target %) / Stock Conc %
      const stockConc = 50; // 50% stock
      const volumeLitres = (tankVolumeL * targetConc) / stockConc;
      return {
        amount: Math.round(volumeLitres * 10) / 10,
        unit: "Litres of 50% liquid NaOH",
        safetyNote: "Add caustic to water slowly. Maintain eye-wash station readiness."
      };
    } else {
      // Stock PAA is typically 15% active peracetic acid
      // Target is ppm (parts per million). 1 ppm = 1 mg/L = 0.0001%
      // Litres needed = (Tank Volume in L * Target ppm) / (Stock % * 10,000)
      const stockPAAPercent = 15;
      const volumeLitres = (tankVolumeL * targetConc) / (stockPAAPercent * 10000);
      return {
        amount: Math.round(volumeLitres * 1000) / 1000,
        unit: "Litres of 15% Peracetic Acid",
        safetyNote: "Verify final rinse with test strip or titration to assure < 2 ppm residue before filling."
      };
    }
  };

  const cipResult = calculateCIPDose();

  // 4. AI Food Safety Assistant State
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [aiSource, setAiSource] = useState<string | null>(null);

  const sampleQuestions = [
    "What are the critical limits for tunnel pasteurization of malt beverages?",
    "How do you test and prevent wild yeast spoilage in bottling lines?",
    "What is the recommended 5-stage CIP cycle for syrup distribution loops?",
    "How to maintain dissolved oxygen under 50 ppb during crown corking?"
  ];

  const handleAskAI = async (queryToAsk?: string) => {
    const query = queryToAsk || aiQuestion;
    if (!query.trim()) return;

    setAiLoading(true);
    setAiAnswer(null);

    try {
      const response = await fetch("/api/ai/ask-food-safety", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: query,
          context: "Food Safety, HACCP, Murree Brewery QA & Beverage Technology"
        })
      });

      if (!response.ok) {
        throw new Error("Failed to contact QA API");
      }

      const data = await response.json();
      setAiAnswer(data.answer);
      setAiSource(data.source);
    } catch (err: any) {
      // Fallback
      setAiAnswer(
        `**Food Safety Guidance Note:** In industrial beverage manufacturing, ensure continuous calibration of temperature probes, maintain positive air pressure in filling enclosures, and conduct daily ATP swab tests (< 10 RLU) on critical valve seats.\n\nFor customized plant auditing, feel free to book a direct consultation with Arbab Mukhtiar in the Client Portal.`
      );
      setAiSource("arbab-offline-rules");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <section id="tools-section" className="py-16 lg:py-24 bg-slate-50/70 border-b border-slate-200/80 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100/70 text-emerald-800 border border-emerald-300/60 mb-3">
            <Calculator className="w-3.5 h-3.5 text-emerald-700" />
            <span>Interactive Industrial Benchmarks</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Food Safety & QA Engineering Calculators
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Practical calculators and AI-grounded guidance for beverage pasteurization, sugar density conversions, CIP chemical dosing, and HACCP compliance.
          </p>
        </div>

        {/* Tool Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <button
            onClick={() => setActiveTool("pu")}
            className={`p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${
              activeTool === "pu"
                ? "bg-white border-emerald-600 shadow-sm ring-2 ring-emerald-600/10"
                : "bg-white/60 border-slate-200 hover:bg-white"
            }`}
          >
            <div className={`p-2 rounded-lg ${activeTool === "pu" ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-600"}`}>
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Thermal Process</p>
              <p className="text-sm font-bold text-slate-900">Pasteurization (PU)</p>
            </div>
          </button>

          <button
            onClick={() => setActiveTool("brix")}
            className={`p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${
              activeTool === "brix"
                ? "bg-white border-emerald-600 shadow-sm ring-2 ring-emerald-600/10"
                : "bg-white/60 border-slate-200 hover:bg-white"
            }`}
          >
            <div className={`p-2 rounded-lg ${activeTool === "brix" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"}`}>
              <Droplet className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">In-Line Refractometry</p>
              <p className="text-sm font-bold text-slate-900">Brix & SG Converter</p>
            </div>
          </button>

          <button
            onClick={() => setActiveTool("cip")}
            className={`p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${
              activeTool === "cip"
                ? "bg-white border-emerald-600 shadow-sm ring-2 ring-emerald-600/10"
                : "bg-white/60 border-slate-200 hover:bg-white"
            }`}
          >
            <div className={`p-2 rounded-lg ${activeTool === "cip" ? "bg-blue-100 text-blue-800" : "bg-slate-100 text-slate-600"}`}>
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Sanitation Chem</p>
              <p className="text-sm font-bold text-slate-900">CIP Dosing Calculator</p>
            </div>
          </button>

          <button
            onClick={() => setActiveTool("ai")}
            className={`p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${
              activeTool === "ai"
                ? "bg-white border-emerald-600 shadow-sm ring-2 ring-emerald-600/10"
                : "bg-white/60 border-slate-200 hover:bg-white"
            }`}
          >
            <div className={`p-2 rounded-lg ${activeTool === "ai" ? "bg-purple-100 text-purple-800" : "bg-slate-100 text-slate-600"}`}>
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Gemini AI Assistant</p>
              <p className="text-sm font-bold text-slate-900">Food Safety QA AI</p>
            </div>
          </button>
        </div>

        {/* 1. Pasteurization Tool */}
        {activeTool === "pu" && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="max-w-2xl">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Pasteurization Units (PU) Calculator
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6">
                Based on the standard brewing and beverage industry Del Vecchio equation: <code className="bg-slate-100 px-2 py-0.5 rounded-md font-mono text-emerald-800 font-semibold">PU = t × 1.393^(T - 60)</code>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Pasteurization Temperature (°C): <span className="text-emerald-700 text-sm font-bold">{tempC}°C</span>
                  </label>
                  <input
                    type="range"
                    min="55"
                    max="75"
                    step="0.1"
                    value={tempC}
                    onChange={(e) => setTempC(parseFloat(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                    <span>55.0°C</span>
                    <span>60.0°C (Base)</span>
                    <span>75.0°C</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Holding Time (Minutes): <span className="text-emerald-700 text-sm font-bold">{timeMin} min</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="0.5"
                    value={timeMin}
                    onChange={(e) => setTimeMin(parseFloat(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                    <span>1.0 min</span>
                    <span>15.0 min</span>
                    <span>30.0 min</span>
                  </div>
                </div>
              </div>

              {/* Result Callout */}
              <div className="p-5 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Calculated Thermal Inactivation</p>
                  <p className="text-3xl font-extrabold text-emerald-400 mt-1">{calculatedPU} <span className="text-lg font-normal text-slate-300">PU</span></p>
                </div>

                <div className="text-right sm:text-left">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold inline-block ${
                    calculatedPU < 10
                      ? "bg-rose-900/80 text-rose-200 border border-rose-700"
                      : calculatedPU <= 25
                      ? "bg-emerald-900/80 text-emerald-200 border border-emerald-700"
                      : "bg-amber-900/80 text-amber-200 border border-amber-700"
                  }`}>
                    {calculatedPU < 10
                      ? "Under-Pasteurized (<10 PU)"
                      : calculatedPU <= 25
                      ? "Optimal Industry Standard (15-25 PU)"
                      : "High Thermal Load (>25 PU - Risk Staling)"}
                  </span>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Standard target for Murree Brewery malt & carbonated lines: 15–20 PU
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 2. Brix Converter Tool */}
        {activeTool === "brix" && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="max-w-2xl">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Brix & Specific Gravity (SG) Converter
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6">
                Accurately convert refractometer degrees Brix (°Bx) to specific gravity and dissolved sucrose weight per litre at standard 20°C calibration temperature.
              </p>

              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Observed Brix Reading (°Bx at 20°C):
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="0.05"
                    min="0"
                    max="40"
                    value={inputBrix}
                    onChange={(e) => setInputBrix(parseFloat(e.target.value) || 0)}
                    className="w-40 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-lg font-bold text-slate-900 focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 outline-hidden"
                  />
                  <span className="text-sm font-semibold text-slate-500">°Brix</span>
                </div>
              </div>

              {/* Conversion Outputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Specific Gravity (SG)</p>
                  <p className="text-2xl font-extrabold text-slate-900 mt-1">{calculatedSG}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Ratio to pure water @ 20°C</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Soluble Sugars</p>
                  <p className="text-2xl font-extrabold text-emerald-700 mt-1">{sugarGPerL} <span className="text-sm font-normal">g/L</span></p>
                  <p className="text-[11px] text-slate-500 mt-0.5">~{(sugarGPerL / 4).toFixed(1)} tsp/litre</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Degree Plato (°P)</p>
                  <p className="text-2xl font-extrabold text-slate-900 mt-1">{inputBrix.toFixed(2)}°P</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Brewing extract equivalent</p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 3. CIP Dosing Tool */}
        {activeTool === "cip" && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="max-w-2xl">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Clean-In-Place (CIP) Chemical Dosing Calculator
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6">
                Calculate chemical additions for stainless steel tanks, piping loops, and pasteurizer wash vessels based on industrial concentrations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Chemical Agent:
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setChemicalType("caustic"); setTargetConc(2.0); }}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-colors ${
                        chemicalType === "caustic"
                          ? "bg-emerald-700 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      Caustic Soda (NaOH)
                    </button>
                    <button
                      onClick={() => { setChemicalType("paa"); setTargetConc(200); }}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-colors ${
                        chemicalType === "paa"
                          ? "bg-emerald-700 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      Peracetic Acid (PAA)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Wash Water Volume (Litres):
                  </label>
                  <input
                    type="number"
                    step="100"
                    min="100"
                    max="50000"
                    value={tankVolumeL}
                    onChange={(e) => setTankVolumeL(parseFloat(e.target.value) || 0)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-hidden"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Target Concentration: {chemicalType === "caustic" ? `${targetConc}% w/w` : `${targetConc} ppm`}
                </label>
                <input
                  type="range"
                  min={chemicalType === "caustic" ? "0.5" : "50"}
                  max={chemicalType === "caustic" ? "4.0" : "500"}
                  step={chemicalType === "caustic" ? "0.1" : "25"}
                  value={targetConc}
                  onChange={(e) => setTargetConc(parseFloat(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>

              {/* Dosing Result */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-900">Required Chemical Addition</p>
                <p className="text-2xl font-extrabold text-emerald-900 mt-1">
                  {cipResult.amount} <span className="text-base font-medium">{cipResult.unit}</span>
                </p>
                <p className="text-xs text-slate-600 mt-2">
                  <strong>Sanitation Safety:</strong> {cipResult.safetyNote}
                </p>
              </div>

            </div>
          </div>
        )}

        {/* 4. AI Food Safety Assistant */}
        {activeTool === "ai" && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    AI Food Safety & HACCP Assistant
                  </h3>
                  <p className="text-xs text-slate-500">
                    Trained on Food Science principles, Codex Alimentarius, and Arbab Mukhtiar’s Murree Brewery QA protocols.
                  </p>
                </div>
              </div>

              {/* Sample Prompt Chips */}
              <div className="mt-4 mb-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Frequently Asked QA Questions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {sampleQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setAiQuestion(q);
                        handleAskAI(q);
                      }}
                      className="text-xs text-left font-medium bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Query Input Box */}
              <div className="relative mt-2">
                <textarea
                  rows={3}
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  placeholder="Ask any question about food safety, microbiological testing, HACCP CCP limits, or beverage QA..."
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 outline-hidden transition-all"
                />
                <button
                  onClick={() => handleAskAI()}
                  disabled={aiLoading || !aiQuestion.trim()}
                  className="absolute right-3 bottom-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {aiLoading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Consult AI</span>
                    </>
                  )}
                </button>
              </div>

              {/* AI Answer Box */}
              {aiAnswer && (
                <div className="mt-6 p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                    <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      QA Technical Advisory
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Engine: {aiSource || "Gemini Flash"}
                    </span>
                  </div>

                  <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2 whitespace-pre-wrap font-sans">
                    {aiAnswer}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
