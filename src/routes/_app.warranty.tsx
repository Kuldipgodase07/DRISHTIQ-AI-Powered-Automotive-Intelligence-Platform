import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, KpiCard, Panel } from "@/components/page-shell";
import { BarSeries, TrendArea } from "@/components/charts";

export const Route = createFileRoute("/_app/warranty")({
  head: () => ({ meta: [{ title: "Warranty Analytics — DRISHTIQ™" }] }),
  component: () => {
    const monthly = Array.from({ length: 12 }).map((_, i) => ({
      label: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
      value: 32 + Math.round(Math.sin(i / 2) * 8 + i / 3),
    }));
    const byCategory = [
      { label: "Powertrain", claims: 214, cost: 82 },
      { label: "Electrical", claims: 168, cost: 51 },
      { label: "Body", claims: 96, cost: 22 },
      { label: "HVAC", claims: 78, cost: 31 },
      { label: "Suspension", claims: 62, cost: 24 },
    ];
    return (
      <>
        <PageHeader
          breadcrumbs={["Operations", "Warranty"]}
          title="Warranty Analytics"
          description="Claims, cost per VIN, recall risk and supplier chargebacks."
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <KpiCard label="Claims (MTD)" value="1,428" delta="-6%" trend="up" accent="success" />
          <KpiCard label="Cost (MTD)" value="₹8.2Cr" delta="-3.4%" trend="up" accent="primary" />
          <KpiCard label="Cost / VIN" value="₹2,140" accent="info" />
          <KpiCard label="Supplier recovery" value="₹1.1Cr" delta="+18%" trend="up" accent="ai" />
        </div>
        <div className="grid grid-cols-12 gap-4">
          <Panel title="Claim cost trend (12 months)" className="col-span-12 lg:col-span-8">
            <TrendArea data={monthly} height={260} />
          </Panel>
          <Panel title="Top failure categories" className="col-span-12 lg:col-span-4">
            <BarSeries data={byCategory} keys={["claims"]} colors={["var(--color-primary)"]} height={260} />
          </Panel>
        </div>
      </>
    );
  },
});
