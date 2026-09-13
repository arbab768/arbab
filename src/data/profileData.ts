import { Certification, ExperienceItem, CaseStudy } from "../types";

export const ARBAB_PROFILE = {
  name: "Arbab Mukhtiar",
  degree: "BS Food Science and Technology",
  title: "Quality Assurance Officer & Food Science Specialist",
  currentCompany: "Murree Brewery Co. Ltd.",
  currentRole: "Quality Assurance Officer",
  experienceYears: "2.5+",
  origin: "Azad Kashmir, Pakistan",
  currentLocation: "Rawalpindi & Azad Kashmir, Pakistan",
  email: "arbabkhokhar768@gmail.com",
  phone: "+92 344 5900214",
  linkedin: "https://linkedin.com/in/arbab-mukhtiar-qa",
  heroImage: "/src/assets/images/arbab_portrait_1789319098277.jpg",
  labImage: "/src/assets/images/brewery_lab_qa_1789319118584.jpg",
  headline: "Advancing Food Safety, Industrial Brewery QA, and Beverage Innovation",
  shortBio: "BS Food Science and Technology graduate with 2.5+ years of hands-on industrial quality assurance leadership at Murree Brewery Co. Ltd. Specialized in HACCP validation, CIP sanitization chemistry, microbiological surveillance, Brix/CO2 line standardization, and ISO 22000 compliance.",
  extendedBio: `Graduated with a BS in Food Science & Technology with distinction, Arbab Mukhtiar has spent over 2.5 years spearheading in-line quality control and analytical quality assurance at Murree Brewery Co. Ltd.—Pakistan's longest-standing and most prominent beverage producer. 

Hailing from the scenic valleys of Azad Kashmir, Pakistan, Arbab combines academic rigor in food microbiology, food processing, and nutritional biochemistry with direct high-speed packaging and fermentation plant oversight. His daily mandates cover chemical titrations, microbiological air and swab plating, Brix and specific gravity verification, dissolved carbon dioxide measurement, tunnel pasteurizer unit (PU) calibration, and multi-tier vendor ingredient qualification.`,
  coreCompetencies: [
    "HACCP System Design & CCP Auditing",
    "ISO 22000:2018 & FSSC 22000 Compliance",
    "Beverage Line QA (Brix, pH, CO2, Turbidity)",
    "Microbiological Water & Product Testing",
    "CIP (Clean-In-Place) Validation & Chemistry",
    "Sensory Panel Leadership (9-Point Hedonic)",
    "Packaging Line Seal & Crown Cap Integrity",
    "Good Manufacturing Practices (GMP) & Auditing",
    "Thermal Processing & Pasteurization (PU Calculation)",
    "Technical Documentation & Standard Operating Procedures (SOPs)"
  ],
  education: [
    {
      degree: "Bachelor of Science in Food Science and Technology (BS FST)",
      institution: "Faculty of Agriculture & Food Sciences",
      location: "Azad Kashmir & Pakistan",
      graduationYear: "Graduated with High Academic Standing",
      specialization: "Food Safety, Beverage Processing, Food Microbiology & Industrial QA",
      keyCoursework: [
        "Food Microbiology & Microbial Spoilage",
        "Beverage Processing & Technology",
        "Food Chemistry & Instrumental Analysis",
        "Quality Management in Food Industries",
        "Food Hygiene, Sanitation & Toxicology",
        "Dairy, Cereal & Fermentation Sciences",
        "Sensory Evaluation of Foods & Drinks",
        "Food Packaging & Shelf-life Modeling"
      ]
    }
  ]
};

