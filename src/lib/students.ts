export const HOBBIES = [
  "Skating", "Manga", "Anime", "Esports", "Valorant", "Chess", "Reading",
  "Guitar", "Singing", "Dance", "Football", "Cricket", "Badminton", "Gym",
  "Coding", "Photography", "Sketching", "Movies", "Cooking", "Trekking",
] as const;

export type Student = {
  id: string;
  name: string;
  emoji: string;
  year: string;
  branch: string;
  hostel: string;
  bio: string;
  hobbies: string[];
};

export const STUDENTS: Student[] = [
  { id: "s1", name: "Aarav", emoji: "🛹", year: "1st year", branch: "COE", hostel: "Hostel J", bio: "New to Patiala. Looking for people to skate near the library at night.", hobbies: ["Skating", "Photography", "Movies"] },
  { id: "s2", name: "Ishita", emoji: "📚", year: "1st year", branch: "ECE", hostel: "Hostel E", bio: "Currently reading One Piece for the 3rd time. Manga swaps anyone?", hobbies: ["Manga", "Anime", "Reading"] },
  { id: "s3", name: "Kabir", emoji: "🎮", year: "1st year", branch: "COPC", hostel: "Hostel K", bio: "Valo Immortal grind. Need a 5-stack from campus.", hobbies: ["Esports", "Valorant", "Coding"] },
  { id: "s4", name: "Meher", emoji: "🎸", year: "2nd year", branch: "Mech", hostel: "Hostel I", bio: "Jamming every Sunday at the amphitheatre. Bring your voice!", hobbies: ["Guitar", "Singing", "Trekking"] },
  { id: "s5", name: "Rohan", emoji: "♟️", year: "1st year", branch: "Civil", hostel: "Hostel A", bio: "Quiet guy, loves chess and long reads. Let's play at the canteen.", hobbies: ["Chess", "Reading", "Coding"] },
  { id: "s6", name: "Sana", emoji: "🎨", year: "1st year", branch: "Biotech", hostel: "Hostel G", bio: "I sketch anime characters. Looking for art buddies.", hobbies: ["Sketching", "Anime", "Manga"] },
  { id: "s7", name: "Dev", emoji: "⚽", year: "1st year", branch: "EIC", hostel: "Hostel M", bio: "Evening football at the main ground. Always short of players.", hobbies: ["Football", "Gym", "Esports"] },
  { id: "s8", name: "Tanya", emoji: "📸", year: "2nd year", branch: "COE", hostel: "Hostel N", bio: "Campus photo walks + chai. Shy but friendly :)", hobbies: ["Photography", "Skating", "Cooking"] },
  { id: "s9", name: "Arjun", emoji: "🏸", year: "1st year", branch: "Chem", hostel: "Hostel B", bio: "Badminton at 6am. Yes, really.", hobbies: ["Badminton", "Cricket", "Gym"] },
  { id: "s10", name: "Niharika", emoji: "💃", year: "1st year", branch: "ECE", hostel: "Hostel E", bio: "Dance society hopeful. Also binge K-dramas.", hobbies: ["Dance", "Movies", "Singing"] },
];

export function isThaparEmail(email: string) {
  return /^[^\s@]+@thapar\.edu$/i.test(email.trim());
}

export function sharedHobbies(a: string[], b: string[]) {
  return a.filter((h) => b.includes(h));
}

/** Only students who share at least one hobby and haven't been swiped yet. */
export function buildDeck(myHobbies: string[], swiped: string[]) {
  return STUDENTS.filter(
    (s) => !swiped.includes(s.id) && sharedHobbies(myHobbies, s.hobbies).length > 0,
  ).sort(
    (a, b) => sharedHobbies(myHobbies, b.hobbies).length - sharedHobbies(myHobbies, a.hobbies).length,
  );
}

/** Sample students "like you back" deterministically so the demo feels real. */
export function likesBack(id: string) {
  return Number(id.slice(1)) % 3 !== 0;
}
