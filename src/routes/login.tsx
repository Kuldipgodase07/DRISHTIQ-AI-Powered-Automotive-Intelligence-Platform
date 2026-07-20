import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sparkles, ShieldCheck, LockKeyhole, Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { signIn, useSession } from "@/lib/mock-auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Sign in — DRISHTIQ™" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { session, ready } = useSession();
  const [email, setEmail] = useState("priya.sharma@tatamotors.com");
  const [password, setPassword] = useState("••••••••••");

  useEffect(() => {
    if (ready && session) navigate({ to: "/dashboard" });
  }, [ready, session, navigate]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn(email);
    navigate({ to: "/dashboard" });
  };

  const sso = (provider: string) => {
    signIn(`${provider.toLowerCase()}.user@enterprise.com`);
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Marketing panel */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-primary via-primary to-[#0a3760] text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 70% 60%, white 1px, transparent 1px)",
            backgroundSize: "80px 80px, 120px 120px",
          }}
        />
        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/15 backdrop-blur grid place-items-center font-bold">D</div>
            <div>
              <div className="text-lg font-semibold tracking-tight">DRISHTIQ™</div>
              <div className="text-xs text-white/70 uppercase tracking-widest">
                Automotive Intelligence Platform
              </div>
            </div>
          </div>
        </div>
        <div className="relative space-y-6 max-w-md">
          <h2 className="text-4xl font-semibold leading-tight tracking-tight">
            One intelligence layer for every vehicle, plant and supplier.
          </h2>
          <p className="text-white/80 leading-relaxed">
            Investigate failures in minutes, forecast downtime before it happens, and give
            executives a single, trusted view of quality across the enterprise.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              { k: "3.2M", l: "Vehicles monitored" },
              { k: "142", l: "Plants connected" },
              { k: "99.98%", l: "Platform uptime" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-numeric text-2xl font-semibold">{s.k}</div>
                <div className="text-xs text-white/70 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative text-xs text-white/60 flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5" /> SOC 2 · ISO 27001 · GDPR
          </span>
          <span>© {new Date().getFullYear()} DRISHTIQ Technologies</span>
        </div>
      </div>

      {/* Auth panel */}
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-6">
            <div className="h-9 w-9 rounded-lg bg-primary grid place-items-center text-white font-bold">D</div>
            <span className="font-semibold">DRISHTIQ™</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Sign in to your workspace</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Use your enterprise identity provider or your DRISHTIQ credentials.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2">
            {["Microsoft", "Google", "Azure AD", "Okta"].map((p) => (
              <Button
                key={p}
                variant="outline"
                className="justify-center gap-2 h-10"
                onClick={() => sso(p)}
              >
                <span className="h-4 w-4 rounded-sm bg-gradient-to-br from-primary to-accent" />
                {p}
              </Button>
            ))}
          </div>

          <div className="relative my-6">
            <Separator />
            <span className="absolute inset-0 -top-2 text-center">
              <span className="bg-background px-2 text-[11px] uppercase tracking-widest text-muted-foreground">
                or continue with email
              </span>
            </span>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label htmlFor="email">Work email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5"
                required
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a className="text-xs text-primary hover:underline" href="#">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5"
                required
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2">
                <Checkbox defaultChecked /> Keep me signed in
              </label>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Fingerprint className="h-3.5 w-3.5" /> MFA enforced
              </span>
            </div>
            <Button type="submit" className="w-full h-10 gap-2 bg-primary hover:bg-primary/90">
              <LockKeyhole className="h-4 w-4" /> Sign in securely
            </Button>
          </form>

          <div className="mt-6 rounded-lg border border-border bg-muted/40 p-3 text-xs text-muted-foreground flex items-start gap-2">
            <Sparkles className="h-4 w-4 text-ai mt-0.5" />
            <span>
              Demo preview — any credentials will sign you in. Real deployments enforce SSO, MFA and
              tenant-level session policies.
            </span>
          </div>

          <p className="mt-6 text-xs text-center text-muted-foreground">
            Need access? <a className="text-primary hover:underline">Request a workspace invite</a>
          </p>
        </div>
      </div>
    </div>
  );
}
