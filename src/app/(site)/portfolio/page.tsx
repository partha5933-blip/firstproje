import { LeadForm } from "@/components/site/lead-form";
import { PortfolioGrid } from "@/components/site/portfolio-grid";
import { SectionHeading } from "@/components/site/section-heading";
import { buildMetadata } from "@/lib/seo";
import { getCmsContent } from "@/services/cms";

export const metadata = buildMetadata({
  title: "Photography Portfolio",
  description:
    "Explore wedding, pre-wedding, fashion, portrait, corporate, events, travel, nature, architecture, and commercial photography."
});

export default async function PortfolioPage() {
  const { portfolioItems } = await getCmsContent();

  return (
    <>
      <section className="border-b border-white/10 bg-[#080808] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Portfolio"
            title="A complete gallery with filtering and lightbox viewing."
            description="Search by visual category and open each image in a focused preview before starting an inquiry."
          />
          <PortfolioGrid items={portfolioItems} />
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="mb-3 text-sm font-medium uppercase text-gold">Inquire</p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Ask for availability around the style you like most.
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              Portfolio inquiries store the selected lead source and can be assigned, quoted, and followed up inside the CRM.
            </p>
          </div>
          <div className="rounded-lg border border-white/15 bg-white/[0.04] p-5">
            <LeadForm source="Portfolio" />
          </div>
        </div>
      </section>
    </>
  );
}
