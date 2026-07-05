import { ManagementSurface } from "@/components/admin/management-surface";
import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";

export default function AdminPortfolioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio CMS"
        title="Upload, tag, sort, feature, and optimize portfolio images"
        description="Portfolio entries include category, tags, featured flags, sorting, alt text, SEO, and image preview."
        action={<Button>Upload Photos</Button>}
      />
      <ManagementSurface
        title="Image gallery management"
        description="The gallery supports masonry layout, infinite-gallery architecture, lazy loading, responsive images, blur-ready placeholders, and lightbox previews."
        features={["Categories", "Tags", "Featured", "Sorting", "SEO", "Alt text", "Lightbox"]}
        records={[
          { label: "Rooftop Vows", detail: "Wedding · New York", status: "Featured" },
          { label: "Monochrome Campaign", detail: "Fashion · Los Angeles", status: "Featured" },
          { label: "Glass House Lines", detail: "Architecture · Chicago", status: "Active" }
        ]}
      />
    </>
  );
}
