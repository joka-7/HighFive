import { test, type Page } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "../docs/screenshots");

// High5 works fully offline on bundled content — no AI key, no network mocking
// needed for any of these screens except Dialogue Coach (which we don't
// screenshot here since it requires a live provider key).

async function onboard(page: Page, name: string, level: string) {
  await page.goto("/");
  await page.getByPlaceholder("השם שלך").fill(name);
  await page.getByRole("button", { name: /בואו נתחיל/ }).click();
  await page.getByRole("button", { name: "✍️ אבחר רמה בעצמי" }).click();
  await page.getByRole("button", { name: level, exact: true }).click();
}

/** Wait for any in-flight Spinner (role="status") to finish before capturing. */
async function settle(page: Page) {
  await page
    .getByRole("status")
    .first()
    .waitFor({ state: "hidden", timeout: 15_000 });
}

/**
 * Resize the viewport to the page's full content height, then screenshot
 * without `fullPage` — `fullPage: true` stitches a scrolling capture, which
 * duplicates the `position: fixed` bottom nav mid-page. Sizing the viewport
 * to fit everything avoids scrolling (and the duplication) entirely.
 */
async function snap(page: Page, filename: string) {
  const height = await page.evaluate(
    () => document.documentElement.scrollHeight,
  );
  await page.setViewportSize({ width: 430, height });
  await page.screenshot({
    path: path.join(OUT_DIR, filename),
    animations: "disabled",
  });
}

test.describe("capture README screenshots", () => {
  test.skip(!!process.env.CI, "Run locally to regenerate README screenshots");

  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 430, height: 900 });
  });

  test("onboarding — name + level", async ({ page }) => {
    await page.goto("/");
    await page.getByPlaceholder("השם שלך").fill("דנה");
    await page.getByRole("button", { name: /בואו נתחיל/ }).click();
    await page.getByRole("button", { name: "✍️ אבחר רמה בעצמי" }).click();
    await page.getByText("בחר/י רמה (CEFR)").waitFor();

    await snap(page, "onboarding-level.png");
  });

  test("dashboard hub", async ({ page }) => {
    await onboard(page, "דנה", "B1");
    await page.getByText(/שלום, דנה/).waitFor();

    await snap(page, "dashboard.png");
  });

  test("חמש ביום — daily missions board", async ({ page }) => {
    await onboard(page, "דנה", "B1");
    await page
      .getByRole("navigation")
      .getByRole("button", { name: /חמש ביום/ })
      .click();
    await page.getByText("🎯 חמש ביום").waitFor();

    await snap(page, "daily-missions.png");
  });

  test("daily lesson + practice quiz", async ({ page }) => {
    await onboard(page, "דנה", "B1");
    await page.getByRole("button", { name: /שיעור יומי/ }).click();
    await settle(page);
    await page
      .getByRole("button", { name: /בוא נתרגל/ })
      .waitFor({ timeout: 30_000 });

    await snap(page, "daily-lesson.png");

    await page.getByRole("button", { name: /בוא נתרגל/ }).click();
    await page.getByText(/שאלה 1\//).waitFor();

    await snap(page, "practice-quiz.png");
  });

  test("vocabulary flashcards", async ({ page }) => {
    await onboard(page, "דנה", "B1");
    await page
      .getByRole("navigation")
      .getByRole("button", { name: /5 מילים/ })
      .click();
    await settle(page);
    await page
      .getByRole("button", { name: /שמור את/ })
      .first()
      .waitFor({ timeout: 30_000 });

    await snap(page, "vocabulary.png");
  });

  test("reading lab", async ({ page }) => {
    await onboard(page, "דנה", "B1");
    await page.getByText(/שלום, דנה/).waitFor();
    await page.goto("/#/reading");
    await settle(page);

    await snap(page, "reading.png");
  });

  test("listening practice", async ({ page }) => {
    await onboard(page, "דנה", "B1");
    await page.goto("/#/listening");
    await settle(page);

    await snap(page, "listening.png");
  });

  test("progress — points, streaks, charts", async ({ page }) => {
    await onboard(page, "דנה", "B1");
    await page.goto("/#/progress");
    await page.getByText("ההתקדמות שלי").waitFor();

    await snap(page, "progress.png");
  });

  test("settings — AI provider", async ({ page }) => {
    await onboard(page, "דנה", "B1");
    await page
      .getByRole("navigation")
      .getByRole("button", { name: /הגדרות/ })
      .click();
    await page.getByText("🤖 הגדרות AI").waitFor();

    await snap(page, "settings.png");
  });
});
