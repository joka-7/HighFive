import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LingoProvider } from "./store/useLingo";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LingoProvider>
      <App />
    </LingoProvider>
  </StrictMode>,
);
