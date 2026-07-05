import Image from "next/image";
import { timeline } from "@/data/sample-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About the Studio",
  description:
    "Biography, experience, achievements, mission, vision, behind-the-scenes process, and studio timeline."
});

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-white/10 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="mb-3 text-sm font-medium uppercase text-gold">About</p>
            <h1 className="text-5xl font-semibold leading-none text-white sm:text-6xl">
              Image-making with editorial discipline and human warmth.
            </h1>
            <p className="mt-6 text-base leading-7 text-muted">
              Lux Lens Studio was founded to make premium photography feel both meticulous and easy. The studio blends direction, documentary attention, and a CRM-backed client experience so every shoot moves from inquiry to delivery without friction.
            </p>
          </div>
          <div className="relative min-h-[520px] overflow-hidden rounded-lg border border-white/15">
            <Image
              src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1400&q=85"
              alt="Photographer working on set"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {[
            ["Mission", "Create photographs that feel permanent, useful, and emotionally exact."],
            ["Vision", "Give every client a luxury production experience without confusion or excess."],
            ["Experience", "Weddings, campaign systems, editorial portraits, events, and brand launches across 40+ destinations."]
          ].map(([title, body]) => (
            <article key={title} className="rounded-lg border border-white/15 bg-white/[0.04] p-6">
              <h2 className="text-xl font-semibold text-white">{title}</h2>
              <p className="mt-4 text-sm leading-6 text-muted">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#080808] py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-medium uppercase text-gold">Timeline</p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">How the studio evolved.</h2>
          <div className="mt-10 grid gap-4">
            {timeline.map((item) => (
              <article key={item.year} className="grid gap-4 rounded-lg border border-white/15 bg-white/[0.04] p-5 sm:grid-cols-[120px_1fr]">
                <p className="text-2xl font-semibold text-gold">{item.year}</p>
                <div>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
