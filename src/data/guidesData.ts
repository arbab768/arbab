import { TechnicalGuide } from "../types";

export const TECHNICAL_GUIDES: TechnicalGuide[] = [
  {
    id: "guide-brewery-qa-sop",
    slug: "brewery-beverage-routine-testing-sop",
    title: "Standard Operating Procedure: Routine Brix, pH, and Carbonation (CO2) In-Line Testing",
    category: "Brewery & Beverage QA",
    readTime: "8 min read",
    lastUpdated: "January 2026",
    summary: "Comprehensive laboratory protocol for monitoring specific gravity, sugar content, acidity, and carbon dioxide retention across high-speed beverage production lines.",
    audience: "Quality Control Technicians, Beverage Line Operators, Plant Chemists",
    keyParameters: [
      { parameter: "Brix (°Bx)", standard: "Recipe specific ±0.10 °Bx", criticalLimit: "±0.25 °Bx requires immediate filler stoppage" },
      { parameter: "Dissolved CO2", standard: "3.20 - 3.80 vol/vol (Carbonated soft drinks / Malt)", criticalLimit: "<3.00 vol causes flat taste; >4.20 vol risks bottle burst" },
      { parameter: "pH", standard: "2.80 - 3.40 (Acidified drinks); 4.0 - 4.4 (Malt)", criticalLimit: "±0.20 from benchmark specification" },
      { parameter: "Dissolved Oxygen (DO)", standard: "< 50 parts per billion (ppb)", criticalLimit: "> 100 ppb accelerates rapid oxidative flavor staling" }
    ],
    content: {
      introduction: "Maintaining rigorous physicochemical consistency across high-speed beverage packaging lines requires rapid, repeatable testing protocols. Deviations in Brix affect flavor balance and calorie declarations, while improper carbonation alters mouthfeel, foaming characteristics, and internal container pressures.",
      scope: "Applicable to all carbonated soft drinks, non-alcoholic malt beverages, and flavored waters processed at industrial bottling and canning plants.",
      procedureSteps: [
        {
          step: 1,
          title: "Sampling Frequency & Representative Collection",
          detail: "Collect three consecutive bottles or cans directly from the filler exit starwheel every 45 minutes of steady-state operation. Ensure samples are marked with line number, timestamp, and filler valve identity."
        },
        {
          step: 2,
          title: "Degassing and Sample Preparation for Brix/pH",
          detail: "Transfer 150 mL of beverage into an ultrasonic degassing bath or vacuum flask. Agitate for 3 minutes until effervescence ceases completely. Residual entrained CO2 bubbles will create optical distortion and inaccurate refractive index readings.",
          warning: "Never measure Brix on carbonated liquid directly; bubbles cause false positive refractive readings of up to +0.4 °Bx."
        },
        {
          step: 3,
          title: "Anton Paar / Digital Refractometer Brix Measurement",
          detail: "Rinse measuring prism with deionized water and blot dry with lint-free optical tissue. Dispense 1.0 mL of degassed sample. Confirm temperature has equilibrated to 20.0°C ± 0.1°C and record digital reading to two decimal places."
        },
        {
          step: 4,
          title: "Steinfurth / Haffmans CO2 Measurement",
          detail: "Take an intact, unopened sample. Measure container temperature via calibrated digital probe. Pierce container closure using piercing mechanism, snift headspace pressure, shake vigorously for 120 seconds to establish liquid-gas equilibrium, and read pressure gauge. Calculate volume ratio using Henry's Law chart or digital processor."
        }
      ],
      monitoringAndRecords: "Log all values into the shift QA Log Sheet immediately. Any value approaching 75% of the upper or lower specification limit requires notification to the syrup room technician.",
      correctiveActions: "If Brix or CO2 exceeds critical limits, halt line immediately. Quarantine all product produced since the last verified passing checkpoint. Adjust syrup metering ratio or carbonator chiller temperature accordingly.",
      references: [
        "ASBC (American Society of Brewing Chemists) Methods of Analysis: Beer-13 Carbon Dioxide",
        "Murree Brewery Quality Manual Section 4: Beverage Physicochemical Standards",
        "ISO 22000:2018 Clause 8.5.4: Monitoring systems for CCPs and OPRPs"
      ]
    }
  },
  {
    id: "guide-haccp-beverage",
    slug: "industrial-beverage-haccp-plan",
    title: "Industrial Beverage HACCP Plan: Identifying Biological, Chemical, & Physical CCPs",
    category: "HACCP & Compliance",
    readTime: "11 min read",
    lastUpdated: "February 2026",
    summary: "Systematic methodology for developing a bulletproof HACCP matrix from raw ingredient intake (malt, water, sugars) through tunnel pasteurization and packaging.",
    audience: "Food Safety Team Leaders, QA Managers, Internal Auditors",
    keyParameters: [
      { parameter: "Process Water UV Sterilization (CCP-1)", standard: "UV Dosage > 400 J/m²", criticalLimit: "< 350 J/m² triggers automatic divert valve" },
      { parameter: "Tunnel / Batch Pasteurization (CCP-2)", standard: "15 - 25 Pasteurization Units (PU)", criticalLimit: "< 12 PU requires product holding & re-evaluation" },
      { parameter: "Foreign Body Glass Inspection (CCP-3)", standard: "In-line empty bottle inspector (EBI)", criticalLimit: "100% rejection of chipped finishes or cracked sidewalls" }
    ],
    content: {
      introduction: "The Hazard Analysis and Critical Control Point (HACCP) system is a preventive science-based management system. In liquid beverage operations, prevention of microbial pathogens, foreign glass matter, and chemical allergen cross-contact is vital for consumer safety and legal compliance.",
      scope: "Covers all unit operations from raw water pre-treatment, grain handling, sweetener dissolution, final product filtration, container washing, filling, and palletizing.",
      procedureSteps: [
        {
          step: 1,
          title: "Hazard Identification Matrix",
          detail: "Evaluate each ingredient and processing step for biological (Salmonella, Coliforms, wild yeasts, lactic acid bacteria), chemical (cleaning chemical residues, heavy metals, allergens, mycotoxins in grains), and physical hazards (glass shards, metal shavings from conveyors)."
        },
        {
          step: 2,
          title: "Applying the Codex Decision Tree",
          detail: "Question each significant hazard: Q1: Are preventive measures in place? Q2: Is the step specifically designed to eliminate or reduce the hazard to an acceptable level? Identify whether the control is a PRP (Prerequisite Program), OPRP, or CCP."
        },
        {
          step: 3,
          title: "Establishing Validated Critical Limits",
          detail: "Critical limits must be scientifically defensible. For instance, pasteurization must guarantee a minimum 5-log microbial reduction for target spoilage vegetative cells."
        },
        {
          step: 4,
          title: "Establishing Continuous Verification & Auditing",
          detail: "Conduct daily reviews of temperature recorder charts, calibration logs of thermal probes, and monthly microbiological challenge testing of clean-fill isolators."
        }
      ],
      monitoringAndRecords: "All CCP monitoring records must be signed off by the machine operator and counter-signed by the QA shift officer prior to batch release.",
      correctiveActions: "Immediate segregation of non-conforming batch in quarantined holding bay. Root cause analysis (5-Whys) within 24 hours.",
      references: [
        "Codex Alimentarius Commission: General Principles of Food Hygiene (CXC 1-1969, Rev. 2020)",
        "FDA 21 CFR Part 117: Current Good Manufacturing Practice and Hazard Analysis",
        "Pakistan Standards & Quality Control Authority (PSQCA) Beverage Specifications"
      ]
    }
  },
  {
    id: "guide-cip-sanitation",
    slug: "cip-sanitation-validation-protocols",
    title: "Clean-In-Place (CIP) Validation & Chemical Dosing Protocol in Food Processing",
    category: "Microbiology & Hygiene",
    readTime: "9 min read",
    lastUpdated: "December 2025",
    summary: "Detailed engineering guide on optimizing TACT (Time, Action/Turbulence, Concentration, Temperature) for automated cleaning of process vessels and pipe networks.",
    audience: "Sanitation Specialists, Plant Engineers, Brewing Operators",
    keyParameters: [
      { parameter: "Caustic Soda (NaOH) Wash", standard: "1.8% - 2.2% w/w at 75°C - 80°C", criticalLimit: "< 1.5% conc. or < 70°C fails protein/fat removal" },
      { parameter: "Acid Descaling Wash", standard: "0.8% - 1.2% Nitric/Phosphoric at 60°C", criticalLimit: "Conductivity < 25 mS/cm fails beer-stone removal" },
      { parameter: "Peracetic Acid (PAA) Final Sanitizer", standard: "150 - 250 ppm active PAA at ambient temp", criticalLimit: "< 100 ppm lacks spore inactivation; > 400 ppm leaves sensory taint" },
      { parameter: "Post-Rinse Water Purity", standard: "Effluent pH equals rinse water supply (±0.3)", criticalLimit: "pH > 7.8 indicates residual caustic residue" }
    ],
    content: {
      introduction: "Biofilms and microbial contamination in liquid food processing lines almost universally originate from improper CIP mechanics or unvalidated dead legs. Modern CIP uses turbulent flow (Reynolds number > 10,000) combined with formulated detergents.",
      scope: "Cleaning and sanitization of brew kettles, fermentation tanks, centrifuge lines, syrup distribution loops, and rotary filling heads.",
      procedureSteps: [
        {
          step: 1,
          title: "Pre-Rinse Hydraulic Purge",
          detail: "Flush line with ambient potable water to remove 85-90% of gross soil. Continue until effluent turbidity visually clears. Do not use hot water for pre-rinse to prevent protein denaturation and baking onto surfaces."
        },
        {
          step: 2,
          title: "Alkaline Caustic Cycle (Organic Dissolution)",
          detail: "Circulate 2.0% Sodium Hydroxide with anti-foaming surfactant at 78°C for 30 minutes. Verify flow velocity exceeds 1.5 m/s across the largest pipe diameter to generate shear stress against wall surfaces."
        },
        {
          step: 3,
          title: "Intermediate Neutralization Rinse",
          detail: "Flush with cold soft water until conductivity sensor indicates complete removal of alkaline salts."
        },
        {
          step: 4,
          title: "Sanitization & Rapid Verification",
          detail: "Pump 200 ppm Peracetic Acid (PAA). Swab critical valve seatings using ATP bioluminescence swabs. Record Relative Light Units (RLU)."
        }
      ],
      monitoringAndRecords: "Automatic logging of supply and return temperature, flow rate, and conductivity curves. Manual titration check of chemical drums weekly.",
      correctiveActions: "If ATP swab yields > 30 RLU, repeat alkaline wash cycle immediately and inspect spray ball nozzles for mechanical obstruction.",
      references: [
        "EHEDG (European Hygienic Engineering & Design Group) Guideline 2: Cleanability of Food Processing Equipment",
        "Murree Brewery CIP Operations Standard SOP-SAN-014"
      ]
    }
  },
  {
    id: "guide-nutrition-functional-beverage",
    slug: "nutrition-best-practices-functional-beverages",
    title: "Nutrition Best Practices & Formulation of Low-Sugar Functional Malt Drinks",
    category: "Nutrition & Health",
    readTime: "7 min read",
    lastUpdated: "January 2026",
    summary: "Science-backed nutritional guidelines for reducing glycemic index while preserving organoleptic qualities, B-vitamin retention, and antioxidant potency in malt beverages.",
    audience: "Food Scientists, Product Developers, Nutritionists, QA Analysts",
    keyParameters: [
      { parameter: "Sugar Reduction Target", standard: "30% - 50% reduction vs traditional sodas", criticalLimit: "Must maintain body/viscosity > 1.2 mPa.s" },
      { parameter: "Vitamin B-Complex Retention", standard: "B1, B2, B3, B6 added at 15% RDA per 250ml", criticalLimit: "Account for 20% thermal pasteurization loss" },
      { parameter: "Naturally Sourced Sweeteners", standard: "Steviol glycosides (Reb-M/Reb-D) blend", criticalLimit: "Purity > 95% total steviol glycosides" }
    ],
    content: {
      introduction: "Modern consumers demand thirst-quenching beverages that actively support wellness without contributing to metabolic disease. Malt extracts are rich in natural amino acids, minerals, and polyphenols, serving as an ideal vehicle for functional hydration.",
      scope: "Formulation, nutrition labeling, micro-nutrient stability, and clean-label standards for malt drinks and isotonic sports beverages.",
      procedureSteps: [
        {
          step: 1,
          title: "Nutrient Profiling and Calorie Budgeting",
          detail: "Design formulation to deliver under 35 kcal per 100 mL, replacing refined sucrose with high-grade malted barley extract and erythritol/stevia synergistic blends."
        },
        {
          step: 2,
          title: "Vitamin Pre-Mix Dosing & Thermal Safeguards",
          detail: "Add water-soluble B-vitamins (Thiamine, Riboflavin, Niacin, Pyridoxine) downstream just prior to final sterile filtration to minimize thermal breakdown in pasteurization."
        },
        {
          step: 3,
          title: "Sensory Balancing & Acidity Management",
          detail: "Utilize natural malic and citric acid ratios to mask the lingering metallic note commonly associated with intense sweeteners, enhancing clean refreshing finish."
        }
      ],
      monitoringAndRecords: "Quarterly third-party HPLC assay testing of vitamin and polyphenol levels to back nutritional packaging claims.",
      correctiveActions: "If vitamin assay falls below 100% of declared label value, adjust pre-mix compensation factor to overcome thermal degradation.",
      references: [
        "WHO Guidelines on Sugars Intake for Adults and Children (2015)",
        "Food and Agriculture Organization (FAO): Food Nutrition & Processing Guides"
      ]
    }
  }
];
