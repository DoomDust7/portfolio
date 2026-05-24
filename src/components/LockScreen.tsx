"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LockScreenProps {
  onUnlock: () => void;
}

const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  width: (i * 17 + 31) % 4 + 2,
  height: (i * 13 + 27) % 4 + 2,
  left: (i * 8.3 + 5) % 100,
  top: (i * 9.1 + 7) % 100,
  duration: (i * 1.7 + 4) % 6 + 4,
  delay: (i * 0.7) % 4,
  isPurple: i % 2 === 0,
}));

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      setDate(now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      className="lock-gradient fixed inset-0 flex flex-col items-center justify-center cursor-pointer select-none"
      style={{ zIndex: 9999 }}
      onClick={onUnlock}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: p.width,
              height: p.height,
              left: `${p.left}%`,
              top: `${p.top}%`,
              background: p.isPurple ? "rgba(129,140,248,0.6)" : "rgba(34,211,238,0.4)",
              animation: `floatParticle ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Glowing ring behind clock */}
      <div
        className="absolute"
        style={{
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(129,140,248,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Clock */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center z-10"
      >
        <div
          className="font-thin tracking-tight"
          style={{ fontSize: "clamp(5rem,15vw,9rem)", color: "#e2e8f0", lineHeight: 1 }}
        >
          {time}
        </div>
        <div className="mt-3 text-lg" style={{ color: "#94a3b8" }}>
          {date}
        </div>
      </motion.div>

      {/* Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-16 z-10 flex flex-col items-center gap-2"
      >
        <div className="text-sm" style={{ color: "#64748b" }}>
          Click anywhere to continue
        </div>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          style={{ color: "#64748b" }}
        >
          ↓
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
