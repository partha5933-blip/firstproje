import { ManagementSurface } from "@/components/admin/management-surface";
import { PageHeader } from "@/components/admin/page-header";

export default function CustomersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Customers"
        title="Customer profiles and lifetime value"
        description="Customer records connect leads, bookings, notes, files, consent, and follow-up history."
      />
      <ManagementSurface
        title="Customer profile system"
        description="Profiles are created from leads and bookings, then enriched by notes, tasks, value, tags, and communication history."
        features={["Profiles", "Tags", "Lifetime value", "Timeline", "Files", "Consent"]}
        records={[
          { label: "Amelia Hart", detail: "Wedding client · Napa Valley · $6,200", status: "Active" },
          { label: "Carter Studio", detail: "Architecture practice · image library", status: "Repeat" },
          { label: "Nora Valen", detail: "Fashion campaign creative director", status: "VIP" }
        ]}
      />
    </>
  );
}
