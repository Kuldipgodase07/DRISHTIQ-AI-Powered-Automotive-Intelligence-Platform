import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, StatusBadge } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { FileText, FileSpreadsheet, Presentation, Mail } from "lucide-react";

export const Route = createFileRoute("/_app/reports")({
  head: () => ({ meta: [{ title: "Reports — DRISHTIQ™" }] }),
  component: () => {
    const reports = [
      { n: "Board Quarterly Brief — Q3", type: "Executive", fmt: "PDF", i: FileText, last: "Yesterday", s: "success" as const },
      { n: "Plant OEE — Weekly", type: "Manufacturing", fmt: "Excel", i: FileSpreadsheet, last: "6h ago", s: "success" as const },
      { n: "Supplier Scorecard — All", type: "Supplier", fmt: "PPTX", i: Presentation, last: "Monday", s: "info" as const },
      { n: "Fleet Health — Zone-wise", type: "Vehicle", fmt: "PDF", i: FileText, last: "12h ago", s: "success" as const },
      { n: "30-Day Failure Forecast", type: "Predictive", fmt: "Excel", i: FileSpreadsheet, last: "1h ago", s: "ai" as const },
      { n: "Recall Readiness — SKU IJ-88", type: "Executive", fmt: "PDF", i: FileText, last: "Ad-hoc", s: "warning" as const },
    ];
    return (
      <>
        <PageHeader
          breadcrumbs={["Operations", "Reports"]}
          title="Reports"
          description="Templates, scheduled deliveries and one-click export across PDF, Excel and PowerPoint."
          actions={<><Button variant="outline" size="sm">Templates</Button><Button size="sm" className="gap-2"><FileText className="h-4 w-4" /> New report</Button></>}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((r) => {
            const Icon = r.i;
            return (
              <div key={r.n} className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <StatusBadge status={r.s} label={r.fmt} />
                </div>
                <h3 className="mt-3 text-sm font-semibold">{r.n}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{r.type} · last run {r.last}</p>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">Run now</Button>
                  <Button variant="ghost" size="icon" aria-label="Email"><Mail className="h-4 w-4" /></Button>
                </div>
              </div>
            );
          })}
        </div>
        <Panel title="Scheduled deliveries" className="mt-4">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground text-left">
              <tr><th className="pb-2 font-medium">Report</th><th>Cadence</th><th>Recipients</th><th>Next</th><th></th></tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Board Quarterly Brief", "Quarterly", "board@drishtiq.io", "Jan 2, 2027"],
                ["Plant OEE Weekly", "Every Monday 08:00", "plant-heads@…", "Nov 24"],
                ["Fleet Health — Zone-wise", "Daily 06:00", "fleet-ops@…", "Tomorrow"],
              ].map((r) => (
                <tr key={r[0]} className="hover:bg-muted/30">
                  <td className="py-3">{r[0]}</td>
                  <td>{r[1]}</td>
                  <td className="text-muted-foreground">{r[2]}</td>
                  <td className="font-numeric">{r[3]}</td>
                  <td className="text-right"><Button variant="ghost" size="sm">Edit</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </>
    );
  },
});
