// Authentication & session state helper
import { useEffect, useState, useSyncExternalStore } from "react";

const KEY = "drishtiq.session.v1";

export type MockUser = {
  name: string;
  email: string;
  role: string;
  initials: string;
  workspace: string;
  department?: string;
};

export type MockSession = {
  user: MockUser;
  workspaces: string[];
  token?: string;
};

const DEFAULT_WORKSPACES = [
  "Tata Motors — Global",
  "Ashok Leyland — Chennai Plant",
  "Government of India — MoRTH",
];

const listeners = new Set<() => void>();
function emit() {
  listeners.forEach((l) => l());
}

function read(): MockSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as MockSession) : null;
  } catch {
    return null;
  }
}

export function signIn(email: string, userData?: Partial<MockUser>, token?: string): MockSession {
  const name =
    userData?.name ||
    email
      .split("@")[0]
      .split(/[._-]/)
      .filter(Boolean)
      .map((p) => p[0].toUpperCase() + p.slice(1))
      .join(" ") ||
    "Enterprise User";
  const initials =
    name
      .split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "EU";
  const session: MockSession = {
    user: {
      name,
      email,
      role: userData?.role || "Lead Engineer",
      initials,
      workspace: userData?.workspace || DEFAULT_WORKSPACES[0],
      department: userData?.department || "Automotive Diagnostics",
    },
    workspaces: DEFAULT_WORKSPACES,
    token: token,
  };
  window.localStorage.setItem(KEY, JSON.stringify(session));
  emit();
  return session;
}

export function signOut() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
  emit();
}

export function switchWorkspace(name: string) {
  const s = read();
  if (!s) return;
  const next = { ...s, user: { ...s.user, workspace: name } };
  window.localStorage.setItem(KEY, JSON.stringify(next));
  emit();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function useSession(): { session: MockSession | null; ready: boolean } {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const session = useSyncExternalStore(
    subscribe,
    () => JSON.stringify(read()),
    () => "null",
  );
  return { session: session === "null" ? null : (JSON.parse(session) as MockSession), ready };
}
