import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, KpiCard, Panel, StatusBadge } from "@/components/page-shell";
import { TrendArea, MultiLine } from "@/components/charts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Battery, Thermometer, Gauge, Fuel } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/_app/fleet")({
  head: () => ({ meta: [{ title: "Fleet Intelligence — DRISHTIQ™" }] }),
  component: FleetPage,
});

const trend = Array.from({ length: 24 }).map((_, i) => ({
  label: `${i}:00`,
  value: 82 + Math.round(Math.sin(i / 3) * 6),
}));
const dual = Array.from({ length: 14 }).map((_, i) => ({
  label: `D${i + 1}`,
  utilization: 70 + Math.round(Math.sin(i / 2) * 8),
  incidents: 3 + Math.round(Math.cos(i / 2) * 2 + i / 5),
}));

const vehicles = [
  { vin: "MAT427021N1K12345", model: "Nexon EV Max", zone: "Mumbai", soc: 78, health: 96, s: "success" as const },
  { vin: "MAT427021N1K12912", model: "Prima 3125.K", zone: "Chennai", soc: 42, health: 71, s: "warning" as const },
  { vin: "MAT427021N1K13010", model: "Ultra T.6", zone: "Delhi NCR", soc: 12, health: 48, s: "critical" as const },
  { vin: "MAT427021N1K13188", model: "Ace Gold", zone: "Bengaluru", soc: 88, health: 94, s: "success" as const },
  { vin: "MAT427021N1K13290", model: "Signa 4825.T", zone: "Hyderabad", soc: 64, health: 82, s: "success" as const },
  { vin: "MAT427021N1K13400", model: "Winger", zone: "Pune", soc: 51, health: 79, s: "success" as const },
];

function FleetPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={["Intelligence", "Fleet"]}
        title="Fleet Intelligence"
        description="Live health, telemetry and behaviour across 3.2M connected vehicles."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <KpiCard label="Active vehicles" value="3,214,882" delta="+1.2%" trend="up" accent="primary" />
        <KpiCard label="Avg health" value="91.7" unit="/100" delta="+0.4" trend="up" accent="success" />
        <KpiCard label="Vehicles on watch" value="4,127" delta="-142" trend="up" accent="warning" />
        <KpiCard label="Immobilised (24h)" value="38" delta="+5" trend="down" accent="critical" />
      </div>

      <div className="grid grid-cols-12 gap-4">
        <Panel
          title="VIN lookup"
          description="Search across VIN, plate, driver or asset tag"
          className="col-span-12"
        >
          <div className="flex flex-wrap gap-2">
            <div className="relative flex-1 min-w-[280px]">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="MAT427021N1K…" className="pl-9 h-10" />
            </div>
            <Button variant="outline">Advanced filters</Button>
            <Button>Search fleet</Button>
          </div>
        </Panel>

        <Panel title="Live fleet map" className="col-span-12 lg:col-span-8" padded={false}>
          <div className="relative h-[360px] bg-gradient-to-br from-primary/5 via-accent/5 to-transparent">
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            {[
              { x: "22%", y: "34%", s: "success" as const },
              { x: "38%", y: "58%", s: "success" as const },
              { x: "54%", y: "28%", s: "warning" as const },
              { x: "68%", y: "62%", s: "success" as const },
              { x: "78%", y: "44%", s: "critical" as const },
              { x: "48%", y: "72%", s: "success" as const },
              { x: "30%", y: "78%", s: "success" as const },
              { x: "62%", y: "38%", s: "warning" as const },
            ].map((p, i) => {
              const colorMap = { success: "bg-success", warning: "bg-warning", critical: "bg-critical" };
              return (
                <span
                  key={i}
                  className={`absolute h-3 w-3 rounded-full ring-4 ring-current/20 ${colorMap[p.s]}`}
                  style={{ left: p.x, top: p.y }}
                />
              );
            })}
            <div className="absolute bottom-3 left-3 flex items-center gap-3 text-xs bg-surface/90 backdrop-blur border border-border rounded-lg px-3 py-2">
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success" />Healthy</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-warning" />Watch</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-critical" />Critical</span>
            </div>
          </div>
        </Panel>

        <Panel title="Fleet health index" description="Rolling 24 hours" className="col-span-12 lg:col-span-4">
          <TrendArea data={trend} color="var(--color-success)" height={200} />
          <div className="mt-4 grid grid-cols-4 gap-3 text-center">
            {[
              { i: Battery, l: "Battery", v: "84%" },
              { i: Thermometer, l: "Temp", v: "62°C" },
              { i: Gauge, l: "Speed", v: "48km/h" },
              { i: Fuel, l: "Fuel", v: "71%" },
            ].map((x) => {
              const Icon = x.i;
              return (
                <div key={x.l} className="rounded-lg bg-muted/40 p-2">
                  <Icon className="h-4 w-4 mx-auto text-primary" />
                  <div className="font-numeric text-sm font-semibold mt-1">{x.v}</div>
                  <div className="text-[10px] text-muted-foreground">{x.l}</div>
                </div>
              );
            })}
          </div>
        </Panel>

        <Panel title="Utilisation vs incidents" className="col-span-12 lg:col-span-6">
          <MultiLine data={dual} keys={["utilization", "incidents"]} />
        </Panel>

        <Panel
          title="Vehicles requiring attention"
          className="col-span-12 lg:col-span-6"
          actions={<Button variant="ghost" size="sm">Open all</Button>}
        >
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr className="text-left">
                <th className="pb-2 font-medium">VIN</th>
                <th className="pb-2 font-medium">Model</th>
                <th className="pb-2 font-medium">Zone</th>
                <th className="pb-2 font-medium">SoC</th>
                <th className="pb-2 font-medium">Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {vehicles.map((v) => (
                <tr key={v.vin} className="hover:bg-muted/30">
                  <td className="py-2.5 font-mono text-xs">{v.vin.slice(-8)}</td>
                  <td>{v.model}</td>
                  <td className="text-muted-foreground"><MapPin className="h-3 w-3 inline mr-1" />{v.zone}</td>
                  <td className="font-numeric">{v.soc}%</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Progress value={v.health} className="h-1.5 w-16" />
                      <StatusBadge status={v.s} label={`${v.health}`} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>
    </>
  );
}
