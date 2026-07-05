import Link from "next/link";
import { Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import type { CrmLead } from "@/types";

export function LeadTable({ leads }: { leads: CrmLead[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/15 bg-white/[0.04]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Lead</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Call</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell>
                <Link href={`/admin/leads/${lead.id}`} className="font-medium text-white hover:text-gold">
                  {lead.name}
                </Link>
                <p className="text-xs text-muted">{lead.email}</p>
              </TableCell>
              <TableCell>{lead.serviceInterested || "General inquiry"}</TableCell>
              <TableCell>
                <Badge>{lead.status}</Badge>
              </TableCell>
              <TableCell>{lead.budget || "TBD"}</TableCell>
              <TableCell>{lead.leadSource || "Website"}</TableCell>
              <TableCell>
                {lead.phone ? (
                  <a
                    href={`tel:${lead.phone}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-gold transition hover:border-gold/70"
                    aria-label={`Call ${lead.name}`}
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : (
                  <span className="text-xs text-muted">No phone</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
