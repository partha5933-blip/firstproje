import { ManagementSurface } from "@/components/admin/management-surface";
import { PageHeader } from "@/components/admin/page-header";

export default function AdminTestimonialsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Testimonials"
        title="Video reviews, images, Google-style ratings, and approvals"
        description="Testimonials can be approved, featured, linked to media, and displayed across the public site."
      />
      <ManagementSurface
        title="Social proof"
        description="Use testimonial records to blend written quotes, ratings, video URLs, images, and source labels."
        features={["Video", "Images", "Ratings", "Google reviews", "Featured", "Approval"]}
        records={[
          { label: "Maya and Aaron", detail: "Wedding clients · 5 stars", status: "Featured" },
          { label: "Nora Valen", detail: "Creative director · 5 stars", status: "Featured" },
          { label: "Carter Studio", detail: "Architecture practice · 5 stars", status: "Approved" }
        ]}
      />
    </>
  );
}
