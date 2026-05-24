"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { apps } from "@/lib/data";

interface DockProps {
  openApps: Set<string>;
  onOpen: (id: string) => void;
}

export default function Dock({ openApps, onOpen }: DockProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      className="fixed bottom-3 left-1/2 -translate-x-1/2 flex items-end gap-2 px-3 py-2 rounded-2xl"
      style={{
        background: "var(--dock-bg)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        zIndex: 4000,
      }}
    >
      {apps.map((app) => (
        <div
          key={app.id}
          className="relative flex flex-col items-center"
          onMouseEnter={() => setHovered(app.id)}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Tooltip */}
          {hovered === app.id && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -top-8 whitespace-nowrap px-2 py-0.5 rounded text-xs"
              style={{
                background: "rgba(15,22,35,0.95)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#e2e8f0",
              }}
            >
              {app.label}
            </motion.div>
          )}

          {/* Icon */}
          <motion.button
            whileHover={{ scale: 1.4, y: -8 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            onClick={() => onOpen(app.id)}
            className="text-2xl w-12 h-12 flex items-center justify-center rounded-xl cursor-pointer"
            style={{
              background: openApps.has(app.id)
                ? "rgba(129,140,248,0.15)"
                : "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            aria-label={app.label}
          >
            {app.icon}
          </motion.button>

          {/* Open indicator dot */}
          {openApps.has(app.id) && (
            <div className="dock-dot mt-1" />
          )}
        </div>
      ))}
    </div>
  );
}
