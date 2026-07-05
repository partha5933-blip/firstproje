import { DashboardChart } from "@/components/admin/dashboard-chart";
import { ManagementSurface } from "@/components/admin/management-surface";
import { PageHeader } from "@/components/admin/page-header";
import { dashboardSeries } from "@/data/sample-content";

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Analytics"
        title="GA4, Search Console, Meta Pixel, conversion tracking, and UTM reporting"
        description="The CRM stores UTM fields on leads and exposes dashboard analytics for conversion reporting."
      />
      <DashboardChart data={dashboardSeries} />
      <div className="mt-6">
        <ManagementSurface
          title="Tracking readiness"
          description="Analytics IDs are environment-driven. Lead capture stores UTM source, campaign, and medium for reporting."
          features={["GA4", "Search Console", "Meta Pixel", "Conversions", "UTM", "Dashboard"]}
          records={[
            { label: "Homepage lead form", detail: "Conversion event · lead_source=Homepage", status: "Tracked" },
            { label: "Booking request", detail: "Conversion event · booking_requested", status: "Tracked" },
            { label: "Newsletter signup", detail: "Consent-backed marketing lead", status: "Tracked" }
          ]}
        />
      </div>
    </>
  );
}
