export const processingLines = [
  {
    crop: "Tomato",
    capacity: "12 MTPH",
    output: "Paste / concentrate",
    spec: "Conc. 28/30° Bx",
  },
  {
    crop: "Mango",
    capacity: "6 MTPH",
    output: "Paste / puree",
    spec: "Puree 14–16° Bx, conc. 28° Bx",
  },
  {
    crop: "Blueberry",
    capacity: "5 MTPH",
    output: "Paste / puree",
    spec: "Conc. puree 12–14° Bx",
  },
  {
    crop: "Papaya",
    capacity: "6 MTPH",
    output: "Paste / puree",
    spec: "Puree 10–11° Bx, conc. 25° Bx",
  },
  {
    crop: "Guava",
    capacity: "6 MTPH",
    output: "Paste / puree",
    spec: "Conc. puree 8/9° Bx",
  },
  {
    crop: "Amla",
    capacity: "4 MTPH",
    output: "Paste / puree / juice",
    spec: "Puree 8/9° Bx",
  },
  {
    crop: "Lauki",
    capacity: "5 MTPH",
    output: "Juice",
    spec: "Juice 7° Bx",
  },
  {
    crop: "Karela",
    capacity: "5 MTPH",
    output: "Juice",
    spec: "Juice 7° Bx",
  },
] as const

export const coldChain = [
  {
    name: "Cold storage",
    detail: "4 chambers at −20°C",
    capacity: "1,500 MT",
  },
  {
    name: "Cold storage",
    detail: "6 chambers at 0–10°C",
    capacity: "3,500 MT",
  },
  {
    name: "Ripening chambers",
    detail: "8 chambers",
    capacity: "400 MT",
  },
  {
    name: "Blast freezer",
    detail: "2 chambers",
    capacity: "10 MT",
  },
  {
    name: "IQF line with packaging hall",
    detail: "Individual quick freeze",
    capacity: "2 MT/H",
  },
  {
    name: "Dry warehouse",
    detail: "Ambient bulk storage",
    capacity: "12,000 MT",
  },
  {
    name: "Pack house",
    detail: "Automatic sorting, grading & packaging for fresh produce",
    capacity: "10 MT/H",
  },
] as const

export const infrastructure = [
  {
    name: "Right of way",
    detail: "Internal roads sized for heavy vehicles",
    spec: "15 m – 21 m",
  },
  {
    name: "Modular weighbridge",
    detail: "Entry weighment for inbound and outbound loads",
    spec: "100 MT",
  },
  {
    name: "Water supply",
    detail: "Campus-wide process and potable water",
    spec: "2.7 MLD",
  },
  {
    name: "ETP & STP",
    detail: "Sewage, effluent collection and treatment",
    spec: "Centralised",
  },
  {
    name: "Secured campus",
    detail: "Space for bank / ATM, canteen, and worker amenities",
    spec: "Fully securitised",
  },
] as const

export const qualityLabs = [
  "Microbiological",
  "Pesticide residue",
  "Product development",
  "SE & QAL",
] as const

export const primaryProcessingCentres = [
  { name: "Durg", region: "Chhattisgarh" },
  { name: "Bilaspur", region: "Chhattisgarh" },
  { name: "Abhanpur (New Raipur)", region: "Chhattisgarh" },
] as const
