import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  Globe,
  Menu,
  X,
  Car,
  Factory,
  Truck,
  ShieldCheck,
  Cpu,
  Network,
  LineChart,
  Gauge,
  Wrench,
  Sparkles,
  Bot,
  BrainCircuit,
  Layers,
  Database,
  Cloud,
  Lock,
  CheckCircle2,
  ChevronDown,
  Play,
  Zap,
  TrendingUp,
  AlertTriangle,
  Activity,
  MapPin,
  Users,
  FileCheck2,
  GitBranch,
  Building2,
  Landmark,
  Boxes,
  Radar,
  Terminal,
  Command,
  Radio,
  Workflow,
  Star,
  ShieldAlert,
  Fingerprint,
  KeyRound,
  ScrollText,
  Globe2,
  Server,
  Code2,
  ChevronRight,
  Circle,
} from "lucide-react";

// ============================================================
// PRIMITIVES
// ============================================================

function Eyebrow({ children, icon: Icon }: { children: React.ReactNode; icon?: React.ElementType }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary shadow-card">
      {Icon ? <Icon className="h-3 w-3" /> : <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
      {children}
    </span>
  );
}

function SectionHeader({
  eyebrow,
  eyebrowIcon,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  eyebrowIcon?: React.ElementType;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <div className={align === "center" ? "flex justify-center" : ""}>
          <Eyebrow icon={eyebrowIcon}>{eyebrow}</Eyebrow>
        </div>
      ) : null}
      <h2 className="mt-5 text-balance text-[28px] font-bold leading-[1.05] tracking-tight text-foreground sm:text-4xl md:text-[44px]">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function PrimaryCTA({ children, className = "", href = "#demo" }: { children: React.ReactNode; className?: string; href?: string }) {
  return (
    <a
      href={href}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition hover:shadow-glow ${className}`}
    >
      <span className="absolute inset-0 -z-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </a>
  );
}

function SecondaryCTA({ children, className = "", href = "#tour" }: { children: React.ReactNode; className?: string; href?: string }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-white px-5 py-3 text-sm font-semibold text-foreground shadow-card transition hover:border-primary/30 hover:bg-primary/5 ${className}`}
    >
      {children}
    </a>
  );
}

