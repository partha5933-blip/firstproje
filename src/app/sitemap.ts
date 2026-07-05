import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";
import { getCmsContent } from "@/services/cms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { services, blogPosts } = await getCmsContent();
  const staticRoutes = [
    "",
    "/portfolio",
    "/services",
    "/about",
    "/blog",
    "/testimonials",
    "/contact",
    "/privacy",
    "/terms"
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7
    })),
    ...services.map((service) => ({
      url: absoluteUrl(`/services/${service.slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8
    })),
    ...blogPosts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.65
    }))
  ];
}
