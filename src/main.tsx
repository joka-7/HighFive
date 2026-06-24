import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LingoProvider } from "./store/useLingo";
import App from "./App";
import { applyTheme, loadPrefs } from "./services/prefs";
import "./index.css";

// Apply the saved theme before first paint to avoid a flash of the wrong theme.
applyTheme(loadPrefs().theme);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LingoProvider>
      <App />
    </LingoProvider>
  </StrictMode>,
);
