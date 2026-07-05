import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";

type SeoOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

export function buildMetadata(options: SeoOptions): Metadata {
  const url = absoluteUrl(options.path || "/");
  const image = options.image || absoluteUrl("/opengraph-image");

  return {
    title: options.title,
    description: options.description,
    alternates: {
      canonical: url
    },
    robots: options.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: options.title,
      description: options.description,
      url,
      images: [{ url: image, width: 1200, height: 630 }],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: options.title,
      description: options.description,
      images: [image]
    }
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Lux Lens Studio",
    image: absoluteUrl("/opengraph-image"),
    url: absoluteUrl("/"),
    telephone: "+1-555-0134",
    priceRange: "$$$",
    sameAs: ["https://instagram.com", "https://facebook.com"],
    address: {
      "@type": "PostalAddress",
      addressCountry: "US"
    }
  };
}
