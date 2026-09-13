import { DownloadableResource } from "../types";

export const DOWNLOADABLE_RESOURCES: DownloadableResource[] = [
  {
    id: "res-brewery-qa-daily-log",
    title: "Daily Brewery & Beverage QA In-Line Shift Log Sheet",
    category: "QA Daily Logs",
    fileType: "CSV / Excel",
    fileSize: "14.2 KB",
    downloadsCount: 342,
    description: "Production-ready tabular template for logging hourly Brix, CO2 volume, pH, crown crimp dimensions, torque, and pasteurization units (PU) across all shift lines.",
    contentGenerator: () => ({
      filename: "Murree-Brewery-QA-Daily-Shift-Log-Sheet.csv",
      mimeType: "text/csv",
      content: `MURREE BREWERY CO. LTD. - QUALITY ASSURANCE DEPARTMENT
DAILY IN-LINE PROCESS CONTROL & PACKAGING LOG SHEET
Date,Line_No,Shift,Product_Name,Batch_No,Target_Brix,Target_CO2_Vol,Target_pH,QA_Officer
${new Date().toISOString().split("T")[0]},Line-02,Morning,Classic Malt 330ml,MB-2026-09A,11.20,3.50,4.20,Arbab Mukhtiar

Time,Sample_ID,Valve_No,Brix_Observed,Temp_C,Brix_Corrected_20C,Snift_Press_PSI,Liquid_Temp_C,CO2_Vol,pH,Crown_Crimp_mm,Seal_Vacuum_InHg,Fill_Height_mm,DO_ppb,Turbidity_NTU,Status,Operator_Init,QA_Init
08:00,S-001,V-04,11.22,20.4,11.20,38.5,12.0,3.52,4.18,28.55,18.5,+1.0,42,1.2,PASS,MK,AM
09:00,S-002,V-12,11.18,20.2,11.19,39.0,12.2,3.55,4.22,28.58,19.0,+0.5,46,1.4,PASS,MK,AM
10:00,S-003,V-20,11.25,20.5,11.21,38.2,12.1,3.48,4.19,28.52,18.0,+1.2,38,1.1,PASS,MK,AM
11:00,S-004,V-28,11.20,20.1,11.20,38.8,12.0,3.54,4.20,28.56,18.5,+0.0,40,1.3,PASS,MK,AM
12:00,S-005,V-36,11.24,20.3,11.22,39.2,12.3,3.56,4.21,28.54,19.2,-0.5,44,1.5,PASS,MK,AM
13:00,S-006,V-08,11.19,20.0,11.19,38.0,12.0,3.49,4.20,28.57,18.8,+0.8,41,1.2,PASS,MK,AM
14:00,S-007,V-16,11.21,20.2,11.20,38.6,12.1,3.53,4.19,28.55,18.5,+0.2,39,1.1,PASS,MK,AM

SHIFT SUMMARY NOTES:
Total Samples Tested: 7
Out-of-Specification Incidents: 0
Pasteurizer PU Average: 18.4 PU (Target: 16-20 PU)
Crown Crimp Gauge Calibration: Verified at 07:45 AM
Final Shift Clearance: APPROVED FOR COMMERCIAL WAREHOUSE RELEASE
QA Shift Sign-Off: Arbab Mukhtiar (BS Food Science & Technology)
`
    })
  },
  {
    id: "res-haccp-worksheet",
    title: "Complete HACCP Hazard Analysis & CCP Determination Matrix",
    category: "Audit Checklists",
    fileType: "Markdown / SOP",
    fileSize: "28.5 KB",
    downloadsCount: 512,
    description: "Industry-standard HACCP worksheet outlining hazard identification, risk scoring (severity x likelihood), CCP decision tree logic, critical limits, and corrective actions.",
    contentGenerator: () => ({
      filename: "HACCP-Hazard-Analysis-Worksheet-Arbab-Mukhtiar.md",
      mimeType: "text/markdown",
      content: `# INDUSTRIAL BEVERAGE & FOOD HACCP PLAN MATRIX
**Prepared By:** Arbab Mukhtiar, BS Food Science & Technology (QA Officer, Murree Brewery Co.)
**Applicable Standard:** ISO 22000:2018 / Codex Alimentarius CXC 1-1969 Rev. 2020
**Scope:** Raw Material Intake to Final Bottled Beverage Distribution

---

## 1. Process Step 01: Process Water Pre-treatment (Carbon & RO)
- **Hazard Identified:**
  - Biological: Coliforms, *Pseudomonas aeruginosa*, biofilm bacteria.
  - Chemical: Free chlorine residues, heavy metals, trihalomethanes.
  - Physical: Carbon fines, particulate sand.
- **Is this a CCP?** **YES (CCP-1)**
- **Critical Limits:**
  - Free chlorine post-activated carbon: < 0.02 ppm
  - UV disinfection intensity: > 400 J/m²
  - Total Plate Count: < 10 CFU/mL
- **Monitoring Procedure:**
  - In-line chlorine sensor continuous readout with automated alert.
  - Hourly manual DPD colorimetric titration.
- **Corrective Action:**
  - Divert water flow automatically back to raw holding; replace carbon bed if breakthrough detected.

---

## 2. Process Step 02: Dissolution & Syrup Preparation
- **Hazard Identified:**
  - Biological: Osmophilic yeasts, acid-tolerant moulds.
  - Physical: Foreign debris from sugar packaging sacks.
- **Is this a CCP?** **NO (OPRP-1)**
- **Control Measure:**
  - Dual magnetic trap and 25-micron inline bag filter; pasteurization of simple syrup at 85°C for 2 minutes.

---

## 3. Process Step 03: Final Product Tunnel Pasteurization
- **Hazard Identified:**
  - Biological: Spoilage by *Lactobacillus brevis*, *Pediococcus damnosus*, wild yeasts.
- **Is this a CCP?** **YES (CCP-2)**
- **Critical Limits:**
  - Minimum Pasteurization Units: 15 PU
  - Maximum Pasteurization Units: 25 PU (prevents flavor degradation)
- **Monitoring Procedure:**
  - Traveling data logger bottle (RedPost / Ellab) placed in tunnel every 4 hours.
  - Temperature sensors across all 6 thermal spray zones logged continuously.
- **Corrective Action:**
  - Product receiving < 12 PU is quarantined, incubated for 7 days at 28°C for microbial confirmation, and re-processed or destroyed.

---

## 4. Process Step 04: Bottle Filling, Crown Sealing & In-line Inspection
- **Hazard Identified:**
  - Physical: Broken glass fragments, distorted crown crimp seals causing product oxidation.
- **Is this a CCP?** **YES (CCP-3)**
- **Critical Limits:**
  - 100% ejection of chipped bottle necks; crown crimp diameter 28.55 ± 0.05 mm.
- **Monitoring Procedure:**
  - High-speed vision inspection camera at 36,000 bottles/hour; manual crimp gauge test on 5 bottles every 30 minutes.
- **Corrective Action:**
  - Stop filler immediately if cracked bottle detected. Purge 10 bottles before and 10 bottles after incident.

---
*Verified and Approved by Arbab Mukhtiar (Quality Assurance Specialist)*
`
    })
  },
  {
    id: "res-gmp-audit-checklist",
    title: "Beverage & Food Facility GMP Plant Hygiene Audit Checklist",
    category: "Audit Checklists",
    fileType: "CSV / Excel",
    fileSize: "18.8 KB",
    downloadsCount: 289,
    description: "Exhaustive 50-point physical inspection audit checklist covering pest exclusion, air filtration, employee hygiene, chemical segregation, and stainless steel sanitary pipe welds.",
    contentGenerator: () => ({
      filename: "Facility-GMP-Sanitation-Audit-Checklist.csv",
      mimeType: "text/csv",
      content: `FACILITY GOOD MANUFACTURING PRACTICES (GMP) AUDIT CHECKLIST
Auditor: Arbab Mukhtiar | BS Food Science & Technology
Plant Location: Murree Brewery Co. Ltd. Bottling & Processing Facility
Rating Scale: 1 = Non-Compliant (Critical) | 2 = Minor Deviation | 3 = Compliant | 4 = Excellent

Audit_Area,Checklist_Item,Max_Score,Observed_Score,Status,Observations_and_CAPA
1. Grounds & Exterior,Perimeter free of standing water weeds and harborage sites,4,4,PASS,Clear 3-meter gravel barrier maintained
1. Grounds & Exterior,Loading dock seals in sound condition with no pest entry gaps,4,4,PASS,Inflatable dock shelters intact
2. Facility Structure,Floors epoxy-coated sloped toward drain channels (no pooling),4,4,PASS,Good slope to stainless trough drains
2. Facility Structure,Ceilings free from peeling paint condensation or cobwebs,4,3,PASS,No condensation over active open lines
2. Facility Structure,Light fixtures shatterproof or enclosed in poly jackets,4,4,PASS,All LED fixtures fully encased
3. Sanitary Operations,CIP chemical tanks correctly color-coded and labeled,4,4,PASS,Caustic (Blue) Acid (Red) PAA (Yellow)
3. Sanitary Operations,Handwash stations stocked with warm water antibacterial soap & dryer,4,4,PASS,Sensors operational at all hall entries
3. Sanitary Operations,Footbaths / shoe sanitizer mats charged with quaternary ammonium,4,4,PASS,Titrated at 800 ppm active quat
4. Equipment Sanitary Design,Food contact surfaces made of AISI 316/304 stainless steel,4,4,PASS,Sanitary tri-clamp fittings used
4. Equipment Sanitary Design,Dead legs in sanitary liquid piping do not exceed 1.5x pipe diameter,4,4,PASS,Zero dead legs detected on main header
5. Personnel Hygiene,Clean lab coats hairnets and beard snoods worn at all times,4,4,PASS,100% compliance during shift walk
5. Personnel Hygiene,Jewelry watches and open wounds excluded from processing hall,4,4,PASS,Verified at locker entrance
6. Quality Control Lab,Calibration records for all benchtop refractometers & pH meters current,4,4,PASS,Calibrated daily with standard buffers
6. Quality Control Lab,Bio-waste and autoclave sterilization protocol strictly logged,4,4,PASS,Biological indicator test passed weekly

Total Possible Score: 56
Audit Score Achieved: 55 (98.2% - Grade A Exceeds Standards)
Auditor Sign-off: Arbab Mukhtiar (QA Officer)
`
    })
  },
  {
    id: "res-sensory-scorecard",
    title: "Beverage Sensory Evaluation Scorecard (9-Point Hedonic Scale)",
    category: "SOP Templates",
    fileType: "Markdown / SOP",
    fileSize: "12.1 KB",
    downloadsCount: 198,
    description: "Standardized sensory testing sheet used to standardize mouthfeel, aroma, sweetness, acidity, carbonation prickle, and off-flavor detection for finished consumer beverages.",
    contentGenerator: () => ({
      filename: "Beverage-Sensory-Evaluation-Scorecard-Arbab.md",
      mimeType: "text/markdown",
      content: `# BEVERAGE SENSORY EVALUATION SCORECARD
**Trained Panel Assessment Protocol**
**Lead Sensory Officer:** Arbab Mukhtiar (Murree Brewery Co. Ltd.)

---

### Panelist Details
- **Panelist Code:** _______________
- **Sample Code (3-Digit Random):** [ 3 8 2 ]
- **Testing Date & Time:** ${new Date().toLocaleDateString()} - 11:30 AM
- **Serving Temperature:** 8.0°C ± 1.0°C in standard ISO clear tasting glass

---

### 1. Appearance & Visual Clarity (Weight: 15%)
- **Haze / Turbidity:** [ ] Crystal Brilliant (< 1 EBC) | [ ] Slight Haze | [ ] Turbid (Defect)
- **Head Retention / Effervescence:** [ ] Vigorous micro-bubbles | [ ] Flat | [ ] Excessive Gushing
- **Color Tone:** Conforms exactly to standard Lovibond reference card? **[ YES / NO ]**

---

### 2. Aroma & Bouquet (Weight: 25%)
- **Malt Character:** [ ] Clean Cereal [ ] Roasted [ ] Caramel [ ] Bread Crust
- **Hop / Flavor Aroma:** [ ] Floral [ ] Citrus [ ] Herbal [ ] Neutral
- **Off-Flavor Checks (Flag if Present):**
  - [ ] Diacetyl (Butterscotch / Popcorn)
  - [ ] Acetaldehyde (Green Apple / Cut Grass)
  - [ ] Dimethyl Sulfide / DMS (Cooked Corn)
  - [ ] Lightstruck / Skunky (Mercaptan)
  - [ ] Metallic (Iron / Copper taint)

---

### 3. Palate & Taste Attributes (Weight: 35%)
Score on a 1–9 Scale (1 = Dislike Extremely, 5 = Neither Like Nor Dislike, 9 = Like Extremely):
- **Sweetness Balance (Brix Perception):** Score [   ] / 9
- **Acidity / Crispness (pH Tartness):** Score [   ] / 9
- **Carbonation Prickle (CO2 Bite):** Score [   ] / 9
- **Bitterness Finish (Cleanliness):** Score [   ] / 9

---

### 4. Overall Acceptability & Recommendation
- **Overall Hedonic Score:** _______ / 9
- **Release Decision:**
  - [ ] Commercial Batch Approved
  - [ ] Rework / Blend Required
  - [ ] Reject Batch

---
*Certified by Sensory QA Panel Leader: Arbab Mukhtiar*
`
    })
  }
];
