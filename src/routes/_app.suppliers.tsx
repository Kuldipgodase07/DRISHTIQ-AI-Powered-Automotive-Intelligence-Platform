import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, KpiCard, Panel, StatusBadge } from "@/components/page-shell";
import { BarSeries } from "@/components/charts";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/_app/suppliers")({
  head: () => ({ meta: [{ title: "Supplier Intelligence — DRISHTIQ™" }] }),
  component: () => {
    const suppliers = [
      { n: "Bosch India", cat: "Injection systems", score: 96, otd: 98.3, defects: 42, risk: "success" as const },
      { n: "Denso", cat: "Sensors & ECU", score: 92, otd: 96.1, defects: 31, risk: "success" as const },
      { n: "ZF Friedrichshafen", cat: "Transmission", score: 84, otd: 91.4, defects: 78, risk: "warning" as const },
      { n: "Continental", cat: "Braking systems", score: 88, otd: 94.8, defects: 55, risk: "success" as const },
      { n: "Motherson Sumi", cat: "Wiring harness", score: 71, otd: 82.1, defects: 124, risk: "critical" as const },
      { n: "Sona Comstar", cat: "Drivetrain", score: 89, otd: 95.6, defects: 47, risk: "success" as const },
    ];
    const compare = [
      { label: "OTD %", A: 98, B: 91, C: 82 },
      { label: "Quality", A: 96, B: 84, C: 71 },
      { label: "Warranty $", A: 12, B: 34, C: 62 },
      { label: "Response", A: 92, B: 78, C: 65 },
    ];

    return (
      <>
        <PageHeader
          breadcrumbs={["Intelligence", "Suppliers"]}
          title="Supplier Intelligence"
          description="Scorecards, risk analysis, component genealogy and warranty impact across the supplier base."
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <KpiCard label="Active suppliers" value="1,284" delta="+3" trend="up" accent="primary" />
          <KpiCard label="Avg score" value="87.1" delta="-0.6" trend="down" accent="warning" />
          <KpiCard label="At-risk suppliers" value="14" delta="+2" trend="down" accent="critical" />
          <KpiCard label="Warranty impact" value="₹1.8Cr" delta="-6%" trend="up" accent="success" />
        </div>

        <div className="grid grid-cols-12 gap-4">
          <Panel title="Supplier scorecard" className="col-span-12 lg:col-span-8">
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground text-left">
                <tr>
                  <th className="pb-2 font-medium">Supplier</th>
                  <th className="pb-2 font-medium">Category</th>
                  <th className="pb-2 font-medium">Score</th>
                  <th className="pb-2 font-medium">OTD</th>
                  <th className="pb-2 font-medium">Defects (90d)</th>
                  <th className="pb-2 font-medium">Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {suppliers.map((s) => (
                  <tr key={s.n} className="hover:bg-muted/30">
                    <td className="py-3 font-medium">{s.n}</td>
                    <td className="text-muted-foreground">{s.cat}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Progress value={s.score} className="h-1.5 w-20" />
                        <span className="font-numeric">{s.score}</span>
                      </div>
                    </td>
                    <td className="font-numeric">{s.otd}%</td>
                    <td className="font-numeric">{s.defects}</td>
                    <td><StatusBadge status={s.risk} label={s.risk === "success" ? "Low" : s.risk === "warning" ? "Medium" : "High"} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>

          <Panel title="Compare top 3" description="Bosch · ZF · Motherson" className="col-span-12 lg:col-span-4">
            <BarSeries data={compare} keys={["A", "B", "C"]} colors={["var(--color-chart-1)", "var(--color-chart-4)", "var(--color-chart-5)"]} />
          </Panel>

          <Panel title="Component genealogy — SKU IJ-88" className="col-span-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
              {[
                { l: "Raw material", d: "Steel batch RM-9142 · Tata Steel Jamshedpur" },
                { l: "Manufacturing", d: "Bosch Bengaluru · Line 2 · Shift B · 14 Nov" },
                { l: "Inbound QC", d: "Pass (Sample 32/32) · Inspector R. Nair" },
                { l: "Installed on", d: "17,214 vehicles · 12 plants · 3 countries" },
              ].map((c, i) => (
                <div key={i} className="rounded-lg border border-border p-3">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">{c.l}</div>
                  <div className="mt-1">{c.d}</div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </>
    );
  },
});