export const CERTIFICATIONS: Certification[] = [
  {
    id: "cert-haccp-l3",
    title: "HACCP Level 3: Hazard Analysis & Critical Control Points",
    issuer: "Food Safety Standards & Regulatory Compliance Board",
    issueDate: "2024",
    credentialId: "HACCP-QA-78921-MB",
    category: "HACCP",
    description: "Advanced validation of biological, physical, and chemical hazards in high-speed beverage and food manufacturing plants. Designing CCP decision trees and monitoring protocols.",
    skills: ["CCP Determination", "Critical Limits Setting", "Corrective Action Systems", "Audit Records"],
    status: "Verified"
  },
  {
    id: "cert-iso-22000",
    title: "ISO 22000:2018 Food Safety Management System (FSMS)",
    issuer: "Bureau of Quality Certification & Standards",
    issueDate: "2024",
    credentialId: "FSMS-ISO22K-4410",
    category: "ISO & Standards",
    description: "Internal auditor and implementer credential covering Prerequisite Programs (PRPs), Operational PRPs (OPRPs), food defense, and management review protocols.",
    skills: ["Internal Auditing", "GAP Analysis", "PRP Verification", "Documented Information Control"],
    status: "Verified"
  },
  {
    id: "cert-gmp-beverage",
    title: "Good Manufacturing Practices (GMP) in Beverage Processing",
    issuer: "National Institute of Food & Beverage Quality",
    issueDate: "2023",
    credentialId: "GMP-IND-88231",
    category: "Hygiene & GMP",
    description: "Zoning architecture, personal hygiene enforcement, sanitary plant design, pest management exclusion, and chemical storage safety.",
    skills: ["Sanitary Facility Design", "Pest Exclusion", "Cross-Contamination Mitigation", "Personal Hygiene SOPs"],
    status: "Verified"
  },
  {
    id: "cert-cip-sanitation",
    title: "Clean-In-Place (CIP) & Chemical Sanitation Engineering",
    issuer: "Industrial Food Sanitation & Hygiene Association",
    issueDate: "2024",
    credentialId: "CIP-SAN-31092",
    category: "Laboratory & Quality",
    description: "Principles of caustic, acid, and peracetic acid concentrations, mechanical turbulent flow (Reynolds numbers), and thermal contact time for stainless steel lines.",
    skills: ["Caustic Dosing", "PAA Disinfection", "Conductivity Monitoring", "Biofilm Disruption"],
    status: "Verified"
  },
  {
    id: "cert-sensory-brewing",
    title: "Brewing Science, Malt Quality & Sensory Evaluation",
    issuer: "Beverage Quality & Sensory Council",
    issueDate: "2023",
    credentialId: "SENS-BRW-55019",
    category: "Laboratory & Quality",
    description: "Trained panelist for beer, malt beverage, and soft drink sensory attribute testing: diacetyl detection, oxidation off-flavors, mouthfeel, and carbonation bite.",
    skills: ["Triangle Difference Testing", "Off-Flavor Fingerprinting", "Hedonic Scaling", "Foam Stability Analysis"],
    status: "Verified"
  },
  {
    id: "cert-water-qa",
    title: "Industrial Water Treatment & Reverse Osmosis QA",
    issuer: "Water Quality & Environmental Monitoring Society",
    issueDate: "2024",
    credentialId: "WTR-QA-10920",
    category: "Laboratory & Quality",
    description: "Monitoring raw water source to treated brewing liquor: silica, total hardness, alkalinity reduction, chlorination/dechlorination, and membrane integrity.",
    skills: ["RO Membrane Monitoring", "Chlorine Titration", "Alkalinity Adjustment", "TDS/Conductivity Tracking"],
    status: "Verified"
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-murree",
    role: "Quality Assurance Officer",
    company: "Murree Brewery Co. Ltd.",
    location: "Rawalpindi / Islamabad, Pakistan",
    period: "2024 - Present (2.5+ Years Cumulative Industrial QA)",
    duration: "2.5+ Years",
    type: "Full-time",
    summary: "Leading operational quality assurance, online process monitoring, and laboratory testing for carbonated beverages, malt drinks, fruit juices, and brewing production lines.",
    responsibilities: [
      "Conduct in-line hourly testing of Brix, titratable acidity, pH, carbon dioxide (CO2 volumes), and haze on active high-speed bottling and canning lines.",
      "Manage CIP sanitation cycles for pasteurizers, filling carousels, syrup blending tanks, and stainless steel pipe networks.",
      "Direct microbiological sampling of finished goods, process water, ambient clean-room air, and machine contact surfaces using swab testing and membrane filtration.",
      "Execute crown cork crimp depth, seal vacuum retention, fill height gauge calibration, and burst pressure testing to guarantee zero package failure.",
      "Author and revise Standard Operating Procedures (SOPs), batch production records, and non-conformance root cause corrective action reports (CAPA).",
      "Collaborate with production managers to conduct internal mock food safety recalls and prepare plant readiness for regulatory and customer audits."
    ],
    laboratoryEquipment: [
      "Anton Paar DMA Beverage Density Meter & Refractometer",
      "Haffmans In-Line Carbonation & DO (Dissolved Oxygen) Analyzer",
      "Spectrophotometer (UV-Vis Color & Bitterness Units)",
      "Laminar Flow Clean Air Bench & Autoclave Sterilizers",
      "Digital Automated Titrators for Acidity and Water Hardness",
      "Steinfurth Bottle Pressure & Carbonation Testers",
      "ATP Surface Bioluminescence Luminometer"
    ],
    keyAchievements: [
      "Eliminated microbial out-of-spec incidents across 14 consecutive production months by re-optimizing CIP hot caustic rinse dwell times.",
      "Standardized Brix and acid syrup dosing algorithms, yielding an 18% reduction in raw sugar ingredient batch variance.",
      "Formulated and implemented the 2025/2026 Beverage Packaging Quality Audit SOP now adopted facility-wide."
    ]
  },
  {
    id: "exp-academic",
    role: "Food Science Research & Quality Intern",
    company: "Food Safety & Quality Testing Labs",
    location: "Azad Kashmir, Pakistan",
    period: "Pre-Graduation Internship",
    duration: "6 Months",
    type: "Academic",
    summary: "Conducted rigorous nutritional analysis, proximate composition testing, and shelf-life stability studies on indigenous fruit and dairy matrices.",
    responsibilities: [
      "Analyzed moisture, ash, crude protein (Kjeldahl), fat (Soxhlet), and total soluble solids on regional food products.",
      "Conducted microbial plating on Plate Count Agar (PCA) and Potato Dextrose Agar (PDA) for shelf-life estimation.",
      "Assisted local agro-processors with sanitary packaging and compliance with provincial food authority guidelines."
    ],
    laboratoryEquipment: [
      "Kjeldahl Nitrogen Digestion Unit",
      "Soxhlet Fat Extraction System",
      "Benchtop pH & Conductivity Meters",
      "Incubators (BOD & Microbial)"
    ],
    keyAchievements: [
      "Authored a comprehensive technical dissertation on beverage preservation methods and consumer nutritional acceptance."
    ]
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "case-cip-optimization",
    title: "CIP Thermal & Chemical Optimization in High-Speed Bottling Lines",
    company: "Murree Brewery Co. Ltd.",
    challenge: "High chemical consumption and occasional micro-biofilm buildup in syrup return loops due to sub-optimal caustic dwell temperatures during line changeovers.",
    solution: "Arbab introduced a structured 5-stage CIP matrix with automated conductivity tracking, increasing caustic contact temperature to 78°C while modulating sodium hydroxide concentration to exactly 2.0% with a turbulent Reynolds flow rate.",
    results: [
      "Achieved 100% sterile swab pass rates (<10 RLU ATP) over 12 consecutive weeks.",
      "Reduced water wash volumes by 14% and shortened CIP changeover downtime by 22 minutes per shift.",
      "Eliminated manual dosing errors via standardized batch titration log sheets."
    ],
    metrics: [
      { label: "ATP Swab Pass Rate", value: "99.8%" },
      { label: "Changeover Time Saved", value: "22 mins" },
      { label: "Chemical Efficiency", value: "+18%" }
    ],
    tags: ["CIP Chemistry", "Sanitation", "Hygiene", "Process Optimization"]
  },
  {
    id: "case-co2-brix-precision",
    title: "Continuous In-Line Brix and Carbonation (CO2) Stabilization",
    company: "Murree Brewery Co. Ltd.",
    challenge: "Fluctuations in carbonation volumes caused by ambient seasonal temperature shifts between summer and winter bottling runs, impacting customer sensory mouthfeel.",
    solution: "Calibrated pressure-temperature equilibrium curves across filling valves, establishing a real-time shift verification protocol using Haffmans and Steinfurth digital analyzers with automated temperature compensation.",
    results: [
      "Kept dissolved CO2 variance within strict ±0.08 vol/vol range across all commercial batches.",
      "Eliminated customer reports of over-foaming or flat beverages.",
      "Implemented a rapid digital operator verification checklist."
    ],
    metrics: [
      { label: "CO2 Variance", value: "±0.08 vol" },
      { label: "Customer Complaints", value: "0 reported" },
      { label: "Batch Consistency", value: "99.4%" }
    ],
    tags: ["Beverage QA", "In-Line Testing", "Carbonation", "Sensory"]
  }
];
