import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { BlogItem } from "@/types";

export function BlogHighlights({ posts }: { posts: BlogItem[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {posts.slice(0, 3).map((post) => (
        <article key={post.slug} className="overflow-hidden rounded-lg border border-white/15 bg-white/[0.04]">
          <div className="relative aspect-[16/10]">
            <Image src={post.image} alt={post.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
          </div>
          <div className="p-5">
            <Badge>{post.category}</Badge>
            <h3 className="mt-4 text-lg font-semibold text-white">{post.title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gold"
            >
              Read Guide
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
