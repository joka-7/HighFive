import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LingoProvider } from "./store/useLingo";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import { applyTheme, loadPrefs } from "./services/prefs";
import "./index.css";

// Apply the saved theme before first paint to avoid a flash of the wrong theme.
applyTheme(loadPrefs().theme);

// Mobile browsers skip :active/tap-highlight rendering on pages with no
// touch listeners (treated as passively scrollable) -- this one-time no-op
// listener makes tap feedback on the footer icon links actually render.
document.addEventListener("touchstart", () => {}, { passive: true });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <LingoProvider>
        <App />
      </LingoProvider>
    </ErrorBoundary>
  </StrictMode>,
);
