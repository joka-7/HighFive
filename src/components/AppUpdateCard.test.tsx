import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import AppUpdateCard from "./AppUpdateCard";
import { checkForUpdate, readInstalledApp, type InstalledApp } from "../services/appUpdate";
import { isNativeApp } from "../services/platform";
import { ANDROID_APK_URL } from "../utils/androidApk";

vi.mock("../services/platform", () => ({ isNativeApp: vi.fn() }));
vi.mock("../services/errors", () => ({ reportError: vi.fn() }));
vi.mock("../services/appUpdate", () => ({
  checkForUpdate: vi.fn(),
  readInstalledApp: vi.fn(),
}));

const installed: InstalledApp = { build: 100, version: "1.0.100" };

beforeEach(() => {
  vi.mocked(isNativeApp).mockReturnValue(true);
  vi.mocked(readInstalledApp).mockResolvedValue(installed);
});

describe("AppUpdateCard", () => {
  it("renders nothing in a browser", () => {
    vi.mocked(isNativeApp).mockReturnValue(false);
    const { container } = render(<AppUpdateCard />);
    expect(container.firstChild).toBeNull();
  });

  it("shows the installed version and, after a check, says the app is current", async () => {
    vi.mocked(checkForUpdate).mockResolvedValue({ status: "current", installed });
    render(<AppUpdateCard />);

    expect(await screen.findByText("הגרסה המותקנת: 1.0.100")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /בדיקת עדכונים/ }));

    expect(await screen.findByText("✅ האפליקציה מעודכנת.")).toBeTruthy();
  });

  it("offers the APK download when a newer version exists", async () => {
    vi.mocked(checkForUpdate).mockResolvedValue({ status: "available", installed, latestVersion: "1.0.101" });
    render(<AppUpdateCard />);

    fireEvent.click(screen.getByRole("button", { name: /בדיקת עדכונים/ }));

    expect(await screen.findByText("🎉 גרסה חדשה זמינה: 1.0.101")).toBeTruthy();
    expect(screen.getByRole("link", { name: /הורדה ועדכון/ }).getAttribute("href")).toBe(ANDROID_APK_URL);
  });

  it("shows a retryable error when the check fails", async () => {
    vi.mocked(checkForUpdate).mockRejectedValue(new Error("offline"));
    render(<AppUpdateCard />);

    fireEvent.click(screen.getByRole("button", { name: /בדיקת עדכונים/ }));

    expect(await screen.findByText(/לא הצלחנו לבדוק עדכונים/)).toBeTruthy();
    expect(screen.getByRole("button", { name: /בדיקת עדכונים/ })).toHaveProperty("disabled", false);
  });
});
