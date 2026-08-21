

export const enquiryInterests = [
  { value: "plot", label: "Developed plot" },
  { value: "msme", label: "MSME plug-and-play shed" },
  { value: "facility", label: "Shared facility capacity" },
  { value: "other", label: "Other / rate card" },
] as const

export type EnquiryInterest = (typeof enquiryInterests)[number]["value"]

export const landing = {
  hero: {
    eyebrow: "India's Integrated Food Processing Ecosystem",
    headline: "A Complete Ecosystem for Food Processing & Growth",
    body: "From farm to factory, Indus Best Mega Food Park offers world-class infrastructure, plug-and-play facilities, and a strategic location — everything you need to build, process, and scale your food business.",
    image: {
      src: "/images/warehouse.jpg",
      alt: "Warehouse and campus at Indus Best Mega Food Park, Raipur",
    },
    primaryCta: { label: "Explore Opportunities", href: "/#opportunities" },
    secondaryCta: {
      label: "Explore Our Infrastructure",
      href: "/#infrastructure",
    },
    stats: [
      { value: "50+", label: "Acres" },
      { value: "30+", label: "Facilities" },
      { value: "50,000 MT", label: "Storage Capacity" },
      { value: "Strategic", label: "Location" },
    ],
  },
  about: {
    id: "about",
    eyebrow: "About Us",
    title: "India's Premier Integrated Food Processing Ecosystem",
    body: "Indus Best Mega Food Park Private Limited is set up at Village Bemta–Sarora (Near Raipur, Chhattisgarh). The park provides a platform and establishes backward and forward linkages covering the entire food processing value chain — quality assurance, food safety, and implementation of best practices in post-harvest management.",
    whatIs:
      "Indus Best Mega Food Park is a cluster-based food processing ecosystem built under the Ministry of Food Processing Industries Mega Food Park Scheme. It brings together collection centres, primary processing centres, a central processing campus, cold chain, and fully developed plots — all in one agri/horticultural zone.",
    vision: {
      title: "Vision",
      body: "To establish as a premier Mega Food Park with pro-environment, state-of-the-art infrastructure and current technology, in continuous improvement. We aim to be the first choice of food processors — transparent, quality-led, and aligned with global practice.",
    },
    mission: {
      title: "Mission",
      body: "To remain the first choice of food processors and emerge as a global hub for the food processing industry — delivering services, quality assurance, and high-end technology with global safety norms and environmental stewardship.",
    },
    image: {
      src: "/images/cpc-building.jpg",
      alt: "Central Processing Campus at Indus Best Mega Food Park",
    },
    cta: { label: "Know More About Us", href: "/#contact" },
  },
  why: {
    id: "why",
    eyebrow: "Why Choose Indus",
    title: "Built for Businesses That Want to Grow",
    body: "Indus Best Mega Food Park delivers the infrastructure, location, and support that food-processing businesses need to start fast and scale with confidence.",
    advantages: [
      {
        title: "Strategic Location",
        body: "Located in Chhattisgarh's agri belt, just 60 km from Swami Vivekananda Airport and 15 km from Tilda Railway Station, with direct access to major highways and agricultural markets.",
      },
      {
        title: "Integrated Infrastructure",
        body: "A complete ecosystem with processing lines, cold chain, warehousing, quality labs, utilities, and logistics — all on a single campus.",
      },
      {
        title: "Plug-and-Play Facilities",
        body: "16 MSME plug-and-play sheds let food processors install equipment and start operations without building from scratch.",
      },
      {
        title: "Supply Chain & Logistics",
        body: "Three Primary Processing Centres at Durg, Bilaspur, and Abhanpur (New Raipur) ensure efficient collection and grading in the growing belt.",
      },
      {
        title: "Government & Industry Support",
        body: "Approved under the MOFPI Mega Food Park Scheme with access to state industrial policies, agro & food policies, and food processing incentives.",
      },
      {
        title: "Cost & Operational Advantages",
        body: "Shared infrastructure, centralised quality labs, and common utilities dramatically reduce capital expenditure and operational overhead for food businesses.",
      },
    ],
  },
  infrastructure: {
    id: "infrastructure",
    eyebrow: "Infrastructure",
    title: "Everything You Need. In One Ecosystem.",
    body: "The park is designed as a self-contained food processing campus with world-class infrastructure across multiple zones — from processing to logistics.",
    zones: [
      {
        title: "Industrial Plots",
        body: "30–35 fully developed plots with roads, water, effluent treatment, and power — ready for commissioning.",
        icon: "map",
      },
      {
        title: "Processing Facilities",
        body: "Aseptic and concentrate lines for tomato, mango, berry, papaya, guava, amla, and vegetable juices — sized in metric tonnes per hour.",
        icon: "factory",
      },
      {
        title: "Cold Storage & Chain",
        body: "5,000 MT cold storage across frozen and chilled chambers, ripening rooms, blast freezers, and IQF capacity.",
        icon: "snowflake",
      },
      {
        title: "Warehousing",
        body: "12,000 MT dry warehouse for ambient bulk storage and distribution.",
        icon: "warehouse",
      },
      {
        title: "Utilities",
        body: "2.7 MLD water supply, centralised ETP & STP, 100 MT weighbridge, and secured campus with worker amenities.",
        icon: "zap",
      },
      {
        title: "Logistics",
        body: "15–21 m internal roads, proximity to Tilda railway station (15 km) and Raipur airport (60 km) for seamless dispatch.",
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
    mofpi:
      "Approved under the Ministry of Food Processing Industries Mega Food Park Scheme (2014) and listed as operational.",
  },
  facilities: {
    id: "facilities",
    eyebrow: "Facilities & Services",
    title: "World-Class Facilities for Every Stage of Processing",
    body: "From cold chain to quality assurance, our campus provides the complete infrastructure food businesses need.",
    items: [
      {
        title: "Cold Storage",
        body: "4-chamber facility at −20°C (1,500 MT) and 6-chamber facility at 0–10°C (3,500 MT) for frozen and chilled products.",
        image: {
          src: "/images/warehouse.jpg",
          alt: "Cold storage facility",
        },
        spec: "5,000 MT Total Capacity",
      },
      {
        title: "IQF & Processing",
        body: "Individual Quick Freeze line with packaging hall at 2 MT/H, plus aseptic and concentrate lines for fruit and vegetable processing.",
        image: {
          src: "/images/aseptic-line.jpg",
          alt: "IQF and aseptic processing line",
        },
        spec: "2 MT/H IQF Capacity",
      },
      {
        title: "Pack House",
        body: "Automatic sorting, grading, and packaging line for fresh fruits and vegetables at 10 MT/H throughput.",
        image: {
          src: "/images/cpc-building.jpg",
          alt: "Pack house facility",
        },
        spec: "10 MT/H Throughput",
      },
      {
        title: "Warehousing",
        body: "12,000 MT dry warehouse for ambient bulk storage, plus ripening chambers (8 chambers, 400 MT) and blast freezers (2 chambers, 10 MT).",
        image: {
          src: "/images/warehouse.jpg",
          alt: "Dry warehouse facility",
        },
        spec: "12,000 MT Dry Storage",
      },
      {
        title: "Testing & Quality Labs",
        body: "Centralised quality assurance labs for microbiological testing, pesticide residue analysis, product development, and SE & QAL compliance.",
        image: {
          src: "/images/admin-lab.jpg",
          alt: "Quality control laboratory",
        },
        spec: "4 Lab Categories",
      },
      {
        title: "Utilities",
        body: "2.7 MLD campus-wide water supply, centralised ETP & STP, 100 MT modular weighbridge, and secured campus with bank/ATM and canteen.",
        image: {
          src: "/images/weigh-bridge.jpg",
          alt: "Entry and weighbridge",
        },
        spec: "2.7 MLD Water Supply",
      },
      {
        title: "Common Infrastructure",
        body: "15–21 m internal roads, worker amenities, space for bank/ATM and canteen, fully secured campus with efficient sewage and effluent collection.",
        image: {
          src: "/images/admin-building.jpg",
          alt: "Admin building and campus",
        },
        spec: "15–21 m Roads",
      },
    ],
  },
  opportunities: {
    id: "opportunities",
    eyebrow: "Business Opportunities",
    title: "Build Your Food Business at Indus Best",
    body: "Whether you're starting a new processing unit, expanding operations, or looking for shared infrastructure — there's a place for you at Indus Best.",
    items: [
      {
        title: "Industrial Plots",
        body: "30–35 fully developed plots with roads, water, power, and effluent treatment ready for commissioning.",
        icon: "land-plot",
      },
      {
        title: "Ready Infrastructure",
        body: "Plug-and-play MSME sheds so you can install equipment without building a greenfield site.",
        icon: "building",
      },
      {
        title: "Processing Facilities",
        body: "Access aseptic, concentrate, IQF, and pack house lines without capital investment in shared capacity.",
        icon: "cog",
      },
      {
        title: "Storage & Logistics",
        body: "5,000 MT cold storage, 12,000 MT dry warehouse, and strategic connectivity for efficient distribution.",
        icon: "package",
      },
      {
        title: "Partnership Opportunities",
        body: "Joint ventures, co-processing, and investment partnerships within an established food processing ecosystem.",
        icon: "handshake",
      },
    ],
    cta: { label: "Explore Opportunities", href: "/#contact" },
  },
  numbers: {
    id: "numbers",
    eyebrow: "Our Impact",
    title: "Built to Scale. Proven to Deliver.",
    items: [
      { value: "50+", label: "Acres Developed" },
      { value: "₹500 Cr", label: "Total Investment" },
      { value: "30+", label: "Facilities" },
      { value: "50,000 MT", label: "Storage Capacity" },
      { value: "50+", label: "Businesses" },
      { value: "10+", label: "Years of Experience" },
    ],
  },
  location: {
    id: "location",
    eyebrow: "Location Advantage",
    title: "Strategically Connected to Markets",
    body: "Situated in Chhattisgarh's prime agricultural belt, Indus Best offers unmatched connectivity to raw material sources, transport hubs, and consumer markets.",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.5!2d81.63!3d21.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDE1JzAwLjAiTiA4McKwMzcnNDguMCJF!5e0!3m2!1sen!2sin!4v1700000000000",
    connections: [
      { label: "Swami Vivekananda Airport, Raipur", value: "60 km" },
      { label: "Tilda Railway Station", value: "15 km" },
      { label: "Raipur City Centre", value: "25 km" },
      { label: "National Highway NH-53", value: "Adjacent" },
      { label: "Durg", value: "40 km" },
      { label: "Bilaspur", value: "130 km" },
    ],
    markets: [
      "Chhattisgarh Agricultural Belt",
      "Central India Consumer Market",
      "Eastern India Distribution Hub",
      "North India Market Access via NH",
    ],
  },
  partners: {
    id: "partners",
    eyebrow: "Our Partners",
    title: "Growing Together",
    body: "Indus Best Mega Food Park is home to leading food processing companies, manufacturers, and industry partners who trust our ecosystem for their operations.",
    companies: [
      { name: "Food Processing Co. A" },
      { name: "Agro Industries Ltd." },
      { name: "Fresh Produce Exports" },
      { name: "Cold Chain Solutions" },
      { name: "Packaging Systems Pvt. Ltd." },
      { name: "Quality Foods International" },
    ],
    testimonial: {
      quote:
        "Indus Best Mega Food Park gave us the infrastructure and support to scale our food processing operations without the overhead of building from scratch. The integrated ecosystem is a game-changer.",
      author: "Operations Director",
      company: "Leading Food Processor",
    },
    cta: { label: "Become a Part of Indus Best", href: "/#contact" },
  },
  gallery: {
    eyebrow: "Gallery",
    title: "Experience the Campus",
    items: [
      {
        src: "/images/warehouse.jpg",
        alt: "Warehouse and storage facilities",
        caption: "Warehouse Complex",
      },
      {
        src: "/images/admin-lab.jpg",
        alt: "Admin and laboratory buildings",
        caption: "Admin & Lab Buildings",
      },
      {
        src: "/images/aseptic-line.jpg",
        alt: "Aseptic process line",
        caption: "Aseptic Processing Line",
      },
      {
        src: "/images/evaporator.jpg",
        alt: "Evaporator equipment",
        caption: "Evaporator System",
      },
      {
        src: "/images/cpc-building.jpg",
        alt: "Central processing campus",
        caption: "Central Processing Campus",
      },
      {
        src: "/images/weigh-bridge.jpg",
        alt: "Entry gate and weighbridge",
        caption: "Entry & Weighbridge",
      },
      {
        src: "/images/admin-building.jpg",
        alt: "Admin building campus view",
        caption: "Admin Building",
      },
    ],
  },
  news: {
    eyebrow: "News & Updates",
    title: "Latest from Indus Best",
    items: [
      {
        date: "2024-12-15",
        title: "New Processing Line Commissioned",
        summary:
          "A new aseptic processing line for mango and tomato has been commissioned, expanding our capacity to serve growing market demand.",
        tag: "Infrastructure",
      },
      {
        date: "2024-11-20",
        title: "MOFPI Review Meeting Successful",
        summary:
          "Indus Best Mega Food Park successfully passed the MOFPI operational review, reaffirming our compliance with national food processing standards.",
        tag: "Milestone",
      },
      {
        date: "2024-10-10",
        title: "Industry Partnership Announced",
        summary:
          "A strategic partnership with leading food processors to develop shared cold chain infrastructure across the Chhattisgarh region.",
        tag: "Partnership",
      },
    ],
  },
  finalCta: {
    eyebrow: "Get Started",
    title: "Ready to Build Your Food Business?",
    body: "Explore available opportunities and discover how Indus Best can help you build, process and scale in India's integrated food processing ecosystem.",
    primaryCta: { label: "Enquire Now", href: "/#contact" },
    secondaryCta: { label: "Download Brochure", href: "#", download: true },
  },
  enquire: {
    id: "contact",
    eyebrow: "Contact Us",
    title: "Tell Us What You Want to Set Up",
    body: "Plots, MSME sheds, and shared facility capacity are allocated on enquiry. Ask for a current rate card — we do not publish walk-up tariffs on this page.",
    submit: "Send enquiry",
    success: "Enquiry received. Our team will contact you shortly.",
    error: "Something went wrong. Please call or email us directly.",
  },
} as const

export type Landing = typeof landing
