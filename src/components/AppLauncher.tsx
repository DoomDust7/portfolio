"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { apps } from "@/lib/data";

interface AppLauncherProps {
  onClose: () => void;
  onOpen: (id: string) => void;
}

export default function AppLauncher({ onClose, onOpen }: AppLauncherProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const filtered = apps.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 8000,
        background: "rgba(8,12,20,0.88)",
        backdropFilter: "blur(16px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 80,
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Search bar */}
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-2xl w-full max-w-md mb-10"
        style={{
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <Search size={18} style={{ color: "#64748b", flexShrink: 0 }} />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search applications…"
          className="flex-1 bg-transparent outline-none text-sm"
          style={{ color: "#e2e8f0" }}
        />
      </div>

      {/* App grid */}
      <div
        className="grid gap-4 w-full px-8"
        style={{ maxWidth: 640, gridTemplateColumns: "repeat(4, 1fr)" }}
      >
        {filtered.map((app) => (
          <motion.button
            key={app.id}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            className="launcher-card flex flex-col items-center gap-2"
            onClick={() => { onOpen(app.id); onClose(); }}
          >
            <span className="text-3xl">{app.icon}</span>
            <span className="text-xs font-medium" style={{ color: "#e2e8f0" }}>
              {app.label}
            </span>
          </motion.button>
        ))}
        {filtered.length === 0 && (
          <div
            className="col-span-4 text-center py-12 text-sm"
            style={{ color: "#64748b" }}
          >
            No apps match &quot;{query}&quot;
          </div>
        )}
      </div>

      <p className="mt-12 text-xs" style={{ color: "#475569" }}>
        Press Esc to close
      </p>
    </motion.div>
  );
}
