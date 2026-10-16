import { useEffect, useState } from "react";
import { getInitialReducedMotion } from "./ReducedMotionToggle";

const STORAGE_KEY = "perf-hint-dismissed";
const SHOW_DELAY_MS = 1800;
const AUTO_HIDE_MS = 12000;

const PerformanceHint = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = localStorage.getItem(STORAGE_KEY) === "true";
    } catch {}

    // Visitors who already run reduced motion don't need the hint.
    if (dismissed || getInitialReducedMotion()) return;

    let autoHide: number | undefined;
    const showTimer = window.setTimeout(() => {
      setVisible(true);
      autoHide = window.setTimeout(() => setVisible(false), AUTO_HIDE_MS);
    }, SHOW_DELAY_MS);

    return () => {
      window.clearTimeout(showTimer);
      if (autoHide) window.clearTimeout(autoHide);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {}
  };

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-20 right-3 sm:right-6 z-40 max-w-[17rem] glass rounded-xl px-4 py-3 pr-8 text-left"
    >
      <p className="text-xs leading-relaxed text-muted-foreground">
        Animations are on for the full experience. If the page feels heavy on
        your device, tap the{" "}
        <span className="text-primary font-medium">motion button</span> in the
        top bar to turn them off.
      </p>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss performance tip"
        className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </div>
  );
};

export default PerformanceHint;
