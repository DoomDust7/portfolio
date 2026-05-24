"use client";
import { useState } from "react";
import Image from "next/image";
import { APP_ICONS } from "@/lib/appIcons";

const DESKTOP_APPS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "terminal", label: "Terminal" },
  { id: "spotify", label: "Spotify" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

interface DesktopIconsProps {
  onOpen: (id: string) => void;
}

export default function DesktopIcons({ onOpen }: DesktopIconsProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      style={{
        position: "absolute",
        right: 16,
        top: 16,
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        pointerEvents: "auto",
      }}
    >
      {DESKTOP_APPS.map((app) => (
        <button
          key={app.id}
          onClick={() => onOpen(app.id)}
          onMouseEnter={() => setHovered(app.id)}
          onMouseLeave={() => setHovered(null)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            padding: "8px 6px",
            borderRadius: 8,
            background: hovered === app.id ? "rgba(255,255,255,0.12)" : "transparent",
            border: "none",
            cursor: "pointer",
            width: 72,
            transition: "background 0.15s ease",
          }}
          aria-label={app.label}
        >
          <div style={{ position: "relative", width: 40, height: 40 }}>
            <Image
              src={APP_ICONS[app.id]}
              alt={app.label}
              fill
              className="object-contain"
              sizes="40px"
            />
          </div>
          <span
            style={{
              fontSize: "0.65rem",
              color: "rgba(255,255,255,0.85)",
              textAlign: "center",
              textShadow: "0 1px 4px rgba(0,0,0,0.9)",
              whiteSpace: "nowrap",
              fontFamily: '"Ubuntu", sans-serif',
            }}
          >
            {app.label}
          </span>
        </button>
      ))}
    </div>
  );
}
