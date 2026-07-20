import type { ReactNode } from "react";
import { ChevronRight, Filter, Download, MoreHorizontal, ArrowUp, ArrowDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function PageHeader({
  breadcrumbs = [],
  title,
  description,
  actions,
}: {
  breadcrumbs?: string[];
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6">
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
        <span>DRISHTIQ</span>
        {breadcrumbs.map((b, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3 opacity-50" />
            <span className={i === breadcrumbs.length - 1 ? "text-foreground font-medium" : ""}>{b}</span>
          </span>
        ))}
      </nav>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground max-w-2xl">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {actions ?? (
            <>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" /> Filters
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" /> Export
              </Button>
              <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90">
                <Sparkles className="h-4 w-4" /> Ask AI
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function KpiCard({
  label,
  value,
  unit,
  delta,
  trend = "up",
  hint,
  accent = "primary",
}: {
  label: string;
  value: string | number;
  unit?: string;
  delta?: string;
  trend?: "up" | "down" | "flat";
  hint?: string;
  accent?: "primary" | "success" | "warning" | "critical" | "ai" | "info";
}) {
  const accentMap: Record<string, string> = {
    primary: "from-primary/10 to-transparent text-primary",
    success: "from-success/10 to-transparent text-success",
    warning: "from-warning/15 to-transparent text-warning",
    critical: "from-critical/10 to-transparent text-critical",
    ai: "from-ai/10 to-transparent text-ai",
    info: "from-info/10 to-transparent text-info",
  };
  const good = trend === "up";
  return (
    <div className="relative rounded-xl bg-card border border-border p-5 shadow-[var(--shadow-card)] overflow-hidden group hover:shadow-[var(--shadow-elevated)] transition-shadow">
      <div className={cn("absolute inset-x-0 top-0 h-16 bg-gradient-to-b opacity-70", accentMap[accent])} />
      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</span>
          <button className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-3 flex items-baseline gap-1.5">
          <span className="font-numeric text-3xl font-semibold text-foreground">{value}</span>
          {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        </div>
        {(delta || hint) && (
          <div className="mt-2 flex items-center gap-2">
            {delta && (
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 text-xs font-medium rounded px-1.5 py-0.5",
                  trend === "flat"
                    ? "bg-muted text-muted-foreground"
                    : good
                      ? "bg-success/10 text-success"
                      : "bg-critical/10 text-critical",
                )}
              >
                {trend !== "flat" && (good ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)}
                {delta}
              </span>
            )}
            {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

export function Panel({
  title,
  description,
  actions,
  children,
  className,
  padded = true,
}: {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <section
      className={cn(
        "rounded-xl bg-card border border-border shadow-[var(--shadow-card)] overflow-hidden",
        className,
      )}
    >
      {(title || actions) && (
        <header className="flex items-center justify-between gap-4 px-5 py-4 border-b border-border">
          <div className="min-w-0">
            {title && <h3 className="text-sm font-semibold text-foreground">{title}</h3>}
            {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
          </div>
          {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
        </header>
      )}
      <div className={padded ? "p-5" : ""}>{children}</div>
    </section>
  );
}

export function StatusBadge({
  status,
  label,
}: {
  status: "success" | "warning" | "critical" | "info" | "muted" | "ai";
  label: string;
}) {
  const map: Record<string, string> = {
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/15 text-warning border-warning/30",
    critical: "bg-critical/10 text-critical border-critical/20",
    info: "bg-info/10 text-info border-info/20",
    ai: "bg-ai/10 text-ai border-ai/20",
    muted: "bg-muted text-muted-foreground border-border",
  };
  return (
    <Badge variant="outline" className={cn("font-medium", map[status])}>
      <span className="mr-1 h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </Badge>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-muted/30 p-10 text-center">
      <div className="mx-auto h-10 w-10 rounded-full bg-primary/10 text-primary grid place-items-center">
        <Sparkles className="h-5 w-5" />
      </div>
      <h4 className="mt-3 text-sm font-semibold">{title}</h4>
      <p className="mt-1 text-xs text-muted-foreground max-w-sm mx-auto">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
