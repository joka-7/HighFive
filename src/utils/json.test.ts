import { describe, it, expect } from "vitest";
import { cleanJson, parseJson } from "./json";

describe("cleanJson", () => {
  it("returns plain JSON unchanged", () => {
    expect(cleanJson('{"a":1}')).toBe('{"a":1}');
  });

  it("strips ```json fences", () => {
    expect(cleanJson('```json\n{"a":1}\n```')).toBe('{"a":1}');
  });

  it("strips bare ``` fences", () => {
    expect(cleanJson('```\n{"a":1}\n```')).toBe('{"a":1}');
  });

  it("trims surrounding whitespace", () => {
    expect(cleanJson('   {"a":1}   ')).toBe('{"a":1}');
  });
});

describe("parseJson", () => {
  it("parses fenced JSON into an object", () => {
    expect(parseJson<{ a: number }>('```json\n{"a":1}\n```')).toEqual({ a: 1 });
  });
});
