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

    // Always run animation on mount
    setAnimate(true);
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