function Sparkline({
  data,
  className = "",
  stroke = "#0078D4",
  fill = true,
}: {
  data: number[];
  className?: string;
  stroke?: string;
  fill?: boolean;
}) {
  const w = 100;
  const h = 32;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const norm = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * h;
    return `${x},${y}`;
  });
  const path = `M${norm.join(" L")}`;
  const area = `${path} L${w},${h} L0,${h} Z`;
  const gid = `spg-${stroke.replace("#", "")}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} preserveAspectRatio="none">
      <defs>
        <linearGradient id={gid} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.28" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill ? <path d={area} fill={`url(#${gid})`} /> : null}
      <path d={path} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ============================================================
// TICKER (announcement bar)
// ============================================================

function Ticker() {
  const items = [
    { l: "New", t: "Root Cause Agent v4 — 2× faster reasoning" },
    { l: "Live", t: "DRISHTIQ™ + Snowflake Summit 2026 keynote" },
    { l: "Report", t: "Forrester Wave™: Automotive AI Q3 2026" },
    { l: "GA", t: "Multi-region deployment for EU & APAC" },
  ];
  return (
    <div className="border-b border-border/70 bg-primary text-white">
      <div className="mx-auto flex h-9 max-w-7xl items-center gap-6 overflow-hidden px-4 text-[11px] sm:px-6 lg:px-8">
        <div className="hidden shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-white/60 sm:flex">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          Enterprise Console
        </div>
        <div className="flex flex-1 overflow-hidden">
          <div className="flex shrink-0 animate-marquee items-center gap-10 whitespace-nowrap pr-10">
            {[...items, ...items].map((i, idx) => (
              <span key={idx} className="inline-flex items-center gap-2">
                <span className="rounded bg-white/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-white/90">
                  {i.l}
                </span>
                <span className="text-white/85">{i.t}</span>
                <span className="text-white/25">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// NAV
// ============================================================

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const links = [
    { l: "Platform", to: "#platform" },
    { l: "Solutions", to: "#solutions" },
    { l: "Industries", to: "#industries" },
    { l: "AI Agents", to: "#ai-agents" },
    { l: "Resources", to: "#resources" },
    { l: "Pricing", to: "#pricing" },
  ];

  return (
    <>
      <Ticker />
      <header
        className={`sticky top-4 mt-4 z-50 mx-auto max-w-7xl transition-all duration-300 ${
          scrolled
            ? "rounded-2xl border border-border/70 bg-white/90 shadow-elegant backdrop-blur-xl"
            : "rounded-2xl border border-border/40 bg-white/70 shadow-sm backdrop-blur-xl"
        } w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] lg:w-[calc(100%-4rem)]`}
      >
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#" className="flex shrink-0 items-center gap-2.5">
            <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary via-primary to-secondary text-white shadow-elegant">
              <Radar className="h-4.5 w-4.5" />
              <span className="absolute inset-0 rounded-xl ring-1 ring-white/40" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[15px] font-bold tracking-tight text-foreground">
                DRISHTIQ<span className="align-super text-[9px] text-muted-foreground">™</span>
              </span>
              <span className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Automotive Intelligence
              </span>
            </div>
          </a>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {links.map((l) => (
              <a
                key={l.l}
                href={l.to}
                className="group inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground whitespace-nowrap"
              >
                {l.l}
                <ChevronDown className="h-3 w-3 opacity-0 transition group-hover:opacity-100" />
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-1.5 lg:flex shrink-0">
            <div className="mr-1 hidden items-center gap-2 rounded-md border border-border bg-white px-2.5 py-1.5 text-xs text-muted-foreground xl:flex whitespace-nowrap">
              <Search className="h-3.5 w-3.5" />
              <span>Search docs</span>
              <kbd className="rounded border border-border bg-surface px-1 font-mono text-[10px]">⌘K</kbd>
            </div>
            <button className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground transition hover:bg-primary/5 hover:text-foreground xl:hidden" aria-label="Search">
              <Search className="h-4 w-4" />
            </button>
            <button className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground transition hover:bg-primary/5 hover:text-foreground" aria-label="Language">
              <Globe className="h-4 w-4" />
            </button>
            <a href="/login" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground whitespace-nowrap">
              Sign in
            </a>
            <a href="#demo" className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-elegant transition hover:bg-primary/90 whitespace-nowrap">
              Book Demo <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <button
            className="grid h-9 w-9 place-items-center rounded-md text-foreground lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open ? (
          <div className="border-t border-border bg-white lg:hidden">
            <div className="space-y-1 px-4 py-3">
              {links.map((l) => (
                <a
                  key={l.l}
                  href={l.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-primary/5"
                >
                  {l.l}
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </a>
              ))}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <a href="/login" className="rounded-lg border border-border px-3 py-2.5 text-center text-sm font-semibold text-foreground">
                  Sign in
                </a>
                <a href="#demo" className="rounded-lg bg-primary px-3 py-2.5 text-center text-sm font-semibold text-primary-foreground">
                  Book Demo
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </header>
    </>
  );
}

// ============================================================
// HERO
// ============================================================

function LiveIndicator({ label = "Live" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-success/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-success">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
      </span>
      {label}
    </span>
  );
}

function HeroDashboard() {
  return (
    <div className="relative">
      {/* halo */}
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[32px] bg-gradient-to-br from-accent/15 via-transparent to-primary/15 blur-2xl" />

      {/* Main window */}
      <div className="relative rounded-2xl border border-border bg-white/95 shadow-glow backdrop-blur">
        {/* Chrome */}
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-critical/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
            <span className="ml-3 hidden font-mono text-[11px] text-muted-foreground sm:inline">
              drishtiq.ai / executive-command
            </span>
          </div>
          <LiveIndicator />
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 border-b border-border bg-surface/60 px-4 py-2">
          <div className="flex items-center gap-1.5 overflow-x-auto text-[11px]">
            {["Overview", "Quality", "Warranty", "Suppliers", "Fleet"].map((t, i) => (
              <button
                key={t}
                className={`shrink-0 rounded-md px-2.5 py-1 font-semibold ${
                  i === 0 ? "bg-primary text-white" : "text-muted-foreground hover:bg-primary/5"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="hidden shrink-0 items-center gap-1.5 rounded-md border border-border bg-white px-2 py-1 text-[10px] text-muted-foreground sm:flex">
            <Command className="h-3 w-3" /> Ask copilot
          </div>
        </div>

        <div className="p-4 sm:p-5">
          {/* KPIs */}
          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
            {[
              { label: "Fleet Health", value: "98.4%", trend: "+2.1%", icon: Gauge, tone: "success", spark: [22, 24, 21, 26, 28, 27, 30, 32] },
              { label: "Open RCAs", value: "27", trend: "-14%", icon: AlertTriangle, tone: "success", spark: [40, 38, 36, 34, 30, 28, 26, 27] },
              { label: "Warranty Δ", value: "$1.2M", trend: "-9.4%", icon: TrendingUp, tone: "success", spark: [50, 46, 44, 42, 40, 36, 34, 33] },
              { label: "Plant OEE", value: "87.2", trend: "+3.6%", icon: Activity, tone: "success", spark: [70, 72, 74, 73, 78, 82, 85, 87] },
            ].map((k) => (
              <div key={k.label} className="rounded-xl border border-border bg-white p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {k.label}
                  </span>
                  <k.icon className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="mt-1 text-xl font-bold tracking-tight text-foreground">{k.value}</div>
                <div className="mt-0.5 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-success">{k.trend}</span>
                  <Sparkline data={k.spark} className="h-6 w-14 text-success" stroke="#16A34A" />
                </div>
              </div>
            ))}
          </div>

          {/* Chart + panel */}
          <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-5">
            <div className="rounded-xl border border-border bg-white p-4 lg:col-span-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-foreground">Failure Forecast · 90 days</div>
                  <div className="text-[11px] text-muted-foreground">Powertrain · Battery · Braking</div>
                </div>
                <div className="hidden items-center gap-2 text-[10px] text-muted-foreground sm:flex">
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-primary" /> Predicted</span>
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-accent" /> Actual</span>
                </div>
              </div>
              <svg viewBox="0 0 400 140" className="mt-3 w-full">
                <defs>
                  <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#0078D4" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#0078D4" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#00C2FF" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#00C2FF" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[20, 50, 80, 110].map((y) => (
                  <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="#E5E7EB" strokeDasharray="3 4" />
                ))}
                <path d="M0,90 C40,70 70,80 100,60 C140,35 180,55 220,45 C260,35 300,25 340,30 C370,33 390,25 400,20 L400,140 L0,140 Z" fill="url(#g1)" />
                <path d="M0,90 C40,70 70,80 100,60 C140,35 180,55 220,45 C260,35 300,25 340,30 C370,33 390,25 400,20" fill="none" stroke="#0078D4" strokeWidth="2" />
                <path d="M0,105 C40,95 70,100 100,85 C140,70 180,80 220,72 C260,64 300,55 340,58 L400,52" fill="none" stroke="#00C2FF" strokeWidth="2" strokeDasharray="4 3" />
                <path d="M0,105 C40,95 70,100 100,85 C140,70 180,80 220,72 C260,64 300,55 340,58 L400,52 L400,140 L0,140 Z" fill="url(#g2)" />
                {/* Anomaly marker */}
                <g>
                  <circle cx="220" cy="45" r="12" fill="#0078D4" opacity="0.15" className="animate-pulse-ring" />
                  <circle cx="220" cy="45" r="4" fill="#0078D4" />
                  <rect x="228" y="30" width="82" height="18" rx="4" fill="white" stroke="#E5E7EB" />
                  <text x="234" y="42" fontSize="9" fontFamily="Inter" fill="#111827" fontWeight="600">
                    NX-04 · lot 4821
                  </text>
                </g>
              </svg>
              <div className="mt-2 grid grid-cols-3 gap-2 text-[10px]">
                {[
                  { k: "MAPE", v: "3.2%" },
                  { k: "Recall", v: "0.94" },
                  { k: "Horizon", v: "90d" },
                ].map((s) => (
                  <div key={s.k} className="rounded-md border border-border bg-surface px-2 py-1.5">
                    <span className="uppercase tracking-wide text-muted-foreground">{s.k}</span>
                    <span className="ml-1 font-mono font-semibold text-foreground">{s.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Copilot */}
            <div className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-primary via-primary to-secondary p-4 text-white lg:col-span-2">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/30 blur-2xl" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="grid h-6 w-6 place-items-center rounded-md bg-white/15">
                      <Sparkles className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wide">AI Copilot</span>
                  </div>
                  <span className="rounded-md bg-white/15 px-2 py-0.5 font-mono text-[9px]">v4</span>
                </div>
                <div className="mt-3 text-[13px] leading-relaxed">
                  <span className="text-white/70">Insight ·</span> Battery pack failures on the{" "}
                  <span className="font-semibold">EX-7</span> line correlate with{" "}
                  <span className="font-semibold underline decoration-white/40">Supplier NX-04 · Lot 4821</span> — recommend containment.
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  <span className="rounded-md bg-white/15 px-1.5 py-0.5 text-[10px] font-semibold">Confidence 94%</span>
                  <span className="rounded-md bg-white/15 px-1.5 py-0.5 text-[10px] font-semibold">12 evidence</span>
                  <span className="rounded-md bg-white/15 px-1.5 py-0.5 text-[10px] font-semibold">−$1.2M</span>
                </div>
                <div className="mt-3 grid gap-1.5">
                  {[
                    { l: "Open investigation", i: Workflow },
                    { l: "Notify supplier", i: Radio },
                    { l: "Escalate to quality", i: ShieldAlert },
                  ].map((a) => (
                    <button key={a.l} className="flex items-center justify-between rounded-md bg-white/10 px-2.5 py-1.5 text-left text-[11px] font-medium transition hover:bg-white/20">
                      <span className="flex items-center gap-2"><a.i className="h-3 w-3" /> {a.l}</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-white p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-foreground">Root Cause Graph</div>
                <span className="rounded bg-critical/10 px-2 py-0.5 text-[10px] font-semibold text-critical">3 critical</span>
              </div>
              <svg viewBox="0 0 300 110" className="mt-2 w-full">
                {[
                  [40, 55, 110, 30], [40, 55, 110, 80],
                  [110, 30, 180, 20], [110, 30, 180, 60],
                  [110, 80, 180, 60], [110, 80, 180, 95],
                  [180, 20, 250, 40], [180, 60, 250, 40], [180, 95, 250, 80],
                ].map(([x1, y1, x2, y2], i) => (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0078D4" strokeOpacity="0.35" strokeWidth="1" />
                ))}
                {[
                  [40, 55, 8, "#0F4C81"], [110, 30, 5, "#0078D4"], [110, 80, 5, "#0078D4"],
                  [180, 20, 5, "#00C2FF"], [180, 60, 5, "#00C2FF"], [180, 95, 5, "#00C2FF"],
                  [250, 40, 6, "#DC2626"], [250, 80, 6, "#DC2626"],
                ].map(([x, y, r, c], i) => (
                  <circle key={i} cx={x as number} cy={y as number} r={r as number} fill={c as string} />
                ))}
              </svg>
            </div>

            <div className="rounded-xl border border-border bg-surface p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-foreground">Digital Twin · EX-7</div>
                <span className="rounded bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">Nominal</span>
              </div>
              <div className="mt-3 space-y-2">
                {[
                  { label: "Powertrain", v: 92 },
                  { label: "Battery pack", v: 74 },
                  { label: "Braking", v: 88 },
                  { label: "Telematics", v: 96 },
                ].map((r) => (
                  <div key={r.label}>
                    <div className="flex justify-between text-[11px] text-muted-foreground">
                      <span>{r.label}</span>
                      <span className="font-mono text-foreground">{r.v}%</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-border">
                      <div className="h-full rounded-full" style={{
                        width: `${r.v}%`,
                        background: r.v < 80 ? "#F59E0B" : "linear-gradient(90deg,#0F4C81,#00C2FF)",
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-14 sm:pt-20">
      {/* Backdrops */}
      <div className="mesh-bg absolute inset-0 -z-10" />
      <div className="absolute inset-0 -z-10 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_top,black_35%,transparent_78%)]" />
      <div className="noise absolute inset-0 -z-10 opacity-[0.35] mix-blend-multiply" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Award / trust bar */}
        <div className="animate-rise-in mx-auto mb-8 flex max-w-fit items-center gap-2 rounded-full border border-border bg-white/70 px-3 py-1.5 backdrop-blur">
          <div className="flex -space-x-1.5">
            {[
              "https://randomuser.me/api/portraits/men/32.jpg",
              "https://randomuser.me/api/portraits/women/44.jpg",
              "https://randomuser.me/api/portraits/men/68.jpg",
              "https://randomuser.me/api/portraits/women/68.jpg",
            ].map((src, i) => (
              <img key={i} src={src} alt="Enterprise User" className="h-6 w-6 rounded-full border-2 border-white object-cover" />
            ))}
          </div>
          <span className="text-[11px] font-medium text-foreground">Trusted by 40+ automotive enterprises</span>
          <span className="mx-1 h-3 w-px bg-border" />
          <span className="flex items-center gap-1 text-[11px] font-semibold text-primary">
            <Star className="h-3 w-3 fill-primary" /> 4.9 · G2 Enterprise
          </span>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8 lg:items-start">
          <div className="animate-rise-in lg:col-span-7">
            <Eyebrow icon={Sparkles}>New · AI Copilot for Automotive Quality</Eyebrow>
            <h1 className="mt-5 text-[38px] font-extrabold leading-[1.05] tracking-tighter text-foreground sm:text-6xl lg:text-[56px] xl:text-[64px] whitespace-pre-line lg:whitespace-normal">

              <span className="whitespace-nowrap">AI-Powered Automotive</span><br className="hidden sm:block" />{" "}
              <span className="relative inline-block">
                <span className="text-gradient-brand">Intelligence</span>
                <svg className="absolute -bottom-2 left-0 h-2 w-full" viewBox="0 0 200 8" preserveAspectRatio="none">
                  <path d="M2,6 C40,2 80,2 120,4 C160,6 190,3 198,2" fill="none" stroke="#00C2FF" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>{" "}
              Platform
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-[15px] leading-relaxed text-muted-foreground sm:text-lg">
              DRISHTIQ™ unifies vehicle telemetry, manufacturing intelligence, and supplier analytics
              into a single Snowflake-native platform — trusted by OEMs, Tier-1 suppliers, and
              government mobility organizations.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <PrimaryCTA>Book Enterprise Demo</PrimaryCTA>
              <SecondaryCTA>
                <span className="grid h-5 w-5 place-items-center rounded-full bg-primary/10 text-primary">
                  <Play className="h-2.5 w-2.5 fill-primary" />
                </span>
                Watch Product Tour · 2m
              </SecondaryCTA>
            </div>

            {/* micro proof strip */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6">
              {[
                { v: "-38%", l: "Warranty cost" },
                { v: "10×", l: "Faster RCA" },
                { v: "99.99%", l: "Uptime SLA" },
              ].map((m) => (
                <div key={m.l}>
                  <div className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{m.v}</div>
                  <div className="mt-1 text-[11px] font-medium text-muted-foreground">{m.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative h-[280px] sm:h-[400px] md:h-[480px] lg:h-[320px] xl:h-[380px] w-full mt-8 lg:mt-0">
            <div className="absolute left-1/2 lg:left-0 top-0 w-[900px] xl:w-[950px] origin-top lg:origin-top-left -translate-x-1/2 lg:translate-x-0 scale-[0.42] sm:scale-[0.65] md:scale-[0.85] lg:scale-[0.5] xl:scale-[0.6] transition-all duration-300">
              <HeroDashboard />
            </div>
          </div>
        </div>

        {/* compliance bar */}
        <div className="mt-24 mb-4 flex flex-col items-center justify-center gap-5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/80">
            Enterprise Grade Compliance & Trust
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {["SOC 2 Type II", "ISO 27001", "IATF 16949", "GDPR", "HIPAA-ready", "Snowflake Powered"].map((c) => (
              <div key={c} className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/60 px-4 py-2 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md hover:border-primary/20">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// LOGO CLOUD (marquee)
// ============================================================

function LogoCloud() {
  const items = [
    { icon: Car, label: "OEM AUTO" },
    { icon: Factory, label: "MOTORWORKS" },
    { icon: Truck, label: "FLEETPRIME" },
    { icon: Building2, label: "TIER-1 CORP" },
    { icon: Landmark, label: "GOV MOBILITY" },
    { icon: Boxes, label: "SMART FACTORY" },
    { icon: Cpu, label: "SILICON DRIVE" },
    { icon: Gauge, label: "TORQUE INC" },
    { icon: Radar, label: "SENTINEL" },
    { icon: Wrench, label: "ATLAS MFG" },
  ];
  return (
    <section className="border-y border-border bg-white py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          Powering the operating system of automotive enterprises
        </p>
        <div className="mt-8 flex gap-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <div className="flex shrink-0 animate-marquee items-center gap-14 pr-14">
            {[...items, ...items].map((it, i) => (
              <div key={i} className="flex shrink-0 items-center gap-2 text-muted-foreground/70">
                <it.icon className="h-5 w-5" />
                <span className="text-xs font-bold tracking-widest">{it.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PLATFORM ARCHITECTURE (bento)
// ============================================================

function Platform() {
  return (
    <section id="platform" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="One Unified Platform"
          eyebrowIcon={Layers}
          title={<>Six intelligence layers, one <span className="text-gradient-brand">enterprise system of record</span></>}
          subtitle="DRISHTIQ™ connects the vehicle, the factory, and the supply base — governed by Snowflake and orchestrated by AI agents."
        />

        {/* Architecture diagram */}
        <div className="relative mt-14 overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-white to-surface p-6 shadow-card sm:p-10">
          <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
          <div className="relative grid gap-4 lg:grid-cols-5">
            {/* left column — sources */}
            <div className="space-y-3 lg:col-span-1">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Data Sources</div>
              {[
                { i: Car, l: "Vehicle Telemetry" },
                { i: Factory, l: "MES / SCADA" },
                { i: Users, l: "Supplier Feeds" },
                { i: FileCheck2, l: "Warranty Claims" },
              ].map((s) => (
                <div key={s.l} className="flex items-center gap-2.5 rounded-lg border border-border bg-white px-3 py-2.5">
                  <div className="grid h-7 w-7 place-items-center rounded-md bg-primary/10 text-primary">
                    <s.i className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-foreground">{s.l}</span>
                </div>
              ))}
            </div>

            {/* middle — Snowflake core */}
            <div className="relative lg:col-span-3">
              <div className="rounded-2xl border border-primary/20 bg-white p-5 shadow-elegant">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-white">
                      <Database className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">Snowflake-native core</div>
                      <div className="text-[10px] text-muted-foreground">Governed · Zero-copy · Elastic</div>
                    </div>
                  </div>
                  <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-primary">v4.2</span>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {[
                    { i: BrainCircuit, l: "AI & Cortex Models" },
                    { i: Network, l: "Knowledge Graph" },
                    { i: Workflow, l: "Agent Orchestrator" },
                    { i: LineChart, l: "Analytics Engine" },
                    { i: ShieldCheck, l: "Policy & RBAC" },
                    { i: GitBranch, l: "Feature Store" },
                  ].map((m) => (
                    <div key={m.l} className="rounded-lg border border-border bg-surface p-2.5">
                      <div className="flex items-center gap-2">
                        <m.i className="h-3.5 w-3.5 text-primary" />
                        <span className="text-[11px] font-semibold text-foreground">{m.l}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex items-center justify-between rounded-lg bg-primary/[0.04] px-3 py-2">
                  <div className="flex items-center gap-2 text-[10px] font-medium text-muted-foreground">
                    <Radar className="h-3 w-3 text-primary" /> 128 models · 42 agents · streaming
                  </div>
                  <LiveIndicator label="Streaming" />
                </div>
              </div>

              {/* connecting lines (decorative) */}
              <svg className="pointer-events-none absolute -left-6 top-1/2 hidden h-40 w-6 -translate-y-1/2 lg:block" viewBox="0 0 24 160">
                {[20, 60, 100, 140].map((y) => (
                  <path key={y} d={`M0,${y} C12,${y} 12,80 24,80`} fill="none" stroke="#0078D4" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="3 3" />
                ))}
              </svg>
              <svg className="pointer-events-none absolute -right-6 top-1/2 hidden h-40 w-6 -translate-y-1/2 lg:block" viewBox="0 0 24 160">
                {[30, 80, 130].map((y) => (
                  <path key={y} d={`M0,80 C12,80 12,${y} 24,${y}`} fill="none" stroke="#0078D4" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="3 3" />
                ))}
              </svg>
            </div>

            {/* right column — surfaces */}
            <div className="space-y-3 lg:col-span-1">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Delivery Surfaces</div>
              {[
                { i: LineChart, l: "Executive Cockpit" },
                { i: Bot, l: "AI Copilot" },
                { i: Terminal, l: "API & SDKs" },
                { i: Radio, l: "Alerts & Webhooks" },
              ].map((s) => (
                <div key={s.l} className="flex items-center gap-2.5 rounded-lg border border-border bg-white px-3 py-2.5">
                  <div className="grid h-7 w-7 place-items-center rounded-md bg-accent/15 text-primary">
                    <s.i className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-foreground">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Layer cards */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { icon: Car, label: "Vehicle Telemetry", desc: "Ingest and normalize live sensor + fleet signals at millions of msgs/s." },
            { icon: Factory, label: "Manufacturing", desc: "Line-level OEE, scrap, and quality gates unified across plants." },
            { icon: Users, label: "Supplier", desc: "Lot-level traceability, scorecards, and dynamic risk profiles." },
          ].map((l, i) => (
            <div key={l.label} className="hover-lift group relative overflow-hidden rounded-2xl border border-border bg-white p-6">
              <div className="absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full bg-primary/5 blur-2xl transition group-hover:bg-accent/20" />
              <div className="flex items-center justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-elegant">
                  <l.icon className="h-5 w-5" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Layer 0{i + 1}
                </span>
              </div>
              <div className="mt-5 text-lg font-semibold text-foreground">{l.label}</div>
              <p className="mt-1 text-sm text-muted-foreground">{l.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FEATURES BENTO
// ============================================================

function Features() {
  return (
    <section id="solutions" className="bg-surface py-24 sm:py-32 relative overflow-hidden">
      {/* Decorative background blur (kept for page background, not cards) */}
      <div className="absolute top-1/4 left-0 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full bg-accent/10 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Core Capabilities"
          eyebrowIcon={Boxes}
          title={<>Every capability an <span className="text-gradient-brand">automotive enterprise</span> needs</>}
          subtitle="Purpose-built modules for quality, warranty, manufacturing, and supplier intelligence — deployed together or independently."
        />

        {/* 6-column grid: 4+2, 4+2, 3+3 */}
        <div className="mt-16 grid gap-5 lg:grid-cols-6 lg:grid-rows-[minmax(280px,auto)_minmax(280px,auto)_minmax(240px,auto)]">
          
          {/* Large: AI Root Cause (4 cols, 2 rows) */}
          <div className="hover-lift group relative overflow-hidden rounded-3xl border border-border bg-white p-8 lg:col-span-4 lg:row-span-2 shadow-card transition-all duration-500 hover:border-primary/30">
            <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_bottom_right,black,transparent_70%)]" />
            
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <Eyebrow icon={Network}>AI Root Cause</Eyebrow>
                <h3 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                  Reasoning across evidence<br className="hidden sm:block" /> — <span className="text-muted-foreground font-medium">not just dashboards</span>
                </h3>
                <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
                  Graph reasoning correlates vehicle, factory, and supplier events into a single explainable investigation. Avoid endless dashboard hunting.
                </p>
              </div>

              {/* Removed glass effect (backdrop-blur-sm bg-surface/50), using solid bg-surface */}
              <div className="relative mt-8 rounded-2xl border border-border bg-surface p-6">
                {/* Changed h-full to h-auto to prevent clipping */}
                <svg viewBox="0 0 740 280" className="w-full h-auto drop-shadow-md">
                  <defs>
                    <filter id="glow-strong" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0F4C81" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#00C2FF" stopOpacity="0.7" />
                    </linearGradient>
                    <linearGradient id="edge-alert" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0078D4" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0.8" />
                    </linearGradient>
                    <marker id="arr-alert" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto">
                      <path d="M0 0 L10 5 L0 10 z" fill="#ef4444" opacity="0.8" />
                    </marker>
                    <marker id="arr-norm" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto">
                      <path d="M0 0 L10 5 L0 10 z" fill="#00C2FF" opacity="0.8" />
                    </marker>
                  </defs>
                  
                  {/* Edges */}
                  {[
                    // claim -> vehicle, line
                    { x1: 150, y1: 140, x2: 230, y2: 70, a: false },
                    { x1: 150, y1: 140, x2: 230, y2: 210, a: false },
                    // vehicle -> sensor, part
                    { x1: 330, y1: 70, x2: 410, y2: 40, a: false },
                    { x1: 330, y1: 70, x2: 410, y2: 100, a: false },
                    // line -> op, lot
                    { x1: 330, y1: 210, x2: 410, y2: 180, a: false },
                    { x1: 330, y1: 210, x2: 410, y2: 240, a: false },
                    // sensor, part -> defect
                    { x1: 510, y1: 40, x2: 590, y2: 70, a: true },
                    { x1: 510, y1: 100, x2: 590, y2: 70, a: true },
                    // op, lot -> drift
                    { x1: 510, y1: 180, x2: 590, y2: 210, a: true },
                    { x1: 510, y1: 240, x2: 590, y2: 210, a: true },
                  ].map((e, i) => (
                    <path 
                      key={i} 
                      d={`M ${e.x1} ${e.y1} C ${e.x1 + 35} ${e.y1}, ${e.x2 - 35} ${e.y2}, ${e.x2} ${e.y2}`} 
                      fill="none" 
                      stroke={e.a ? "url(#edge-alert)" : "url(#edge-gradient)"} 
                      strokeWidth="2.5" 
                      markerEnd={e.a ? "url(#arr-alert)" : "url(#arr-norm)"}
                      className="animate-pulse" 
                      style={{ animationDelay: `${i * 0.12}s` }} 
                    />
                  ))}
                  
                  {/* Nodes */}
                  {[
                    { x: 100, y: 140, type: 'source', l: "Claim #892" },
                    { x: 280, y: 70, type: 'node', l: "Vehicle" },
                    { x: 280, y: 210, type: 'node', l: "Line A" },
                    { x: 460, y: 40, type: 'node', l: "Sensor Data" },
                    { x: 460, y: 100, type: 'node', l: "Part SN" },
                    { x: 460, y: 180, type: 'node', l: "Op Torque" },
                    { x: 460, y: 240, type: 'node', l: "Supplier Lot" },
                    { x: 640, y: 70, type: 'alert', l: "Defect: NX-04" },
                    { x: 640, y: 210, type: 'alert', l: "Torque Drift" },
                  ].map((n, i) => (
                    <g key={i} className="transition-transform duration-500 hover:-translate-y-1.5 cursor-pointer">
                      {n.type === 'alert' && (
                        <rect x={n.x - 56} y={n.y - 18} width="112" height="36" rx="18" fill="#ef4444" opacity="0.15" filter="url(#glow-strong)" className="animate-pulse-ring" />
                      )}
                      <rect 
                        x={n.x - 50} y={n.y - 15} width="100" height="30" rx="15" 
                        fill={n.type === 'source' ? '#0F4C81' : n.type === 'alert' ? '#fef2f2' : '#ffffff'} 
                        stroke={n.type === 'alert' ? '#ef4444' : '#cbd5e1'} 
                        strokeWidth={n.type === 'alert' ? "1.5" : "1"}
                        filter="drop-shadow(0 4px 6px rgba(0,0,0,0.06))"
                      />
                      <text 
                        x={n.x} y={n.y + 1} 
                        textAnchor="middle" 
                        dominantBaseline="central" 
                        fontSize="11.5" 
                        fill={n.type === 'source' ? '#ffffff' : n.type === 'alert' ? '#b91c1c' : '#334155'} 
                        fontWeight="600" 
                        fontFamily="Inter, sans-serif"
                      >
                        {n.l}
                      </text>
                    </g>
                  ))}
                </svg>
                <div className="mt-2 flex flex-wrap gap-2 text-[10px]">
                  {["Evidence trail", "98% Confidence", "Explainable AI", "Auditable"].map((t) => (
                    <span key={t} className="rounded-md border border-border bg-white px-2.5 py-1 font-mono font-medium text-muted-foreground shadow-sm">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Predictive Maintenance (2 cols, 1 row) */}
          <div className="hover-lift group relative overflow-hidden rounded-3xl border border-border bg-white p-6 lg:col-span-2 shadow-card transition-all duration-500 hover:border-primary/30">
            <div className="relative z-10 flex h-full flex-col">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-primary">
                    <Wrench className="h-3.5 w-3.5" /> Predict
                  </div>
                  <h3 className="mt-2 text-lg font-bold tracking-tight text-foreground leading-tight">Forecast failures</h3>
                  <p className="mt-1 text-xs text-muted-foreground">Prescriptive service scheduling.</p>
                </div>
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface text-primary border border-border transition-transform duration-300 group-hover:rotate-12">
                  <TrendingUp className="h-4 w-4" />
                </div>
              </div>
              
              <div className="mt-auto flex items-end gap-1.5 h-24 pt-4">
                {[30, 42, 38, 55, 60, 48, 70, 62, 82, 75, 90, 85].map((h, i) => (
                  <div key={i} className="relative flex-1 rounded-t-md group/bar" style={{ height: `${h}%`, background: "var(--gradient-brand)" }}>
                    {/* Removed glass effect from bars */}
                    <div className="absolute inset-0 bg-white opacity-0 transition-opacity group-hover/bar:opacity-20 rounded-t-md" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Copilot (2 cols, 1 row) */}
          <div className="hover-lift group relative overflow-hidden rounded-3xl border border-border bg-white p-6 lg:col-span-2 shadow-card transition-all duration-500 hover:border-primary/30">
            {/* Removed semi-transparent bg overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiAvPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjZTJlNThjIiAvPgo8L3N2Zz4=')] opacity-50" />
            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
              <div className="relative mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-surface border border-border shadow-sm">
                <Bot className="h-6 w-6 text-primary animate-float-slow" />
              </div>
              <h3 className="text-xl font-bold text-foreground">AI Copilot</h3>
              <p className="mt-2 text-sm text-muted-foreground px-2">
                Ask any question in natural language — get evidence-backed answers in seconds.
              </p>
            </div>
          </div>

          {/* Warranty (3 cols, 1 row) */}
          <div className="hover-lift group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F4C81] via-[#0b3861] to-[#0078D4] p-8 text-white lg:col-span-3 shadow-elegant transition-all duration-500 hover:shadow-glow">
            <div className="absolute inset-0 noise opacity-20 mix-blend-overlay" />
            <div className="relative z-10 flex h-full items-center justify-between gap-6">
              <div>
                {/* Removed backdrop-blur-md, made it solid */}
                <div className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 w-max border border-white/10">
                  <FileCheck2 className="h-4 w-4 text-[#00C2FF]" />
                  <span className="text-xs font-semibold tracking-wide text-white">Warranty Analytics</span>
                </div>
                <h3 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  <span className="text-[#00C2FF] animate-pulse">−$14.2M</span>
                </h3>
                <div className="mt-1 text-sm font-medium text-white/80">Annualized exposure reduction</div>
              </div>
              <div className="hidden sm:block">
                <p className="max-w-xs text-sm leading-relaxed text-white/70">
                  Claims decomposition and financial exposure modeling powered by Snowflake's massive compute.
                </p>
              </div>
            </div>
          </div>

          {/* Knowledge Graph (3 cols, 1 row) */}
          <div className="hover-lift group relative overflow-hidden rounded-3xl border border-border bg-white p-8 lg:col-span-3 shadow-card transition-all duration-500 hover:border-primary/30">
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="relative z-10 flex h-full items-center gap-6">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-surface border border-border transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                <GitBranch className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Semantic Knowledge Graph</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Connect the dots across vehicles, parts, suppliers, and manufacturing events into one unified data model.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ============================================================
// INDUSTRIES (tabbed)
// ============================================================

function Industries() {
  const industries = [
    {
      k: "OEM",
      icon: Car,
      title: "Global automotive OEMs",
      desc: "Unified quality across every platform, plant, and model year — from EV to hybrid to ICE.",
      bullets: ["Portfolio-wide warranty exposure", "Cross-plant quality benchmarking", "Executive cockpit for CQO/COO"],
      stat: { v: "38%", l: "warranty cost reduction" },
    },
    {
      k: "Tier-1",
      icon: Building2,
      title: "Tier-1 suppliers",
      desc: "Field, factory, and supply-chain signals in one governed workspace.",
      bullets: ["Lot-level traceability", "Customer PPM scorecards", "Real-time containment workflows"],
      stat: { v: "10×", l: "faster containment" },
    },
    {
      k: "Fleet",
      icon: Truck,
      title: "Fleet operators",
      desc: "Predictive uptime for commercial and passenger fleets, at national scale.",
      bullets: ["Vehicle health scoring", "Predictive maintenance windows", "Cost-per-mile analytics"],
      stat: { v: "27%", l: "downtime reduction" },
    },
    {
      k: "Gov",
      icon: Landmark,
      title: "Government mobility",
      desc: "Sovereign deployment for national mobility, defense fleets, and smart-city programs.",
      bullets: ["Air-gapped option", "Regional data residency", "Compliance packs (FedRAMP path)"],
      stat: { v: "100%", l: "on-territory processing" },
    },
  ];
  const [active, setActive] = useState(0);
  const a = industries[active];

  return (
    <section id="industries" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Industries"
          eyebrowIcon={Globe2}
          title="Built for the enterprises that build mobility"
          subtitle="One platform, tuned to the workflows of OEMs, suppliers, fleets, and public agencies."
        />

        <div className="mt-14 overflow-hidden rounded-3xl border border-border bg-white shadow-card">
          <div className="flex overflow-x-auto border-b border-border">
            {industries.map((i, idx) => (
              <button
                key={i.k}
                onClick={() => setActive(idx)}
                className={`relative flex shrink-0 items-center gap-2 px-5 py-4 text-sm font-semibold transition ${
                  idx === active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <i.icon className="h-4 w-4" />
                <span>{i.title.split(" ").slice(-2).join(" ")}</span>
                {idx === active ? (
                  <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-gradient-to-r from-primary to-accent" />
                ) : null}
              </button>
            ))}
          </div>

          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary">
                <a.icon className="h-3.5 w-3.5" /> {a.k}
              </div>
              <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{a.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{a.desc}</p>
              <ul className="mt-6 space-y-2.5">
                {a.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {b}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex gap-3">
                <PrimaryCTA>See it live</PrimaryCTA>
                <SecondaryCTA>Read case study</SecondaryCTA>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-gradient-to-br from-surface to-white p-6">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Outcome</div>
                <LiveIndicator label="In production" />
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-bold tracking-tight text-gradient-brand sm:text-6xl">{a.stat.v}</span>
                <span className="text-sm text-muted-foreground">{a.stat.l}</span>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-2">
                {["Deployed", "Governed", "Audited"].map((c) => (
                  <div key={c} className="rounded-lg border border-border bg-white p-3 text-center">
                    <CheckCircle2 className="mx-auto h-4 w-4 text-primary" />
                    <div className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{c}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-lg border border-border bg-white p-4">
                <div className="text-xs font-semibold text-foreground">Reference architecture</div>
                <div className="mt-2 flex items-center gap-1.5 overflow-x-auto text-[10px] text-muted-foreground">
                  {["Sources", "Ingest", "Snowflake", "AI Agents", "Cockpit"].map((n, i) => (
                    <div key={n} className="flex shrink-0 items-center gap-1.5">
                      <span className={`rounded-md border border-border px-2 py-1 font-semibold ${i === 3 ? "bg-primary text-white" : "bg-surface"}`}>{n}</span>
                      {i < 4 ? <ChevronRight className="h-3 w-3 text-muted-foreground" /> : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// AI AGENTS
// ============================================================

function AIAgents() {
  const agents = [
    { name: "Quality Monitoring Agent", desc: "Detects anomalies across lines and vehicles in real-time.", tag: "24/7 · autonomous", icon: Radar },
    { name: "Root Cause Agent", desc: "Correlates signals across supplier, factory, and field data.", tag: "graph reasoning", icon: Network },
    { name: "Predictive Maintenance Agent", desc: "Forecasts failures and schedules service proactively.", tag: "prescriptive", icon: Wrench },
    { name: "Executive Copilot", desc: "Natural-language answers over your entire enterprise data.", tag: "conversational", icon: Bot },
  ];
  const [active, setActive] = useState(1);

  return (
    <section id="ai-agents" className="bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="AI Agents"
          eyebrowIcon={BrainCircuit}
          title={<>A team of AI agents working alongside your engineers</>}
          subtitle="Every agent is transparent — with confidence scores, evidence trails, and workflow automation built in."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          <div className="space-y-3 lg:col-span-2">
            {agents.map((a, i) => (
              <button
                key={a.name}
                onClick={() => setActive(i)}
                className={`group flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
                  i === active
                    ? "border-primary/30 bg-white shadow-elegant"
                    : "border-border bg-white/70 hover:border-primary/20 hover:bg-white"
                }`}
              >
                <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${
                  i === active ? "bg-primary text-white" : "bg-primary/10 text-primary"
                }`}>
                  <a.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="truncate text-sm font-semibold text-foreground">{a.name}</div>
                    <span className="hidden shrink-0 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold text-primary sm:inline">{a.tag}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{a.desc}</p>
                </div>
                <ArrowUpRight className={`h-4 w-4 shrink-0 transition ${i === active ? "text-primary" : "text-muted-foreground"}`} />
              </button>
            ))}
          </div>

          {/* Conversation UI */}
          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-elegant">
              <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="grid h-7 w-7 place-items-center rounded-md bg-primary text-white">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{agents[active].name}</div>
                    <div className="text-[10px] text-muted-foreground">Session · executive · encrypted</div>
                  </div>
                </div>
                <div className="hidden items-center gap-2 sm:flex">
                  <span className="rounded-md border border-border bg-white px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">reasoning v4</span>
                  <LiveIndicator label="Online" />
                </div>
              </div>
              <div className="space-y-4 p-5">
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                  Why are warranty claims for the EX-7 platform up this quarter?
                </div>
                <div className="max-w-[92%] rounded-2xl rounded-tl-sm border border-border bg-surface px-4 py-3">
                  <p className="text-sm leading-relaxed text-foreground">
                    Claims are up <span className="font-semibold text-critical">18.4%</span> QoQ, driven primarily by{" "}
                    <span className="font-semibold">battery pack</span> failures. Signals correlate with{" "}
                    <span className="font-semibold">Supplier NX-04, lots 4820–4823</span>, where cell impedance drift exceeds spec after ~1,200 charge cycles.
                  </p>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {[
                      { k: "Confidence", v: "94%" },
                      { k: "Evidence", v: "12 sources" },
                      { k: "Impact", v: "$1.2M / qtr" },
                    ].map((s) => (
                      <div key={s.k} className="rounded-lg border border-border bg-white p-2">
                        <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{s.k}</div>
                        <div className="text-sm font-semibold text-foreground">{s.v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90">Open investigation</button>
                    <button className="rounded-md border border-border bg-white px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-primary/5">Notify supplier</button>
                    <button className="rounded-md border border-border bg-white px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-primary/5">Export brief</button>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-border bg-white p-2 pl-4">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <input
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    placeholder="Ask about a plant, model, supplier, or claim…"
                  />
                  <button className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TWIN & OPS
// ============================================================

function TwinAndOps() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Digital Twin */}
        <div className="rounded-2xl border border-border bg-white p-8 shadow-card">
          <Eyebrow icon={Layers}>Digital Twin</Eyebrow>
          <h3 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">A live twin of every vehicle, plant, and part</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Explore the vehicle, engine, sensors, and manufacturing operations in a single interactive model — with quality events overlaid in real time.
          </p>
          <div className="relative mt-6 h-64 overflow-hidden rounded-xl border border-border bg-gradient-to-br from-surface to-white p-4">
            <div className="absolute inset-0 bg-dotted opacity-60" />
            <svg viewBox="0 0 320 200" className="relative h-full w-full">
              <g fill="none" stroke="#0F4C81" strokeWidth="1.5">
                <path d="M40 130 Q60 90 110 85 L200 82 Q250 82 275 115 L285 130 L285 150 L40 150 Z" />
                <circle cx="85" cy="150" r="16" fill="white" />
                <circle cx="240" cy="150" r="16" fill="white" />
                <circle cx="85" cy="150" r="7" fill="#0F4C81" />
                <circle cx="240" cy="150" r="7" fill="#0F4C81" />
                <path d="M115 85 L130 108 L215 108 L200 82" />
              </g>
              {[
                { x: 130, y: 130 }, { x: 200, y: 108 }, { x: 85, y: 150 }, { x: 260, y: 120 },
              ].map((h, i) => (
                <g key={i}>
                  <circle cx={h.x} cy={h.y} r="10" fill="#0078D4" opacity="0.15" className="animate-pulse-ring" />
                  <circle cx={h.x} cy={h.y} r="4" fill="#0078D4" />
                </g>
              ))}
            </svg>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-[11px]">
            {[
              { k: "Twins", v: "1,284" },
              { k: "Signals/s", v: "2.4M" },
              { k: "Coverage", v: "98%" },
            ].map((s) => (
              <div key={s.k} className="rounded-lg border border-border bg-surface p-2.5 text-center">
                <div className="font-mono text-sm font-semibold text-foreground">{s.v}</div>
                <div className="text-muted-foreground">{s.k}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Manufacturing */}
        <div className="rounded-2xl border border-border bg-white p-8 shadow-card">
          <Eyebrow icon={Factory}>Manufacturing Intelligence</Eyebrow>
          <h3 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">Line-level insight, plant-wide command</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Instrument every station, cell, and shift with real-time OEE, scrap analysis, and quality-gate enforcement.
          </p>
          <div className="mt-6 rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-semibold text-foreground">
                <span className="h-2 w-2 rounded-full bg-success" /> Chennai · Line 3
              </div>
              <div className="font-mono text-muted-foreground">shift 2 · 12:42</div>
            </div>
            <div className="mt-3 flex items-end gap-1 h-32">
              {Array.from({ length: 24 }).map((_, i) => {
                const h = 30 + ((i * 17) % 65);
                return (
                  <div key={i} className="flex-1 rounded-t-sm" style={{
                    height: `${h}%`,
                    background: i === 15 ? "#DC2626" : "linear-gradient(180deg,#0078D4,#00C2FF)",
                    opacity: i === 15 ? 1 : 0.85,
                  }} />
                );
              })}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
              {[
                { k: "OEE", v: "87.2%" }, { k: "Throughput", v: "412/h" }, { k: "Scrap", v: "1.2%" },
              ].map((s) => (
                <div key={s.k} className="rounded-md border border-border bg-white p-2 text-center">
                  <div className="text-sm font-bold text-foreground">{s.v}</div>
                  <div className="text-muted-foreground">{s.k}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Supplier Intelligence — full width */}
      <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-white p-6 shadow-card sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow icon={Users}>Supplier Intelligence</Eyebrow>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Every supplier, every lot, one scorecard</h3>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="rounded-md border border-border bg-surface px-2 py-1 font-mono text-muted-foreground">Q3 2026</span>
              <span className="rounded-md border border-border bg-surface px-2 py-1 font-mono text-muted-foreground">Global</span>
            </div>
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-[11px] uppercase tracking-widest text-muted-foreground">
                  <th className="py-2 pr-4 font-semibold">Supplier</th>
                  <th className="py-2 pr-4 font-semibold">Category</th>
                  <th className="py-2 pr-4 font-semibold">Score</th>
                  <th className="py-2 pr-4 font-semibold">PPM</th>
                  <th className="py-2 pr-4 font-semibold">Trend</th>
                  <th className="py-2 pr-4 font-semibold">Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { n: "NX-04 Battery Systems", cat: "Powertrain", s: 62, ppm: 214, tr: [70, 68, 65, 63, 62, 61, 60, 62], risk: "critical" },
                  { n: "Aegis Metalworks", cat: "Chassis", s: 91, ppm: 32, tr: [80, 82, 85, 88, 89, 90, 91, 91], risk: "success" },
                  { n: "Orion Electronics", cat: "Electronics", s: 78, ppm: 88, tr: [72, 74, 75, 76, 78, 77, 78, 78], risk: "warning" },
                  { n: "Kairos Composites", cat: "Body", s: 88, ppm: 41, tr: [82, 83, 85, 86, 87, 87, 88, 88], risk: "success" },
                ].map((r) => (
                  <tr key={r.n} className="text-sm">
                    <td className="py-3 pr-4 font-semibold text-foreground">{r.n}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{r.cat}</td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-border">
                          <div className="h-full rounded-full" style={{
                            width: `${r.s}%`,
                            background: r.s < 70 ? "#DC2626" : r.s < 85 ? "#F59E0B" : "linear-gradient(90deg,#0F4C81,#00C2FF)",
                          }} />
                        </div>
                        <span className="font-mono text-xs text-foreground">{r.s}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4 font-mono text-muted-foreground">{r.ppm}</td>
                    <td className="py-3 pr-4">
                      <Sparkline data={r.tr} className="h-6 w-20" stroke={r.risk === "critical" ? "#DC2626" : r.risk === "warning" ? "#F59E0B" : "#0078D4"} />
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        r.risk === "success" ? "bg-success/10 text-success" :
                        r.risk === "warning" ? "bg-warning/10 text-warning" : "bg-critical/10 text-critical"
                      }`}>
                        {r.risk === "success" ? "Low" : r.risk === "warning" ? "Medium" : "High"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// IMPACT (dark band)
// ============================================================

function Impact() {
  const items = [
    { v: "-38%", l: "Warranty cost" },
    { v: "+22%", l: "Manufacturing efficiency" },
    { v: "-64%", l: "Time to root cause" },
    { v: "+18%", l: "First-time quality" },
    { v: "-27%", l: "Unplanned downtime" },
    { v: "+31%", l: "Supplier performance" },
  ];
  return (
    <section className="relative overflow-hidden bg-primary py-24 text-white sm:py-32">
      <div className="absolute inset-0 bg-dotted opacity-10" />
      <div className="absolute -top-32 left-1/2 h-96 w-[900px] -translate-x-1/2 rounded-full bg-accent/25 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5 lg:items-end">
          <div className="lg:col-span-3">
            <Eyebrow icon={Zap}>Business Impact</Eyebrow>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Measurable outcomes for the enterprise
            </h2>
            <p className="mt-4 max-w-2xl text-white/75">
              Real results reported by DRISHTIQ™ customers across OEM, Tier-1, and government mobility deployments — validated by third-party audit.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 lg:col-span-2 lg:justify-end">
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest">Peer-reviewed</span>
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest">Independently audited</span>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/20 bg-white/20 md:grid-cols-3 shadow-2xl">
          {items.map((i) => (
            <div key={i.l} className="group relative bg-primary/95 p-6 transition-colors duration-300 sm:p-8 hover:bg-primary">
              <div className="relative text-5xl font-semibold tracking-tight sm:text-6xl transition-transform duration-500 group-hover:-translate-y-1">
                <span className="text-white">
                  {i.v}
                </span>
              </div>
              <div className="relative mt-3 text-sm font-medium text-white/70 transition-colors group-hover:text-white/90">{i.l}</div>
              <ArrowUpRight className="absolute right-6 top-6 h-5 w-5 text-white/20 transition-all duration-300 group-hover:text-white/60 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SECURITY
// ============================================================

function Security() {
  const items = [
    { icon: KeyRound, t: "RBAC & SSO", d: "SAML, OIDC, SCIM, granular role management." },
    { icon: Lock, t: "Encryption everywhere", d: "AES-256 at rest, TLS 1.3 in transit, BYOK." },
    { icon: ScrollText, t: "Immutable audit logs", d: "Full audit trail across users and agents." },
    { icon: Cloud, t: "Snowflake-native", d: "Data never leaves your governed data cloud." },
    { icon: Landmark, t: "Compliance", d: "SOC 2, ISO 27001, GDPR, IATF 16949." },
    { icon: Fingerprint, t: "Zero-trust architecture", d: "Signed identities, mTLS between services." },
  ];
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow icon={ShieldCheck}>Enterprise Security</Eyebrow>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Built for the most regulated automotive environments
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
              Zero-trust architecture, Snowflake-native governance, and enterprise-grade controls end-to-end.
              Deploy in your VPC, your Snowflake account, or fully sovereign.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["SOC 2", "ISO 27001", "IATF 16949", "GDPR", "HIPAA", "FedRAMP path"].map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-semibold text-foreground shadow-card">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success" /> {c}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {items.map((i) => (
              <div key={i.t} className="hover-lift rounded-2xl border border-border bg-white p-5">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <i.icon className="h-5 w-5" />
                </div>
                <div className="mt-4 font-semibold text-foreground">{i.t}</div>
                <p className="mt-1 text-sm text-muted-foreground">{i.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TECH STACK
// ============================================================

function TechStack() {
  const stack = [
    { n: "Snowflake", i: Database },
    { n: "Cortex AI", i: BrainCircuit },
    { n: "Python", i: Code2 },
    { n: "FastAPI", i: Server },
    { n: "React", i: Cpu },
    { n: "Next.js", i: Cpu },
    { n: "Tailwind", i: Layers },
    { n: "Docker", i: Boxes },
    { n: "Kubernetes", i: Workflow },
    { n: "Cloud", i: Cloud },
  ];
  return (
    <section id="resources" className="border-y border-border bg-surface py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <Eyebrow icon={Terminal}>Built on the best of the enterprise stack</Eyebrow>
            <h3 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">Modern, portable, and cloud-agnostic</h3>
          </div>
          <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            Read architecture docs <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {stack.map((s) => (
            <div key={s.n} className="group flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3 transition hover:border-primary/30 hover:shadow-elegant">
              <div className="grid h-8 w-8 place-items-center rounded-md bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                <s.i className="h-4 w-4" />
              </div>
              <span className="text-sm font-semibold text-foreground">{s.n}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TESTIMONIALS
// ============================================================

function Testimonials() {
  const t = [
    {
      q: "DRISHTIQ™ collapsed our root-cause investigation from weeks to hours. The AI copilot is now a standing member of our quality council.",
      n: "Anika Rao",
      r: "VP Quality · Global OEM",
      m: [{ v: "72%", l: "faster RCA" }, { v: "$14M", l: "warranty saved" }],
    },
    {
      q: "Warranty exposure dropped nine figures in the first year. The supplier scorecards changed how we negotiate contracts.",
      n: "Marcus Feld",
      r: "Chief Procurement Officer · Tier-1 Supplier",
      m: [{ v: "3.2×", l: "supplier accountability" }, { v: "-41%", l: "PPM" }],
    },
    {
      q: "For the first time we have one system of record across every plant and every model. That alone is transformational.",
      n: "Priya Menon",
      r: "COO · National Mobility Agency",
      m: [{ v: "100%", l: "on-territory" }, { v: "99.99%", l: "uptime" }],
    },
  ];
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Voices from the enterprise" eyebrowIcon={Star} title="Trusted by leaders at the top of automotive" />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {t.map((x) => (
            <figure key={x.n} className="hover-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white p-7 shadow-card">
              <div className="flex items-center gap-1 text-warning">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-warning" />)}
              </div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground">“{x.q}”</blockquote>
              <div className="mt-6 grid grid-cols-2 gap-2">
                {x.m.map((k) => (
                  <div key={k.l} className="rounded-lg border border-border bg-surface p-3">
                    <div className="text-lg font-bold text-gradient-brand">{k.v}</div>
                    <div className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">{k.l}</div>
                  </div>
                ))}
              </div>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-bold text-white">
                  {x.n.split(" ").map((s) => s[0]).join("")}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{x.n}</div>
                  <div className="text-xs text-muted-foreground">{x.r}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PRICING
// ============================================================

function Pricing() {
  const tiers = [
    {
      name: "Professional",
      price: "$4,900",
      per: "/mo",
      desc: "For mid-market suppliers scaling quality operations.",
      features: ["Up to 25 users", "Manufacturing + Supplier modules", "AI Copilot (100 seats)", "Standard support"],
      cta: "Start Free Trial",
      featured: false,
    },
    {
      name: "Enterprise",
      price: "Custom",
      per: "",
      desc: "For OEMs and multi-plant Tier-1 organizations.",
      features: ["Unlimited users", "All modules + Digital Twin", "Dedicated AI agents", "Snowflake-native deployment", "24/7 premium support"],
      cta: "Book Enterprise Demo",
      featured: true,
    },
    {
      name: "Government",
      price: "Custom",
      per: "",
      desc: "For national mobility, defense, and smart cities.",
      features: ["Sovereign deployment", "Air-gapped option", "Compliance packs (FedRAMP path)", "Dedicated success team"],
      cta: "Contact Sales",
      featured: false,
    },
  ];
  return (
    <section id="pricing" className="bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Pricing"
          eyebrowIcon={Circle}
          title="Enterprise-ready plans, transparent scaling"
          subtitle="Pilot a single line or deploy across every plant, model, and supplier."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                t.featured
                  ? "border-primary bg-gradient-to-br from-primary to-secondary text-white shadow-glow"
                  : "border-border bg-white shadow-card"
              }`}
            >
              {t.featured ? (
                <span className="absolute -top-3 left-8 rounded-full bg-accent px-3 py-1 text-[11px] font-bold text-primary shadow-elegant">
                  MOST POPULAR
                </span>
              ) : null}
              <div className={`text-sm font-semibold ${t.featured ? "text-white/85" : "text-primary"}`}>{t.name}</div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight">{t.price}</span>
                <span className={`text-sm ${t.featured ? "text-white/70" : "text-muted-foreground"}`}>{t.per}</span>
              </div>
              <p className={`mt-2 text-sm ${t.featured ? "text-white/80" : "text-muted-foreground"}`}>{t.desc}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${t.featured ? "text-accent" : "text-primary"}`} />
                    <span className={t.featured ? "text-white/90" : "text-foreground"}>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#demo"
                className={`mt-8 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition ${
                  t.featured
                    ? "bg-white text-primary hover:bg-white/90"
                    : "border border-border bg-white text-foreground hover:border-primary/40 hover:bg-primary/5"
                }`}
              >
                {t.cta} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FAQ
// ============================================================

function FAQ() {
  const items = [
    { q: "How is DRISHTIQ™ deployed?", a: "Snowflake-native by default, with private or sovereign cloud options for regulated customers. Deployments typically go live in 6–10 weeks." },
    { q: "Do you require our vehicle telemetry to leave our environment?", a: "No. DRISHTIQ™ runs inside your Snowflake account and never exfiltrates raw telemetry or PII." },
    { q: "How do AI agents make decisions?", a: "Every recommendation includes confidence scores, evidence sources, and a graph of the reasoning path — fully auditable by your quality team." },
    { q: "Can we start with a single module?", a: "Yes. Most customers begin with Warranty Analytics or Supplier Intelligence, then expand across the platform." },
    { q: "Is DRISHTIQ™ IATF 16949 compliant?", a: "Yes. The platform is designed to support IATF 16949, ISO 27001, and SOC 2 Type II controls." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="FAQ" title="Answers for enterprise buyers" />
        <div className="mt-12 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-white shadow-card">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <button
                key={it.q}
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full px-6 py-5 text-left"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[15px] font-semibold text-foreground">{it.q}</span>
                  <ChevronDown className={`h-4 w-4 text-primary transition ${isOpen ? "rotate-180" : ""}`} />
                </div>
                <div className={`grid transition-all ${isOpen ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="text-sm leading-relaxed text-muted-foreground">{it.a}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FINAL CTA
// ============================================================

function FinalCTA() {
  return (
    <section id="demo" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary via-primary to-secondary p-10 text-white sm:p-16">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-highlight/20 blur-3xl" />
          <div className="absolute inset-0 bg-dotted opacity-10" />
          <div className="relative grid gap-10 lg:grid-cols-5 lg:items-center">
            <div className="lg:col-span-3">
              <Eyebrow icon={Sparkles}>Ready when you are</Eyebrow>
              <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                See DRISHTIQ™ live on your fleet, plant, or supply base
              </h2>
              <p className="mt-4 max-w-xl text-white/80">
                Get a personalized enterprise demo with our automotive AI architects — walk away with a
                90-day value roadmap.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-white/80">
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-accent" /> 30-min working session</span>
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-accent" /> Custom ROI model</span>
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-accent" /> No commitment</span>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-2 backdrop-blur">
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                  <a href="#" className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-semibold text-primary transition hover:bg-white/90">
                    Book Enterprise Demo <ArrowRight className="h-4 w-4" />
                  </a>
                  <a href="#" className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
                    Request Consultation <ArrowRight className="h-4 w-4" />
                  </a>
                  <a href="#" className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
                    Start Free Trial <ArrowRight className="h-4 w-4" />
                  </a>
                  <a href="#" className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
                    Contact Sales <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================

function Footer() {
  const cols = [
    { h: "Platform", l: ["Overview", "AI Agents", "Digital Twin", "Snowflake Integration", "Security"] },
    { h: "Solutions", l: ["OEM", "Tier-1 Supplier", "Fleet Operator", "Government", "Smart Factory"] },
    { h: "Resources", l: ["Documentation", "Blog", "Case Studies", "Webinars", "Trust Center"] },
    { h: "Company", l: ["About", "Careers", "Partners", "Press", "Contact"] },
  ];
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-elegant">
                <Radar className="h-4 w-4" />
              </div>
              <span className="text-[15px] font-bold tracking-tight text-foreground">
                DRISHTIQ<span className="align-super text-[9px] text-muted-foreground">™</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              AI-Powered Automotive Intelligence Platform for Fortune 500 OEMs, suppliers, and mobility organizations.
            </p>
            <form className="mt-6 flex max-w-sm gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Work email"
                className="flex-1 rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
              />
              <button type="submit" className="rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
                Subscribe
              </button>
            </form>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{c.h}</div>
              <ul className="mt-4 space-y-2.5">
                {c.l.map((li) => (
                  <li key={li}>
                    <a href="#" className="text-sm text-foreground/80 transition hover:text-primary">{li}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} DRISHTIQ Technologies. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Security</a>
            <a href="#" className="hover:text-foreground">Support</a>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3 w-3" /> Global · EU · US · IN
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// PAGE
// ============================================================

export default function Landing() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <LogoCloud />
        <Platform />
        <Features />
        <Industries />
        <AIAgents />
        <TwinAndOps />
        <Impact />
        <Security />
        <TechStack />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
