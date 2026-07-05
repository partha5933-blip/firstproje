import Image from "next/image";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/site/lead-form";
import { Badge } from "@/components/ui/badge";
import { buildMetadata } from "@/lib/seo";
import { getCmsContent } from "@/services/cms";

type BlogDetailProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { blogPosts } = await getCmsContent();
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogDetailProps) {
  const { slug } = await params;
  const { blogPosts } = await getCmsContent();
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return buildMetadata({ title: "Blog", description: "Photography blog article." });
  }

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image
  });
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const { slug } = await params;
  const { blogPosts } = await getCmsContent();
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <article className="border-b border-white/10">
        <section className="relative min-h-[64svh] overflow-hidden">
          <Image src={post.image} alt={post.title} fill priority sizes="100vw" className="object-cover opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-black/20" />
          <div className="relative z-10 mx-auto flex min-h-[64svh] max-w-4xl items-end px-4 pb-14 sm:px-6 lg:px-8">
            <div>
              <Badge>{post.category}</Badge>
              <h1 className="mt-5 text-5xl font-semibold leading-none text-white sm:text-6xl">
                {post.title}
              </h1>
              <p className="mt-5 text-base leading-7 text-champagne/85">{post.excerpt}</p>
              <p className="mt-4 text-sm text-muted">
                {post.author} · {new Date(post.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="space-y-6 text-base leading-8 text-champagne/85">
            <p>
              Great photography begins before the camera is lifted. The strongest sessions have a clear brief, humane pacing, and a small number of visual priorities that everyone understands.
            </p>
            <p>
              For weddings, that means building the timeline around real light and emotional transitions. For brands, it means designing a reusable image library instead of chasing one hero frame.
            </p>
            <p>
              The CRM behind this site keeps those details tied to each inquiry, so proposals, follow-ups, notes, and consent records remain organized from the first message to final delivery.
            </p>
          </div>
        </section>
      </article>
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="mb-3 text-sm font-medium uppercase text-gold">Start a conversation</p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Turn this guide into a plan for your date.
            </h2>
          </div>
          <div className="rounded-lg border border-white/15 bg-white/[0.04] p-5">
            <LeadForm source={`Blog: ${post.title}`} />
          </div>
        </div>
      </section>
    </>
  );
}
