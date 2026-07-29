/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // The bundled per-level-per-quarter lesson/reading/listening/speaking
        // content (src/data/offline/*.json, loaded via dynamic import()) each
        // compile into their own chunk. Route those into assets/content/ so
        // the service worker config below can reliably exclude them from the
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
        // Groups React and Firebase into their own vendor chunks instead of
        // Rollup's default of inlining them into whichever entry/dynamic
        // chunk happens to import them first. Both change far less often
        // than app code, so splitting them out means a normal app-code
        // deploy doesn't force everyone to redownload React/Firebase too —
        // their chunk's hash (and cache) stays put.
        manualChunks(id) {
          if (id.includes("/src/data/offline/")) return undefined;
          if (!id.includes("node_modules")) return undefined;
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return "vendor-react";
          if (/node_modules\/@?firebase/.test(id)) return "vendor-firebase";
          return undefined;
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
        // The bundled per-level-per-quarter lesson/reading/listening/speaking
        // content (routed into assets/content/ above) is a learner's own
        // level and current quarter only — tens to a few hundred KB per
        // chunk — so precaching all six levels' full year for every visitor
        // would still be wasteful. Firebase (~555 KB, see manualChunks above)
        // is similarly only needed by users who actually sign in for cloud
        // sync — most stay in Local mode and never touch it. Both are
        // excluded from the precache list here; the runtimeCaching rules
        // below instead cache each the first time it's actually fetched, so
        // they keep working offline once they've been used online once.
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webmanifest,woff2}"],
        globIgnores: ["assets/content/**", "assets/vendor-firebase-*.js"],
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
            urlPattern: ({ url, sameOrigin }) =>
              sameOrigin && /\/assets\/vendor-firebase-.*\.js$/.test(url.pathname),
            handler: "CacheFirst",
            options: {
              cacheName: "high5-vendor-firebase",
              expiration: { maxEntries: 5, maxAgeSeconds: 60 * 60 * 24 * 30 },
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
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      include: ["src/store/**", "src/services/**", "src/utils/**"],
      // Floor — raise over time as more of the store/content paths are covered.
      thresholds: {
        lines: 35,
        functions: 35,
        statements: 35,
      },
    },
  },
});
