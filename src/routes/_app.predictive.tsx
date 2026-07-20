import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, KpiCard, Panel, StatusBadge } from "@/components/page-shell";
import { MultiLine, TrendArea } from "@/components/charts";
import { CalendarClock, Wrench } from "lucide-react";

export const Route = createFileRoute("/_app/predictive")({
  head: () => ({ meta: [{ title: "Predictive Maintenance — DRISHTIQ™" }] }),
  component: () => {
    const forecast = Array.from({ length: 30 }).map((_, i) => ({
      label: `+${i + 1}`,
      actual: i < 8 ? 12 + Math.round(Math.sin(i / 2) * 2) : null,
      predicted: 12 + Math.round(Math.sin(i / 2) * 2 + i / 6),
      upper: 15 + Math.round(Math.sin(i / 2) * 2 + i / 5),
    }));
    const rul = Array.from({ length: 12 }).map((_, i) => ({
      label: `M${i + 1}`,
      value: 100 - i * 6,
    }));

    return (
      <>
        <PageHeader
          breadcrumbs={["Investigate", "Predictive Maintenance"]}
          title="Predictive Maintenance"
          description="Failure probability, remaining useful life and scheduled interventions."
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <KpiCard label="Predicted failures (30d)" value="412" accent="ai" hint="91% confidence" />
          <KpiCard label="Avoidable downtime" value="184" unit="hrs" accent="success" />
          <KpiCard label="Scheduled interventions" value="76" accent="primary" />
          <KpiCard label="Critical components" value="9" accent="critical" />
        </div>

        <div className="grid grid-cols-12 gap-4">
          <Panel title="30-day failure forecast" description="Actual vs predicted (with 95% band)" className="col-span-12 lg:col-span-8">
            <MultiLine data={forecast} keys={["actual", "predicted", "upper"]} height={280} />
          </Panel>

          <Panel title="Remaining useful life — battery packs" className="col-span-12 lg:col-span-4">
            <TrendArea data={rul} color="var(--color-warning)" height={220} />
            <div className="mt-3 text-xs text-muted-foreground">Fleet-wide mean · rolling 12 months</div>
          </Panel>

          <Panel title="Maintenance calendar (next 14 days)" className="col-span-12">
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 14 }).map((_, i) => {
                const load = (i * 13) % 100;
                const s = load > 70 ? "critical" : load > 40 ? "warning" : "success";
                const colors = { success: "bg-success/10 text-success border-success/30", warning: "bg-warning/15 text-warning border-warning/40", critical: "bg-critical/15 text-critical border-critical/40" };
                return (
                  <div key={i} className={`rounded-lg border ${colors[s]} p-3`}>
                    <div className="flex items-center justify-between text-xs">
                      <span>Day {i + 1}</span>
                      <CalendarClock className="h-3 w-3 opacity-60" />
                    </div>
                    <div className="font-numeric text-lg font-semibold mt-2">{Math.round(load / 6)}</div>
                    <div className="text-[10px] uppercase tracking-wide opacity-70">interventions</div>
                  </div>
                );
              })}
            </div>
          </Panel>

          <Panel title="Component risk board" className="col-span-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { c: "Battery packs — HV", p: 68, s: "critical" as const, action: "Replace 42 units" },
                { c: "Brake pads — rear", p: 42, s: "warning" as const, action: "Inspect 118 units" },
                { c: "Injectors — SKU IJ-88", p: 34, s: "warning" as const, action: "Monitor" },
                { c: "Alternators", p: 12, s: "success" as const, action: "No action" },
                { c: "Bearings — front axle", p: 22, s: "success" as const, action: "Routine" },
                { c: "HVAC compressor", p: 58, s: "warning" as const, action: "Firmware patch" },
              ].map((r) => (
                <div key={r.c} className="rounded-lg border border-border p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold">{r.c}</div>
                    <StatusBadge status={r.s} label={`${r.p}% risk`} />
                  </div>
                  <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className={`h-full ${r.s === "success" ? "bg-success" : r.s === "warning" ? "bg-warning" : "bg-critical"}`} style={{ width: `${r.p}%` }} />
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground flex items-center gap-1"><Wrench className="h-3 w-3" /> {r.action}</div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </>
    );
  },
});
