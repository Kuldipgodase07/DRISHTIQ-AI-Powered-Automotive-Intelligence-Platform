import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, KpiCard, Panel, StatusBadge } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Paperclip, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/_app/alerts")({
  head: () => ({ meta: [{ title: "Alerts & Incidents — DRISHTIQ™" }] }),
  component: () => {
    const alerts = [
      { id: "ALT-9412", t: "HV battery thermal spike — VIN …13010", sev: "critical" as const, plant: "Pune P2", age: "3m", owner: "R. Nair" },
      { id: "ALT-9410", t: "Torque drift > 10% — WELD-04", sev: "critical" as const, plant: "Nashik L3", age: "18m", owner: "AI Agent" },
      { id: "ALT-9407", t: "Injector misfire — SKU IJ-88 batch 91-A", sev: "warning" as const, plant: "Chennai L1", age: "42m", owner: "S. Kulkarni" },
      { id: "ALT-9405", t: "Supplier OTD dropped to 82.1% — Motherson", sev: "warning" as const, plant: "Multi", age: "1h", owner: "V. Rao" },
      { id: "ALT-9401", t: "HVAC firmware regression on 214 VINs", sev: "warning" as const, plant: "Fleet", age: "2h", owner: "AI Agent" },
      { id: "ALT-9398", t: "Coolant sensor drift", sev: "info" as const, plant: "Sanand L5", age: "3h", owner: "Unassigned" },
    ];
    return (
      <>
        <PageHeader
          breadcrumbs={["Operations", "Alerts"]}
          title="Alerts & Incident Management"
          description="Real-time critical events across fleet, plants and suppliers with SLA tracking."
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <KpiCard label="Open critical" value="12" accent="critical" delta="+3" trend="down" />
          <KpiCard label="Open high" value="38" accent="warning" delta="-4" trend="up" />
          <KpiCard label="MTTA" value="4.2" unit="min" accent="success" delta="-38s" trend="up" />
          <KpiCard label="Escalated" value="6" accent="info" />
        </div>

        <Panel title="Active alerts" padded={false}>
          <div className="p-4 border-b border-border flex items-center justify-between">
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All (127)</TabsTrigger>
                <TabsTrigger value="critical">Critical (12)</TabsTrigger>
                <TabsTrigger value="mine">Assigned to me (4)</TabsTrigger>
                <TabsTrigger value="escalated">Escalated (6)</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Bulk assign</Button>
              <Button variant="outline" size="sm">Acknowledge</Button>
            </div>
          </div>
          <ul className="divide-y divide-border">
            {alerts.map((a) => (
              <li key={a.id} className="p-4 flex items-center gap-4 hover:bg-muted/30">
                <div className={`h-10 w-10 rounded-lg grid place-items-center ${a.sev === "critical" ? "bg-critical/10 text-critical" : a.sev === "warning" ? "bg-warning/15 text-warning" : "bg-info/10 text-info"}`}>
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-mono text-xs text-muted-foreground">{a.id}</span>
                    <StatusBadge status={a.sev} label={a.sev.toUpperCase()} />
                  </div>
                  <div className="text-sm font-medium mt-0.5 truncate">{a.t}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{a.plant} · owner {a.owner} · {a.age} ago</div>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Button variant="ghost" size="icon"><MessageSquare className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon"><Paperclip className="h-4 w-4" /></Button>
                  <Button size="sm">Acknowledge</Button>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </>
    );
  },
});
