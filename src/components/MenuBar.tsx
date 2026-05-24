"use client";
import { useEffect, useState } from "react";
import { Wifi, Battery } from "lucide-react";

export default function MenuBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString([], { weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 flex items-center justify-between px-4"
      style={{
        height: 28,
        background: "rgba(8,12,20,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        zIndex: 5000,
        fontSize: 13,
        color: "#e2e8f0",
      }}
    >
      <span className="font-semibold" style={{ color: "var(--accent-purple)" }}>
        Manav&apos;s Portfolio
      </span>
      <div className="flex items-center gap-3" style={{ color: "#94a3b8" }}>
        <Wifi size={13} />
        <Battery size={13} />
        <span>{time}</span>
      </div>
    </div>
  );
}
