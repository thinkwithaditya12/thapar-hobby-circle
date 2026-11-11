import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { HobbyChip } from "@/components/HobbyChip";
import { Button } from "@/components/ui/button";
import { buildDeck, likesBack, sharedHobbies } from "@/lib/students";
import { useAppState } from "@/lib/store";

export const Route = createFileRoute("/discover")({
  head: () => ({
    meta: [
      { title: "Discover — HobbyMates" },
      { name: "description", content: "Swipe through Thapar students who share your hobbies." },
      { property: "og:title", content: "Discover — HobbyMates" },
      { property: "og:description", content: "Swipe through Thapar students who share your hobbies." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Discover,
});

function Discover() {
  const { state, update, ready } = useAppState();
  const [justMatched, setJustMatched] = useState<string | null>(null);

  if (!ready) return <div className="min-h-screen"><Header /></div>;

  if (!state.profile) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="mx-auto max-w-md px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">Join first</h1>
          <p className="mt-2 text-muted-foreground">Tell us your hobbies so we can find your people.</p>
          <Button asChild className="mt-6"><Link to="/">Join with Thapar email</Link></Button>
        </div>
      </div>
    );
  }

  const me = state.profile;
  const deck = buildDeck(me.hobbies, state.swiped);
  const current = deck[0];

  const swipe = (connect: boolean) => {
    if (!current) return;
    const matched = connect && likesBack(current.id);
    update((s) => ({
      ...s,
      swiped: [...s.swiped, current.id],
      matches: matched ? [...s.matches, current.id] : s.matches,
    }));
    if (matched) {
      setJustMatched(current.name);
      toast.success(`You and ${current.name} are connected! 🎉`);
    } else {
      setJustMatched(null);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-md px-4 py-8">
        <p className="mb-4 text-center text-sm text-muted-foreground">
          Hi {me.name} — showing people who share your hobbies
        </p>

        {justMatched && (
          <div className="mb-4 rounded-xl bg-secondary p-3 text-center text-sm text-secondary-foreground">
            It's a match with {justMatched}! <Link to="/matches" className="font-semibold underline">See matches</Link>
          </div>
        )}

        {current ? (
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <div className="flex h-40 items-center justify-center rounded-2xl bg-gradient-coral text-7xl">
              {current.emoji}
            </div>
            <h2 className="mt-4 text-2xl font-bold">{current.name}</h2>
            <p className="text-sm text-muted-foreground">{current.year} · {current.branch} · {current.hostel}</p>
            <p className="mt-3">{current.bio}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {current.hobbies.map((h) => (
                <HobbyChip key={h} label={h} highlight={me.hobbies.includes(h)} />
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {sharedHobbies(me.hobbies, current.hobbies).length} shared hobby(s)
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="outline" size="lg" onClick={() => swipe(false)}>Skip</Button>
              <Button size="lg" className="bg-gradient-coral" onClick={() => swipe(true)}>Say hi 👋</Button>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-border bg-card p-8 text-center">
            <h2 className="text-xl font-bold">That's everyone for now</h2>
            <p className="mt-2 text-muted-foreground">Add more hobbies to meet more people.</p>
            <div className="mt-6 flex justify-center gap-3">
              <Button asChild variant="outline"><Link to="/">Edit hobbies</Link></Button>
              <Button asChild><Link to="/matches">My matches</Link></Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
