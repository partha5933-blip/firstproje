"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

type DashboardChartProps = {
  data: { month: string; leads: number; revenue: number }[];
};

type TooltipPayloadItem = {
  dataKey: string;
  name: string;
  value: number;
};

type ChartTooltipProps = {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
};

function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-lg border border-white/15 bg-surface p-3 text-sm shadow-soft">
      <p className="mb-2 font-medium text-white">{label}</p>
      {payload.map((item: TooltipPayloadItem) => (
        <p key={item.dataKey} className="text-muted">
          <span className="text-gold">{item.name}</span>: {item.value}
        </p>
      ))}
    </div>
  );
}

export function DashboardChart({ data }: DashboardChartProps) {
  return (
    <div className="h-80 rounded-lg border border-white/15 bg-white/[0.04] p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white">Lead and revenue trend</h2>
        <p className="text-sm text-muted">Dashboard analytics powered by CRM records.</p>
      </div>
      <ResponsiveContainer width="100%" height="78%">
        <AreaChart data={data} margin={{ left: -18, right: 12, top: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="leads" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#d7b56d" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#d7b56d" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis dataKey="month" stroke="#a7a29a" tickLine={false} axisLine={false} />
          <YAxis stroke="#a7a29a" tickLine={false} axisLine={false} />
          <Tooltip content={<ChartTooltip />} />
          <Area type="monotone" dataKey="leads" stroke="#d7b56d" fillOpacity={1} fill="url(#leads)" />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#2dd4bf"
            fillOpacity={1}
            fill="url(#revenue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
