import Image from "next/image";
import { Play, Star } from "lucide-react";
import type { TestimonialItem } from "@/types";

export function Testimonials({ testimonials }: { testimonials: TestimonialItem[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {testimonials.map((testimonial) => (
        <article key={testimonial.name} className="rounded-lg border border-white/15 bg-white/[0.04] p-5">
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 overflow-hidden rounded-md">
              <Image src={testimonial.image} alt={testimonial.name} fill sizes="56px" className="object-cover" />
            </div>
            <div>
              <h3 className="font-semibold text-white">{testimonial.name}</h3>
              <p className="text-sm text-muted">{testimonial.role}</p>
            </div>
          </div>
          <div className="mt-4 flex gap-1 text-gold" aria-label={`${testimonial.rating} star rating`}>
            {Array.from({ length: testimonial.rating }).map((_, index) => (
              <Star key={index} className="h-4 w-4 fill-current" aria-hidden="true" />
            ))}
          </div>
          <p className="mt-4 text-sm leading-6 text-champagne/85">{testimonial.quote}</p>
          <button
            type="button"
            className="mt-5 inline-flex h-10 items-center gap-2 rounded-md border border-white/15 px-3 text-sm text-ink transition hover:border-gold/70"
          >
            <Play className="h-4 w-4" aria-hidden="true" />
            Video Review
          </button>
        </article>
      ))}
    </div>
  );
}
