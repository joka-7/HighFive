// The slice of Vercel's Node request/response these functions use (avoids
// depending on @vercel/node just for types), plus the shared JSON guard.

import type { ApiResult } from "./reminderApi";

export interface Req {
  readonly method?: string;
  readonly headers: { readonly authorization?: string; readonly "content-type"?: string };
  /** Parsed by Vercel when the request is JSON. */
  readonly body?: unknown;
}

export interface Res {
  status(code: number): Res;
  json(body: unknown): void;
  end(): void;
}

/**
 * Only JSON bodies are accepted: a cross-site page can't send one without a
 * CORS preflight, which these functions never grant — so another site can't
 * register or silence anyone's reminders through a visitor's browser.
 */
export function isJsonRequest(req: Req): boolean {
  return (req.headers["content-type"] ?? "").toLowerCase().startsWith("application/json");
}

export function send(res: Res, result: ApiResult): void {
  if (result.body === null) res.status(result.status).end();
  else res.status(result.status).json(result.body);
}

/** Route one request to `handlers` by method; anything unexpected fails without detail. */
export async function handleJson(
  req: Req,
  res: Res,
  handlers: Partial<Record<"POST" | "DELETE", (body: unknown) => Promise<ApiResult>>>,
): Promise<void> {
  const handler = handlers[(req.method ?? "") as "POST" | "DELETE"];
  if (!handler) {
    send(res, { status: 405, body: { error: "method not allowed" } });
    return;
  }
  if (!isJsonRequest(req)) {
    send(res, { status: 415, body: { error: "expected application/json" } });
    return;
  }
  try {
    send(res, await handler(req.body));
  } catch (err) {
    // Logged without the body: it carries a push token and a write key.
    console.error(JSON.stringify({ event: "reminder-api.error", message: err instanceof Error ? err.message : "unknown" }));
    send(res, { status: 500, body: { error: "internal error" } });
  }
}
