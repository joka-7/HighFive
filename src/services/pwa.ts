import { useEffect, useState } from "react";

// Minimal PWA install + share helpers. The browser fires `beforeinstallprompt`
// when the app is installable; we stash the event so a button can trigger the
// native install flow on demand. Falls back gracefully where unsupported
// (iOS Safari has no such event — users install via the Share menu).

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;

export function usePwaInstall() {
  const [canInstall, setCanInstall] = useState(deferredPrompt !== null);
  const [installed, setInstalled] = useState(
    typeof window !== "undefined" &&
      window.matchMedia?.("(display-mode: standalone)").matches,
  );

  useEffect(() => {
    function onPrompt(e: Event) {
      e.preventDefault();
      deferredPrompt = e as BeforeInstallPromptEvent;
      setCanInstall(true);
    }
    function onInstalled() {
      deferredPrompt = null;
      setCanInstall(false);
      setInstalled(true);
    }
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  async function install() {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    setCanInstall(false);
  }

  return { canInstall, installed, install };
}

export function canShare(): boolean {
  return typeof navigator !== "undefined" && typeof navigator.share === "function";
}

export async function shareApp(): Promise<void> {
  if (!canShare()) return;
  try {
    await navigator.share({
      title: "High5 — לומדים אנגלית בכיף",
      text: "אפליקציה ללימוד אנגלית בעברית: שיעורים, אוצר מילים, קריאה, האזנה ודיבור. נסו אותה!",
      url: typeof window !== "undefined" ? window.location.origin : undefined,
    });
  } catch {
    // User cancelled the share sheet — nothing to do.
  }
}
