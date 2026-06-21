import { test, expect } from "@playwright/test";

test("a new user can register, land on the dashboard, and reach settings", async ({ page }) => {
  await page.goto("/");

  await page.getByPlaceholder("השם שלך").fill("Dana");
  await page.getByRole("button", { name: /בואו נתחיל/ }).click();

  await page.getByRole("button", { name: "✍️ אבחר רמה בעצמי" }).click();
  await page.getByRole("button", { name: "B1", exact: true }).click();

  await expect(page.getByText(/שלום, Dana/)).toBeVisible();
  await expect(page.getByText(/רמה B1/)).toBeVisible();

  await page.getByRole("navigation").getByRole("button", { name: /הגדרות/ }).click();
  await expect(page.getByText("🤖 הגדרות AI")).toBeVisible();
});

test("the practice quiz tile is reachable and presents a question", async ({ page }) => {
  await page.goto("/");

  await page.getByPlaceholder("השם שלך").fill("Noa");
  await page.getByRole("button", { name: /בואו נתחיל/ }).click();
  await page.getByRole("button", { name: "✍️ אבחר רמה בעצמי" }).click();
  await page.getByRole("button", { name: "A1", exact: true }).click();

  await page.getByRole("button", { name: /חידון/ }).click();
  await expect(page.getByText(/שאלה 1\//)).toBeVisible();
});
