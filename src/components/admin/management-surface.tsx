import { Badge } from "@/components/ui/badge";

type ManagementSurfaceProps = {
  title: string;
  description: string;
  features: string[];
  records: { label: string; detail: string; status?: string }[];
};

export function ManagementSurface({ title, description, features, records }: ManagementSurfaceProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-lg border border-white/15 bg-white/[0.04] p-5">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {features.map((feature) => (
            <Badge key={feature}>{feature}</Badge>
          ))}
        </div>
      </section>
      <section className="overflow-hidden rounded-lg border border-white/15 bg-white/[0.04]">
        {records.map((record) => (
          <div key={record.label} className="flex items-center justify-between gap-4 border-b border-white/10 p-4 last:border-0">
            <div>
              <h3 className="text-sm font-medium text-white">{record.label}</h3>
              <p className="mt-1 text-xs text-muted">{record.detail}</p>
            </div>
            {record.status ? <Badge>{record.status}</Badge> : null}
          </div>
        ))}
      </section>
    </div>
  );
}
