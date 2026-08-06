import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, KpiCard, Panel, StatusBadge } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, KeyRound, Users, ShieldCheck, Building2 } from "lucide-react";

export const Route = createFileRoute("/_app/admin")({
  head: () => ({ meta: [{ title: "Administration — DRISHTIQ™" }] }),
  component: () => {
    const users = [
      { n: "Priya Sharma", e: "priya.sharma@tatamotors.com", r: "Executive Admin", s: "success" as const, l: "Just now" },
      { n: "Rakesh Nair", e: "rakesh@tatamotors.com", r: "Plant Manager", s: "success" as const, l: "8m ago" },
      { n: "Sneha Kulkarni", e: "sneha.k@tatamotors.com", r: "Quality Lead", s: "success" as const, l: "1h ago" },
      { n: "Vikram Rao", e: "vikram.rao@tatamotors.com", r: "Supplier Manager", s: "info" as const, l: "Yesterday" },
      { n: "External auditor", e: "auditor@bureauveritas.com", r: "Read-only", s: "warning" as const, l: "3 days ago" },
    ];
    return (
      <>
        <PageHeader
          breadcrumbs={["Workspace", "Administration"]}
          title="Administration"
          description="Organizations, users, roles, API keys and audit logs."
          actions={<Button size="sm" className="gap-2"><Plus className="h-4 w-4" /> Invite users</Button>}
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <KpiCard label="Users" value="284" accent="primary" delta="+6" trend="up" />
          <KpiCard label="Roles" value="14" accent="info" />
          <KpiCard label="API keys" value="9" accent="ai" />
          <KpiCard label="Audit events (24h)" value="12,842" accent="success" />
        </div>

        <Panel padded={false}>
          <div className="p-4 border-b border-border">
            <Tabs defaultValue="users">
              <TabsList>
                <TabsTrigger value="users" className="gap-2"><Users className="h-4 w-4" /> Users</TabsTrigger>
                <TabsTrigger value="roles" className="gap-2"><ShieldCheck className="h-4 w-4" /> Roles</TabsTrigger>
                <TabsTrigger value="orgs" className="gap-2"><Building2 className="h-4 w-4" /> Organizations</TabsTrigger>
                <TabsTrigger value="api" className="gap-2"><KeyRound className="h-4 w-4" /> API keys</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground text-left">
              <tr><th className="px-4 py-3 font-medium">User</th><th>Role</th><th>Status</th><th>Last active</th><th></th></tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((u) => (
                <tr key={u.e} className="hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="font-medium">{u.n}</div>
                    <div className="text-xs text-muted-foreground">{u.e}</div>
                  </td>
                  <td>{u.r}</td>
                  <td><StatusBadge status={u.s} label={u.s === "success" ? "Active" : u.s === "warning" ? "Restricted" : "Invited"} /></td>
                  <td className="text-muted-foreground">{u.l}</td>
                  <td className="text-right pr-4"><Button variant="ghost" size="sm">Manage</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </>
    );
  },
});
