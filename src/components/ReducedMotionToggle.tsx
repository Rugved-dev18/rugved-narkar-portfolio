import { useEffect, useState } from "react";

const STORAGE_KEY = "reduced-motion";

export const getInitialReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored !== null) return stored === "true";
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const applyReducedMotion = (enabled: boolean) => {
  const root = document.documentElement;
  if (enabled) root.setAttribute("data-reduced-motion", "true");
  else root.removeAttribute("data-reduced-motion");
};

const ReducedMotionToggle = () => {
  const [enabled, setEnabled] = useState<boolean>(() => getInitialReducedMotion());

  useEffect(() => {
    applyReducedMotion(enabled);
    localStorage.setItem(STORAGE_KEY, String(enabled));
  }, [enabled]);

  const toggle = () => setEnabled((v) => !v);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? "Disable reduced motion" : "Enable reduced motion"}
      title={enabled ? "Reduced motion: on" : "Reduced motion: off"}
      className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-primary/30 text-primary/80 hover:text-primary hover:border-primary/60 transition-colors"
    >
      {enabled ? (
        // Motion off icon
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 3l18 18" />
          <path d="M5 12h6" />
          <path d="M13 12h6" />
          <circle cx="12" cy="12" r="9" opacity="0.4" />
        </svg>
      ) : (
        // Motion on icon
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 12h4l2-6 4 12 2-6h4" />
        </svg>
      )}
    </button>
  );
};

export default ReducedMotionToggle;
