import { useEffect, useState } from "react";
import { Sparkles, ShieldCheck } from "lucide-react";

export function SplashScreen({ onFinish }: { onFinish?: () => void }) {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(15);
  const [statusText, setStatusText] = useState("Initializing DRISHTIQ™ Engine...");

  useEffect(() => {
    // Progress animation sequence
    const t1 = setTimeout(() => {
      setProgress(45);
      setStatusText("Connecting to MongoDB Atlas Cluster...");
    }, 600);

    const t2 = setTimeout(() => {
      setProgress(80);
      setStatusText("Loading ML Inference Models & Telemetry Streams...");
    }, 1300);

    const t3 = setTimeout(() => {
      setProgress(100);
      setStatusText("Platform Workspace Ready.");
    }, 1900);

    const t4 = setTimeout(() => {
      setFadeOut(true);
    }, 2300);

    const t5 = setTimeout(() => {
      setVisible(false);
      if (onFinish) onFinish();
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onFinish]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-between bg-white text-slate-900 p-8 transition-opacity duration-700 select-none ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Top Brand Header */}
      <div className="relative z-10 w-full max-w-7xl flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-500 font-semibold">
          <ShieldCheck className="h-4 w-4 text-emerald-600" /> SOC 2 · ISO 27001 Certified
        </div>
        <div className="text-xs tracking-wider text-slate-400 font-semibold">v2.4 Enterprise Edition</div>
      </div>

      {/* Center Hero Splash Section */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-xl my-auto">
        {/* Logo & Tightly Aligned Subtitle */}
        <div className="flex flex-col items-center">
          <img
            src="/logos/splash_logo.png"
            alt="DRISHTIQ Splash Logo"
            className="h-44 sm:h-52 md:h-60 w-auto max-w-[380px] sm:max-w-[440px] object-contain transition-transform duration-700 ease-out hover:scale-[1.02]"
          />
          <p className="-mt-3 sm:-mt-4 text-xs sm:text-sm uppercase tracking-[0.3em] text-primary font-bold">
            Automotive Intelligence Platform
          </p>
        </div>

        {/* Progress Bar & Dynamic Status */}
        <div className="w-full max-w-md space-y-3 mt-8">
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/80 p-0.5 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-primary via-blue-600 to-indigo-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span className="font-mono text-[12px] text-primary font-semibold tracking-wide">{statusText}</span>
            <span className="font-numeric font-bold text-slate-900 text-sm">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="relative z-10 text-xs text-slate-400 flex items-center gap-2 font-medium">
        <Sparkles className="h-4 w-4 text-primary" />
        <span>© {new Date().getFullYear()} DRISHTIQ Technologies Inc. All rights reserved.</span>
      </div>
    </div>
  );
}
