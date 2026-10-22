import { describe, it, expect, vi } from "vitest";
import { handleJson, type Req, type Res } from "./http";

function fakeRes() {
  const sent: { status?: number; body?: unknown; ended?: boolean } = {};
  const res: Res = {
    status(code) {
      sent.status = code;
      return res;
    },
    json(body) {
      sent.body = body;
    },
    end() {
      sent.ended = true;
    },
  };
  return { res, sent };
}

const req = (method: string, contentType = "application/json", body: unknown = {}): Req => ({
  method,
  headers: { "content-type": contentType },
  body,
});

describe("handleJson", () => {
  it.each([
    { name: "routes a JSON POST to its handler", request: req("POST"), status: 200 },
    { name: "accepts a charset suffix", request: req("POST", "application/json; charset=utf-8"), status: 200 },
    { name: "refuses an unlisted method", request: req("GET"), status: 405 },
    { name: "refuses a form post a cross-site page could send", request: req("POST", "application/x-www-form-urlencoded"), status: 415 },
    { name: "refuses a text/plain body", request: req("POST", "text/plain"), status: 415 },
  ])("$name", async ({ request, status }) => {
    const { res, sent } = fakeRes();

    await handleJson(request, res, { POST: async () => ({ status: 200, body: { ok: true } }) });

    expect(sent.status).toBe(status);
  });

  it("answers a handler crash with a bare 500, logging no request body", async () => {
    const { res, sent } = fakeRes();
    const log = vi.spyOn(console, "error").mockImplementation(() => {});

    await handleJson(req("POST", "application/json", { writeKey: "secret-key" }), res, {
      POST: async () => {
        throw new Error("firestore down");
      },
    });

    expect([sent.status, sent.body]).toEqual([500, { error: "internal error" }]);
    expect(JSON.stringify(log.mock.calls)).not.toContain("secret-key");
    log.mockRestore();
  });

  it("ends a 204 without a body", async () => {
    const { res, sent } = fakeRes();

    await handleJson(req("DELETE"), res, { DELETE: async () => ({ status: 204, body: null }) });

    expect([sent.status, sent.ended, sent.body]).toEqual([204, true, undefined]);
  });
});
