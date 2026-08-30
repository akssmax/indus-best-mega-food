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
    eyebrow: "Plot & shed terms",
    title: "Space on campus.",
    body: "Indicative terms for free-hold plots and MSME sheds. Confirm current availability on enquiry.",
    summary: "₹66 lakh per acre — ₹3 lakh upfront, ₹63 lakh at registration.",
    highlights: [
      "15 acres currently available for free-hold sale",
      "Stamp duty exemption under Chhattisgarh Industrial Policy",
      "16 sheds × 160 sqm (9 × 18 m) at ₹1,500 / sqm / annum on lease",
    ],
  },
  rateSections: [
    {
      id: "space-storage-rates",
      eyebrow: "Space & storage",
      title: "Land, sheds, and warehousing.",
      rows: [
        {
          label: "Free-hold plot",
          value: "₹66 lakh / acre",
          hint: "₹3 lakh upfront; ₹63 lakh at registration. 15 acres available.",
        },
        {
          label: "SDF shed (9 × 18 m)",
          value: "₹1,500 / sqm / annum",
          hint: "16 sheds of 160 sqm on lease; plug-and-play.",
        },
        {
          label: "Warehouse",
          value: "₹18 / sq ft / month",
          hint: "Or ₹1,000 / MT / month, whichever is higher; min one month.",
        },
        {
          label: "Dry warehouse",
          value: "₹0.20 / kg / month",
          hint: "12,000 MT capacity available.",
        },
        {
          label: "Multi-commodity store (0–10°C)",
          value: "₹2.00 / kg / month",
          hint: "Min 500 MT; min charge for one month.",
        },
        {
          label: "Deep freeze (−18°C)",
          value: "₹2.00 / kg / month",
          hint: "Min 500 MT; min charge for one month.",
        },
        {
          label: "Management & maintenance",
          value: "₹2.50 / sqm / month",
          hint: "Applies after plot sale; incremental 10% per annum.",
        },
      ],
    },
    {
      id: "processing-rates",
      eyebrow: "Processing & handling",
      title: "Job-work on shared lines.",
      rows: [
        {
          label: "Aseptic processing",
          value: "₹19 / kg finished",
          hint: "Pulping, sterilisation, pasteurisation & filling. Min 80 MT / day.",
        },
        {
          label: "IQF",
          value: "₹18 / kg",
          hint: "Min 30 MT per batch.",
        },
        {
          label: "Blast freezing",
          value: "₹8 / kg",
          hint: "Min 10 MT per batch.",
        },
        {
          label: "Ripening chambers",
          value: "₹2 / kg / batch",
          hint: "Min 50 MT; 8 chambers, 400 MT total.",
        },
        {
          label: "Grading, sorting & packaging",
          value: "₹1,000 / MT",
          hint: "Min 20 MT; 10 MT / hour capacity.",
        },
        {
          label: "Steam",
          value: "₹5,000 / MT",
          hint: "17.5 kg pressure; husk-linked pricing.",
        },
        {
          label: "Lab analysis",
          value: "₹300 / sample",
          hint: "Physical, chemical, and microbiological testing.",
        },
      ],
    },
    {
      id: "utility-rates",
      eyebrow: "Utilities & site access",
      title: "Metered utilities and gate charges.",
      rows: [
        {
          label: "Electricity",
          value: "₹9.50 / KWH",
          hint: "At CSEB tariff; ₹1 / KWH additional for SDF units.",
        },
        {
          label: "Water",
          value: "₹60 / KL",
          hint: "Connected metered supply.",
        },
        {
          label: "Effluent treatment (ETP)",
          value: "₹200 / KL",
          hint: "1.2 MLD capacity, expandable to 2.5 MLD.",
        },
        {
          label: "Sewage treatment (STP)",
          value: "₹60 / KL",
          hint: "70 KLD capacity.",
        },
        {
          label: "Weighbridge — large vehicle",
          value: "₹100 / vehicle",
          hint: "100 MT electronic modular weighbridge.",
        },
        {
          label: "Weighbridge — small vehicle",
          value: "₹70 / vehicle",
          hint: "Below 9 MT.",
        },
        {
          label: "Entry fee (24 h) — large vehicle",
          value: "₹100 / vehicle",
          hint: "9 MT and above.",
        },
        {
          label: "Entry fee (24 h) — small vehicle",
          value: "₹70 / vehicle",
          hint: "Below 9 MT.",
        },
      ],
    },
  ],
  disclaimer:
    "All rates are indicative and subject to confirmation at the time of agreement. The project team confirms the current rate card on enquiry.",
} as const
