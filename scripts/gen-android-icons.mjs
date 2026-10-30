// Regenerates the Android launcher icons and splash screens from the web app's
// icon (public/icon-512.png), so the phone shows the same artwork as the PWA.
// The artwork is full-bleed, so it is the adaptive icon's background layer and
// the foreground layer is left empty; any launcher mask then crops the art
// itself instead of framing it in a second colour.
// Run: node scripts/gen-android-icons.mjs   (needs Playwright's Chromium)
import { chromium } from "@playwright/test";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const RES = "android/app/src/main/res";
// The artwork's own edge blue, so the splash reads as one surface.
const SPLASH_COLOR = "#2457B8";

const icon = `data:image/png;base64,${(await readFile("public/icon-512.png")).toString("base64")}`;

const art = (size, clip = "") =>
  `<div style="width:${size}px;height:${size}px;overflow:hidden;${clip}">
    <img src="${icon}" style="width:100%;height:100%;display:block"></div>`;

const empty = (size) => `<div style="width:${size}px;height:${size}px"></div>`;
const legacy = (size, round) => art(size, round ? "border-radius:50%" : `border-radius:${size * 0.22}px`);
const splash = (w, h) => {
  const side = Math.round(Math.min(w, h) * 0.5);
  return `<div style="width:${w}px;height:${h}px;background:${SPLASH_COLOR};display:flex;align-items:center;justify-content:center">
    ${art(side, `border-radius:${side * 0.22}px`)}</div>`;
};

const DENSITIES = { mdpi: 1, hdpi: 1.5, xhdpi: 2, xxhdpi: 3, xxxhdpi: 4 };
const jobs = [];
for (const [name, scale] of Object.entries(DENSITIES)) {
  const dir = `${RES}/mipmap-${name}`;
  jobs.push([`${dir}/ic_launcher_foreground.png`, empty(108 * scale), 108 * scale, true]);
  jobs.push([`${dir}/ic_launcher_background.png`, art(108 * scale), 108 * scale, false]);
  jobs.push([`${dir}/ic_launcher.png`, legacy(48 * scale, false), 48 * scale, true]);
  jobs.push([`${dir}/ic_launcher_round.png`, legacy(48 * scale, true), 48 * scale, true]);
}
const SPLASH_SIZES = { mdpi: [320, 480], hdpi: [480, 800], xhdpi: [720, 1280], xxhdpi: [960, 1600], xxxhdpi: [1280, 1920] };
for (const [name, [shortSide, longSide]] of Object.entries(SPLASH_SIZES)) {
  jobs.push([`${RES}/drawable-port-${name}/splash.png`, splash(shortSide, longSide), [shortSide, longSide], false]);
  jobs.push([`${RES}/drawable-land-${name}/splash.png`, splash(longSide, shortSide), [longSide, shortSide], false]);
}
jobs.push([`${RES}/drawable/splash.png`, splash(480, 320), [480, 320], false]);

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage();
for (const [file, markup, size, transparent] of jobs) {
  const [w, h] = Array.isArray(size) ? size : [size, size];
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(`<body style="margin:0">${markup}</body>`);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, await page.screenshot({ omitBackground: transparent, clip: { x: 0, y: 0, width: w, height: h } }));
}
await browser.close();
