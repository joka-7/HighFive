/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // The bundled per-level lesson/reading/listening/speaking content
        // (src/data/offline/*.json, loaded via dynamic import()) each compile
        // into their own chunk. Route those into assets/content/ so the
        // service worker config below can reliably exclude them from the
        // app-shell precache by path, rather than guessing at Rollup's
        // default chunk-hash naming (which chunk lands where isn't a stable
        // contract to build globIgnores against).
        chunkFileNames: (chunkInfo) => {
          const isOfflineContent = chunkInfo.moduleIds.some((id) =>
            id.includes("/src/data/offline/"),
          );
          return isOfflineContent
            ? "assets/content/[name]-[hash].js"
            : "assets/[name]-[hash].js";
        },
      },
    },
  },
  plugins: [
    react(),
    VitePWA({
      // The app already ships and links its own public/manifest.webmanifest
      // (see index.html) — reuse that instead of generating a second one that
      // could drift from it.
      manifest: false,
      // We register the service worker ourselves (src/services/pwa.ts) so we
      // can show an "update available" prompt instead of silently reloading
      // the app out from under whatever the user is doing.
      injectRegister: false,
      registerType: "prompt",
      workbox: {
        // Precache the app shell (HTML/CSS/JS/icons/fonts) so a cold start
        // with no network still boots the app — this is what makes the
        // manifest's/README's "works offline" claim actually true.
        //
        // The bundled per-level lesson/reading/listening/speaking content
        // (routed into assets/content/ above) is a learner's own level only —
        // several hundred KB to a few MB per chunk — so precaching all six
        // levels for every visitor would be wasteful and, for the larger
        // chunks, exceeds workbox's precache size limit outright. It's
        // excluded from the precache list here; the runtimeCaching rule below
        // instead caches each chunk the first time it's actually fetched, so
        // a level keeps working offline once it's been opened online.
        // (app-icon.png is a large unused asset — see the C2 cleanup item —
        // excluded here too rather than precaching a dead 4MB+ file.)
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webmanifest,woff2}"],
        globIgnores: ["assets/content/**", "app-icon.png"],
        maximumFileSizeToCacheInBytes: 1_500_000,
        navigateFallback: "/index.html",
        runtimeCaching: [
          {
            urlPattern: ({ url, sameOrigin }) =>
              sameOrigin &&
              url.pathname.startsWith("/assets/content/") &&
              url.pathname.endsWith(".js"),
            handler: "CacheFirst",
            options: {
              cacheName: "high5-content-chunks",
              expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
          {
            urlPattern: ({ url }) => url.hostname === "fonts.gstatic.com",
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts",
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
    }),
  ],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
    exclude: ["**/node_modules/**", "e2e/**"],
  },
});
