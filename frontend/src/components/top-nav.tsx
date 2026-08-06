import { useState } from "react";
import {
  Search,
  Sparkles,
  Bell,
  HelpCircle,
  ChevronDown,
  LogOut,
  User,
  Building2,
  Command as CommandIcon,
  Zap,
  Cog,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSession, signOut, switchWorkspace, type MockSession } from "@/lib/mock-auth";
import { useNavigate } from "@tanstack/react-router";

export function TopNav() {
  const { session } = useSession();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const s: MockSession = session ?? {
    user: { name: "—", email: "—", role: "—", initials: "··", workspace: "Loading…" },
    workspaces: [],
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-surface/90 backdrop-blur border-b border-border flex items-center gap-4 px-6">
      {/* Workspace switcher */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:bg-muted transition-colors">
            <Building2 className="h-4 w-4 text-primary" />
            <span className="font-medium truncate max-w-[200px]">{s.user.workspace}</span>
            <ChevronDown className="h-3.5 w-3.5 opacity-60" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-72">
          <DropdownMenuLabel>Switch workspace</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {s.workspaces.map((w) => (
            <DropdownMenuItem key={w} onClick={() => switchWorkspace(w)}>
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span className="truncate">{w}</span>
              {w === s.user.workspace && <Badge className="ml-auto" variant="secondary">Active</Badge>}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Global search */}
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search VIN, plant, supplier, investigation, report…"
            className="w-full h-10 rounded-lg border border-border bg-background pl-9 pr-24 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1 text-[11px] text-muted-foreground border border-border rounded px-1.5 py-0.5">
            <CommandIcon className="h-3 w-3" /> K
          </span>
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" aria-label="Quick actions" className="text-muted-foreground">
          <Zap className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-ai/30 text-ai hover:bg-ai/10 hover:text-ai"
        >
          <Sparkles className="h-4 w-4" />
          AI Copilot
        </Button>
        <Button variant="ghost" size="icon" aria-label="Help" className="text-muted-foreground">
          <HelpCircle className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Notifications" className="relative text-muted-foreground">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-critical ring-2 ring-surface" />
        </Button>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="ml-2 inline-flex items-center gap-2 rounded-full pl-1 pr-2 py-1 hover:bg-muted transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                  {s.user.initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden lg:block text-left leading-tight">
                <div className="text-xs font-semibold">{s.user.name}</div>
                <div className="text-[10px] text-muted-foreground">{s.user.role}</div>
              </div>
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="text-xs font-semibold">{s.user.name}</div>
              <div className="text-[11px] text-muted-foreground">{s.user.email}</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate({ to: "/settings" })}>
              <User className="h-4 w-4" /> Profile & preferences
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate({ to: "/admin" })}>
              <Cog className="h-4 w-4" /> Administration
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                signOut();
                navigate({ to: "/login" });
              }}
              className="text-critical focus:text-critical"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}


