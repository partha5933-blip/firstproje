import { ManagementSurface } from "@/components/admin/management-surface";
import { PageHeader } from "@/components/admin/page-header";

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Settings"
        title="Editable site, SEO, contact, analytics, and footer settings"
        description="Settings records make the homepage, hero, portfolio, services, gallery, about, blogs, testimonials, pricing, FAQ, contact, footer, and SEO editable without code."
      />
      <ManagementSurface
        title="CMS settings"
        description="Store global content settings, contact details, analytics IDs, GDPR policy versions, default SEO, and footer content."
        features={["Homepage", "Hero", "Contact", "Footer", "SEO", "Analytics", "GDPR"]}
        records={[
          { label: "Homepage hero", detail: "Headline, subheadline, video URL", status: "Editable" },
          { label: "SEO defaults", detail: "Title, description, OpenGraph image", status: "Active" },
          { label: "Contact channels", detail: "Phone, WhatsApp, email, social links", status: "Active" }
        ]}
      />
    </>
  );
}
