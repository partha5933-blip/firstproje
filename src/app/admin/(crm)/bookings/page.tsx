import { CalendarDays } from "lucide-react";
import { ManagementSurface } from "@/components/admin/management-surface";
import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";

export default function BookingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Appointments"
        title="Bookings and calendar"
        description="Appointment requests collect service, date, time, location, budget, message, consent, and inspiration files."
        action={
          <Button variant="outline">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            Calendar View
          </Button>
        }
      />
      <ManagementSurface
        title="Booking workflow"
        description="Requested bookings can be confirmed, rescheduled, completed, or cancelled. Each booking can link to a lead and customer profile."
        features={["Calendar", "Reminders", "Attachments", "Status", "Confirmation emails"]}
        records={[
          { label: "Sep 18 · Signature Wedding Story", detail: "Amelia Hart · Napa Valley", status: "Requested" },
          { label: "Aug 06 · Corporate Image System", detail: "Noah Chen · Seattle", status: "Confirmed" },
          { label: "Jul 28 · Fashion Editorial", detail: "Priya Kapoor · Brooklyn", status: "Follow Up" }
        ]}
      />
    </>
  );
}
