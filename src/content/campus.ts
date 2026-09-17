/** Campus detail copy aligned with the client pitch deck. */
export const campusDetail = {
  scale: {
    id: "campus-scale",
    eyebrow: "At a glance",
    title: "67 acres. One integrated site.",
    body: "Developed land, plug-and-play sheds, processing lines, multi-temperature storage, labs, and utilities — on the Raipur–Bilaspur corridor at Simga (Village Bemta–Sarora).",
    stats: [
      { value: "67", label: "Acres integrated park" },
      { value: "32", label: "Acres plotted land" },
      { value: "16", label: "Ready MSME sheds" },
      { value: "21,600 MT", label: "Total storage capacity" },
    ],
    plots: {
      title: "Developed free-hold plots",
      body: "32 acres of plotted area (1,393,920 sq ft) with utilities at the plot boundary. 15 acres currently available for free-hold sale.",
      items: [
        "₹66 lakh per acre — ₹3 lakh upfront, balance at registration",
        "Stamp duty exemption under Chhattisgarh Industrial Policy",
        "Water, power, ETP, STP, and roads at plot boundary",
      ],
    },
    sheds: {
      title: "Standard design factory sheds",
      body: "16 sheds of 160 sqm each (9 × 18 m) — 27,555 sq ft built-up on a 4,047 sqm parcel.",
      items: [
        "₹1,500 per sqm per annum on lease",
        "Power and water connected — plug-and-play occupation",
        "Shared lab, weighbridge, storage, and ETP on site",
      ],
    },
  },
  collection: {
    id: "collection-network",
    eyebrow: "Backward linkage",
    title: "Three Primary Processing Centres feeding the park.",
    body: "PPCs at Raipur, Durg, and Bilaspur aggregate, grade, and pre-cool produce before it reaches the central campus — shortening farm-to-line time.",
    centres: [
      {
        name: "PPC Raipur",
        subtitle: "Abhanpur · New Raipur",
        specs: [
          "4 acres · 174,240 sq ft",
          "Warehouse (93 × 34 m): 8,000 MT",
          "Built-up area: 34,035 sq ft",
        ],
      },
      {
        name: "PPC Durg",
        specs: [
          "3 acres · 130,680 sq ft",
          "Warehouse (42 × 25 m): 1,000 MT",
          "Built-up area: 12,109 sq ft",
        ],
      },
      {
        name: "PPC Bilaspur",
        subtitle: "Leased shed facility",
        specs: [
          "Deep freeze: 500 MT · Cold storage: 500 MT",
          "Dry warehouse: 500 MT · Ripening: 40 MT",
          "Grading yard: 5,382 sq ft",
        ],
      },
    ],
  },
  utilities: {
    id: "campus-utilities",
    eyebrow: "Reliability",
    title: "Utilities sized with headroom.",
    body: "Power, water, and effluent capacity built for continuous production — expandable as your throughput grows.",
    groups: [
      {
        title: "Water",
        items: [
          "4 borewells at 1,015 L/min each",
          "1.5 ML combined head tank and sump storage",
          "2.7 MLD current demand — expandable to 5.0 MLD",
          "Cooling towers on the process-water circuit",
        ],
      },
      {
        title: "Power",
        items: [
          "33 kV dedicated sub-station · 8.0 MW approved",
          "1.6 MVA × 2 installed transformer capacity",
          "1,250 KVA generator back-up for outages",
        ],
      },
      {
        title: "Effluent & sewage",
        items: [
          "ETP 1.2 MLD — expandable to 2.5 MLD",
          "STP 70 KLD sewage treatment",
        ],
      },
      {
        title: "Site infrastructure",
        items: [
          "3.6 km internal roads (15–21 m right of way)",
          "Storm water drainage and rain water harvesting",
          "Street and high-mast lighting · round-the-clock security",
        ],
      },
    ],
    image: {
      src: "/images/gallery/etp-plant.webp",
      alt: "ETP plant and chimney on the campus utilities block",
    },
  },
  assurance: {
    id: "campus-assurance",
    eyebrow: "Assurance",
    title: "Quality built into the park.",
    body: "An on-site 12,917 sq ft laboratory supports batch release at the campus — not at a third-party lab days away.",
    labs: [
      "On-line Quality Control Lab",
      "Microbiological Lab",
      "Product & PM Development Lab",
      "SE Lab",
      "Pesticide Residue Lab (project stage)",
    ],
    controls: [
      "Park-wide firefighting network",
      "Pest control across the processing zone",
      "100 MT electronic modular weighbridge at entry",
      "Batch-level traceability through storage and processing",
    ],
    image: {
      src: "/images/gallery/lab-corridor.webp",
      alt: "Blue-panel corridor through the quality assurance wing",
    },
  },
  groundProof: {
    id: "campus-ground",
    eyebrow: "On the ground",
    title: "What the campus looks like today.",
    body: "Gate, utilities, live lines, and dry storage photographed on site — the same campus the spec sheet describes.",
    items: [
      {
        title: "Gate",
        body: "Indus entry gate and security cabin at Bemta–Sarora.",
        image: {
          src: "/images/gallery/entry-gate.webp",
          alt: "Indus Best entry gate and security cabin at Bemta–Sarora",
        },
      },
      {
        title: "Utilities",
        body: "ETP plant with chimney on the campus utilities block.",
        image: {
          src: "/images/gallery/etp-plant.webp",
          alt: "ETP plant and chimney on the campus utilities block",
        },
      },
      {
        title: "On the line",
        body: "Stainless processing hall in production, with steam on the floor.",
        image: {
          src: "/images/gallery/process-hall.webp",
          alt: "Live processing hall with stainless equipment and steam",
        },
      },
      {
        title: "Dry store",
        body: "Pallet racking in the dry warehouse beside production.",
        image: {
          src: "/images/gallery/warehouse-racking.webp",
          alt: "Pallet racking aisle in the dry warehouse",
        },
      },
    ],
  },
} as const
