import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, StatusBadge } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sparkles, Mic, Send, ShieldCheck, Zap, Wrench, FileBarChart2, Bot } from "lucide-react";

export const Route = createFileRoute("/_app/ai-workspace")({
  head: () => ({ meta: [{ title: "AI Workspace — DRISHTIQ™" }] }),
  component: () => (
    <>
      <PageHeader
        breadcrumbs={["Investigate", "AI Workspace"]}
        title="AI Workspace"
        description="Enterprise agents grounded on your fleet, plants, suppliers and warranty data."
      />

      <div className="grid grid-cols-12 gap-4">
        {/* Agents rail */}
        <Panel title="Agents" className="col-span-12 lg:col-span-3">
          <ul className="space-y-2">
            {[
              { n: "Executive Copilot", d: "Boardroom briefs", i: ShieldCheck, active: true },
              { n: "Root Cause Agent", d: "Investigations", i: Sparkles, active: false },
              { n: "Quality Monitor", d: "Live SPC", i: FileBarChart2, active: false },
              { n: "Predictive Agent", d: "Forecasts & RUL", i: Zap, active: false },
              { n: "Field Service Copilot", d: "Repair guidance", i: Wrench, active: false },
            ].map((a) => {
              const Icon = a.i;
              return (
                <li
                  key={a.n}
                  className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${a.active ? "border-ai/40 bg-ai/5" : "border-border hover:border-primary/30"}`}
                >
                  <div className={`h-9 w-9 rounded-lg grid place-items-center ${a.active ? "bg-ai text-white" : "bg-muted text-primary"}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold truncate">{a.n}</div>
                    <div className="text-xs text-muted-foreground truncate">{a.d}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Panel>

        {/* Chat */}
        <Panel
          title="Executive Copilot"
          description="Grounded on 3.2M vehicles · 142 plants · 1,284 suppliers"
          className="col-span-12 lg:col-span-6"
          padded={false}
        >
          <div className="p-5 space-y-4 min-h-[420px]">
            <div className="flex gap-3">
              <Avatar className="h-8 w-8"><AvatarFallback className="bg-primary text-primary-foreground text-xs">PS</AvatarFallback></Avatar>
              <div className="rounded-2xl rounded-tl-sm bg-muted px-4 py-2.5 text-sm max-w-lg">
                What are our top 3 warranty risks this quarter and what should the board know?
              </div>
            </div>
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-ai text-white grid place-items-center shrink-0"><Bot className="h-4 w-4" /></div>
              <div className="rounded-2xl rounded-tl-sm bg-ai/5 border border-ai/20 px-4 py-3 text-sm max-w-2xl space-y-2">
                <p><b>1. Radiator hose failures (Nashik L3)</b> — 1,247 VINs affected, ₹2.1Cr projected impact. Root cause identified; corrective actions pending approval.</p>
                <p><b>2. HV battery thermal events</b> — 3.2× baseline in Pune plant Q4 builds. 7 VINs at active risk this week.</p>
                <p><b>3. Injector misfires — SKU IJ-88</b> — trending +18% MoM. Correlated to supplier Bosch batch 91-A.</p>
                <div className="flex gap-1.5 pt-1">
                  <StatusBadge status="ai" label="Confidence 92%" />
                  <StatusBadge status="info" label="Evidence: 14 sources" />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {["Draft executive slide", "Show SQL used", "Open investigation", "Email to CEO"].map((s) => (
                <button key={s} className="text-xs rounded-full border border-border bg-surface px-3 py-1.5 hover:border-primary/40">
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="border-t border-border p-4">
            <div className="rounded-xl border border-border bg-surface p-2 flex items-end gap-2">
              <Textarea placeholder="Ask anything about your enterprise data…" className="min-h-[52px] border-0 resize-none focus-visible:ring-0" />
              <Button variant="ghost" size="icon" aria-label="Voice"><Mic className="h-4 w-4" /></Button>
              <Button className="gap-2 bg-ai hover:bg-ai/90"><Send className="h-4 w-4" /> Send</Button>
            </div>
          </div>
        </Panel>

        {/* Right — explainability + prompts */}
        <div className="col-span-12 lg:col-span-3 space-y-4">
          <Panel title="Prompt suggestions">
            <ul className="space-y-2 text-sm">
              {[
                "Which plants are at highest recall risk?",
                "Compare Bosch vs Denso over 90 days",
                "Draft a warranty report for MoRTH",
                "Generate SQL for VINs failing in monsoon zones",
                "Simulate 5% price rise on supplier BOM",
              ].map((p) => (
                <li key={p} className="rounded-lg border border-border p-2.5 hover:border-primary/40 cursor-pointer">
                  {p}
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Governance">
            <div className="text-xs space-y-2 text-muted-foreground">
              <div className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-success" /> PII redaction enforced</div>
              <div className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-success" /> Answers cite evidence</div>
              <div className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-success" /> Tenant-isolated retrieval</div>
              <div className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-success" /> Full audit trail</div>
            </div>
          </Panel>
        </div>
      </div>
    </>
  ),
});
