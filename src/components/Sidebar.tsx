"use client";
import { useState } from "react";
import { Grid3x3 } from "lucide-react";
import { apps } from "@/lib/data";

interface SidebarProps {
  openApps: Set<string>;
  onOpen: (id: string) => void;
  onActivities: () => void;
}

export default function Sidebar({ openApps, onOpen, onActivities }: SidebarProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      className="ubuntu-sidebar fixed left-0 flex flex-col items-center py-2 gap-1"
      style={{ top: 32, bottom: 0, zIndex: 4000 }}
    >
      {/* Activities button */}
      <div
        className="relative flex items-center justify-center"
        onMouseEnter={() => setHovered("__activities__")}
        onMouseLeave={() => setHovered(null)}
      >
        <button
          onClick={onActivities}
          className="w-11 h-11 rounded-lg flex items-center justify-center transition-all"
          style={{
            background: hovered === "__activities__" ? "rgba(233,84,32,0.2)" : "rgba(255,255,255,0.06)",
            color: hovered === "__activities__" ? "var(--accent-orange)" : "#94a3b8",
          }}
          aria-label="Activities"
        >
          <Grid3x3 size={22} />
        </button>
        {hovered === "__activities__" && (
          <div
            className="absolute left-14 whitespace-nowrap px-2 py-1 rounded text-xs pointer-events-none"
            style={{
              background: "rgba(15,22,35,0.95)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#e2e8f0",
              zIndex: 9999,
            }}
          >
            Activities
          </div>
        )}
      </div>

      {/* Separator */}
      <div style={{ width: 36, height: 1, background: "rgba(255,255,255,0.12)", margin: "4px 0" }} />

      {/* App icons */}
      {apps.map((app) => {
        const isOpen = openApps.has(app.id);
        return (
          <div
            key={app.id}
            className="relative flex items-center justify-center"
            onMouseEnter={() => setHovered(app.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Active indicator bar */}
            {isOpen && <div className="sidebar-active-bar" />}

            <button
              onClick={() => onOpen(app.id)}
              className="w-11 h-11 rounded-xl flex items-center justify-center text-xl transition-all"
              style={{
                background: isOpen
                  ? "rgba(233,84,32,0.15)"
                  : hovered === app.id
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(255,255,255,0.05)",
                border: isOpen ? "1px solid rgba(233,84,32,0.3)" : "1px solid rgba(255,255,255,0.07)",
                transform: hovered === app.id ? "scale(1.12)" : "scale(1)",
              }}
              aria-label={app.label}
            >
              {app.icon}
            </button>

            {/* Open dot indicator */}
            {isOpen && (
              <div
                style={{
                  position: "absolute",
                  right: -6,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: "#fff",
                }}
              />
            )}

            {/* Tooltip */}
            {hovered === app.id && (
              <div
                className="absolute left-14 whitespace-nowrap px-2 py-1 rounded text-xs pointer-events-none"
                style={{
                  background: "rgba(15,22,35,0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#e2e8f0",
                  zIndex: 9999,
                }}
              >
                {app.label}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
