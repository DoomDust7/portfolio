"use client";
import { useEffect, useRef, useState } from "react";
import { WALLPAPERS } from "@/lib/data";

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onChangeWallpaper: (css: string) => void;
  onOpenTerminal: () => void;
  onActivities: () => void;
}

export default function ContextMenu({
  x,
  y,
  onClose,
  onChangeWallpaper,
  onOpenTerminal,
  onActivities,
}: ContextMenuProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [showWallpapers, setShowWallpapers] = useState(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const keyHandler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    setTimeout(() => {
      document.addEventListener("mousedown", handler);
      document.addEventListener("keydown", keyHandler);
    }, 0);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", keyHandler);
    };
  }, [onClose]);

  // Adjust position so menu stays in viewport
  const menuW = 192;
  const menuH = showWallpapers ? 280 : 120;
  const adjX = x + menuW > window.innerWidth ? x - menuW : x;
  const adjY = y + menuH > window.innerHeight ? y - menuH : y;

  return (
    <div
      ref={ref}
      className="context-menu"
      style={{ position: "fixed", top: adjY, left: adjX, zIndex: 9000 }}
    >
      {/* Change Wallpaper */}
      <div
        className="context-item"
        onClick={() => setShowWallpapers((v) => !v)}
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        <span>Change Wallpaper</span>
        <span style={{ color: "#64748b", fontSize: "0.7rem" }}>▶</span>
      </div>

      {showWallpapers && (
        <div style={{ paddingLeft: 8, paddingRight: 4 }}>
          {WALLPAPERS.map((w) => (
            <div
              key={w.id}
              className="context-item flex items-center gap-2"
              onClick={() => { onChangeWallpaper(w.css); onClose(); }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 3,
                  background: w.css,
                  border: "1px solid rgba(255,255,255,0.15)",
                  flexShrink: 0,
                }}
              />
              {w.label}
            </div>
          ))}
        </div>
      )}

      <div className="context-separator" />

      <div
        className="context-item"
        onClick={() => { onOpenTerminal(); onClose(); }}
      >
        Open Terminal
      </div>

      <div
        className="context-item"
        onClick={() => { onActivities(); onClose(); }}
      >
        Show Applications
      </div>
    </div>
  );
}
