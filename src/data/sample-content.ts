import type {
  BlogItem,
  CrmLead,
  LeadStatus,
  PortfolioItem,
  ServiceCategory,
  ServiceItem,
  TestimonialItem
} from "@/types";

export const portfolioCategories: ServiceCategory[] = [
  "Wedding",
  "Pre Wedding",
  "Fashion",
  "Portrait",
  "Corporate",
  "Events",
  "Travel",
  "Nature",
  "Architecture",
  "Commercial"
];

export const heroSlides = [
  {
    eyebrow: "Luxury photography studio",
    headline: "Cinematic images for the moments that deserve permanence.",
    description:
      "Editorial direction, calm production, and gallery-grade delivery for weddings, portraits, fashion, and commercial stories.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=85"
  },
  {
    eyebrow: "Booked globally",
    headline: "A refined visual system for people, brands, and celebrations.",
    description:
      "From pre-production to final retouching, every touchpoint is designed for clarity and polish.",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1800&q=85"
  }
];

export const services: ServiceItem[] = [
  {
    title: "Signature Wedding Story",
    slug: "signature-wedding-story",
    category: "Wedding",
    price: "From $4,800",
    description:
      "Full-day wedding coverage with editorial portraits, documentary candids, assistant coverage, and a private online gallery.",
    heroImage:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=1200&q=80"
    ],
    faqs: [
      {
        question: "How far in advance should we book?",
        answer: "Most wedding dates are reserved 8 to 14 months in advance."
      },
      {
        question: "Do you travel?",
        answer: "Yes. Travel and production costs are quoted clearly before booking."
      }
    ],
    featured: true
  },
  {
    title: "Fashion Editorial",
    slug: "fashion-editorial",
    category: "Fashion",
    price: "From $2,400",
    description:
      "Studio or location production for campaigns, lookbooks, and personal brand imagery with creative direction included.",
    heroImage:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80"
    ],
    faqs: [
      {
        question: "Can you source stylists and makeup artists?",
        answer: "Yes. The studio maintains a trusted production network."
      }
    ],
    featured: true
  },
  {
    title: "Corporate Image System",
    slug: "corporate-image-system",
    category: "Corporate",
    price: "From $3,200",
    description:
      "Executive portraits, workplace stories, campaign assets, and event coverage designed for brand consistency.",
    heroImage:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80"
    ],
    faqs: [
      {
        question: "Do you support multi-day shoots?",
        answer: "Yes. We create production plans for single teams and distributed companies."
      }
    ]
  }
];

export const portfolioItems: PortfolioItem[] = [
  {
    title: "Rooftop Vows",
    category: "Wedding",
    location: "New York",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
    alt: "Bride and groom photographed in warm evening light",
    featured: true,
    tags: ["editorial", "city", "evening"]
  },
  {
    title: "Monochrome Campaign",
    category: "Fashion",
    location: "Los Angeles",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
    alt: "Fashion model in a monochrome editorial frame",
    featured: true,
    tags: ["studio", "campaign", "contrast"]
  },
  {
    title: "Founders at Work",
    category: "Corporate",
    location: "San Francisco",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85",
    alt: "Corporate team captured in a refined office setting",
    tags: ["brand", "team", "workplace"]
  },
  {
    title: "Cliffside Promise",
    category: "Pre Wedding",
    location: "Big Sur",
    image:
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=85",
    alt: "Couple portrait against a coastal cliff",
    tags: ["coastal", "romantic", "destination"]
  },
  {
    title: "Glass House Lines",
    category: "Architecture",
    location: "Chicago",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=85",
    alt: "Modern architectural space with strong natural light",
    tags: ["interior", "design", "lines"]
  },
  {
    title: "Northern Quiet",
    category: "Nature",
    location: "Iceland",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85",
    alt: "Wide landscape image with soft natural color",
    tags: ["landscape", "travel", "calm"]
  },
  {
    title: "Product in Motion",
    category: "Commercial",
    location: "Studio",
    image:
      "https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&w=1200&q=85",
    alt: "Premium product photography setup with controlled highlights",
    tags: ["product", "studio", "detail"]
  },
  {
    title: "Museum Gala",
    category: "Events",
    location: "London",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=85",
    alt: "Elegant event audience in a modern venue",
    tags: ["event", "gala", "coverage"]
  },
  {
    title: "Quiet Character",
    category: "Portrait",
    location: "Studio",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=85",
    alt: "Premium portrait with dark background and soft light",
    tags: ["portrait", "studio", "identity"]
  },
  {
    title: "Desert Passage",
    category: "Travel",
    location: "Marrakesh",
    image:
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=85",
    alt: "Travel photograph of an atmospheric desert passage",
    tags: ["travel", "editorial", "culture"]
  }
];

