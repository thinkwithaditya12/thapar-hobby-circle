import { describe, expect, it } from "vitest";
import { buildDeck, isThaparEmail } from "@/lib/students";

describe("joining rules", () => {
  it("accepts only @thapar.edu emails", () => {
    expect(isThaparEmail("aditya@thapar.edu")).toBe(true);
    expect(isThaparEmail("aditya@gmail.com")).toBe(false);
    expect(isThaparEmail("aditya@thapar.edu.fake.com")).toBe(false);
  });

  it("only shows students who share at least one hobby", () => {
    const deck = buildDeck(["Skating"], []);
    expect(deck.length).toBeGreaterThan(0);
    expect(deck.every((s) => s.hobbies.includes("Skating"))).toBe(true);
  });
});
