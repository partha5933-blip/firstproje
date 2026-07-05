import { SectionHeading } from "@/components/site/section-heading";
import { Testimonials } from "@/components/site/testimonials";
import { buildMetadata } from "@/lib/seo";
import { getCmsContent } from "@/services/cms";

export const metadata = buildMetadata({
  title: "Client Testimonials",
  description: "Video reviews, image-backed testimonials, Google-style ratings, and CRM-ready testimonial management."
});

export default async function TestimonialsPage() {
  const { testimonials } = await getCmsContent();

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title="Proof, ratings, and client stories."
          description="The testimonial model supports images, videos, source labels, approval workflows, and featured placement."
        />
        <Testimonials testimonials={testimonials} />
      </div>
    </section>
  );
}
