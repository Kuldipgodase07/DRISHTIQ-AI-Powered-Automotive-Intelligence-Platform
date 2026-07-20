import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, KpiCard, Panel, StatusBadge } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sparkles, Paperclip, GitBranch, ChevronRight, Play, CheckCircle2, Send, Users, ShieldAlert, Wrench, FileText, Factory, Package } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const Route = createFileRoute("/_app/root-cause")({
  head: () => ({ meta: [{ title: "Root Cause Investigation — DRISHTIQ™" }] }),
  component: RootCausePage,
});

function RootCausePage() {
  return (
    <>
      <PageHeader
        breadcrumbs={["Investigate", "Root Cause", "INV-2041"]}
        title="Coolant leak clusters — Nashik Line 3"
        description="INV-2041 · Opened 2 hours ago · Assigned to Priya Sharma & AI Root Cause Agent"
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2"><Users className="h-4 w-4" /> Assign</Button>
            <Button variant="outline" size="sm" className="gap-2"><FileText className="h-4 w-4" /> Export</Button>
            <Button size="sm" className="gap-2 bg-success hover:bg-success/90 text-white"><CheckCircle2 className="h-4 w-4" /> Approve</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <KpiCard label="Affected VINs" value="1,247" accent="critical" hint="last 30 days" />
        <KpiCard label="Est. warranty impact" value="₹2.1Cr" accent="warning" />
        <KpiCard label="AI confidence" value="87" unit="%" accent="ai" hint="High" />
        <KpiCard label="Suggested actions" value="4" accent="info" hint="2 auto-approved" />
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Investigation workspace */}
        <div className="col-span-12 xl:col-span-8 space-y-4">
          <Panel title="Knowledge & failure graph" description="Traced across supplier, manufacturing, machine and operator" padded={false}>
            <div className="relative h-[380px] bg-muted/20 overflow-hidden">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 380">
                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-muted-foreground)" />
                  </marker>
                </defs>
                {[
                  { x1: 400, y1: 190, x2: 200, y2: 90 },
                  { x1: 400, y1: 190, x2: 200, y2: 290 },
                  { x1: 400, y1: 190, x2: 620, y2: 100 },
                  { x1: 400, y1: 190, x2: 620, y2: 200 },
                  { x1: 400, y1: 190, x2: 620, y2: 300 },
                ].map((l, i) => (
                  <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="var(--color-border)" strokeWidth="2" markerEnd="url(#arrow)" />
                ))}
              </svg>
              {[
                { x: "50%", y: "50%", tone: "critical", icon: ShieldAlert, l: "Coolant leak", s: "Failure mode" },
                { x: "12%", y: "18%", tone: "info", icon: Package, l: "Radiator hose R-142", s: "Component" },
                { x: "12%", y: "72%", tone: "info", icon: Factory, l: "Nashik · Line 3", s: "Plant" },
                { x: "78%", y: "22%", tone: "warning", icon: Package, l: "Supplier · Endurance", s: "Batch B-9821" },
                { x: "78%", y: "50%", tone: "warning", icon: Wrench, l: "Station 07", s: "Machine WELD-04" },
                { x: "78%", y: "78%", tone: "ai", icon: Sparkles, l: "AI hypothesis", s: "Torque spec drift" },
              ].map((n, i) => {
                const toneMap: Record<string, string> = {
                  critical: "border-critical/50 bg-critical/10 text-critical",
                  info: "border-info/40 bg-info/10 text-info",
                  warning: "border-warning/50 bg-warning/10 text-warning",
                  ai: "border-ai/50 bg-ai/10 text-ai",
                };
                const Icon = n.icon;
                return (
                  <div
                    key={i}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-xl border-2 ${toneMap[n.tone]} bg-surface px-3 py-2 shadow-[var(--shadow-card)] min-w-[150px]`}
                    style={{ left: n.x, top: n.y }}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <div className="text-sm font-semibold">{n.l}</div>
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{n.s}</div>
                  </div>
                );
              })}
            </div>
          </Panel>

          <Panel title="Investigation timeline" padded={false}>
            <ol className="divide-y divide-border">
              {[
                { t: "2h ago", who: "AI Agent", tone: "ai" as const, txt: "Opened investigation from 42-VIN failure cluster detected in Nashik L3.", i: Sparkles },
                { t: "1h 44m", who: "AI Agent", tone: "ai" as const, txt: "Correlated with supplier batch B-9821 (Endurance) — 78% of failing vehicles share this batch.", i: GitBranch },
                { t: "1h 20m", who: "Priya Sharma", tone: "info" as const, txt: "Attached inspection report SF-2041.pdf and requested machine logs for WELD-04.", i: Paperclip },
                { t: "42m", who: "AI Agent", tone: "ai" as const, txt: "Machine logs show torque values on Station 07 drifted 12% above spec on Nov 12–14.", i: Wrench },
                { t: "12m", who: "AI Agent", tone: "success" as const, txt: "Proposed corrective actions ranked by ROI. Awaiting approval.", i: CheckCircle2 },
              ].map((e, i) => {
                const toneMap: Record<string, string> = {
                  ai: "bg-ai/10 text-ai",
                  info: "bg-info/10 text-info",
                  success: "bg-success/10 text-success",
                };
                const Icon = e.i;
                return (
                  <li key={i} className="flex gap-4 p-4">
                    <div className={`h-9 w-9 rounded-lg grid place-items-center shrink-0 ${toneMap[e.tone]}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-semibold">{e.who}</span>
                        <span className="text-xs text-muted-foreground">{e.t}</span>
                      </div>
                      <p className="text-sm text-foreground/90 mt-1">{e.txt}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
            <div className="border-t border-border p-4 flex gap-3">
              <Avatar className="h-8 w-8"><AvatarFallback className="bg-primary text-primary-foreground text-xs">PS</AvatarFallback></Avatar>
              <div className="flex-1">
                <Textarea placeholder="Comment, @mention or ask the AI agent…" className="min-h-[64px] resize-none" />
                <div className="mt-2 flex justify-between items-center">
                  <div className="text-xs text-muted-foreground">Cmd + Enter to send</div>
                  <Button size="sm" className="gap-2"><Send className="h-3.5 w-3.5" /> Post</Button>
                </div>
              </div>
            </div>
          </Panel>
        </div>

        {/* Right column */}
        <div className="col-span-12 xl:col-span-4 space-y-4">
          <Panel title="AI reasoning" description="Confidence 87% · High" className="bg-gradient-to-br from-ai/5 to-transparent border-ai/20">
            <Tabs defaultValue="hypothesis">
              <TabsList className="w-full">
                <TabsTrigger value="hypothesis" className="flex-1">Hypothesis</TabsTrigger>
                <TabsTrigger value="evidence" className="flex-1">Evidence</TabsTrigger>
                <TabsTrigger value="actions" className="flex-1">Actions</TabsTrigger>
              </TabsList>
              <TabsContent value="hypothesis" className="mt-3 text-sm space-y-2">
                <p className="text-foreground/90 leading-relaxed">
                  Coolant leaks on 1,247 vehicles trace to <b>radiator hose clamp under-torque</b> at Nashik L3
                  Station 07 during shifts affected by machine WELD-04 drift, compounded by <b>hose batch B-9821</b>
                  from Endurance with sub-spec wall thickness.
                </p>
                <div className="rounded-lg bg-surface border border-border p-3 text-xs">
                  <div className="font-semibold mb-1">Contributing factors</div>
                  <div className="flex justify-between"><span>Torque drift</span><span className="font-numeric">54%</span></div>
                  <div className="flex justify-between"><span>Hose batch B-9821</span><span className="font-numeric">28%</span></div>
                  <div className="flex justify-between"><span>Ambient temperature</span><span className="font-numeric">11%</span></div>
                  <div className="flex justify-between"><span>Operator handover</span><span className="font-numeric">7%</span></div>
                </div>
              </TabsContent>
              <TabsContent value="evidence" className="mt-3 text-sm space-y-2">
                {[
                  "Machine log WELD-04 · Nov 12–14 · torque +12%",
                  "Inspection report SF-2041.pdf",
                  "Supplier COA batch B-9821",
                  "42 warranty claims · Nashik zone · < 30 days",
                ].map((e, i) => (
                  <div key={i} className="flex items-center gap-2 rounded border border-border p-2">
                    <Paperclip className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="truncate">{e}</span>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="actions" className="mt-3 space-y-2">
                {[
                  { l: "Recall & re-torque 1,247 VINs", roi: "₹2.1Cr saved", s: "critical" as const },
                  { l: "Quarantine batch B-9821 (14,000 units)", roi: "prevents 3× spread", s: "warning" as const },
                  { l: "Recalibrate WELD-04 and audit", roi: "0.4% yield gain", s: "success" as const },
                  { l: "Add SPC alert on torque > 8% drift", roi: "ongoing", s: "info" as const },
                ].map((a, i) => (
                  <div key={i} className="rounded-lg border border-border p-3">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">{a.l}</div>
                      <StatusBadge status={a.s} label={a.roi} />
                    </div>
                    <div className="mt-2 flex gap-2">
                      <Button size="sm" variant="outline" className="gap-1"><Play className="h-3 w-3" /> Simulate</Button>
                      <Button size="sm" className="gap-1"><CheckCircle2 className="h-3 w-3" /> Approve</Button>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </Panel>

          <Panel title="Approval workflow">
            <ol className="space-y-3 text-sm">
              {[
                { l: "AI drafted", s: "done" },
                { l: "Reviewed by Quality Head", s: "current" },
                { l: "Supplier notified", s: "pending" },
                { l: "Field service scheduled", s: "pending" },
              ].map((step, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div
                    className={`h-7 w-7 rounded-full grid place-items-center text-xs font-semibold ${
                      step.s === "done"
                        ? "bg-success text-white"
                        : step.s === "current"
                          ? "bg-primary text-white ring-4 ring-primary/20"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span className={step.s === "pending" ? "text-muted-foreground" : "text-foreground"}>{step.l}</span>
                  {i < 3 && <ChevronRight className="h-3 w-3 ml-auto text-muted-foreground" />}
                </li>
              ))}
            </ol>
          </Panel>
        </div>
      </div>
    </>
  );
}
