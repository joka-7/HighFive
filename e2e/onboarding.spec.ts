import { test, expect, type Page } from "@playwright/test";

async function onboard(page: Page, name: string, level: string) {
  await page.goto("/");
  await page.getByPlaceholder("השם שלך").fill(name);
  await page.getByRole("button", { name: /בואו נתחיל/ }).click();
  await page.getByRole("button", { name: "✍️ אבחר רמה בעצמי" }).click();
  await page.getByRole("button", { name: level, exact: true }).click();
  await expect(page.getByText(new RegExp(`שלום, ${name}`))).toBeVisible();
}

test("a new user can register, land on the dashboard, and reach settings", async ({ page }) => {
  await onboard(page, "Dana", "B1");
  // The level is a top-bar status chip; the dashboard hero no longer repeats it.
  await expect(page.getByLabel("רמה B1")).toBeVisible();

  await page.getByRole("navigation").getByRole("button", { name: /הגדרות/ }).click();
  await expect(page.getByText("🤖 הגדרות AI")).toBeVisible();
});

test("the practice quiz tile is reachable and presents a question", async ({ page }) => {
  await onboard(page, "Noa", "A1");

  await page.getByRole("button", { name: /חידון/ }).click();
  await expect(page.getByText(/שאלה 1\//)).toBeVisible();
});

test("hash deep link opens settings after onboarding", async ({ page }) => {
  await onboard(page, "Hash", "A1");
  await page.goto("/#/settings");
  await expect(page.getByText("🤖 הגדרות AI")).toBeVisible();
});

test("daily lesson loads and can start the practice quiz", async ({ page }) => {
  await onboard(page, "Lesson", "A1");
  // The lesson is reached from the hub tile (and from חמש ביום); it is
  // deliberately not in the bottom nav.
  await page.getByRole("button", { name: /שיעור יומי/ }).click();
  await expect(page.getByRole("button", { name: /בוא נתרגל/ })).toBeVisible({
    timeout: 30_000,
  });
  await page.getByRole("button", { name: /בוא נתרגל/ }).click();
  await expect(page.getByText(/שאלה 1\//)).toBeVisible();
});

test("vocabulary save word appears on the saved-words screen", async ({ page }) => {
  await onboard(page, "Vocab", "A1");
  await page.getByRole("navigation").getByRole("button", { name: /מילים/ }).click();
  // Wait for flashcards to load from offline content.
  await expect(page.getByRole("button", { name: /שמור את/ }).first()).toBeVisible({
    timeout: 30_000,
  });
  await page.getByRole("button", { name: /שמור את/ }).first().click();
  await page.goto("/#/saved");
  await expect(page.getByText(/מילים שמורות \(1/)).toBeVisible();
});

test("dark mode toggle persists on the settings screen", async ({ page }) => {
  await onboard(page, "Dark", "A1");
  await page.goto("/#/settings");
  await page.getByRole("button", { name: "כבוי" }).first().click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.getByRole("button", { name: "פעיל" }).first()).toBeVisible();
});
