"use client";

import React, { useEffect, useRef } from "react";
import Script from "next/script";

type Props = {
  src: string;
};

export function ModelViewer({ src }: Props) {
  const viewerRef = useRef<any | null>(null);

  useEffect(() => {
    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
    const el = viewerRef.current as any | null;

    if (!isDesktop || !el) return;

    // Disable auto-rotate and built-in controls on desktop so we control orbit manually
    el.removeAttribute("auto-rotate");
    el.removeAttribute("camera-controls");
    el.setAttribute("interaction-policy", "none");

    // Set a fixed camera distance so there is absolutely no zooming
    const baseTheta = 0; // straight on
    const basePhi = 70; // slightly above
    const radius = 4.5; // slightly farther than original, but not too small
    el.setAttribute("camera-orbit", `${baseTheta}deg ${basePhi}deg ${radius}m`);
    el.setAttribute("min-camera-orbit", `auto auto ${radius}m`);
    el.setAttribute("max-camera-orbit", `auto auto ${radius}m`);

    const handleMove = (event: MouseEvent) => {
      if (!el) return;
      const { innerWidth, innerHeight } = window;
      const xNorm = event.clientX / innerWidth; // 0..1
      const yNorm = event.clientY / innerHeight; // 0..1

      // Map cursor position to azimuth (theta) and a stronger vertical tilt (phi)
      // Invert theta so the head turns toward the cursor
      const theta = 45 - xNorm * 90; 
      const phi = 120 - yNorm * 60; 

      el.setAttribute("camera-orbit", `${theta}deg ${phi}deg ${radius}m`);
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <>
      <Script
        src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
        type="module"
        strategy="afterInteractive"
      />
      {React.createElement("model-viewer" as any, {
        ref: viewerRef,
        src,
        "camera-controls": true,
        // Auto-rotate stays enabled on mobile; removed in effect on desktop
        "auto-rotate": true,
        // Disable zoom completely
        "disable-zoom": true,
        style: {
          width: "280px",
          height: "280px",
          maxWidth: "100%",
        },
      })}
    </>
  );
}
