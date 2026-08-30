export const landings = {
  platform: {
    hero: {
      eyebrow: "Mega Food Park · Raipur, Chhattisgarh",
      headline: "Bringing food processing infrastructure to life.",
      body: "Powering manufacturers, MSMEs, and agri businesses on a campus that's already built — serviced plots, shared lines, cold chain, and dispatch-ready logistics at Village Bemta–Sarora.",
      primaryCta: { label: "Explore the campus", href: "#campus" },
      secondaryCta: { label: "Enquire now", href: "/contact" },
    },
    showcase: {
      tabs: [
        {
          id: "plots",
          label: "Plots & sheds",
          title: "Serviced land, ready to commission",
          body: "30–35 developed plots and 16 MSME sheds with roads, water, power, and effluent treatment in place.",
          image: {
            src: "/images/warehouse.jpg",
            alt: "MSME sheds and developed plots at Indus Best Mega Food Park",
          },
          chips: ["30–35 plots", "16 MSME sheds", "Utilities live"],
          tone: "primary" as const,
        },
        {
          id: "processing",
          label: "Shared processing",
          title: "Lines already packing on campus",
          body: "Book aseptic concentrate, puree, and IQF throughput on shared infrastructure — rated in metric tonnes per hour.",
          image: {
            src: "/images/aseptic-line.jpg",
            alt: "Aseptic processing line on campus",
          },
          chips: ["12 MTPH tomato", "6 MTPH mango", "2 MT/H IQF"],
          tone: "cta" as const,
        },
        {
          id: "cold",
          label: "Cold & dispatch",
          title: "Storage beside production, NH-53 at the gate",
          body: "5,000 MT cold storage, 12,000 MT dry warehouse, and highway and rail connectivity for dispatch-ready logistics.",
          image: {
            src: "/images/weigh-bridge.jpg",
            alt: "Weighbridge and campus dispatch gate",
          },
          chips: ["5,000 MT cold", "12,000 MT dry", "NH-53 access"],
          tone: "aqua" as const,
        },
      ],
      quickLinks: [
        { label: "Processing", href: "#capabilities" },
        { label: "Cold storage", href: "#capabilities" },
        { label: "Warehousing", href: "#capabilities" },
        { label: "Location", href: "#location" },
      ],
    },
    trust: {
      eyebrow: "On the ground",
      title: "Companies and partners on these lines.",
    },
    pillars: {
      eyebrow: "Three routes onto the campus",
      title: "Plot, process, or store — on infrastructure that's already running.",
      items: [
        {
          id: "plots",
          title: "Plots & plug-and-play sheds",
          body: "Develop your own unit on serviced industrial land — or walk into an MSME shed with utilities already connected.",
          proof: "16 MSME sheds with utilities in place",
          cta: { label: "Explore plots", href: "#campus" },
          image: {
            src: "/images/warehouse.jpg",
            alt: "MSME sheds and developed plots at Indus Best Mega Food Park",
          },
          tone: "primary" as const,
        },
        {
          id: "processing",
          title: "Shared processing lines",
          body: "Book aseptic concentrate, puree, and IQF throughput on lines already packing — rated in metric tonnes per hour.",
          proof: "12 MTPH peak aseptic line on campus",
          cta: { label: "View capabilities", href: "#capabilities" },
          image: {
            src: "/images/aseptic-line.jpg",
            alt: "Aseptic processing line on campus",
          },
          tone: "cta" as const,
        },
        {
          id: "cold",
          title: "Cold storage & dispatch",
          body: "Frozen, chilled, and dry bulk storage beside production — with NH-53 and rail connectivity for dispatch-ready logistics.",
          proof: "5,000 MT cold · 12,000 MT dry warehouse",
          cta: { label: "See location", href: "#location" },
          image: {
            src: "/images/weigh-bridge.jpg",
            alt: "Weighbridge and campus dispatch gate",
          },
          tone: "aqua" as const,
        },
      ],
    },
    flow: {
      eyebrow: "From farm to market",
      title: "One connected flow across the belt.",
      body: "Primary Processing Centres feed the central campus — from intake through manufacturing, storage, and dispatch.",
      steps: [
        { label: "Source", detail: "PPC intake across the growing belt" },
        { label: "Campus", detail: "Bemta–Sarora central hub" },
        { label: "Manufacture", detail: "Shared lines & cold chain" },
        { label: "Market", detail: "Storage & dispatch" },
      ],
    },
    capabilities: {
      eyebrow: "Infrastructure",
      title: "Processing, storage, and utilities on one campus.",
      body: "Five shared categories on campus — compare specs by category below.",
    },
    ways: {
      eyebrow: "Why invest",
      title: "Set up on a campus that's already running.",
      body: "Plot, shed, shared line, or partnership — tell us the unit and we reply with availability.",
    },
  },
  night: {
    hero: {
      eyebrow: "Bemta–Sarora",
      headline: "The campus is already running.",
      body: "A Ministry of Food Processing Industries Mega Food Park, operational near Raipur — plots, sheds, lines, and cold chain on one site in the growing belt.",
      primaryCta: { label: "Enquire now", href: "#contact" },
      secondaryCta: { label: "Walk the campus", href: "#gallery" },
    },
    why: {
      eyebrow: "On the ground",
      title: "Collection in the belt. Processing on campus.",
      body: "Three Primary Processing Centres feed the central campus. You commission a unit. You do not construct an industrial estate.",
    },
    gallery: {
      eyebrow: "The site",
      title: "What Bemta–Sarora looks like.",
    },
    products: {
      eyebrow: "Packed here",
      title: "Nourya, from these lines.",
      body: "Tomato puree, desi ghee, and chemical-free jaggery — made at the park.",
    },
    cta: {
      eyebrow: "Next",
      title: "Come and see the campus.",
      body: "Plot, MSME shed, shared capacity, or a partnership conversation.",
    },
    enquire: {
      eyebrow: "Write to us",
      title: "The project team replies with a rate card.",
      body: "We do not publish walk-up tariffs. Ask for availability.",
    },
  },
} as const
