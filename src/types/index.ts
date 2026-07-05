export type UserRole = "admin" | "editor" | "viewer";

export type LeadStatus =
  | "New"
  | "Contacted"
  | "Interested"
  | "Quoted"
  | "Follow Up"
  | "Won"
  | "Lost"
  | "Spam";

export type ServiceCategory =
  | "Wedding"
  | "Pre Wedding"
  | "Fashion"
  | "Portrait"
  | "Corporate"
  | "Events"
  | "Travel"
  | "Nature"
  | "Architecture"
  | "Commercial";

export type NavItem = {
  label: string;
  href: string;
};

export type PortfolioItem = {
  title: string;
  category: ServiceCategory;
  location: string;
  image: string;
  alt: string;
  featured?: boolean;
  tags: string[];
};

export type ServiceItem = {
  title: string;
  slug: string;
  category: ServiceCategory;
  price: string;
  description: string;
  heroImage: string;
  gallery: string[];
  faqs: { question: string; answer: string }[];
  featured?: boolean;
};

export type BlogItem = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image: string;
  tags: string[];
  publishedAt: string;
  author: string;
};

export type TestimonialItem = {
  name: string;
  role: string;
  quote: string;
  rating: number;
  image: string;
  videoUrl?: string;
};

export type CrmLead = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  serviceInterested?: string;
  budget?: string;
  eventDate?: string;
  location?: string;
  status: LeadStatus;
  assignedTo?: string;
  createdAt: string;
  value?: number;
  leadSource?: string;
};
