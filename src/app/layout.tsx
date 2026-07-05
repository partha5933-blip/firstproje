import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import { StructuredData } from "@/components/structured-data";
import { organizationSchema } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Lux Lens Studio | Premium Photography Portfolio and CRM",
    template: "%s | Lux Lens Studio"
  },
  description:
    "Premium photography portfolio, booking, lead generation, and CRM for weddings, fashion, portraits, events, and commercial productions."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <StructuredData data={organizationSchema()} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
