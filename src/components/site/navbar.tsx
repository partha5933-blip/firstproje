"use client";

import Link from "next/link";
import { Camera, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

const navItems: NavItem[] = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" }
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Lux Lens Studio home">
          <span className="flex h-10 w-10 items-center justify-center rounded-md border border-gold/35 bg-white/[0.04]">
            <Camera className="h-5 w-5 text-gold" aria-hidden="true" />
          </span>
          <span className="text-base font-semibold tracking-normal text-ink">Lux Lens</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/admin"
            className="rounded-md px-3 py-2 text-sm text-muted transition hover:bg-white/10 hover:text-ink"
          >
            CRM
          </Link>
          <Link
            href="/contact#booking"
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-lux-hover hover:text-white"
          >
            Book a Shoot
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-ink md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-white/10 bg-background px-4 py-4 md:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav className="grid gap-2" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-3 text-sm text-muted transition hover:bg-white/10 hover:text-ink"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact#booking"
            className="mt-2 rounded-md bg-white px-3 py-3 text-center text-sm font-medium text-black"
            onClick={() => setOpen(false)}
          >
            Book a Shoot
          </Link>
        </nav>
      </div>
    </header>
  );
}
