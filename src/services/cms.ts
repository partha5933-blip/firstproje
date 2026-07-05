import { isMongoConfigured, connectDB } from "@/lib/db";
import BlogPost from "@/models/BlogPost";
import PortfolioItemModel from "@/models/PortfolioItem";
import ServiceModel from "@/models/Service";
import Testimonial from "@/models/Testimonial";
import { blogPosts, portfolioItems, services, testimonials } from "@/data/sample-content";
import type { BlogItem, PortfolioItem, ServiceItem, TestimonialItem } from "@/types";

type CmsContent = {
  services: ServiceItem[];
  portfolioItems: PortfolioItem[];
  blogPosts: BlogItem[];
  testimonials: TestimonialItem[];
};

export async function getCmsContent(): Promise<CmsContent> {
  if (!isMongoConfigured()) {
    return {
      services,
      portfolioItems,
      blogPosts,
      testimonials
    };
  }

  await connectDB();
  const [dbServices, dbPortfolio, dbBlogs, dbTestimonials] = await Promise.all([
    ServiceModel.find({ active: true }).sort({ featured: -1, createdAt: -1 }).lean(),
    PortfolioItemModel.find().sort({ featured: -1, sortOrder: 1, createdAt: -1 }).lean(),
    BlogPost.find({ status: "published" }).sort({ publishedAt: -1 }).lean(),
    Testimonial.find({ approved: true }).sort({ featured: -1, createdAt: -1 }).lean()
  ]);

  return {
    services: dbServices.length ? (dbServices as unknown as ServiceItem[]) : services,
    portfolioItems: dbPortfolio.length ? (dbPortfolio as unknown as PortfolioItem[]) : portfolioItems,
    blogPosts: dbBlogs.length ? (dbBlogs as unknown as BlogItem[]) : blogPosts,
    testimonials: dbTestimonials.length ? (dbTestimonials as unknown as TestimonialItem[]) : testimonials
  };
}
