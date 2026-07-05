import { Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { BookingForm } from "@/components/site/booking-form";
import { LeadForm } from "@/components/site/lead-form";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact and Booking",
  description: "Contact Lux Lens Studio, request a booking, send an inquiry, call, WhatsApp, or connect through social channels."
});

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-white/10 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="mb-3 text-sm font-medium uppercase text-gold">Contact</p>
            <h1 className="text-5xl font-semibold leading-none text-white sm:text-6xl">
              Tell us what you are making, celebrating, or launching.
            </h1>
            <p className="mt-6 text-base leading-7 text-muted">
              Every contact form, booking request, and newsletter signup is stored with consent and source data for the CRM.
            </p>
            <div className="mt-8 grid gap-3 text-sm text-muted">
              <a className="flex items-center gap-3" href="tel:+15550134">
                <Phone className="h-5 w-5 text-gold" aria-hidden="true" />
                +1 555 0134
              </a>
              <a className="flex items-center gap-3" href="https://wa.me/15550134">
                <MessageCircle className="h-5 w-5 text-gold" aria-hidden="true" />
                WhatsApp
              </a>
              <a className="flex items-center gap-3" href="mailto:hello@luxlens.studio">
                <Mail className="h-5 w-5 text-gold" aria-hidden="true" />
                hello@luxlens.studio
              </a>
              <a className="flex items-center gap-3" href="https://instagram.com">
                <Instagram className="h-5 w-5 text-gold" aria-hidden="true" />
                Instagram
              </a>
              <span className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gold" aria-hidden="true" />
                Available worldwide
              </span>
            </div>
          </div>
          <div className="rounded-lg border border-white/15 bg-white/[0.04] p-5">
            <LeadForm source="Contact Page" />
          </div>
        </div>
      </section>
      <section className="py-20" id="booking">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="mb-3 text-sm font-medium uppercase text-gold">Booking system</p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Request a date, time, service, location, budget, and inspiration files.
            </h2>
            <div className="mt-8 aspect-[16/11] overflow-hidden rounded-lg border border-white/15 bg-white/[0.04]">
              <iframe
                title="Studio map"
                className="h-full w-full grayscale invert"
                loading="lazy"
                src="https://www.google.com/maps?q=New%20York&output=embed"
              />
            </div>
          </div>
          <div className="rounded-lg border border-white/15 bg-white/[0.04] p-5">
            <BookingForm />
          </div>
        </div>
      </section>
    </>
  );
}
