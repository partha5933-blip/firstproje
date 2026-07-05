import { Mail, MessageSquare, Phone, StickyNote, Upload } from "lucide-react";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getLeadById } from "@/services/crm";

type LeadDetailProps = {
  params: Promise<{ id: string }>;
};

export default async function LeadDetailPage({ params }: LeadDetailProps) {
  const { id } = await params;
  const lead = await getLeadById(id);

  if (!lead) {
    notFound();
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <section className="rounded-lg border border-white/15 bg-white/[0.04] p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <Badge>{lead.status}</Badge>
            <h1 className="mt-4 text-3xl font-semibold text-white">{lead.name}</h1>
            <p className="mt-2 text-sm text-muted">{lead.email}</p>
          </div>
          <div className="flex gap-2">
            {lead.phone ? (
              <a
                href={`tel:${lead.phone}`}
                className="inline-flex h-10 items-center gap-2 rounded-md bg-gold px-3 text-sm font-medium text-black"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call
              </a>
            ) : null}
            <Button variant="outline">
              <Mail className="h-4 w-4" aria-hidden="true" />
              Email
            </Button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            ["Phone", lead.phone || "Not provided"],
            ["Service Interested", lead.serviceInterested || "General inquiry"],
            ["Budget", lead.budget || "TBD"],
            ["Event Date", lead.eventDate || "TBD"],
            ["Location", lead.location || "Not provided"],
            ["Lead Source", lead.leadSource || "Website"],
            ["Assigned To", lead.assignedTo || "Unassigned"],
            ["Created", new Date(lead.createdAt).toLocaleString()]
          ].map(([label, value]) => (
            <div key={label} className="rounded-md border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase text-muted">{label}</p>
              <p className="mt-2 text-sm text-white">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <aside className="grid gap-4">
        {[
          ["Timeline", "Inquiry captured, admin notified, customer confirmation sent.", MessageSquare],
          ["Call Notes", "Use tel: calls now. Twilio or Exotel can be connected later.", Phone],
          ["Email History", "Campaign drafts, sent mail, and confirmations are logged.", Mail],
          ["Files", "Inspiration files and attachments appear here.", Upload],
          ["Internal Notes", "Pinned notes and follow-up reminders stay with the lead.", StickyNote]
        ].map(([title, detail, Icon]) => {
          const IconComponent = Icon as typeof MessageSquare;

          return (
            <section key={String(title)} className="rounded-lg border border-white/15 bg-white/[0.04] p-5">
              <div className="flex items-center gap-3">
                <IconComponent className="h-5 w-5 text-gold" aria-hidden="true" />
                <h2 className="font-semibold text-white">{String(title)}</h2>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted">{String(detail)}</p>
            </section>
          );
        })}
      </aside>
    </div>
  );
}
