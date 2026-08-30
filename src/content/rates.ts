/**
 * Indicative shared-facility rates — aligned with the client pitch deck.
 * Canonical source for Investor Corner is investors.ts.
 */
export const facilityRates = [
  { service: "Free-hold plot", rate: "₹66 lakh / acre" },
  { service: "SDF shed (160 sqm)", rate: "₹1,500 / sqm / annum" },
  { service: "Dry warehouse", rate: "₹0.20 / kg / month" },
  { service: "Multi-commodity store (0–10°C)", rate: "₹2.00 / kg / month" },
  { service: "Deep freeze (−18°C)", rate: "₹2.00 / kg / month" },
  { service: "Aseptic processing", rate: "₹19 / kg finished" },
  { service: "IQF", rate: "₹18 / kg" },
  { service: "Blast freezing", rate: "₹8 / kg" },
  { service: "Grading, sorting & packaging", rate: "₹1,000 / MT" },
  { service: "Steam", rate: "₹5,000 / MT" },
  { service: "Lab analysis", rate: "₹300 / sample" },
  { service: "Electricity", rate: "₹9.50 / KWH" },
  { service: "Water", rate: "₹60 / KL" },
  { service: "ETP", rate: "₹200 / KL" },
  { service: "STP", rate: "₹60 / KL" },
  { service: "Weighbridge (< 9 MT)", rate: "₹70 / vehicle" },
  { service: "Weighbridge (> 9 MT)", rate: "₹100 / vehicle" },
  {
    service: "Management & maintenance (after sale)",
    rate: "₹2.50 / sqm / month",
  },
] as const

export const rateCardNote =
  "Rates are indicative and subject to confirmation. Request a current rate card when you enquire."
