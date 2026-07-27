// Optional error monitoring. Without VITE_SENTRY_DSN, failures still go to
// console so local/dev stays zero-config. With a DSN, the first report lazily
// loads @sentry/browser and forwards exceptions (Sentry free tier is enough).

let sentryReady: Promise<typeof import("@sentry/browser") | null> | null = null;

function loadSentry(): Promise<typeof import("@sentry/browser") | null> {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  if (!dsn) return Promise.resolve(null);
  if (!sentryReady) {
    sentryReady = import("@sentry/browser")
      .then((Sentry) => {
        Sentry.init({
          dsn,
          // Keep the free tier quiet — no session replay / tracing by default.
          tracesSampleRate: 0,
        });
        return Sentry;
      })
      .catch((err) => {
        console.error("Failed to init Sentry:", err);
        return null;
      });
  }
  return sentryReady;
}

/** Report a swallowed or unexpected failure so it isn't silent in production. */
export function reportError(error: unknown, context?: string): void {
  const err =
    error instanceof Error ? error : new Error(typeof error === "string" ? error : "Unknown error");
  if (context) {
    console.error(`[${context}]`, err);
  } else {
    console.error(err);
  }
  void loadSentry().then((Sentry) => {
    if (!Sentry) return;
    Sentry.withScope((scope) => {
      if (context) scope.setTag("context", context);
      Sentry.captureException(err);
    });
  });
}
