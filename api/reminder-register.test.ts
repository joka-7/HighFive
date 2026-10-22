import { afterEach, describe, expect, it, vi } from "vitest";
import handler from "./reminder-register";
import type { Req, Res } from "./_lib/http";

describe("reminder-register handler", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("answers a structured 500 when the service account is missing, instead of crashing", async () => {
    vi.stubEnv("FIREBASE_SERVICE_ACCOUNT", "");
    vi.spyOn(console, "error").mockImplementation(() => {});
    const sent: { status?: number; body?: unknown } = {};
    const res: Res = {
      status(code) {
        sent.status = code;
        return res;
      },
      json(body) {
        sent.body = body;
      },
      end() {},
    };
    const req: Req = { method: "POST", headers: { "content-type": "application/json" }, body: {} };

    await handler(req, res);

    expect(sent).toEqual({ status: 500, body: { error: "internal error" } });
  });
});
