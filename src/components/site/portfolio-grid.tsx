"use client";

import Image from "next/image";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { portfolioCategories } from "@/data/sample-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PortfolioItem, ServiceCategory } from "@/types";

type PortfolioGridProps = {
  items: PortfolioItem[];
  compact?: boolean;
};

export function PortfolioGrid({ items, compact = false }: PortfolioGridProps) {
  const [active, setActive] = useState<ServiceCategory | "All">("All");
  const [lightbox, setLightbox] = useState<PortfolioItem | null>(null);

  const filtered = useMemo(
    () => (active === "All" ? items : items.filter((item) => item.category === active)),
    [active, items]
  );

  const visibleItems = compact ? filtered.slice(0, 6) : filtered;

  return (
    <div>
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
        {(["All", ...portfolioCategories] as const).map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={`shrink-0 rounded-md border px-3 py-2 text-sm transition ${
              active === category
                ? "border-gold bg-gold text-black"
                : "border-white/15 bg-white/[0.04] text-muted hover:text-ink"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="masonry">
        {visibleItems.map((item) => (
          <button
            key={`${item.title}-${item.category}`}
            type="button"
            onClick={() => setLightbox(item)}
            className="masonry-item group block w-full overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] text-left"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(min-width: 1180px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
              <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-md bg-black/45 text-white backdrop-blur">
                <Search className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>
            <div className="p-4">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge>{item.category}</Badge>
                <span className="text-xs text-muted">{item.location}</span>
              </div>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            </div>
          </button>
        ))}
      </div>

      {lightbox ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-md border border-white/15 bg-white/10 text-white"
            aria-label="Close image preview"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="grid max-h-[88vh] w-full max-w-5xl gap-4 lg:grid-cols-[1fr_320px]">
            <div className="relative min-h-[58vh] overflow-hidden rounded-lg border border-white/15">
              <Image src={lightbox.image} alt={lightbox.alt} fill sizes="90vw" className="object-cover" />
            </div>
            <aside className="rounded-lg border border-white/15 bg-white/[0.04] p-5">
              <Badge>{lightbox.category}</Badge>
              <h3 className="mt-4 text-2xl font-semibold text-white">{lightbox.title}</h3>
              <p className="mt-2 text-sm text-muted">{lightbox.location}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {lightbox.tags.map((tag) => (
                  <span key={tag} className="rounded-md bg-white/10 px-2 py-1 text-xs text-champagne">
                    {tag}
                  </span>
                ))}
              </div>
              <Button className="mt-6 w-full" onClick={() => (window.location.href = "/contact#booking")}>
                Inquire About This Style
              </Button>
            </aside>
          </div>
        </div>
      ) : null}
    </div>
  );
}
