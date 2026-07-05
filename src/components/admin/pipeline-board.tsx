import { leadStatusesForPipeline } from "@/data/sample-content";
import type { CrmLead } from "@/types";

export function PipelineBoard({ leads }: { leads: CrmLead[] }) {
  return (
    <div className="grid gap-4 overflow-x-auto pb-2 lg:grid-cols-7">
      {leadStatusesForPipeline.map((status) => {
        const statusLeads = leads.filter((lead) => lead.status === status);

        return (
          <section key={status} className="min-w-56 rounded-lg border border-white/15 bg-white/[0.04]">
            <div className="border-b border-white/10 p-3">
              <h2 className="text-sm font-semibold text-white">{status}</h2>
              <p className="text-xs text-muted">{statusLeads.length} leads</p>
            </div>
            <div className="grid gap-3 p-3">
              {statusLeads.map((lead) => (
                <article key={lead.id} className="rounded-md border border-white/10 bg-black/20 p-3">
                  <h3 className="text-sm font-medium text-white">{lead.name}</h3>
                  <p className="mt-1 text-xs text-muted">{lead.serviceInterested || "General inquiry"}</p>
                  <p className="mt-3 text-xs text-gold">{lead.budget || "Budget TBD"}</p>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
