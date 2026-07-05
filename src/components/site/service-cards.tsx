import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ServiceItem } from "@/types";

export function ServiceCards({ services }: { services: ServiceItem[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {services.map((service) => (
        <article key={service.slug} className="overflow-hidden rounded-lg border border-white/15 bg-white/[0.04]">
          <div className="relative aspect-[4/3]">
            <Image src={service.heroImage} alt={service.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
          </div>
          <div className="p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <Badge>{service.category}</Badge>
              {service.featured ? <Sparkles className="h-4 w-4 text-gold" aria-hidden="true" /> : null}
            </div>
            <h3 className="text-xl font-semibold text-white">{service.title}</h3>
            <p className="mt-2 text-sm font-medium text-gold">{service.price}</p>
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">{service.description}</p>
            <div className="mt-5 flex gap-2">
              <Link
                href={`/services/${service.slug}`}
                className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-md border border-white/15 px-3 text-sm text-ink transition hover:border-gold/70"
              >
                Details
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contact#booking"
                className="inline-flex h-10 flex-1 items-center justify-center rounded-md bg-white px-3 text-sm font-medium text-black transition hover:bg-lux-hover hover:text-white"
              >
                Book Now
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
