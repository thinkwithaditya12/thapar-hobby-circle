import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { HobbyChip } from "@/components/HobbyChip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HOBBIES, isThaparEmail } from "@/lib/students";
import { useAppState } from "@/lib/store";
import hero from "@/assets/hero-friends.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HobbyMates — Find your people at Thapar" },
      { name: "description", content: "Meet Thapar students who share your hobbies — skating, manga, esports and more. Friends, not dates." },
      { property: "og:title", content: "HobbyMates — Find your people at Thapar" },
      { property: "og:description", content: "Meet Thapar students who share your hobbies. Friends, not dates." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const { update } = useAppState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [error, setError] = useState("");

  const toggle = (h: string) =>
    setHobbies((p) => (p.includes(h) ? p.filter((x) => x !== h) : [...p, h]));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError("Please enter your name.");
    if (!isThaparEmail(email)) return setError("Only @thapar.edu emails can join.");
    if (hobbies.length === 0) return setError("Pick at least one hobby.");
    update(() => ({ profile: { name: name.trim(), email: email.trim(), hobbies }, swiped: [], matches: [] }));
    navigate({ to: "/discover" });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto grid max-w-4xl gap-8 px-4 py-10 md:grid-cols-2 md:items-center">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">Thapar only · Friends, not dates</p>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">New on campus? Find people who love what you love.</h1>
          <p className="mt-4 text-muted-foreground">
            Pick your hobbies. We only show you students who share at least one. Both say hi — you're connected.
          </p>
          <img src={hero} alt="Thapar students skating, reading manga, gaming and playing guitar" width={1280} height={1024} className="mt-6 rounded-2xl shadow-card" />
        </div>

        <form onSubmit={submit} className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-card">
          <h2 className="text-2xl font-bold">Join in 30 seconds</h2>
          <Input placeholder="Your first name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="you@thapar.edu" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <div>
            <p className="mb-2 text-sm font-medium">Your hobbies</p>
            <div className="flex flex-wrap gap-2">
              {HOBBIES.map((h) => (
                <HobbyChip key={h} label={h} active={hobbies.includes(h)} onClick={() => toggle(h)} />
              ))}
            </div>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" size="lg" className="w-full bg-gradient-coral">Start finding friends</Button>
        </form>
      </main>
    </div>
  );
}
