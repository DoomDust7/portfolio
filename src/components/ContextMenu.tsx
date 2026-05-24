"use client";
import { useEffect, useRef } from "react";

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onOpenTerminal: () => void;
  onActivities: () => void;
}

export default function ContextMenu({
  x,
  y,
  onClose,
  onOpenTerminal,
  onActivities,
}: ContextMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
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
  const menuH = 90;
  const adjX = x + menuW > window.innerWidth ? x - menuW : x;
  const adjY = y + menuH > window.innerHeight ? y - menuH : y;

  return (
    <div
      ref={ref}
      className="context-menu"
      style={{ position: "fixed", top: adjY, left: adjX, zIndex: 9000 }}
    >
      <div
        className="context-item"
        onClick={() => {
          onOpenTerminal();
          onClose();
        }}
      >
        Open Terminal
      </div>

      <div className="context-separator" />

      <div
        className="context-item"
        onClick={() => {
          onActivities();
          onClose();
        }}
      >
        Show Applications
      </div>
    </div>
  );
}
