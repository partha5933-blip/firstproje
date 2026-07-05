import { ShieldCheck } from "lucide-react";
import { ManagementSurface } from "@/components/admin/management-surface";
import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";

export default function GdprPage() {
  return (
    <>
      <PageHeader
        eyebrow="GDPR"
        title="Consent logs, preferences, exports, deletion, and marketing consent"
        description="Only affirmative consent is logged server-side. Export and deletion routes are ready for data subject requests."
        action={
          <Button variant="outline">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Review Logs
          </Button>
        }
      />
      <ManagementSurface
        title="Privacy operations"
        description="Consent records include category, accepted value, source, policy version, IP, browser, and timestamp."
        features={["Cookie banner", "Consent logs", "Delete my data", "Export my data", "Newsletter consent", "Marketing consent"]}
        records={[
          { label: "Analytics consent", detail: "Logged after affirmative user choice", status: "Compliant" },
          { label: "Marketing consent", detail: "Required for campaigns and newsletters", status: "Required" },
          { label: "Data deletion", detail: "Lead/customer records removed by email request", status: "API Ready" }
        ]}
      />
    </>
  );
}