export const testimonials: TestimonialItem[] = [
  {
    name: "Maya and Aaron",
    role: "Wedding clients",
    quote:
      "The gallery felt cinematic without ever feeling staged. Every important person and tiny detail was there.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1529634597503-139d3726fed5?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Nora Valen",
    role: "Creative director",
    quote:
      "The production was calm, exacting, and fast. We left with a full campaign system, not just pretty frames.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Carter Studio",
    role: "Architecture practice",
    quote:
      "They understood the restraint of our spaces and translated it into images that won clients immediately.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
  }
];

export const blogPosts: BlogItem[] = [
  {
    title: "How to plan a wedding timeline that photographs beautifully",
    slug: "wedding-timeline-photographs-beautifully",
    excerpt:
      "A practical guide to light, locations, family portraits, and unhurried editorial moments.",
    category: "Wedding",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85",
    tags: ["timeline", "wedding", "planning"],
    publishedAt: "2026-05-12",
    author: "Elena Moreau"
  },
  {
    title: "Building a brand image library in one production day",
    slug: "brand-image-library-production-day",
    excerpt:
      "How founders and marketing teams can leave a single shoot with months of polished campaign assets.",
    category: "Commercial",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
    tags: ["brand", "commercial", "production"],
    publishedAt: "2026-04-18",
    author: "Julian Reed"
  },
  {
    title: "What to wear for portraits with quiet confidence",
    slug: "what-to-wear-portraits-quiet-confidence",
    excerpt:
      "Wardrobe, texture, color, and fit advice for portraits that feel current without chasing trends.",
    category: "Portrait",
    image:
      "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?auto=format&fit=crop&w=1200&q=85",
    tags: ["portrait", "styling", "guide"],
    publishedAt: "2026-03-20",
    author: "Elena Moreau"
  }
];

export const faqs = [
  {
    question: "How quickly are galleries delivered?",
    answer: "Portrait and commercial galleries are usually delivered in 10 to 21 days. Weddings are delivered in 6 to 8 weeks."
  },
  {
    question: "Can we book a consultation first?",
    answer: "Yes. Every inquiry can begin with a 20-minute planning call before a proposal is issued."
  },
  {
    question: "Do you provide retouching?",
    answer: "Every delivered image receives color work and finishing. Advanced retouching is available for campaigns and portraits."
  },
  {
    question: "Are raw files included?",
    answer: "Final edited files are included. Raw delivery can be licensed for commercial productions."
  }
];

export const awards = [
  "Rangefinder Rising Studio",
  "Sony Alpha Partner Feature",
  "Junebug Best Wedding Stories",
  "Graphis Photography Merit"
];

export const timeline = [
  {
    year: "2014",
    title: "Studio founded",
    detail: "A portrait practice became a full-service photography studio."
  },
  {
    year: "2018",
    title: "Destination team launched",
    detail: "Production expanded into weddings, travel, and commercial campaigns."
  },
  {
    year: "2022",
    title: "Editorial retouching suite",
    detail: "The studio built an in-house finishing workflow for consistent luxury delivery."
  },
  {
    year: "2026",
    title: "CRM-led client experience",
    detail: "Every inquiry, booking, consent, and follow-up now runs through an integrated CRM."
  }
];

export const sampleLeads: CrmLead[] = [
  {
    id: "lead-001",
    name: "Amelia Hart",
    email: "amelia@example.com",
    phone: "+1 555 0101",
    serviceInterested: "Signature Wedding Story",
    budget: "$6,000",
    eventDate: "2026-09-18",
    location: "Napa Valley",
    status: "New",
    assignedTo: "Elena",
    createdAt: "2026-07-05T08:30:00.000Z",
    value: 6200,
    leadSource: "Homepage"
  },
  {
    id: "lead-002",
    name: "Noah Chen",
    email: "noah@example.com",
    phone: "+1 555 0130",
    serviceInterested: "Corporate Image System",
    budget: "$4,500",
    eventDate: "2026-08-06",
    location: "Seattle",
    status: "Quoted",
    assignedTo: "Julian",
    createdAt: "2026-07-04T17:10:00.000Z",
    value: 4500,
    leadSource: "LinkedIn"
  },
  {
    id: "lead-003",
    name: "Priya Kapoor",
    email: "priya@example.com",
    phone: "+1 555 0188",
    serviceInterested: "Fashion Editorial",
    budget: "$3,200",
    eventDate: "2026-07-28",
    location: "Brooklyn",
    status: "Follow Up",
    assignedTo: "Mina",
    createdAt: "2026-07-03T12:05:00.000Z",
    value: 3200,
    leadSource: "Portfolio"
  }
];

export const leadStatusesForPipeline: LeadStatus[] = [
  "New",
  "Contacted",
  "Interested",
  "Quoted",
  "Follow Up",
  "Won",
  "Lost"
];

export const dashboardSeries = [
  { month: "Jan", leads: 32, revenue: 38000 },
  { month: "Feb", leads: 41, revenue: 52000 },
  { month: "Mar", leads: 38, revenue: 47000 },
  { month: "Apr", leads: 56, revenue: 72000 },
  { month: "May", leads: 64, revenue: 84000 },
  { month: "Jun", leads: 72, revenue: 91000 }
];
