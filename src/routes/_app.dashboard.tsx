import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  Car,
  Factory,
  Gauge,
  Package,
  Sparkles,
  TrendingUp,
  Wrench,
  ArrowUpRight,
} from "lucide-react";
import { PageHeader, KpiCard, Panel, StatusBadge } from "@/components/page-shell";
import { TrendArea, BarSeries, DonutChart, MultiLine } from "@/components/charts";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [{ title: "Executive Dashboard — DRISHTIQ™" }],
  }),
  component: DashboardPage,
});

const production = Array.from({ length: 14 }).map((_, i) => ({
  label: `D${i + 1}`,
  value: 720 + Math.round(Math.sin(i / 2) * 60 + i * 8),
}));
const qualityVsDefect = Array.from({ length: 12 }).map((_, i) => ({
  label: `W${i + 1}`,
  quality: 94 + Math.round(Math.cos(i / 3) * 2),
  defects: 40 - Math.round(Math.sin(i / 2) * 8 + i / 3),
}));
const supplierMix = [
  { name: "Bosch", value: 34, color: "var(--color-chart-1)" },
  { name: "Denso", value: 21, color: "var(--color-chart-2)" },
  { name: "ZF", value: 18, color: "var(--color-chart-3)" },
  { name: "Continental", value: 15, color: "var(--color-chart-4)" },
  { name: "Others", value: 12, color: "var(--color-chart-5)" },
];
const forecast = Array.from({ length: 30 }).map((_, i) => ({
  label: `+${i + 1}d`,
  actual: i < 14 ? 12 + Math.round(Math.sin(i / 3) * 3) : null,
  predicted: 12 + Math.round(Math.sin(i / 3) * 3 + i / 6),
  upper: 15 + Math.round(Math.sin(i / 3) * 2 + i / 5),
}));

function DashboardPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={["Intelligence", "Executive Dashboard"]}
        title="Executive Dashboard"
        description="Live enterprise view of fleet health, manufacturing quality, supplier performance and predicted risk."
      />

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 xl:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <KpiCard label="Vehicle Health" value="94.2" unit="/100" delta="+1.4" trend="up" hint="vs last week" accent="success" />
          <KpiCard label="Mfg Quality" value="98.7" unit="%" delta="+0.3" trend="up" hint="First-pass yield" accent="primary" />
          <KpiCard label="Supplier Score" value="87.1" delta="-0.6" trend="down" hint="Top 25 suppliers" accent="warning" />
          <KpiCard label="Production Eff." value="92.4" unit="%" delta="+2.1" trend="up" hint="OEE weighted" accent="info" />
          <KpiCard label="Today's Failures" value="127" delta="+18" trend="down" hint="critical + high" accent="critical" />
          <KpiCard label="30-Day Forecast" value="412" unit="units" delta="±5%" trend="flat" hint="AI confidence 91%" accent="ai" />
          <KpiCard label="Warranty Cost" value="₹8.2Cr" delta="-3.4%" trend="up" hint="MTD" accent="success" />
          <KpiCard label="Recall Risk" value="Low" delta="stable" trend="flat" hint="3 batches watched" accent="info" />
        </div>

        <Panel
          title="AI Copilot — today's brief"
          description="Ranked by business impact"
          className="col-span-12 xl:col-span-4 bg-gradient-to-br from-ai/5 to-transparent"
          actions={<Button variant="ghost" size="sm" className="text-ai gap-1">Open <ArrowUpRight className="h-3.5 w-3.5" /></Button>}
        >
          <ul className="space-y-3">
            {[
              { icon: AlertTriangle, tone: "critical", text: "Battery pack SKU BP-2143 shows 3.2× normal failure rate in Pune plant — 7 VINs at risk this week." },
              { icon: Wrench, tone: "warning", text: "Predicted brake wear-out on 42 fleet vehicles in next 14 days; schedule preventive service." },
              { icon: TrendingUp, tone: "success", text: "Supplier Bosch improved on-time delivery to 98.3% — resume standard reorder cadence." },
              { icon: Sparkles, tone: "ai", text: "Draft investigation ready: 'Coolant leak clusters — Nashik line 3'. Confidence 87%." },
            ].map((n, i) => {
              const Icon = n.icon;
              const toneMap: Record<string, string> = {
                critical: "text-critical bg-critical/10",
                warning: "text-warning bg-warning/15",
                success: "text-success bg-success/10",
                ai: "text-ai bg-ai/10",
              };
              return (
                <li key={i} className="flex gap-3 text-sm">
                  <span className={`h-7 w-7 shrink-0 rounded-lg grid place-items-center ${toneMap[n.tone]}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-foreground/90 leading-snug">{n.text}</span>
                </li>
              );
            })}
          </ul>
        </Panel>

        <Panel
          title="Production output (14 days)"
          description="Units across 12 assembly lines"
          className="col-span-12 lg:col-span-8"
        >
          <TrendArea data={production} />
        </Panel>

        <Panel title="Supplier component mix" className="col-span-12 lg:col-span-4">
          <DonutChart data={supplierMix} />
          <div className="mt-4 space-y-2">
            {supplierMix.map((s) => (
              <div key={s.name} className="flex items-center gap-2 text-xs">
                <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                <span className="flex-1">{s.name}</span>
                <span className="font-numeric text-foreground">{s.value}%</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          title="Quality vs defect rate"
          description="Weekly first-pass yield & DPMO"
          className="col-span-12 lg:col-span-6"
        >
          <MultiLine data={qualityVsDefect} keys={["quality", "defects"]} />
        </Panel>

        <Panel
          title="30-day failure forecast"
          description="AI-generated with 91% confidence"
          className="col-span-12 lg:col-span-6"
        >
          <BarSeries data={forecast.slice(0, 14)} keys={["predicted", "upper"]} />
        </Panel>

        <Panel
          title="Live plant health"
          description="Top 6 plants by throughput"
          className="col-span-12 lg:col-span-7"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { name: "Pune — Line 1", oee: 94, status: "success" as const, throughput: "218 u/hr" },
              { name: "Chennai — Line 3", oee: 88, status: "success" as const, throughput: "196 u/hr" },
              { name: "Nashik — Line 2", oee: 71, status: "warning" as const, throughput: "142 u/hr" },
              { name: "Sanand — Line 5", oee: 92, status: "success" as const, throughput: "204 u/hr" },
              { name: "Lucknow — Line 1", oee: 58, status: "critical" as const, throughput: "84 u/hr" },
              { name: "Jamshedpur — Line 4", oee: 90, status: "success" as const, throughput: "188 u/hr" },
            ].map((p) => (
              <div key={p.name} className="rounded-lg border border-border p-3 hover:border-primary/40 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{p.name}</div>
                  <StatusBadge status={p.status} label={p.status === "success" ? "Healthy" : p.status === "warning" ? "Watch" : "Critical"} />
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <Progress value={p.oee} className="h-1.5 flex-1" />
                  <span className="font-numeric text-sm">{p.oee}%</span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground flex items-center gap-2">
                  <Factory className="h-3 w-3" /> {p.throughput}
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          title="Recent investigations"
          className="col-span-12 lg:col-span-5"
          actions={<Button variant="ghost" size="sm">View all</Button>}
        >
          <ul className="divide-y divide-border">
            {[
              { id: "INV-2041", t: "Coolant leak — Nashik L3", s: "ai" as const, l: "AI drafting" },
              { id: "INV-2039", t: "Injector misfire cluster — SKU IJ-88", s: "warning" as const, l: "In review" },
              { id: "INV-2035", t: "Battery pack thermal event", s: "critical" as const, l: "Escalated" },
              { id: "INV-2028", t: "ECU firmware regression — v4.12", s: "success" as const, l: "Resolved" },
              { id: "INV-2021", t: "Bearing failures — supplier ZF", s: "info" as const, l: "Corrective action" },
            ].map((i) => (
              <li key={i.id} className="py-3 flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary grid place-items-center text-[10px] font-semibold">
                  {i.id.split("-")[1]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium truncate">{i.t}</div>
                  <div className="text-xs text-muted-foreground">{i.id}</div>
                </div>
                <StatusBadge status={i.s} label={i.l} />
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
