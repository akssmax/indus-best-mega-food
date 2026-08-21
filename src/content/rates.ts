/**
 * Indicative shared-facility rates from the live site.
 * Kept off the landing page; use for a future /facilities page
 * and "request a rate card" follow-up.
 */
export const facilityRates = [
  { service: "Dry warehouse", rate: "₹1,000 / MT / month" },
  { service: "Deep freezer", rate: "₹2,000 / MT / month" },
  { service: "Cold storage", rate: "₹1,000 / MT / month" },
  { service: "CA / MA storage", rate: "₹1,000 / MT / month" },
  { service: "IQF", rate: "₹15,000 / MT / month" },
  { service: "Steam", rate: "₹4,000 / MT" },
  { service: "Grading, sorting & packaging", rate: "₹1,000 / MT" },
  { service: "Weighbridge < 9 MT", rate: "₹70 / vehicle" },
  { service: "Weighbridge > 9 MT", rate: "₹100 / vehicle" },
  { service: "Physical lab test", rate: "₹200 / sample" },
  { service: "Microbiological test", rate: "₹300–350 / test" },
  { service: "Chemical test", rate: "₹350 / test" },
  { service: "Potable water", rate: "₹60 / KL" },
  { service: "ETP & STP", rate: "₹200 / KL" },
  {
    service: "Management & maintenance (leased land)",
    rate: "₹5 / sq. m / month",
  },
  { service: "Aseptic", rate: "₹20,000 / MT of finished product" },
] as const

export const rateCardNote =
  "Rates are indicative and subject to confirmation. Request a current rate card when you enquire."
