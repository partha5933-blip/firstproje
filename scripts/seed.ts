import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { connectDB } from "../src/lib/db";
import { blogPosts, portfolioItems, services, testimonials } from "../src/data/sample-content";
import BlogPost from "../src/models/BlogPost";
import PortfolioItem from "../src/models/PortfolioItem";
import Service from "../src/models/Service";
import Settings from "../src/models/Settings";
import Testimonial from "../src/models/Testimonial";
import User from "../src/models/User";

dotenv.config({ path: ".env.local" });

async function seed() {
  await connectDB();

  await Promise.all(
    services.map((service) =>
      Service.findOneAndUpdate({ slug: service.slug }, service, { upsert: true, new: true })
    )
  );

  await Promise.all(
    portfolioItems.map((item) =>
      PortfolioItem.findOneAndUpdate(
        { title: item.title },
        {
          ...item,
          slug: item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
        },
        { upsert: true, new: true }
      )
    )
  );

  await Promise.all(
    blogPosts.map((post) =>
      BlogPost.findOneAndUpdate(
        { slug: post.slug },
        {
          ...post,
          status: "published",
          publishedAt: new Date(post.publishedAt),
          content: post.excerpt
        },
        { upsert: true, new: true }
      )
    )
  );

  await Promise.all(
    testimonials.map((testimonial) =>
      Testimonial.findOneAndUpdate(
        { name: testimonial.name },
        { ...testimonial, approved: true, featured: true },
        { upsert: true, new: true }
      )
    )
  );

  await Settings.findOneAndUpdate(
    { key: "global" },
    {
      key: "global",
      homepage: {
        heroHeadline: "Cinematic images for the moments that deserve permanence.",
        heroSubheadline:
          "Editorial direction, calm production, and gallery-grade delivery for personal and commercial stories.",
        heroVideoUrl: "https://cdn.pixabay.com/video/2023/09/24/182352-867600560_large.mp4"
      },
      contact: {
        phone: "+1 555 0134",
        whatsapp: "+1 555 0134",
        email: "hello@luxlens.studio",
        instagram: "https://instagram.com",
        facebook: "https://facebook.com"
      },
      seo: {
        defaultTitle: "Lux Lens Studio",
        defaultDescription: "Premium photography portfolio and CRM.",
        ogImage: "/og-image.jpg"
      },
      gdpr: {
        privacyVersion: "2026-07",
        termsVersion: "2026-07",
        cookieVersion: "2026-07"
      }
    },
    { upsert: true, new: true }
  );

  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
    await User.findOneAndUpdate(
      { email: process.env.ADMIN_EMAIL.toLowerCase() },
      {
        name: process.env.ADMIN_NAME || "Studio Admin",
        email: process.env.ADMIN_EMAIL.toLowerCase(),
        passwordHash,
        role: "admin",
        active: true
      },
      { upsert: true, new: true }
    );
  }

  console.log("Seed complete.");
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
