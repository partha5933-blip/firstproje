import Image from "next/image";
import { notFound } from "next/navigation";
import { BookingForm } from "@/components/site/booking-form";
import { FAQ } from "@/components/site/faq";
import { LeadForm } from "@/components/site/lead-form";
import { Badge } from "@/components/ui/badge";
import { buildMetadata } from "@/lib/seo";
import { getCmsContent } from "@/services/cms";

type ServiceDetailProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { services } = await getCmsContent();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServiceDetailProps) {
  const { slug } = await params;
  const { services } = await getCmsContent();
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return buildMetadata({
      title: "Service",
      description: "Photography service details."
    });
  }

  return buildMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${service.slug}`,
    image: service.heroImage
  });
}

export default async function ServiceDetailPage({ params }: ServiceDetailProps) {
  const { slug } = await params;
  const { services } = await getCmsContent();
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <section className="relative min-h-[70svh] overflow-hidden border-b border-white/10">
        <Image
          src={service.heroImage}
          alt={service.title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-black/20" />
        <div className="relative z-10 mx-auto flex min-h-[70svh] max-w-7xl items-end px-4 pb-14 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge>{service.category}</Badge>
            <h1 className="mt-5 text-5xl font-semibold leading-none text-white sm:text-6xl">
              {service.title}
            </h1>
            <p className="mt-5 text-xl font-medium text-gold">{service.price}</p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-champagne/85">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <div className="grid gap-4 sm:grid-cols-3">
              {service.gallery.map((image, index) => (
                <div key={image} className="relative aspect-[4/5] overflow-hidden rounded-lg border border-white/15">
                  <Image
                    src={image}
                    alt={`${service.title} gallery image ${index + 1}`}
                    fill
                    sizes="(min-width: 1024px) 22vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="mt-10">
              <FAQ items={service.faqs} />
            </div>
          </div>
          <aside className="grid gap-5">
            <div className="rounded-lg border border-white/15 bg-white/[0.04] p-5">
              <h2 className="text-xl font-semibold text-white">Book this service</h2>
              <div className="mt-5">
                <BookingForm defaultService={service.title} />
              </div>
            </div>
            <div className="rounded-lg border border-white/15 bg-white/[0.04] p-5">
              <h2 className="text-xl font-semibold text-white">Ask a question</h2>
              <div className="mt-5">
                <LeadForm source={`Service Page: ${service.title}`} />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
