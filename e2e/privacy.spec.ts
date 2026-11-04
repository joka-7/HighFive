import { expect, test } from "@playwright/test";

test.describe("Privacy page", () => {
  test("says what leaves the device and links back to the app", async ({ page }) => {
    await page.goto("/privacy.html");

    await expect(page.getByRole("heading", { level: 1, name: "פרטיות" })).toBeVisible();
    await expect(page.getByText(/תיקיית אפליקציה מוסתרת ב-Google Drive שלכם/)).toBeVisible();
    await expect(page.getByText(/אסימון התראה, אזור זמן ושני תאריכים/)).toBeVisible();
    await expect(page.getByRole("link", { name: /חזרה ל-High5/ })).toHaveAttribute("href", "/");
  });
});
