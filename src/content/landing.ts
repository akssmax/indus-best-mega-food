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
    headline: "Build your plant. Skip the greenfield.",
    body: "Plots and sheds with power, water, cold chain, and collection already on site — capital goes into your line, not the estate.",
    image: {
      src: "/images/warehouse.jpg",
      alt: "Warehouse and campus at Indus Best Mega Food Park, Raipur",
    },
    primaryCta: { label: "Enquire Now", href: "/contact" },
    secondaryCta: { label: "Explore the Campus", href: "/campus" },
    stats: [
      { value: "50+", label: "Acres" },
      { value: "16", label: "MSME sheds" },
      { value: "5,000 MT", label: "Cold" },
      { value: "12,000 MT", label: "Dry" },
    ],
    slides: [
      {
        headline: "Build your plant. Skip the greenfield.",
        body: "Plots and sheds with power, water, cold chain, and collection already on site — capital goes into your line, not the estate.",
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
            detail: "Hold inventory beside your line",
            side: "right" as const,
          },
        ],
      },
      {
        headline: "Your brand on lines already packing.",
        body: "Co-pack or co-brand on aseptic, puree, and IQF. Fill orders this season — then grow into your own unit on the same campus.",
        image: {
          src: "/images/aseptic-line.jpg",
          alt: "Aseptic processing line on campus",
        },
        cards: [
          {
            value: "12 MTPH",
            label: "Tomato concentrate",
            detail: "Throughput under your label",
            side: "left" as const,
          },
          {
            value: "2 MT/H",
            label: "IQF capacity",
            detail: "Book the line, skip the capex",
            side: "right" as const,
          },
        ],
      },
      {
        headline: "Invest in a campus that's already running.",
        body: "MOFPI-listed and operational near Raipur. Joint venture, plot, or partnership on a live asset — not a prospectus.",
        image: {
          src: "/images/cpc-building.jpg",
          alt: "Central processing campus at Bemta–Sarora",
        },
        cards: [
          {
            value: "50+",
            label: "Acres on site",
            detail: "Capital into an operating park",
            side: "left" as const,
          },
          {
            value: "30–35",
            label: "Industrial plots",
            detail: "Lease or co-develop, not greenfield",
            side: "right" as const,
          },
        ],
      },
      {
        headline: "Ship from a gate that's already built.",
        body: "Weighbridge, process water, and highway access on campus — logistics capex you do not duplicate.",
        image: {
          src: "/images/weigh-bridge.jpg",
          alt: "Entry gate and 100 MT weighbridge",
        },
        cards: [
          {
            value: "100 MT",
            label: "Weighbridge",
            detail: "Dispatch without building the gate",
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
        headline: "Hold the run beside the line you own.",
        body: "Cold rooms, dry warehouse, and quality labs on site — inventory and QA without a second campus.",
        image: {
          src: "/images/admin-lab.jpg",
          alt: "Quality control laboratory on campus",
        },
        cards: [
          {
            value: "12,000 MT",
            label: "Dry warehouse",
            detail: "Inventory next to production",
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
  socialProof: {
    id: "social-proof",
    eyebrow: "At a glance",
    title: "Scheme-backed and operational.",
    body: "Mega Food Park status, project scale, and location — verified against MOFPI scheme listings.",
    // TODO: align acreage claims — hero slides use "50+" developed acres; MOFPI/PIB cite 63.8-acre project area.
    credibility: [
      { value: "63.8 acres", label: "Project area" },
      { value: "2021", label: "Operational since" },
      { value: "Raipur", label: "Chhattisgarh" },
      { value: "Mega Food Park", label: "MOFPI scheme" },
    ],
  },
  clients: {
    label: "Companies & ecosystem partners",
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
  audience: {
    id: "who-is-it-for",
    eyebrow: "Built for food businesses",
    title: "Plot, shed, shared capacity, or scale-up — choose your route.",
    body: "Plot, plug-and-play shed, shared processing lines, or farm-gate sourcing — each route links to what you need next.",
    items: [
      {
        title: "Food Manufacturers",
        subtitle: "Set up your own processing unit",
        body: "Develop your manufacturing facility on a serviced industrial plot with access to essential infrastructure and utilities.",
        cta: { label: "Explore Plots", href: "#campus" },
        icon: "factory" as const,
      },
      {
        title: "MSMEs & Growing Businesses",
        subtitle: "Start without building everything from scratch",
        body: "Plug-and-play facilities help smaller businesses get access to food processing infrastructure without the full burden of greenfield development.",
        cta: { label: "Explore Facilities", href: "#facilities" },
        icon: "building" as const,
      },
      {
        title: "Established Food Companies",
        subtitle: "Expand your processing capabilities",
        body: "Access shared processing, cold chain, warehousing and other infrastructure without duplicating every facility yourself.",
        cta: { label: "View Capabilities", href: "#processing-capabilities" },
        icon: "expand" as const,
      },
      {
        title: "Agri & Food Entrepreneurs",
        subtitle: "Move produce from farm to market",
        body: "Use the connected processing ecosystem to collect, process, store and prepare agricultural produce for larger markets.",
        cta: { label: "Talk to Us", href: "/contact" },
        icon: "sprout" as const,
      },
    ],
  },
  benefits: {
    id: "why-indus-best",
    eyebrow: "Why choose us",
    title: "Why set up here instead of building alone.",
    body: "Land, utilities, cold chain, and shared lines are already running — so you focus on product and throughput, not civil works.",
    items: [
      {
        title: "Faster setup",
        body: "Reduce the time and complexity involved in developing a food processing facility from the ground up.",
        icon: "clock" as const,
      },
      {
        title: "Shared infrastructure",
        body: "Access processing, cold chain, warehousing and other common facilities without duplicating every investment.",
        icon: "share" as const,
      },
      {
        title: "Connected to agriculture",
        body: "Located within an agricultural catchment with Primary Processing Centres supporting the movement of produce into the processing ecosystem.",
        icon: "crop" as const,
      },
      {
        title: "Built for scale",
        body: "Combine land, processing, storage, utilities and logistics within one integrated food processing campus.",
        icon: "scale" as const,
      },
    ],
  },
  ecosystem: {
    id: "ecosystem",
    eyebrow: "From farm to market",
    title: "One connected ecosystem for food processing.",
    body: "IBMFP connects agricultural sourcing with central processing, storage and dispatch — with Primary Processing Centres at Durg, Bilaspur and Abhanpur (New Raipur).",
    steps: [
      { title: "Farmers", detail: "Agri and horticulture in the growing belt.", tone: "primary" as const },
      { title: "Primary Processing Centres", detail: "Intake and grading at Durg, Bilaspur and Abhanpur.", tone: "cta" as const },
      { title: "Indus Best Mega Food Park", detail: "Central campus at Village Bemta–Sarora.", tone: "aqua" as const },
      { title: "Processing", detail: "Aseptic, concentrate, IQF and pack house.", tone: "primary" as const },
      { title: "Packaging", detail: "Sort, grade and pack for market.", tone: "cta" as const },
      { title: "Cold Chain", detail: "Frozen, chilled and IQF storage.", tone: "aqua" as const },
      { title: "Warehousing", detail: "12,000 MT dry bulk storage.", tone: "primary" as const },
      { title: "Distribution", detail: "NH-53, rail at Tilda, dispatch-ready.", tone: "cta" as const },
    ],
  },
  facilityCategories: {
    id: "facilities",
    eyebrow: "Infrastructure",
    title: "Processing, storage, and utilities on one campus.",
    body: "Five shared categories on campus — processing, cold chain, warehousing, quality labs, and utilities.",
  },
  campusOverview: {
    id: "campus",
    eyebrow: "The campus",
    title: "Plots, sheds, and on-site infrastructure.",
    body: "Developed land with utilities in place. Choose a serviced plot, a plug-and-play shed, or book shared capacity on lines already running.",
    items: [
      {
        title: "Serviced plots",
        body: "30–35 developed plots with roads, water, power, and effluent treatment, ready to commission.",
        metric: "30–35",
        metricLabel: "ready plots",
        proof: "30–35 serviced plots ready to commission",
        tone: "primary" as const,
        details: [
          "Roads, water, power, and effluent treatment on site",
          "Lease or co-develop — you commission the plant, not the estate",
          "Internal roads sized for heavy vehicles (15–21 m)",
        ],
        cta: { label: "Enquire about a plot", href: "/contact" },
        image: {
          src: "/images/admin-building.jpg",
          alt: "Admin building and developed campus plots",
        },
      },
      {
        title: "Plug-and-play sheds",
        body: "Sixteen MSME units with utilities in place — install equipment, not the building.",
        metric: "16",
        metricLabel: "MSME sheds",
        proof: "16 MSME sheds with utilities in place",
        tone: "cta" as const,
        details: [
          "Walk in and install equipment — utilities already connected",
          "Designed for MSMEs and growing brands",
          "Start operations without a full greenfield build",
        ],
        cta: { label: "Enquire about a shed", href: "/contact" },
        image: {
          src: "/images/warehouse.jpg",
          alt: "MSME warehouse sheds at Indus Best Mega Food Park",
        },
      },
      {
        title: "Shared processing",
        body: "Aseptic, concentrate, IQF, and pack house capacity on lines already packing.",
        metric: "Live",
        metricLabel: "aseptic · IQF · pack",
        proof: "12 MTPH peak aseptic line on campus",
        tone: "aqua" as const,
        details: [
          "Tomato concentrate line · 12 MTPH",
          "Mango puree line · 6 MTPH",
          "IQF freeze line · 2 MT/H",
        ],
        cta: { label: "View processing capabilities", href: "#processing-capabilities" },
        image: {
          src: "/images/aseptic-line.jpg",
          alt: "Aseptic process line",
        },
      },
      {
        title: "Cold and dry storage",
        body: "5,000 MT cold storage and 12,000 MT dry warehouse beside production.",
        metric: "17k MT",
        metricLabel: "cold + dry",
        proof: "5,000 MT cold · 12,000 MT dry warehouse",
        tone: "primary" as const,
        details: [
          "Frozen and chilled chambers beside production",
          "12,000 MT dry bulk warehouse on campus",
          "Ripening chambers and blast freeze available",
        ],
        cta: { label: "Talk to the team", href: "/contact" },
        image: {
          src: "/images/warehouse.jpg",
          alt: "Cold storage warehouse",
        },
      },
    ],
  },
  processingCapabilities: {
    id: "processing-capabilities",
    eyebrow: "Processing capabilities",
    title: "Shared aseptic and concentrate throughput.",
    body: "Book capacity on shared lines rated in MT per hour — compare throughput by crop below.",
  },
  faq: {
    id: "faq",
    eyebrow: "Have questions?",
    title: "Everything you need to know before setting up.",
    items: [
      {
        question: "What is Indus Best Mega Food Park?",
        answer:
          "Indus Best Mega Food Park is an integrated food processing infrastructure project located in Raipur district, Chhattisgarh, providing facilities for food processing, storage, utilities and related activities.",
      },
      {
        question: "Who can set up a unit at the park?",
        answer:
          "Food manufacturers, MSMEs, agri-businesses and other eligible food processing businesses can explore available infrastructure and setup options.",
      },
      {
        question: "What types of infrastructure are available?",
        answer:
          "Processing, cold storage, warehousing, pack house, food testing, utilities, developed plots, and plug-and-play facilities.",
      },
      {
        question: "Can I set up my own processing unit?",
        answer:
          "Yes. Serviced industrial plots (30–35 on campus) come with roads, water, power, and effluent treatment — so you commission the plant, not the estate.",
      },
      {
        question: "Are plug-and-play facilities available?",
        answer:
          "Sixteen MSME sheds are available with utilities in place. Walk in, install your equipment, and start operations without a full greenfield build.",
      },
      {
        question: "What processing capabilities are available?",
        answer:
          "Aseptic and concentrate lines for tomato, mango, and other fruit and vegetable juices, plus IQF at 2 MT/H. See the processing capabilities section for full throughput details.",
        link: { label: "View processing capabilities", href: "#processing-capabilities" },
      },
      {
        question: "Where is the park located?",
        answer:
          "Village Bemta–Sarora, Tilda block, Raipur district, Chhattisgarh 493101 — with NH-53 adjacent, rail at Tilda, and Swami Vivekananda Airport at Raipur.",
      },
      {
        question: "How can I enquire about setting up a unit?",
        answer:
          "Contact our team to discuss available plots, facilities and setup requirements.",
      },
    ],
    cta: { label: "Talk to the Indus Best team", href: "/contact" },
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
    title: "Nourya — packed on these lines.",
    body: "Tomato puree, desi ghee, and chemical-free jaggery leave Bemta–Sarora under the Nourya brand. Browse the range made on campus.",
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
    title: "Next to the crop. Connected to the market.",
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
    title: "Ready to build your next food processing unit?",
    body: "Tell us what you're looking to manufacture, and we'll help you find the right infrastructure at Indus Best.",
    primaryCta: { label: "Enquire Now", href: "/contact" },
    secondaryCta: { label: "Explore the Campus", href: "/campus" },
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
