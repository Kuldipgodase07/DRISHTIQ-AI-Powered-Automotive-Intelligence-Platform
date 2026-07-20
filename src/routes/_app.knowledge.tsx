import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel } from "@/components/page-shell";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, Wrench, Cpu, Bookmark } from "lucide-react";

export const Route = createFileRoute("/_app/knowledge")({
  head: () => ({ meta: [{ title: "Knowledge Center — DRISHTIQ™" }] }),
  component: () => {
    const collections = [
      { i: Wrench, n: "Repair manuals", c: 1284 },
      { i: BookOpen, n: "Failure library", c: 486 },
      { i: Cpu, n: "Component database", c: 3120 },
      { i: Bookmark, n: "My bookmarks", c: 14 },
    ];
    const docs = [
      { t: "Radiator hose R-142 — installation & torque spec", tag: "Repair" },
      { t: "HV battery thermal management — best practices", tag: "Safety" },
      { t: "Bosch injector IJ-88 — troubleshooting", tag: "Supplier" },
      { t: "SPC playbook — torque drift detection", tag: "Manufacturing" },
      { t: "Recall procedure — regulatory checklist (IN, EU)", tag: "Compliance" },
    ];
    return (
      <>
        <PageHeader
          breadcrumbs={["Operations", "Knowledge Center"]}
          title="Knowledge Center"
          description="Manuals, failure histories, supplier documentation — AI-searched."
        />
        <Panel className="mb-4">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9 h-11" placeholder="Ask a question or search 4,900+ documents…" />
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {["How to re-torque a radiator clamp", "HV battery cold-start issues", "IJ-88 misfire diagnostic"].map((s) => (
              <button key={s} className="rounded-full border border-border px-3 py-1 hover:border-primary/40">{s}</button>
            ))}
          </div>
        </Panel>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {collections.map((c) => {
            const Icon = c.i;
            return (
              <div key={c.n} className="rounded-xl border border-border bg-card p-5 hover:border-primary/40 transition-colors">
                <Icon className="h-6 w-6 text-primary" />
                <div className="mt-3 text-sm font-semibold">{c.n}</div>
                <div className="text-xs text-muted-foreground">{c.c.toLocaleString()} documents</div>
              </div>
            );
          })}
        </div>
        <Panel title="Recently updated">
          <ul className="divide-y divide-border">
            {docs.map((d) => (
              <li key={d.t} className="py-3 flex items-center gap-3">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="flex-1 text-sm">{d.t}</span>
                <span className="text-xs text-muted-foreground">{d.tag}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </>
    );
  },
});
