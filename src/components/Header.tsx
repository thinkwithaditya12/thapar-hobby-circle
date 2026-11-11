import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <Link to="/" className="font-display text-xl font-bold text-foreground">
          Hobby<span className="text-primary">Mates</span>
        </Link>
        <nav className="flex gap-1 text-sm font-medium">
          <Link to="/discover" className="rounded-full px-3 py-1.5 text-muted-foreground hover:bg-secondary" activeProps={{ className: "bg-secondary text-secondary-foreground" }}>
            Discover
          </Link>
          <Link to="/matches" className="rounded-full px-3 py-1.5 text-muted-foreground hover:bg-secondary" activeProps={{ className: "bg-secondary text-secondary-foreground" }}>
            Matches
          </Link>
        </nav>
      </div>
    </header>
  );
}
