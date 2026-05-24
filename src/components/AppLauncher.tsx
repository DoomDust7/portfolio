"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { apps } from "@/lib/data";
import { APP_ICONS } from "@/lib/appIcons";

interface AppLauncherProps {
  onClose: () => void;
  onOpen: (id: string) => void;
}

type Tab = "frequent" | "all";

const FREQUENT_IDS = ["about", "terminal", "projects", "spotify", "journey", "contact"];
const FREQUENT_APPS = FREQUENT_IDS.map((id) => apps.find((a) => a.id === id)!).filter(Boolean);

export default function AppLauncher({ onClose, onOpen }: AppLauncherProps) {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<Tab>("frequent");
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

  const isSearching = query.trim().length > 0;

  const displayed = isSearching
    ? apps.filter((a) => a.label.toLowerCase().includes(query.toLowerCase()))
    : tab === "frequent"
    ? FREQUENT_APPS
    : apps;

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
        background: "rgba(3,6,16,0.85)",
        backdropFilter: "blur(20px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 80,
        paddingBottom: 80,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Search bar */}
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-2xl w-full max-w-md mb-10"
        style={{
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.14)",
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
        style={{ maxWidth: 600, gridTemplateColumns: "repeat(4, 1fr)", flex: 1 }}
      >
        {displayed.map((app) => (
          <motion.button
            key={app.id}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            className="launcher-card flex flex-col items-center gap-3"
            onClick={() => {
              onOpen(app.id);
              onClose();
            }}
          >
            <div style={{ position: "relative", width: 56, height: 56 }}>
              <Image
                src={APP_ICONS[app.id]}
                alt={app.label}
                fill
                className="object-contain"
                sizes="56px"
              />
            </div>
            <span className="text-xs font-medium" style={{ color: "#e2e8f0" }}>
              {app.label}
            </span>
          </motion.button>
        ))}
        {displayed.length === 0 && (
          <div
            className="col-span-4 text-center py-12 text-sm"
            style={{ color: "#64748b" }}
          >
            No apps match &quot;{query}&quot;
          </div>
        )}
      </div>

      {/* Tab bar at bottom — hidden during search */}
      {!isSearching && (
        <div
          className="flex items-center gap-1 mt-8"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: 9999,
            padding: "4px",
          }}
        >
          {(["frequent", "all"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "6px 20px",
                borderRadius: 9999,
                fontSize: "0.75rem",
                fontWeight: 600,
                fontFamily: '"Ubuntu", sans-serif',
                textTransform: "capitalize",
                border: "none",
                cursor: "pointer",
                transition: "all 0.15s ease",
                background: tab === t ? "var(--accent-orange)" : "transparent",
                color: tab === t ? "#fff" : "rgba(255,255,255,0.5)",
              }}
            >
              {t === "frequent" ? "Frequent" : "All"}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
