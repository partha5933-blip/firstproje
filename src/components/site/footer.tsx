import Link from "next/link";
import { Camera, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { NewsletterForm } from "@/components/site/newsletter-form";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#070707]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-md border border-gold/35">
              <Camera className="h-5 w-5 text-gold" aria-hidden="true" />
            </span>
            <span className="text-base font-semibold text-white">Lux Lens Studio</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
            Premium photography for weddings, portraits, fashion, corporate campaigns, and events.
          </p>
          <div className="mt-5 grid gap-2 text-sm text-muted">
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gold" aria-hidden="true" />
              +1 555 0134
            </span>
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gold" aria-hidden="true" />
              hello@luxlens.studio
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gold" aria-hidden="true" />
              Available worldwide
            </span>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase text-white">Studio</h2>
          <div className="mt-4 grid gap-3 text-sm text-muted">
            <Link href="/portfolio">Portfolio</Link>
            <Link href="/services">Services</Link>
            <Link href="/about">About</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/testimonials">Testimonials</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase text-white">Lead magnet</h2>
          <p className="mt-4 text-sm leading-6 text-muted">
            Receive a concise planning guide for elegant, low-stress photography production.
          </p>
          <div className="mt-5">
            <NewsletterForm />
          </div>
          <Link
            href="https://instagram.com"
            className="mt-5 inline-flex items-center gap-2 text-sm text-gold"
          >
            <Instagram className="h-4 w-4" aria-hidden="true" />
            Instagram
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-muted">
        © 2026 Lux Lens Studio. All rights reserved.
      </div>
    </footer>
  );
}
