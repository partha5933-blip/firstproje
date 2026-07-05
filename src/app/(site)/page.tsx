import Image from "next/image";
import Link from "next/link";
import { Award, CalendarCheck, ChevronRight, ShieldCheck, Sparkles } from "lucide-react";
import { BlogHighlights } from "@/components/site/blog-highlights";
import { FAQ } from "@/components/site/faq";
import { Hero } from "@/components/site/hero";
import { LeadForm } from "@/components/site/lead-form";
import { PortfolioGrid } from "@/components/site/portfolio-grid";
import { SectionHeading } from "@/components/site/section-heading";
import { ServiceCards } from "@/components/site/service-cards";
import { Testimonials } from "@/components/site/testimonials";
import { awards, faqs, portfolioItems as fallbackPortfolio } from "@/data/sample-content";
import { buildMetadata } from "@/lib/seo";
import { getCmsContent } from "@/services/cms";

export const metadata = buildMetadata({
  title: "Premium Photography Portfolio and Booking CRM",
  description:
    "Luxury photography studio for weddings, fashion, portraits, corporate campaigns, events, travel, nature, architecture, and commercial work."
});

export default async function HomePage() {
  const { services, portfolioItems, blogPosts, testimonials } = await getCmsContent();

  return (
    <>
      <Hero />

      <section className="border-b border-white/10 bg-background py-12">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          {[
            ["14+", "years directing shoots"],
            ["42", "destination productions"],
            ["4.9", "average client rating"],
            ["95%", "proposal response within 24h"]
          ].map(([metric, label]) => (
            <div key={label} className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
              <p className="text-3xl font-semibold text-white">{metric}</p>
              <p className="mt-2 text-sm text-muted">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Featured work"
            title="Portfolio built for feeling, polish, and commercial clarity."
            description="Filter by category, inspect the frame in a lightbox, and inquire directly from the style that fits your project."
          />
          <PortfolioGrid items={portfolioItems.length ? portfolioItems : fallbackPortfolio} compact />
          <div className="mt-8 text-center">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-md border border-white/15 px-4 py-3 text-sm text-ink transition hover:border-gold/70"
            >
              View Full Portfolio
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#080808] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Services"
            title="Quietly complete production for personal and brand stories."
            description="Every service includes planning, creative direction, production, gallery delivery, and CRM-tracked communication."
          />
          <ServiceCards services={services} />
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="mb-3 text-sm font-medium uppercase text-gold">Lead generation</p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Inquiry flows that feel elegant to clients and useful to the studio.
            </h2>
            <div className="mt-8 grid gap-4">
              {[
                ["CRM ready", "Every inquiry stores source, UTM, consent, and status."],
                ["Email automation", "Admin notifications and client confirmations are ready for Gmail credentials."],
                ["GDPR posture", "Consent checkboxes, cookie preferences, export, and deletion endpoints are included."]
              ].map(([title, detail]) => (
                <div key={title} className="flex gap-4">
                  <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-gold/35 text-gold">
                    <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-white">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-white/15 bg-white/[0.04] p-5">
            <LeadForm source="Homepage" />
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#080808] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Testimonials"
            title="Clients remember the calm as much as the images."
          />
          <Testimonials testimonials={testimonials} />
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <p className="mb-3 text-sm font-medium uppercase text-gold">Awards</p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              A studio language shaped by editorial restraint.
            </h2>
            <div className="mt-8 grid gap-3">
              {awards.map((award) => (
                <div key={award} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4">
                  <Award className="h-5 w-5 text-gold" aria-hidden="true" />
                  <span className="text-sm text-champagne">{award}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-lg border border-white/15">
            <Image
              src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=85"
              alt="Behind the scenes photography production"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent p-6">
              <p className="flex items-center gap-2 text-sm text-gold">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Behind the scenes
              </p>
              <p className="mt-2 max-w-sm text-sm leading-6 text-champagne/85">
                Direction, lighting, pacing, and retouching handled with one coherent studio system.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#080808] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Latest blog" title="Planning guides for better photographs." />
          <BlogHighlights posts={blogPosts} />
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="FAQ" title="Common questions before the first call." />
          <FAQ items={faqs} />
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#080808] py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <p className="mb-3 text-sm font-medium uppercase text-gold">Contact</p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Bring the date, location, and mood. We will shape the rest.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-muted">
              Use the booking system for date-specific requests or send a general inquiry for portfolio, pricing, and creative direction.
            </p>
            <Link
              href="/contact#booking"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-md bg-gold px-5 text-sm font-medium text-black transition hover:bg-lux-hover hover:text-white"
            >
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              Start Booking
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {portfolioItems.slice(0, 6).map((item) => (
              <div key={item.title} className="relative aspect-square overflow-hidden rounded-lg border border-white/10">
                <Image src={item.image} alt={item.alt} fill sizes="33vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
