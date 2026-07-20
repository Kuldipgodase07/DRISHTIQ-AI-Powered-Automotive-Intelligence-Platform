import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, KpiCard, Panel } from "@/components/page-shell";
import { MultiLine, BarSeries } from "@/components/charts";
import { Car, Cpu, Battery, CircleGauge, Thermometer, Wind } from "lucide-react";

export const Route = createFileRoute("/_app/vehicles")({
  head: () => ({ meta: [{ title: "Vehicle Analytics — DRISHTIQ™" }] }),
  component: () => {
    const sensor = Array.from({ length: 30 }).map((_, i) => ({
      label: `${i}s`,
      rpm: 1800 + Math.round(Math.sin(i / 3) * 220 + i * 3),
      torque: 240 + Math.round(Math.cos(i / 3) * 40),
      temp: 88 + Math.round(Math.sin(i / 5) * 6),
    }));
    const failuresByComponent = [
      { label: "Battery", failures: 42 },
      { label: "Injector", failures: 31 },
      { label: "ECU", failures: 18 },
      { label: "Brake", failures: 27 },
      { label: "Sensor", failures: 22 },
      { label: "Alternator", failures: 14 },
    ];

    return (
      <>
        <PageHeader
          breadcrumbs={["Intelligence", "Vehicle Analytics"]}
          title="Vehicle Analytics"
          description="Digital twin, timeline and deep sensor analysis per VIN."
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <KpiCard label="Selected VIN" value="…13188" hint="Ace Gold · Bengaluru" accent="primary" />
          <KpiCard label="Component health" value="94" unit="/100" delta="+0.8" trend="up" accent="success" />
          <KpiCard label="Anomalies (24h)" value="3" delta="-2" trend="up" accent="warning" />
          <KpiCard label="Odometer" value="42,819" unit="km" hint="+184 today" accent="info" />
        </div>

        <div className="grid grid-cols-12 gap-4">
          <Panel title="Digital twin — component health" className="col-span-12 lg:col-span-5">
            <div className="space-y-2.5">
              {[
                { i: Cpu, l: "ECU / Firmware v4.14", v: 98, s: "success" },
                { i: Battery, l: "HV Battery Pack", v: 91, s: "success" },
                { i: CircleGauge, l: "Brake system", v: 74, s: "warning" },
                { i: Thermometer, l: "Cooling loop", v: 86, s: "success" },
                { i: Wind, l: "HVAC compressor", v: 62, s: "warning" },
                { i: Car, l: "Suspension", v: 88, s: "success" },
              ].map((c) => {
                const Icon = c.i;
                return (
                  <div key={c.l} className="flex items-center gap-3 rounded-lg border border-border p-3">
                    <div className={`h-9 w-9 rounded-lg grid place-items-center ${c.s === "success" ? "bg-success/10 text-success" : "bg-warning/15 text-warning"}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{c.l}</div>
                      <div className="mt-1 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className={`h-full ${c.s === "success" ? "bg-success" : "bg-warning"}`} style={{ width: `${c.v}%` }} />
                      </div>
                    </div>
                    <span className="font-numeric text-sm w-10 text-right">{c.v}</span>
                  </div>
                );
              })}
            </div>
          </Panel>

          <Panel title="Live sensor stream (last 30s)" description="RPM, torque, coolant temperature" className="col-span-12 lg:col-span-7">
            <MultiLine data={sensor} keys={["rpm", "torque", "temp"]} height={260} />
          </Panel>

          <Panel title="Failures by component (last 90 days)" className="col-span-12 lg:col-span-7">
            <BarSeries data={failuresByComponent} keys={["failures"]} />
          </Panel>

          <Panel title="Recent trips" className="col-span-12 lg:col-span-5">
            <ul className="divide-y divide-border">
              {[
                { d: "Today · 09:12", from: "Whitefield", to: "Electronic City", km: 34, sc: "A" },
                { d: "Today · 06:40", from: "Depot", to: "Whitefield", km: 12, sc: "A" },
                { d: "Yesterday · 18:22", from: "Marathahalli", to: "Depot", km: 22, sc: "B" },
                { d: "Yesterday · 08:05", from: "Depot", to: "Marathahalli", km: 21, sc: "A" },
              ].map((t, i) => (
                <li key={i} className="py-3 flex items-center gap-3 text-sm">
                  <div className="text-xs text-muted-foreground w-28">{t.d}</div>
                  <div className="flex-1">
                    <span className="font-medium">{t.from}</span>
                    <span className="mx-1 text-muted-foreground">→</span>
                    <span className="font-medium">{t.to}</span>
                  </div>
                  <span className="font-numeric text-sm">{t.km} km</span>
                  <span className={`h-6 w-6 grid place-items-center rounded text-xs font-semibold ${t.sc === "A" ? "bg-success/10 text-success" : "bg-warning/15 text-warning"}`}>{t.sc}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </>
    );
  },
});
