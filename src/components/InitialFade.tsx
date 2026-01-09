"use client";

import React, { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
  delay?: number; // seconds
};

const STORAGE_KEY = "hasSeenInitialHomeAnimation";

export function InitialFade({ children, delay = 0 }: Props) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const alreadySeen = window.sessionStorage.getItem(STORAGE_KEY);
    if (alreadySeen) {
      setAnimate(false);
      return;
    }

    // First time: run animation and remember
    setAnimate(true);
    window.sessionStorage.setItem(STORAGE_KEY, "1");
  }, []);

  if (!animate) {
    return <>{children}</>;
  }

  return (
    <div
      className="fade-seq"
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
