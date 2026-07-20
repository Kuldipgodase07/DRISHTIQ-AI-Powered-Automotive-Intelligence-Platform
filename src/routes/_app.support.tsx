import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LifeBuoy, MessageSquare, BookOpen, PhoneCall } from "lucide-react";

export const Route = createFileRoute("/_app/support")({
  head: () => ({ meta: [{ title: "Support — DRISHTIQ™" }] }),
  component: () => (
    <>
      <PageHeader breadcrumbs={["Workspace", "Support"]} title="Support" description="Enterprise 24×7 support with named CSM." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {[
          { i: MessageSquare, t: "Live chat", d: "Avg response · 42s", c: "Start chat" },
          { i: PhoneCall, t: "Priority phone", d: "+91 22 4200 0000", c: "Copy number" },
          { i: BookOpen, t: "Documentation", d: "Guides, API, SDKs", c: "Open docs" },
        ].map((s) => {
          const Icon = s.i;
          return (
            <div key={s.t} className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
              <Icon className="h-6 w-6 text-primary" />
              <h3 className="mt-3 text-sm font-semibold">{s.t}</h3>
              <p className="text-xs text-muted-foreground">{s.d}</p>
              <Button variant="outline" size="sm" className="mt-3">{s.c}</Button>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-12 gap-4">
        <Panel title="Open a support case" className="col-span-12 lg:col-span-7">
          <div className="space-y-3">
            <Textarea placeholder="Describe the issue, what you expected and what happened…" className="min-h-[140px]" />
            <div className="flex justify-end gap-2">
              <Button variant="outline">Attach logs</Button>
              <Button className="gap-2"><LifeBuoy className="h-4 w-4" /> Submit case</Button>
            </div>
          </div>
        </Panel>
        <Panel title="Your CSM" className="col-span-12 lg:col-span-5">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-primary text-primary-foreground grid place-items-center font-semibold">AN</div>
            <div>
              <div className="text-sm font-semibold">Ananya Menon</div>
              <div className="text-xs text-muted-foreground">Enterprise Customer Success · Mumbai</div>
              <div className="text-xs text-muted-foreground mt-1">Next check-in: Thursday, 15:00 IST</div>
            </div>
          </div>
        </Panel>
      </div>
    </>
  ),
});
