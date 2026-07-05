import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";

export function FloatingCTA() {
  return (
    <div className="fixed bottom-4 right-4 z-40 hidden flex-col gap-2 sm:flex">
      <Link
        href="tel:+15550134"
        className="flex h-11 w-11 items-center justify-center rounded-md border border-white/15 bg-background/80 text-ink shadow-soft backdrop-blur transition hover:border-gold/70"
        aria-label="Call the studio"
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
      </Link>
      <Link
        href="https://wa.me/15550134"
        className="flex h-11 w-11 items-center justify-center rounded-md bg-gold text-black shadow-gold transition hover:bg-lux-hover hover:text-white"
        aria-label="Message on WhatsApp"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
      </Link>
    </div>
  );
}
