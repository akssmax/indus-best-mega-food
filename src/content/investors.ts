const assetBase = "https://www.indusbestmegafoodpark.com/wp-content/uploads/2018/03"

export const investorsPage = {
  platform: {
    id: "investor-platform",
    eyebrow: "The platform",
    title: "Backward and forward linkages across the value chain.",
    body: "Indus Best Mega Food Park provides a platform that connects farm-gate intake, shared processing, cold chain, and dispatch — with quality assurance, food safety, and post-harvest best practices built into the campus.",
    image: {
      src: `${assetBase}/investor-corner-Indus-Best-Mega-Food-Park-Raipur-.jpg`,
      alt: "Indus Best Mega Food Park master plan overview, Raipur",
    },
  },
  masterPlan: {
    id: "master-plan",
    title: "Master plan",
    body: "Campus layout for plots, sheds, processing blocks, cold storage, utilities, and access roads at Village Bemta–Sarora.",
    image: {
      src: `${assetBase}/investor-corner-Indus-Best-Mega-Food-Park-Raipur-.jpg`,
      alt: "Indus Best Mega Food Park master plan",
    },
  },
  brochure: {
    id: "brochure",
    title: "Brochure",
    body: "Overview of the park, facilities, and investment proposition.",
    pages: [
      {
        src: `${assetBase}/ibmfp-brochure-final-page-001.jpg`,
        alt: "Indus Best Mega Food Park brochure — page 1",
      },
      {
        src: `${assetBase}/ibmfp-brochure-final-page-002.jpg`,
        alt: "Indus Best Mega Food Park brochure — page 2",
      },
    ],
  },
  statePolicies: {
    id: "state-policies",
    eyebrow: "State policy",
    title: "Chhattisgarh industrial and food-processing policies.",
    body: "Reference documents from the Government of Chhattisgarh.",
    items: [
      {
        title: "Industrial Policy 2014–19",
        language: "English",
        href: "https://industries.cg.gov.in/pdf/policy2014-19/Industrial%20Policy%202014-19%20Translated%2012Feb2016.pdf",
      },
      {
        title: "Industrial Policy 2014–19",
        language: "Hindi",
        href: "https://industries.cg.gov.in/images/Industrial%20%20Policy%202014-19.pdf",
      },
      {
        title: "Agro & Food Policy 2014–19",
        language: "English",
        href: "https://industries.cg.gov.in/pdf/policy2014-19/Chhattisgarh%20-%20Agro%20%26%20Food%20Policy%202014-19%20English.pdf",
      },
      {
        title: "Agro & Food Policy 2014–19",
        language: "Hindi",
        href: "https://industries.cg.gov.in/pdf/policy2014-19/Chhattisgarh%20-%20Agro%20%26%20Food%20Policy%20English%202014-19%20Hindi.pdf",
      },
      {
        title: "Food Processing Policy",
        language: "PDF",
        href: "https://industries.cg.gov.in/pdf/policy2014-19/FoodPolicy_09102017.pdf",
      },
    ],
  },
  plotRates: {
    id: "plot-rates",
    eyebrow: "Plot rates",
    title: "Developed plot terms.",
    body: "Indicative terms for developed plots. Confirm current availability on enquiry.",
    summary:
      "₹3 lakh per acre upfront, plus ₹20 lakh per acre from year 1 for up to 3 years.",
  },
  facilityRates: {
    id: "facility-rates",
    eyebrow: "Facility rates",
    title: "Shared capacity and utilities.",
    body: "Indicative monthly and per-use tariffs for shared capacity and utilities. Allocation and current rate card on enquiry.",
    rows: [
      { label: "Dry warehouse", value: "₹1,000 / MT / month" },
      { label: "Deep freezer", value: "₹2,000 / MT / month" },
      { label: "Cold storage", value: "₹1,000 / MT / month" },
      { label: "CA / MA storage", value: "₹1,000 / MT / month" },
      { label: "IQF", value: "₹15,000 / MT / month" },
      { label: "Steam", value: "₹4,000 / MT" },
      { label: "Grading, sorting & packaging", value: "₹1,000 / MT" },
      { label: "Weighbridge (< 9 MT)", value: "₹70 / vehicle" },
      { label: "Weighbridge (> 9 MT)", value: "₹100 / vehicle" },
      {
        label: "Lab analysis — physical test",
        value: "₹200 / sample",
      },
      {
        label: "Lab analysis — microbiological test",
        value: "₹300–350 / test",
      },
      { label: "Lab analysis — chemical", value: "₹350 / test" },
      { label: "Potable water", value: "₹60 / KL" },
      { label: "ETP & STP", value: "₹200 / KL" },
      {
        label: "Management & maintenance (leased land)",
        value: "₹5 / sq.m / month",
      },
      {
        label: "Aseptic processing",
        value: "₹20,000 / MT finished product",
      },
    ],
  },
  disclaimer:
    "Terms and tariffs are indicative. The project team confirms the current rate card on enquiry.",
} as const
