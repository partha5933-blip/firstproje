import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms",
  description: "Terms for inquiries, bookings, media usage, deposits, and production communication."
});

export default function TermsPage() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <p className="mb-3 text-sm font-medium uppercase text-gold">Terms</p>
        <h1 className="text-4xl font-semibold text-white">Terms of Service</h1>
        <div className="mt-8 space-y-6 text-sm leading-7 text-muted">
          <p>
            Inquiries and booking requests do not guarantee availability until a proposal, agreement, and deposit are confirmed.
          </p>
          <p>
            Final edited files are delivered through a private gallery. Commercial licensing, raw file delivery, advanced retouching, and travel are quoted separately when required.
          </p>
          <p>
            Client communication, notes, files, follow-ups, and email history may be managed in the studio CRM for accurate service delivery.
          </p>
        </div>
      </div>
    </section>
  );
}
