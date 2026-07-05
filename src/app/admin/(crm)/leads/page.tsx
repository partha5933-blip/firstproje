import { LeadTable } from "@/components/admin/lead-table";
import { PageHeader } from "@/components/admin/page-header";
import { PipelineBoard } from "@/components/admin/pipeline-board";
import { Button } from "@/components/ui/button";
import { getCrmSnapshot } from "@/services/crm";

export default async function LeadsPage() {
  const snapshot = await getCrmSnapshot();

  return (
    <>
      <PageHeader
        eyebrow="Lead management"
        title="Pipeline, search, filters, follow-ups, and call workflow"
        description="Leads include status, source, UTM fields, consent, assignment, notes, call history hooks, and email history."
        action={<Button variant="outline">Export CSV</Button>}
      />
      <PipelineBoard leads={snapshot.leads} />
      <div className="mt-6">
        <LeadTable leads={snapshot.leads} />
      </div>
    </>
  );
}
