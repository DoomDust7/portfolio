"use client";
import { motion } from "framer-motion";

interface AppIconProps {
  id: string;
  label: string;
  icon: string;
  onOpen: (id: string) => void;
}

export default function AppIcon({ id, label, icon, onOpen }: AppIconProps) {
  return (
    <motion.div
      className="flex flex-col items-center gap-1.5 cursor-pointer w-16"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      onDoubleClick={() => onOpen(id)}
      onClick={() => onOpen(id)}
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
        }}
      >
        {icon}
      </div>
      <span
        className="text-center text-xs font-medium leading-tight"
        style={{
          color: "#e2e8f0",
          textShadow: "0 1px 4px rgba(0,0,0,0.8)",
          maxWidth: 60,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}
