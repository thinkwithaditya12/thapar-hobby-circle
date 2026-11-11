import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { HobbyChip } from "@/components/HobbyChip";
import { Button } from "@/components/ui/button";
import { STUDENTS, sharedHobbies } from "@/lib/students";
import { useAppState } from "@/lib/store";

export const Route = createFileRoute("/matches")({
  head: () => ({
    meta: [
      { title: "My matches — HobbyMates" },
      { name: "description", content: "Your hobby friends at Thapar." },
      { property: "og:title", content: "My matches — HobbyMates" },
      { property: "og:description", content: "Your hobby friends at Thapar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Matches,
});

function Matches() {
  const { state, ready } = useAppState();
  const myHobbies = state.profile?.hobbies ?? [];
  const list = STUDENTS.filter((s) => state.matches.includes(s.id));

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="text-3xl font-bold">My matches</h1>
        {ready && list.length === 0 && (
          <div className="mt-6 rounded-2xl border border-border bg-card p-8 text-center">
            <p className="text-muted-foreground">No matches yet. Go say hi to someone!</p>
            <Button asChild className="mt-4"><Link to="/discover">Discover people</Link></Button>
          </div>
        )}
        <div className="mt-6 space-y-3">
          {list.map((s) => (
            <div key={s.id} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-coral text-2xl">{s.emoji}</div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{s.name} <span className="text-sm font-normal text-muted-foreground">· {s.year}, {s.hostel}</span></p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {sharedHobbies(myHobbies, s.hobbies).map((h) => <HobbyChip key={h} label={h} highlight />)}
                </div>
              </div>
              <Button size="sm" onClick={() => toast(`Chat with ${s.name} is coming soon!`)}>Message</Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
