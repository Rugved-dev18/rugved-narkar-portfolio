import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Apply persisted reduced-motion preference before first paint
try {
  const stored = localStorage.getItem("reduced-motion");
  const enabled =
    stored !== null
      ? stored === "true"
      : window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (enabled) document.documentElement.setAttribute("data-reduced-motion", "true");
} catch {}

createRoot(document.getElementById("root")!).render(<App />);
