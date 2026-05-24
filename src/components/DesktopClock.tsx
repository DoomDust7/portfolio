"use client";
import { useEffect, useState } from "react";
import { useWeather } from "@/hooks/useWeather";

export default function DesktopClock() {
  const [now, setNow] = useState<Date | null>(null);
  const weather = useWeather();

  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;

  const timeStr = now.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  const dateStr = now.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  // Weather string: real if loaded, fallback to day/night emoji only
  const hour = now.getHours();
  const fallbackIcon = hour >= 6 && hour < 20 ? "☀️" : "🌙";
  const weatherStr = weather
    ? `${weather.icon}  ${weather.temp}°F`
    : fallbackIcon;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 48,
        left: 16,
        zIndex: 1,
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          fontSize: "0.72rem",
          color: "rgba(255,255,255,0.5)",
          letterSpacing: "0.06em",
          marginBottom: 6,
          textTransform: "uppercase",
          fontFamily: '"Ubuntu", sans-serif',
        }}
      >
        {dateStr} &nbsp;·&nbsp; {weatherStr}
      </div>
      <div
        style={{
          fontSize: "clamp(3rem, 6.5vw, 5rem)",
          fontWeight: 300,
          color: "rgba(255,255,255,0.92)",
          fontFamily: '"Ubuntu", sans-serif',
          lineHeight: 1,
          letterSpacing: "-0.02em",
          textShadow: "0 2px 20px rgba(0,0,0,0.8)",
        }}
      >
        {timeStr}
      </div>
    </div>
  );
}
