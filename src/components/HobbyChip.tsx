import { cn } from "@/lib/utils";

export function HobbyChip({ label, active, onClick, highlight }: { label: string; active?: boolean; highlight?: boolean; onClick?: () => void }) {
  const cls = cn(
    "rounded-full border px-3 py-1 text-sm transition-colors",
    active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground",
    highlight && "border-accent bg-accent text-accent-foreground",
    onClick && !active && "hover:border-primary",
  );
  return onClick ? (
    <button type="button" onClick={onClick} className={cls}>{label}</button>
  ) : (
    <span className={cls}>{label}</span>
  );
}
