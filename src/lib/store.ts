import { useEffect, useState } from "react";

export type AppState = {
  profile: { name: string; email: string; hobbies: string[] } | null;
  swiped: string[];
  matches: string[];
};

const KEY = "thapar-hobby-friends";
const empty: AppState = { profile: null, swiped: [], matches: [] };

export function loadState(): AppState {
  if (typeof window === "undefined") return empty;
  try {
    return { ...empty, ...JSON.parse(localStorage.getItem(KEY) || "{}") };
  } catch {
    return empty;
  }
}

export function saveState(s: AppState) {
  localStorage.setItem(KEY, JSON.stringify(s));
}

export function useAppState() {
  const [state, setState] = useState<AppState>(empty);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setState(loadState());
    setReady(true);
  }, []);
  const update = (fn: (s: AppState) => AppState) =>
    setState((prev) => {
      const next = fn(prev);
      saveState(next);
      return next;
    });
  return { state, update, ready };
}
