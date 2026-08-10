// Module resolve hook for plain `node` runs of the app's TypeScript sources.
//
// Node strips TypeScript types on its own, but it won't guess extensions, and
// the app writes imports the TypeScript way (`from "../types"`). This retries a
// failed relative specifier with .ts/.tsx so scripts/content-report.mjs can
// import src/data/*.ts directly instead of needing a bundler.

export async function resolve(specifier, context, next) {
  try {
    return await next(specifier, context);
  } catch (err) {
    if (specifier.startsWith(".")) {
      for (const ext of [".ts", ".tsx", "/index.ts"]) {
        try {
          return await next(specifier + ext, context);
        } catch {
          // Fall through to the original error if no extension resolves.
        }
      }
    }
    throw err;
  }
}
