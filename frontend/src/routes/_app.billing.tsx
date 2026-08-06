import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, KpiCard, Panel, StatusBadge } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CreditCard, Download } from "lucide-react";

export const Route = createFileRoute("/_app/billing")({
  head: () => ({ meta: [{ title: "Billing & Subscription — DRISHTIQ™" }] }),
  component: () => (
    <>
      <PageHeader
        breadcrumbs={["Workspace", "Billing"]}
        title="Billing & Subscription"
        description="Plans, invoices, usage and payment methods."
        actions={<Button size="sm">Upgrade plan</Button>}
      />
      <div className="grid grid-cols-12 gap-4 mb-4">
        <Panel title="Current plan" className="col-span-12 lg:col-span-4 bg-gradient-to-br from-primary/5 to-transparent">
          <div className="text-3xl font-semibold">Enterprise</div>
          <div className="text-sm text-muted-foreground mt-1">Unlimited seats · dedicated tenant</div>
          <div className="mt-4 text-xs text-muted-foreground">Renews 12 Feb 2027</div>
          <Button className="mt-4 w-full">Manage plan</Button>
        </Panel>
        <div className="col-span-12 lg:col-span-8 grid grid-cols-2 gap-4">
          <KpiCard label="MTD spend" value="$142,860" accent="primary" />
          <KpiCard label="API calls (M)" value="42.1" accent="ai" delta="+8%" trend="down" />
          <KpiCard label="Storage" value="18.4" unit="TB" accent="info" />
          <KpiCard label="Active seats" value="284" accent="success" />
        </div>
      </div>

      <Panel title="Usage this month" className="mb-4">
        {[
          { l: "AI compute", v: 72, cap: "of 40M tokens" },
          { l: "Data warehouse", v: 48, cap: "of 50TB" },
          { l: "Realtime telemetry", v: 61, cap: "of 5B events" },
          { l: "API requests", v: 34, cap: "of 100M calls" },
        ].map((u) => (
          <div key={u.l} className="py-3 border-b border-border last:border-0">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{u.l}</span>
              <span className="text-muted-foreground">{u.v}% {u.cap}</span>
            </div>
            <Progress value={u.v} className="h-1.5 mt-2" />
          </div>
        ))}
      </Panel>

      <Panel title="Recent invoices" padded={false}>
        <table className="w-full text-sm">
          <thead className="text-xs text-muted-foreground text-left">
            <tr><th className="px-4 py-3 font-medium">Invoice</th><th>Period</th><th>Amount</th><th>Status</th><th></th></tr>
          </thead>
          <tbody className="divide-y divide-border">
            {[
              { i: "INV-2027-011", p: "Nov 2026", a: "$142,860", s: "info" as const, l: "Due Dec 5" },
              { i: "INV-2027-010", p: "Oct 2026", a: "$138,220", s: "success" as const, l: "Paid" },
              { i: "INV-2027-009", p: "Sep 2026", a: "$141,004", s: "success" as const, l: "Paid" },
            ].map((r) => (
              <tr key={r.i} className="hover:bg-muted/30">
                <td className="px-4 py-3 font-mono text-xs">{r.i}</td>
                <td>{r.p}</td>
                <td className="font-numeric font-semibold">{r.a}</td>
                <td><StatusBadge status={r.s} label={r.l} /></td>
                <td className="text-right pr-4"><Button variant="ghost" size="sm" className="gap-1"><Download className="h-3.5 w-3.5" /> PDF</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </>
  ),
});
