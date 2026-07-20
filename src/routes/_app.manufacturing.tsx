import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, KpiCard, Panel, StatusBadge } from "@/components/page-shell";
import { BarSeries, TrendArea } from "@/components/charts";

export const Route = createFileRoute("/_app/manufacturing")({
  head: () => ({ meta: [{ title: "Manufacturing Intelligence — DRISHTIQ™" }] }),
  component: () => {
    const shift = Array.from({ length: 24 }).map((_, i) => ({
      label: `${i}:00`,
      output: 180 + Math.round(Math.sin(i / 3) * 40 + (i > 7 && i < 20 ? 60 : 0)),
    }));
    const defects = [
      { label: "Weld", A: 12, B: 8 },
      { label: "Paint", A: 6, B: 9 },
      { label: "Assembly", A: 15, B: 11 },
      { label: "Trim", A: 4, B: 3 },
      { label: "Test", A: 9, B: 7 },
    ];

    return (
      <>
        <PageHeader
          breadcrumbs={["Intelligence", "Manufacturing"]}
          title="Manufacturing Intelligence"
          description="Plants, lines, stations, machines and shift-level quality across the enterprise."
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <KpiCard label="OEE (weighted)" value="87.4" unit="%" delta="+1.2" trend="up" accent="success" />
          <KpiCard label="First-pass yield" value="98.7" unit="%" delta="+0.4" trend="up" accent="primary" />
          <KpiCard label="Unplanned downtime" value="42" unit="min" delta="-18" trend="up" accent="warning" />
          <KpiCard label="Defects (24h)" value="217" delta="+9%" trend="down" accent="critical" />
        </div>

        <div className="grid grid-cols-12 gap-4">
          <Panel title="Factory layout — Pune Plant 2" className="col-span-12 lg:col-span-8" padded={false}>
            <div className="relative p-6 h-[360px] bg-muted/20">
              <div className="grid grid-cols-6 gap-3 h-full">
                {Array.from({ length: 18 }).map((_, i) => {
                  const state = i % 7 === 0 ? "critical" : i % 5 === 0 ? "warning" : "success";
                  const colors = { success: "bg-success/15 border-success/40", warning: "bg-warning/20 border-warning/50", critical: "bg-critical/15 border-critical/50" };
                  return (
                    <div
                      key={i}
                      className={`rounded-lg border ${colors[state as keyof typeof colors]} p-2 flex flex-col justify-between hover:scale-[1.02] transition-transform cursor-pointer`}
                    >
                      <div className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                        Station {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="font-numeric text-lg font-semibold">{60 + ((i * 7) % 38)}%</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Panel>

          <Panel title="Shift output — 24h" className="col-span-12 lg:col-span-4">
            <TrendArea data={shift} color="var(--color-primary)" />
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
              {[
                { l: "Shift A", v: "3,214" },
                { l: "Shift B", v: "2,918" },
                { l: "Shift C", v: "1,142" },
              ].map((s) => (
                <div key={s.l} className="rounded-lg bg-muted/40 p-2">
                  <div className="font-numeric text-base font-semibold">{s.v}</div>
                  <div className="text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Defects by station / shift" className="col-span-12 lg:col-span-7">
            <BarSeries data={defects} keys={["A", "B"]} />
          </Panel>

          <Panel title="Machines needing attention" className="col-span-12 lg:col-span-5">
            <ul className="divide-y divide-border text-sm">
              {[
                { id: "WELD-04", line: "Line 3", s: "critical" as const, l: "Overheat" },
                { id: "ROBO-11", line: "Line 5", s: "warning" as const, l: "Calibration due" },
                { id: "PAINT-02", line: "Line 2", s: "warning" as const, l: "Nozzle wear" },
                { id: "TEST-07", line: "Line 4", s: "success" as const, l: "Nominal" },
                { id: "TRIM-09", line: "Line 3", s: "success" as const, l: "Nominal" },
              ].map((m) => (
                <li key={m.id} className="py-3 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-muted grid place-items-center text-xs font-semibold">
                    {m.id.split("-")[0].slice(0, 2)}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{m.id}</div>
                    <div className="text-xs text-muted-foreground">{m.line}</div>
                  </div>
                  <StatusBadge status={m.s} label={m.l} />
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </>
    );
  },
});
