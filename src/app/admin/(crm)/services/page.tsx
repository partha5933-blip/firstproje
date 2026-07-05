import { ManagementSurface } from "@/components/admin/management-surface";
import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";

export default function AdminServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services CMS"
        title="Create, edit, price, feature, and optimize services"
        description="Service records include category, hero image, gallery, pricing, FAQ, SEO, active status, and featured placement."
        action={<Button>New Service</Button>}
      />
      <ManagementSurface
        title="Service management"
        description="CMS-ready services power public pages, booking options, lead routing, and SEO metadata."
        features={["Create", "Edit", "Delete", "Upload images", "Pricing", "SEO", "Gallery", "Featured"]}
        records={[
          { label: "Signature Wedding Story", detail: "Wedding · From $4,800", status: "Featured" },
          { label: "Fashion Editorial", detail: "Fashion · From $2,400", status: "Featured" },
          { label: "Corporate Image System", detail: "Corporate · From $3,200", status: "Active" }
        ]}
      />
    </>
  );
}
