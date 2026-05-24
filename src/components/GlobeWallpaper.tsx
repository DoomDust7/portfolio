"use client";
import dynamic from "next/dynamic";
import { useRef } from "react";

// Dynamically import react-globe.gl to avoid SSR issues
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false }) as React.ComponentType<any>;

export default function GlobeWallpaper() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeRef = useRef<any>(null);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        background: "#030610",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Subtle starfield overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.85) 1px, transparent 0)",
          backgroundSize: "180px 180px",
          opacity: 0.1,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)"
        atmosphereColor="#4a9eff"
        atmosphereAltitude={0.18}
        enablePointerInteraction={false}
        animateIn
        onGlobeReady={() => {
          const ctrl = globeRef.current?.controls();
          if (ctrl) {
            ctrl.autoRotate = true;
            ctrl.autoRotateSpeed = 0.5;
          }
        }}
      />
    </div>
  );
}
