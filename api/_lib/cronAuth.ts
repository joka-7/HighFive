// Bearer-token check for the cron-triggered endpoints. Lives under api/_lib/
// because Vercel deploys every other file in api/ as its own function, and
// skips underscore-prefixed paths.

import { timingSafeEqual } from "node:crypto";

/**
 * True only when a secret is configured AND the header carries exactly it.
 * Fails closed: an unset secret must never turn into the literal string
 * "Bearer undefined" that any caller could send.
 */
export function isAuthorizedCronRequest(
  authorization: string | undefined,
  secret: string | undefined,
): boolean {
  if (!secret || !authorization) return false;
  const expected = Buffer.from(`Bearer ${secret}`);
  const actual = Buffer.from(authorization);
  // timingSafeEqual requires equal lengths; the length itself isn't secret.
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
