import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel } from "@/components/page-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Settings — DRISHTIQ™" }] }),
  component: () => (
    <>
      <PageHeader breadcrumbs={["Workspace", "Settings"]} title="Settings" description="Personal preferences and workspace defaults." />
      <div className="grid grid-cols-12 gap-4">
        <Panel title="General" className="col-span-12 lg:col-span-6">
          <div className="space-y-4">
            <div><Label>Workspace name</Label><Input defaultValue="Tata Motors — Global" className="mt-1.5" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Timezone</Label>
                <Select defaultValue="ist">
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ist">Asia/Kolkata (IST)</SelectItem>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="pst">America/Los_Angeles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">Hindi</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </Panel>

        <Panel title="Notifications" className="col-span-12 lg:col-span-6">
          {[
            { l: "Critical alerts", d: "SMS + email + in-app", on: true },
            { l: "AI investigation drafts", d: "Only when I'm assigned", on: true },
            { l: "Weekly executive digest", d: "Every Monday 08:00", on: true },
            { l: "Supplier score changes", d: "Only for watched suppliers", on: false },
          ].map((n) => (
            <div key={n.l} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div>
                <div className="text-sm font-medium">{n.l}</div>
                <div className="text-xs text-muted-foreground">{n.d}</div>
              </div>
              <Switch defaultChecked={n.on} />
            </div>
          ))}
        </Panel>

        <Panel title="Security" className="col-span-12 lg:col-span-6">
          {[
            { l: "Enforce MFA", d: "Required for all users", on: true },
            { l: "SSO only", d: "Disable password sign-in", on: true },
            { l: "Session lifetime · 12h", d: "Force re-auth after inactivity", on: false },
            { l: "IP allowlist", d: "Restrict access to corporate ranges", on: false },
          ].map((n) => (
            <div key={n.l} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div>
                <div className="text-sm font-medium">{n.l}</div>
                <div className="text-xs text-muted-foreground">{n.d}</div>
              </div>
              <Switch defaultChecked={n.on} />
            </div>
          ))}
        </Panel>

        <Panel title="Appearance" className="col-span-12 lg:col-span-6">
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between"><span>Compact density</span><Switch /></div>
            <div className="flex items-center justify-between"><span>Show KPI deltas</span><Switch defaultChecked /></div>
            <div className="flex items-center justify-between"><span>Animated chart updates</span><Switch defaultChecked /></div>
            <div className="pt-2"><Button>Save preferences</Button></div>
          </div>
        </Panel>
      </div>
    </>
  ),
});
