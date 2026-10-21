import { describe, it, expect } from "vitest";
import { isAuthorizedCronRequest } from "./cronAuth";

describe("isAuthorizedCronRequest", () => {
  it.each([
    { name: "matching bearer token", header: "Bearer s3cret", secret: "s3cret", ok: true },
    { name: "wrong token", header: "Bearer nope", secret: "s3cret", ok: false },
    { name: "token without the Bearer prefix", header: "s3cret", secret: "s3cret", ok: false },
    { name: "missing header", header: undefined, secret: "s3cret", ok: false },
    { name: "unset secret, attacker sends 'Bearer undefined'", header: "Bearer undefined", secret: undefined, ok: false },
    { name: "empty secret, header 'Bearer '", header: "Bearer ", secret: "", ok: false },
  ])("$name → $ok", ({ header, secret, ok }) => {
    expect(isAuthorizedCronRequest(header, secret)).toBe(ok);
  });
});
