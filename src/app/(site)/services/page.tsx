import { ServiceCards } from "@/components/site/service-cards";
import { SectionHeading } from "@/components/site/section-heading";
import { buildMetadata } from "@/lib/seo";
import { getCmsContent } from "@/services/cms";

export const metadata = buildMetadata({
  title: "Photography Services",
  description:
    "Premium photography services for weddings, fashion editorials, portraits, corporate campaigns, events, architecture, travel, nature, and commercial work."
});

export default async function ServicesPage() {
  const { services } = await getCmsContent();

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Services"
          title="Production, direction, and delivery in one refined workflow."
          description="Each service includes a hero image, gallery, pricing, FAQ, inquiry path, and booking path."
        />
        <ServiceCards services={services} />
      </div>
    </section>
  );
}
