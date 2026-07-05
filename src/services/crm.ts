import { isMongoConfigured, connectDB } from "@/lib/db";
import Lead from "@/models/Lead";
import Booking from "@/models/Booking";
import EmailLog from "@/models/EmailLog";
import { dashboardSeries, sampleLeads } from "@/data/sample-content";
import type { CrmLead, LeadStatus } from "@/types";

type CrmLeadDocument = {
  _id?: string | { toString(): string };
  name?: string;
  email?: string;
  phone?: string;
  serviceInterested?: string;
  budget?: string;
  eventDate?: Date | string;
  location?: string;
  status?: LeadStatus | string;
  assignedTo?: string;
  createdAt?: Date | string;
  value?: number;
  leadSource?: string;
};

type EmailLogDocument = {
  subject?: string;
  status?: string;
};

function toCrmLead(lead: CrmLeadDocument): CrmLead {
  const createdAt = lead.createdAt;
  const createdAtValue =
    createdAt instanceof Date
      ? createdAt.toISOString()
      : typeof createdAt === "string"
        ? createdAt
        : new Date().toISOString();

  return {
    id: String(lead._id ?? ""),
    name: lead.name ?? "",
    email: lead.email ?? "",
    phone: lead.phone,
    serviceInterested: lead.serviceInterested,
    budget: lead.budget,
    eventDate: typeof lead.eventDate === "string" ? lead.eventDate : lead.eventDate?.toISOString(),
    location: lead.location,
    status: (lead.status as LeadStatus) ?? "New",
    assignedTo: lead.assignedTo,
    createdAt: createdAtValue,
    value: lead.value,
    leadSource: lead.leadSource
  };
}

export async function getCrmSnapshot() {
  if (!isMongoConfigured()) {
    return {
      leads: sampleLeads,
      metrics: {
        todayLeads: 8,
        totalLeads: 342,
        revenue: 284000,
        appointments: 18,
        bookings: 42
      },
      series: dashboardSeries,
      recentActivities: [
        "Amelia Hart submitted a wedding inquiry",
        "Corporate Image System proposal was sent",
        "Follow-up reminder created for Priya Kapoor"
      ]
    };
  }

  await connectDB();
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const [recentLeads, todayLeads, totalLeads, bookings, appointments, emailLogs, wonLeads] =
    await Promise.all([
      Lead.find().sort({ createdAt: -1 }).limit(20).lean(),
      Lead.countDocuments({ createdAt: { $gte: startOfDay } }),
      Lead.countDocuments(),
      Booking.countDocuments(),
      Booking.countDocuments({ status: { $in: ["Requested", "Confirmed"] } }),
      EmailLog.find().sort({ createdAt: -1 }).limit(3).lean(),
      Lead.find({ status: "Won" }).lean()
    ]);

  const revenue = wonLeads.reduce((sum: number, lead: CrmLeadDocument) => sum + (lead.value || 0), 0);

  return {
    leads: recentLeads.map(toCrmLead),
    metrics: {
      todayLeads,
      totalLeads,
      revenue,
      appointments,
      bookings
    },
    series: dashboardSeries,
    recentActivities: [
      ...recentLeads.slice(0, 2).map((lead: CrmLeadDocument) => `${lead.name} entered the pipeline`),
      ...emailLogs.map((email: EmailLogDocument) => `Email "${email.subject}" ${email.status}`)
    ]
  };
}

export async function getLeadById(id: string) {
  if (!isMongoConfigured()) {
    return sampleLeads.find((lead) => lead.id === id) || sampleLeads[0];
  }

  await connectDB();
  const lead = await Lead.findById(id).lean();
  return lead ? toCrmLead(lead) : null;
}
