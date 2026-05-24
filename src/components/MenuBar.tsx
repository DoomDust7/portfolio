"use client";
import { useEffect, useState } from "react";
import { Wifi, Battery, Bell, Grid3x3 } from "lucide-react";

interface MenuBarProps {
  onActivities: () => void;
}

export default function MenuBar({ onActivities }: MenuBarProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const hour = now ? now.getHours() : new Date().getHours();
  const isDay = hour >= 6 && hour < 20;
  const weather = isDay ? "☀️ 95°F" : "🌙 78°F";

  const timeStr = now
    ? now.toLocaleTimeString([], {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div
      className="fixed top-0 left-0 right-0 flex items-center"
      style={{
        height: 32,
        background: "rgba(24,24,24,0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        zIndex: 5000,
        fontSize: 13,
        color: "#e2e8f0",
      }}
    >
      {/* Left: Activities */}
      <button
        onClick={onActivities}
        className="flex items-center gap-2 px-4 h-full font-semibold transition-all hover:bg-white/5"
        style={{ color: "var(--accent-orange)" }}
      >
        <Grid3x3 size={14} />
        Activities
      </button>

      {/* Center: Clock */}
      <div
        className="absolute left-1/2 -translate-x-1/2 text-sm font-medium"
        style={{ color: "#e2e8f0" }}
      >
        {timeStr}
      </div>

      {/* Right: System tray */}
      <div
        className="ml-auto flex items-center gap-3 px-4 h-full"
        style={{ color: "#94a3b8" }}
      >
        {/* Weather chip */}
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full"
          style={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.10)",
            color: isDay ? "#fbbf24" : "#93c5fd",
            fontSize: "0.7rem",
          }}
        >
          {weather}
        </span>
        <span className="text-xs font-medium" style={{ color: "#cbd5e1" }}>
          Manav
        </span>
        <Bell size={13} />
        <Wifi size={13} />
        <Battery size={13} />
      </div>
    </div>
  );
}
