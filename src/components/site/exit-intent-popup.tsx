"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { LeadForm } from "@/components/site/lead-form";

export function ExitIntentPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("lux-lens-exit-popup") === "seen") {
      return;
    }

    const handleMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 0) {
        sessionStorage.setItem("lux-lens-exit-popup", "seen");
        setOpen(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[96] flex items-center justify-center bg-black/80 p-4">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-white/15 bg-background p-5 shadow-soft">
        <button
          type="button"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-white"
          onClick={() => setOpen(false)}
          aria-label="Close popup"
        >
          <X className="h-4 w-4" />
        </button>
        <p className="text-sm font-medium uppercase text-gold">Private planning guide</p>
        <h2 className="mt-3 pr-10 text-2xl font-semibold text-white">
          Get a tailored shot plan before you book.
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted">
          Tell us the style and date you have in mind. We will send a concise production outline with availability.
        </p>
        <div className="mt-5">
          <LeadForm source="Exit Intent Popup" />
        </div>
      </div>
    </div>
  );
}
