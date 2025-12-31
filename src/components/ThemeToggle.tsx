"use client";

import { useEffect, useState } from "react";

const THEME_KEY = "theme-preference" as const;

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = theme;
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";

  const stored = window.localStorage.getItem(THEME_KEY) as Theme | null;
  if (stored === "light" || stored === "dark") return stored;

  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    applyTheme(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(THEME_KEY, next);
    }
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Use light mode" : "Use dark mode"}
      className="relative inline-flex h-7 w-11 items-center justify-center rounded-full border border-current bg-transparent text-xs leading-none transition-colors cursor-pointer"
    >
      {/* Track */}
      <span className="absolute inset-0 rounded-full bg-transparent" />

      {/* Thumb with sun/moon combo */}
      <span
        className={`relative flex h-4 w-4 items-center justify-center rounded-full bg-current transition-transform duration-200 ${
          isDark ? "translate-x-2" : "-translate-x-2"
        }`}
      >
        {/* Sun / moon glyph via two dots */}
        <span className={`relative block h-[14px] w-[14px] rounded-full bg-background overflow-hidden ${
          isDark ? "-translate-x-[2px] -translate-y-[1px]" : "" 
        }`}>
        </span>
      </span>
    </button>
  );
}
