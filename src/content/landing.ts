export const enquiryInterests = [
  { value: "plot", label: "Developed plot" },
  { value: "msme", label: "MSME plug-and-play shed" },
  { value: "facility", label: "Shared facility capacity" },
  { value: "jv", label: "Joint venture / investment" },
  { value: "other", label: "Other / rate card" },
] as const

export type EnquiryInterest = (typeof enquiryInterests)[number]["value"]

export const landing = {
  hero: {
    eyebrow: "Mega Food Park · Raipur, Chhattisgarh",
    headline: "Set up your processing unit on a campus that's already built.",
    body: "Developed plots, 16 plug-and-play MSME sheds, fruit and vegetable lines, 5,000 MT cold storage, and 12,000 MT dry warehouse — at Village Bemta–Sarora, in Chhattisgarh's growing belt.",
    image: {
      src: "/images/warehouse.jpg",
      alt: "Warehouse and campus at Indus Best Mega Food Park, Raipur",
    },
    primaryCta: { label: "Enquire about a plot or shed", href: "/contact" },
    secondaryCta: {
      label: "See the campus",
      href: "/campus",
    },
    stats: [
      { value: "50+", label: "Acres" },
      { value: "16", label: "MSME sheds" },
      { value: "5,000 MT", label: "Cold" },
      { value: "12,000 MT", label: "Dry" },
    ],
    slides: [
      {
        image: {
          src: "/images/warehouse.jpg",
          alt: "Warehouse and MSME sheds at Indus Best Mega Food Park",
        },
        cards: [
          {
            value: "16",
            label: "Plug-and-play sheds",
            detail: "Install equipment, not the building",
            side: "left" as const,
          },
          {
            value: "5,000 MT",
            label: "Cold on campus",
            detail: "Frozen and chilled, ready to book",
            side: "right" as const,
          },
        ],
      },
      {
        image: {
          src: "/images/aseptic-line.jpg",
          alt: "Aseptic processing line on campus",
        },
        cards: [
          {
            value: "12 MTPH",
            label: "Tomato concentrate",
            detail: "Aseptic line already packing",
            side: "left" as const,
          },
          {
            value: "2 MT/H",
            label: "IQF capacity",
            detail: "Book throughput without the capex",
            side: "right" as const,
          },
        ],
      },
      {
        image: {
          src: "/images/cpc-building.jpg",
          alt: "Central processing campus at Bemta–Sarora",
        },
        cards: [
          {
            value: "50+",
            label: "Acres on site",
            detail: "Developed land with utilities in place",
            side: "left" as const,
          },
          {
            value: "30–35",
            label: "Industrial plots",
            detail: "Roads, water, power, and ETP ready",
            side: "right" as const,
          },
        ],
      },
      {
        image: {
          src: "/images/weigh-bridge.jpg",
          alt: "Entry gate and 100 MT weighbridge",
        },
        cards: [
          {
            value: "100 MT",
            label: "Weighbridge",
            detail: "Logistics at the campus gate",
            side: "left" as const,
          },
          {
            value: "2.7 MLD",
            label: "Process water",
            detail: "Shared utilities you do not duplicate",
            side: "right" as const,
          },
        ],
      },
      {
        image: {
          src: "/images/admin-lab.jpg",
          alt: "Quality control laboratory on campus",
        },
        cards: [
          {
            value: "12,000 MT",
            label: "Dry warehouse",
            detail: "Hold inventory beside the line",
            side: "left" as const,
          },
          {
            value: "3",
            label: "Primary processing centres",
            detail: "Collection across the growing belt",
            side: "right" as const,
          },
        ],
      },
    ],
  },
  clients: {
    label: "Our clients",
    items: [
      { name: "Nestlé", logo: "/images/clients/nestle.svg" },
      { name: "Mother Dairy", logo: "/images/clients/mother-dairy.svg" },
      { name: "Safal", logo: "/images/clients/safal.png" },
      { name: "HUL", logo: "/images/clients/hul.svg" },
      { name: "Dabur", logo: "/images/clients/dabur.svg" },
      { name: "Dr. Oetker", logo: "/images/clients/dr-oetker.svg" },
      { name: "GD Foods", logo: "/images/clients/gd-foods.svg" },
      {
        name: "Everest Beverages & Food",
        logo: "/images/clients/everest-beverages.png",
      },
      { name: "DeHaat", logo: "/images/clients/dehaat.png" },
    ] as { name: string; logo?: string }[],
  },
  about: {
    id: "about",
    eyebrow: "The park",
    title:
      "A Ministry of Food Processing Industries Mega Food Park, operational near Raipur.",
    body: "Indus Best Mega Food Park Private Limited sits at Village Bemta–Sarora. The campus is the central processing hub of a cluster that also includes collection and primary processing — so produce can move from the growing belt into manufacturing without a separate greenfield build.",
    whatIs:
      "Collection centres, three Primary Processing Centres (Durg, Bilaspur, and Abhanpur / New Raipur), a central processing campus, cold chain, quality labs, and fully developed plots — in one agri and horticulture zone.",
    vision: {
      title: "Vision",
      body: "A food-processing campus that stays current on technology, food safety, and environmental practice — and is straightforward to set up in.",
    },
    mission: {
      title: "Mission",
      body: "Give processors shared infrastructure, quality systems, and a collection network so they can commission a unit, not construct an industrial estate.",
    },
    image: {
      src: "/images/cpc-building.jpg",
      alt: "Central Processing Campus at Indus Best Mega Food Park",
    },
    cta: { label: "Read about the park", href: "/about" },
  },
  why: {
    id: "why",
    eyebrow: "Why this campus",
    title: "Start operations. Skip the greenfield.",
    body: "The park is for processors who want land, utilities, collection, and shared capacity in one place — and for partners who want to put capital into that model.",
    advantages: [
      {
        title: "Plug-and-play sheds",
        body: "16 MSME sheds so you install equipment, not the building.",
        image: {
          src: "/images/warehouse.jpg",
          alt: "MSME warehouse sheds at Indus Best Mega Food Park",
        },
        pills: ["16 sheds", "Roads, water, power"],
      },
      {
        title: "Shared processing",
        body: "Aseptic, concentrate, IQF, and pack house without owning the line.",
        pills: ["Tomato", "Mango", "IQF", "Pack house"],
      },
      {
        title: "Collection in the belt",
        body: "Intake and grading at three Primary Processing Centres — Durg, Bilaspur, and Abhanpur (New Raipur).",
        metric: "3",
        labels: ["Durg", "Bilaspur", "Abhanpur"],
      },
      {
        title: "Cold chain on campus",
        body: "Frozen, chilled, ripening, blast freeze, and IQF — on site.",
        rows: ["−20°C · 1,500 MT", "0–10°C · 3,500 MT", "IQF · 2 MT/H"],
      },
      {
        title: "Scheme and policy",
        body: "Ministry of Food Processing Industries Mega Food Park Scheme (2014), listed as operational, with a path into state agro and food-processing incentives.",
        badge: "2014 · Operational",
      },
      {
        title: "Common utilities",
        body: "Capex you do not duplicate.",
        chips: ["2.7 MLD", "ETP & STP", "100 MT weighbridge"],
      },
    ],
  },
  infrastructure: {
    id: "infrastructure",
    eyebrow: "The campus",
    title: "Plots, lines, cold chain, and utilities on one site.",
    body: "Six layers of infrastructure, from industrial land to dispatch.",
    zones: [
      {
        title: "Industrial plots",
        body: "30–35 developed plots with roads, water, power, and effluent treatment, ready to commission.",
        icon: "map",
      },
      {
        title: "Processing",
        body: "Aseptic and concentrate lines for tomato, mango, blueberry, papaya, guava, amla, and vegetable juices, rated in MT per hour.",
        icon: "factory",
      },
      {
        title: "Cold chain",
        body: "5,000 MT across −20°C and 0–10°C chambers, plus ripening, blast freeze, and IQF.",
        icon: "snowflake",
      },
      {
        title: "Dry warehouse",
        body: "12,000 MT ambient bulk storage.",
        icon: "warehouse",
      },
      {
        title: "Utilities",
        body: "2.7 MLD water, centralised ETP and STP, 100 MT weighbridge, worker amenities.",
        icon: "zap",
      },
      {
        title: "Roads and dispatch",
        body: "15–21 m internal roads sized for heavy vehicles.",
        icon: "truck",
      },
    ],
    connectivity: [
      {
        label: "Swami Vivekananda Airport, Raipur",
        value: "60 km",
      },
      {
        label: "Tilda Railway Station",
        value: "15 km",
      },
      {
        label: "Raipur City",
        value: "25 km",
      },
      {
        label: "National Highway NH-53",
        value: "Adjacent",
      },
    ],
    mofpi: "Approved under the 2014 scheme and listed as operational.",
  },
  facilities: {
    id: "campus",
    eyebrow: "The campus",
    title: "Plots, lines, cold chain, and utilities on one site.",
    body: "Six layers from industrial land to dispatch. Shared plant for processors who need throughput now; a spec sheet for those building their own unit on plot.",
    items: [
      {
        title: "Industrial plots",
        body: "30–35 developed plots with roads, water, power, and effluent treatment, ready to commission.",
        image: {
          src: "/images/admin-building.jpg",
          alt: "Admin building and developed campus plots",
        },
        spec: "30–35 plots",
      },
      {
        title: "Processing",
        body: "Aseptic and concentrate lines for tomato, mango, blueberry, papaya, guava, amla, and vegetable juices, plus IQF at 2 MT/H.",
        image: {
          src: "/images/aseptic-line.jpg",
          alt: "Aseptic process line",
        },
        spec: "12 MTPH tomato",
      },
      {
        title: "Cold chain",
        body: "1,500 MT at −20°C (4 chambers) and 3,500 MT at 0–10°C (6 chambers), plus ripening and blast freeze.",
        image: {
          src: "/images/warehouse.jpg",
          alt: "Cold storage warehouse",
        },
        spec: "5,000 MT",
      },
      {
        title: "Pack house",
        body: "Automatic sorting, grading, and packing for fresh produce, with intake from the Primary Processing Centres.",
        image: {
          src: "/images/evaporator.jpg",
          alt: "Evaporator and pack-house equipment",
        },
        spec: "10 MT/H",
      },
      {
        title: "Quality labs",
        body: "Microbiology, pesticide residue, product development, and quality assurance.",
        image: {
          src: "/images/admin-lab.jpg",
          alt: "Quality control laboratory",
        },
        spec: "4 lab functions",
      },
      {
        title: "Utilities",
        body: "2.7 MLD process water, centralised ETP and STP, 100 MT weighbridge, and 12,000 MT dry warehouse.",
        image: {
          src: "/images/weigh-bridge.jpg",
          alt: "Entry gate and 100 MT weighbridge",
        },
        spec: "2.7 MLD",
      },
    ],
  },
  products: {
    id: "products",
    eyebrow: "Made at the park",
    title: "Nourya — products from this campus.",
    body: "Tomato puree, desi ghee, and chemical-free jaggery packed on the lines at Bemta–Sarora. The full Nourya range is in the shop.",
    cta: {
      label: "Shop Nourya",
      href: "https://nourya-in.myshopify.com/",
    },
  },
  opportunities: {
    id: "opportunities",
    eyebrow: "Why invest",
    title: "Set up on a campus that's already running.",
    body: "You are not funding a greenfield. Plots, sheds, shared lines, and cold rooms are live at Bemta–Sarora. Tell us the unit — we reply with availability and a current rate card.",
    quote: "Skip the greenfield. Book the campus.",
    proofs: [
      "MOFPI Mega Food Park, listed operational",
      "Land, sheds, and lines already on the ground",
      "Allocation and rate card on enquiry",
    ],
    items: [
      {
        title: "Serviced plots",
        kicker: "Build your own unit",
        body: "Lease or co-develop on land that already has roads, water, power, and effluent treatment. You commission the plant, not the estate.",
        metric: "30–35",
        metricLabel: "ready plots",
        icon: "land-plot",
        featured: false,
      },
      {
        title: "Plug-and-play sheds",
        kicker: "Install and run",
        body: "Walk into a shed and put your line in. Sixteen MSME units with utilities in place — so the first job is equipment, not civil works.",
        metric: "16",
        metricLabel: "MSME units",
        icon: "building",
        featured: false,
      },
      {
        title: "Shared processing",
        kicker: "Throughput without the capex",
        body: "Book tomato, mango, IQF, or pack-house capacity on lines that are already packing. Start filling orders while a dedicated unit comes up — or instead of building one.",
        metric: "Live",
        metricLabel: "aseptic · IQF · pack",
        icon: "cog",
        featured: false,
      },
      {
        title: "Cold and dry storage",
        kicker: "Inventory next to the line",
        body: "Hold the run on campus: frozen and chilled chambers plus dry warehouse, beside production. You don't rebuild a warehouse to store what you just made.",
        metric: "17k MT",
        metricLabel: "cold + dry",
        icon: "package",
        featured: false,
      },
      {
        title: "Joint venture and investment",
        body: "Co-processing, shared capacity, or a campus-level partnership on an asset that's already operational.",
        icon: "handshake",
        featured: true,
      },
    ],
    cta: { label: "Request a rate card", href: "/contact" },
  },
  numbers: {
    id: "numbers",
    eyebrow: "At a glance",
    title: "Capacities on the ground.",
    items: [
      { value: "50+", label: "Acres" },
      { value: "16", label: "Plug-and-play sheds" },
      { value: "30–35", label: "Developed plots" },
      { value: "5,000 MT", label: "Cold storage" },
      { value: "12,000 MT", label: "Dry warehouse" },
      { value: "3", label: "Primary processing centres" },
    ],
  },
  location: {
    id: "location",
    eyebrow: "The works",
    title: "Next to the crop. Next to the highway.",
    body: "The plant is at Village Bemta–Sarora, near Raipur, Chhattisgarh 493101 — Tilda block. One campus. Crop in the catchment, NH-53 at the gate, rail at Tilda, and the airport 60 km out.",
    campusQuery: "Bemta Sarora, Tilda, Raipur, Chhattisgarh 493101",
    campusLabel: "Village Bemta–Sarora, near Raipur · 493101",
    mapEmbed:
      "https://maps.google.com/maps?q=Bemta+Sarora%2C+Tilda%2C+Raipur%2C+Chhattisgarh+493101&z=13&hl=en&output=embed",
    facts: [
      { value: "25 km", label: "Raipur" },
      { value: "15 km", label: "Tilda railway station" },
      { value: "60 km", label: "Raipur airport" },
      { value: "Adjacent", label: "National Highway NH-53" },
    ],
    benefits: [
      {
        title: "Crop in the catchment",
        body: "The campus sits in Chhattisgarh's agri and horticulture belt. Three Primary Processing Centres — Durg, Bilaspur, and Abhanpur (New Raipur) — take intake and grading closer to the farm.",
        icon: "crop" as const,
        tags: ["Durg", "Bilaspur", "Abhanpur"],
      },
      {
        title: "Highway at the gate",
        body: "NH-53 runs adjacent to the site, so inbound produce and outbound loads do not detour through the city.",
        icon: "road" as const,
      },
      {
        title: "Rail at Tilda",
        body: "Tilda railway station is 15 km from the works — east-bound cargo can leave from there without a long haul to a major junction.",
        icon: "rail" as const,
      },
      {
        title: "Airport at Raipur",
        body: "Swami Vivekananda Airport is 60 km from the plant — close enough for buyers, samples, and time-sensitive freight.",
        icon: "air" as const,
      },
    ],
    connections: [
      {
        label: "Swami Vivekananda Airport, Raipur",
        value: "60 km",
        query: "Swami Vivekananda Airport, Raipur",
        zoom: 12,
      },
      {
        label: "Tilda Railway Station",
        value: "15 km",
        query: "Tilda Railway Station, Chhattisgarh",
        zoom: 14,
      },
      {
        label: "Raipur",
        value: "25 km",
        query: "Raipur, Chhattisgarh",
        zoom: 11,
      },
      {
        label: "National Highway NH-53",
        value: "Adjacent",
        query: "NH-53, Tilda, Raipur, Chhattisgarh",
        zoom: 12,
      },
      {
        label: "Durg",
        value: "40 km",
        query: "Durg, Chhattisgarh",
        zoom: 11,
      },
      {
        label: "Bilaspur",
        value: "130 km",
        query: "Bilaspur, Chhattisgarh",
        zoom: 11,
      },
    ],
    markets: [
      {
        label: "Chhattisgarh production belt",
        query: "Tilda, Raipur, Chhattisgarh",
        zoom: 10,
      },
      {
        label: "Raipur urban market",
        query: "Raipur, Chhattisgarh",
        zoom: 12,
      },
      {
        label: "Central India via NH-53",
        query: "NH-53, Raipur, Chhattisgarh",
        zoom: 9,
      },
      {
        label: "East-bound dispatch via rail at Tilda",
        query: "Tilda Railway Station, Chhattisgarh",
        zoom: 14,
      },
    ],
    steps: [
      {
        title: "Growing belt",
        detail:
          "Agri and horticulture around Raipur and the Chhattisgarh production belt.",
        tone: "primary" as const,
        query: "Tilda, Raipur, Chhattisgarh",
        zoom: 10,
      },
      {
        title: "Primary processing",
        detail: "Intake and grading at three Primary Processing Centres.",
        tone: "cta" as const,
        query: "Abhanpur, Raipur, Chhattisgarh",
        zoom: 12,
      },
      {
        title: "Central campus",
        detail: "Lines, cold rooms, labs, and plots at Village Bemta–Sarora.",
        tone: "aqua" as const,
        query: "Bemta Sarora, Tilda, Raipur, Chhattisgarh 493101",
        zoom: 14,
      },
    ],
    ppcs: [
      { label: "Durg", query: "Durg, Chhattisgarh", zoom: 12 },
      { label: "Bilaspur", query: "Bilaspur, Chhattisgarh", zoom: 12 },
      { label: "Abhanpur", query: "Abhanpur, New Raipur, Chhattisgarh", zoom: 13 },
    ],
  },
  partners: {
    id: "partners",
    eyebrow: "Who belongs here",
    title: "Processors first. Partners welcome.",
    body: "The campus is designed for fruit and vegetable manufacturing. Investment and co-processing sit on top of that, not instead of it.",
    companies: [
      {
        name: "Fruit & vegetable processing",
        kicker: "Primary use",
        body: "Plots and shared lines for produce from the growing belt.",
        icon: "produce",
      },
      {
        name: "Frozen / IQF",
        kicker: "On campus",
        body: "IQF rated at 2 MT/H, with frozen chambers to −20°C.",
        icon: "frozen",
      },
      {
        name: "Aseptic & concentrate",
        kicker: "Shared lines",
        body: "Tomato at 12 MTPH, mango at 6 MTPH, plus other fruit and vegetable juices.",
        icon: "aseptic",
      },
      {
        name: "Fresh pack house",
        kicker: "Collection-linked",
        body: "Grading and packing with intake from three Primary Processing Centres.",
        icon: "pack",
      },
      {
        name: "MSME food brands",
        kicker: "16 sheds",
        body: "Plug-and-play sheds so you install equipment, not the building.",
        icon: "msme",
      },
      {
        name: "Cold chain & logistics",
        kicker: "Dispatch-ready",
        body: "5,000 MT cold storage, 12,000 MT dry warehouse, and a 100 MT weighbridge.",
        icon: "logistics",
      },
    ],
    testimonial: {
      quote:
        "You install the equipment. The campus already has the land, water, cold rooms, and collection hinterland.",
      author: "Indus Best Mega Food Park",
      company: "",
    },
    cta: { label: "Ask about partnership", href: "/contact" },
  },
  gallery: {
    eyebrow: "Campus",
    title: "What the site looks like.",
    items: [
      {
        src: "/images/warehouse.jpg",
        alt: "Warehouse and storage facilities",
        caption: "Warehouse complex",
      },
      {
        src: "/images/admin-lab.jpg",
        alt: "Admin and laboratory buildings",
        caption: "Admin and labs",
      },
      {
        src: "/images/aseptic-line.jpg",
        alt: "Aseptic process line",
        caption: "Aseptic line",
      },
      {
        src: "/images/evaporator.jpg",
        alt: "Evaporator equipment",
        caption: "Evaporator",
      },
      {
        src: "/images/cpc-building.jpg",
        alt: "Central processing campus",
        caption: "Central processing campus",
      },
      {
        src: "/images/weigh-bridge.jpg",
        alt: "Entry gate and 100 MT weighbridge",
        caption: "Entry and 100 MT weighbridge",
      },
      {
        src: "/images/admin-building.jpg",
        alt: "Admin building campus view",
        caption: "Admin building",
      },
    ],
  },
  news: {
    eyebrow: "Operational now",
    title: "What is live.",
    items: [
      {
        title: "Aseptic and concentrate lines",
        summary:
          "Tomato at 12 MTPH, mango at 6 MTPH, plus blueberry, papaya, guava, amla, and vegetable juices.",
        tag: "Processing",
      },
      {
        title: "MOFPI Mega Food Park",
        summary:
          "Approved under the 2014 scheme and listed as operational.",
        tag: "Scheme",
      },
      {
        title: "Three Primary Processing Centres",
        summary:
          "Durg, Bilaspur, and Abhanpur (New Raipur) for intake in the growing belt.",
        tag: "Collection",
      },
    ],
  },
  finalCta: {
    title: "Let's get your unit on this campus.",
    body: "Plot, plug-and-play shed, shared line, or a partnership. Tell us what you want to run — the project team replies with availability and a current rate card.",
    primaryCta: { label: "Send an enquiry", href: "/contact" },
    secondaryCta: { label: "See the campus", href: "/campus" },
  },
  enquire: {
    id: "contact",
    eyebrow: "Enquiry",
    title: "Plot, shed, shared capacity, or partnership.",
    body: "Allocated on enquiry. Ask for the current rate card — we do not publish walk-up tariffs.",
    submit: "Send enquiry",
    success: "Enquiry received. The project team will contact you shortly.",
    error: "Something went wrong. Please call or email us directly.",
    messagePlaceholder:
      "Plot size, product, throughput, or the partnership you have in mind",
  },
} as const

export type Landing = typeof landing
