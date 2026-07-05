import { CalendarDays, DollarSign, Inbox, Users, WalletCards } from "lucide-react";
import { DashboardChart } from "@/components/admin/dashboard-chart";
import { LeadTable } from "@/components/admin/lead-table";
import { MetricCard } from "@/components/admin/metric-card";
import { PageHeader } from "@/components/admin/page-header";
import { formatCurrency } from "@/lib/utils";
import { getCrmSnapshot } from "@/services/crm";

export default async function AdminDashboardPage() {
  const snapshot = await getCrmSnapshot();

  return (
    <>
      <PageHeader
        eyebrow="Overview"
        title="Studio command center"
        description="Today’s leads, total pipeline, revenue, appointments, bookings, recent activity, and analytics."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard label="Today's Leads" value={String(snapshot.metrics.todayLeads)} detail="New lead forms today" icon={Inbox} />
        <MetricCard label="Total Leads" value={String(snapshot.metrics.totalLeads)} detail="All captured CRM leads" icon={Users} />
        <MetricCard label="Revenue" value={formatCurrency(snapshot.metrics.revenue)} detail="Won lead value" icon={DollarSign} />
        <MetricCard label="Appointments" value={String(snapshot.metrics.appointments)} detail="Open booking requests" icon={CalendarDays} />
        <MetricCard label="Bookings" value={String(snapshot.metrics.bookings)} detail="Total bookings" icon={WalletCards} />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <DashboardChart data={snapshot.series} />
        <section className="rounded-lg border border-white/15 bg-white/[0.04] p-5">
          <h2 className="text-lg font-semibold text-white">Recent activities</h2>
          <div className="mt-4 grid gap-3">
            {snapshot.recentActivities.map((activity) => (
              <div key={activity} className="rounded-md border border-white/10 bg-black/20 p-3 text-sm text-muted">
                {activity}
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="mt-6">
        <LeadTable leads={snapshot.leads.slice(0, 8)} />
      </div>
    </>
  );
}
