import { Mail } from "lucide-react";
import { ManagementSurface } from "@/components/admin/management-surface";
import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";

export default function EmailsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Email system"
        title="Templates, campaigns, drafts, sent mail, and lead history"
        description="Nodemailer powers admin notifications, auto replies, booking confirmations, newsletters, campaigns, and custom HTML emails."
        action={
          <Button>
            <Mail className="h-4 w-4" aria-hidden="true" />
            Compose
          </Button>
        }
      />
      <ManagementSurface
        title="Email automation"
        description="The email route logs status and can send beautiful HTML messages with attachments. Campaign lists can be built from newsletter consent."
        features={["Welcome", "Thank you", "3-day follow-up", "7-day follow-up", "Newsletter", "Drafts"]}
        records={[
          { label: "Inquiry Confirmation", detail: "Sent automatically after lead capture", status: "Active" },
          { label: "Booking Confirmation", detail: "Ready after booking status change", status: "Template" },
          { label: "Private Planning Guide", detail: "Newsletter lead magnet campaign", status: "Draft" }
        ]}
      />
    </>
  );
}
