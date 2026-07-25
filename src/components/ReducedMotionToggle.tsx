import { useEffect, useState } from "react";

const STORAGE_KEY = "reduced-motion";

export const getInitialReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) return stored === "true";
  } catch {}
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
    try {
      localStorage.setItem(STORAGE_KEY, String(enabled));
    } catch {}
  }, [enabled]);

  const toggle = () => setEnabled((v) => !v);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    // role="switch" convention: Space/Enter toggle. Buttons already do this,
    // but we also honor ArrowLeft/ArrowRight to explicitly set state.
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setEnabled(true);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setEnabled(false);
    }
  };

  const label = enabled ? "Reduced motion on" : "Reduced motion off";
  const description = enabled
    ? "Animations are minimized"
    : "Animations are enabled";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      aria-describedby="reduced-motion-desc"
      title={label}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      className={[
        "group relative inline-flex items-center justify-center w-10 h-10 rounded-full",
        "border transition-colors duration-200",
        enabled
          ? "border-primary/70 text-primary bg-primary/10"
          : "border-primary/30 text-primary/80 hover:text-primary hover:border-primary/60",
        // Visible, high-contrast focus ring for keyboard users
        "focus:outline-none focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "focus-visible:ring-offset-background",
      ].join(" ")}
    >
      <span id="reduced-motion-desc" className="sr-only">
        {description}. Press Space or Enter to toggle.
      </span>
      {enabled ? (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="12" cy="12" r="9" opacity="0.4" />
          <path d="M5 12h6" />
          <path d="M13 12h6" />
          <path d="M3 3l18 18" />
        </svg>
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M4 12h4l2-6 4 12 2-6h4" />
        </svg>
      )}
    </button>
  );
};

export default ReducedMotionToggle;
