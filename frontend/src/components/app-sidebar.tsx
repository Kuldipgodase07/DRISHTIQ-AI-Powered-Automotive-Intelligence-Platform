import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Truck,
  Car,
  Factory,
  Package,
  GitBranch,
  Activity,
  Sparkles,
  BellRing,
  ShieldCheck,
  FileBarChart2,
  BookOpen,
  Settings2,
  CreditCard,
  Cog,
  LifeBuoy,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const NAV_GROUPS: {
  label: string;
  items: { to: string; label: string; icon: React.ComponentType<{ className?: string }> }[];
}[] = [
  {
    label: "Intelligence",
    items: [
      { to: "/dashboard", label: "Executive Dashboard", icon: LayoutDashboard },
      { to: "/fleet", label: "Fleet Intelligence", icon: Truck },
      { to: "/vehicles", label: "Vehicle Analytics", icon: Car },
      { to: "/manufacturing", label: "Manufacturing", icon: Factory },
      { to: "/suppliers", label: "Supplier Intelligence", icon: Package },
    ],
  },
  {
    label: "Investigate & Predict",
    items: [
      { to: "/root-cause", label: "Root Cause", icon: GitBranch },
      { to: "/predictive", label: "Predictive Maintenance", icon: Activity },
      { to: "/ai-workspace", label: "AI Workspace", icon: Sparkles },
    ],
  },
  {
    label: "Operations",
    items: [
      { to: "/alerts", label: "Alerts", icon: BellRing },
      { to: "/warranty", label: "Warranty", icon: ShieldCheck },
      { to: "/reports", label: "Reports", icon: FileBarChart2 },
      { to: "/knowledge", label: "Knowledge Center", icon: BookOpen },
    ],
  },
  {
    label: "Workspace",
    items: [
      { to: "/admin", label: "Administration", icon: Settings2 },
      { to: "/billing", label: "Billing", icon: CreditCard },
      { to: "/settings", label: "Settings", icon: Cog },
      { to: "/support", label: "Support", icon: LifeBuoy },
    ],
  },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden md:flex md:flex-col md:w-64 shrink-0 bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="h-16 flex items-center px-4 border-b border-sidebar-border overflow-hidden">
        <img src="/logos/drishtiq_logo5.png" alt="DRISHTIQ Logo" className="h-11 sm:h-12 max-h-12 w-auto object-contain" />
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <div className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/50">
              {group.label}
            </div>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = pathname === item.to;
                const Icon = item.icon;
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                        active
                          ? "bg-sidebar-accent text-white shadow-inner"
                          : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-white",
                      )}
                    >
                      <Icon className={cn("h-4 w-4", active ? "text-accent" : "opacity-80")} />
                      <span className="truncate">{item.label}</span>
                      {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="p-4 border-t border-sidebar-border text-xs text-sidebar-foreground/60">
        <div className="flex items-center justify-between">
          <span>v4.2.1 • Enterprise</span>
          <span className="inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-success" /> All systems normal
          </span>
        </div>
      </div>
    </aside>
  );
}
