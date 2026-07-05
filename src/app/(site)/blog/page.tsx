import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { buildMetadata } from "@/lib/seo";
import { getCmsContent } from "@/services/cms";

export const metadata = buildMetadata({
  title: "Photography Blog",
  description: "CMS-powered photography planning guides with categories, search, tags, SEO metadata, and comments architecture."
});

export default async function BlogPage() {
  const { blogPosts } = await getCmsContent();

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-medium uppercase text-gold">Blog</p>
          <h1 className="text-5xl font-semibold text-white sm:text-6xl">Planning guides and studio notes.</h1>
          <p className="mt-5 text-base leading-7 text-muted">
            Searchable CMS content for clients and SEO-rich landing paths.
          </p>
        </div>
        <div className="mx-auto mt-10 flex max-w-xl items-center gap-3 rounded-lg border border-white/15 bg-white/[0.04] p-2">
          <Search className="ml-2 h-5 w-5 text-gold" aria-hidden="true" />
          <Input placeholder="Search guides by category, tag, or service" className="border-0 bg-transparent focus:ring-0" />
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.slug} className="overflow-hidden rounded-lg border border-white/15 bg-white/[0.04]">
              <div className="relative aspect-[16/10]">
                <Image src={post.image} alt={post.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-2">
                  <Badge>{post.category}</Badge>
                  {post.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} className="text-muted">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h2 className="mt-4 text-xl font-semibold text-white">{post.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="mt-5 inline-block text-sm font-medium text-gold">
                  Read article
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
