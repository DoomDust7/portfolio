"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LockScreen from "@/components/LockScreen";
import Desktop from "@/components/Desktop";

export default function Home() {
  const [locked, setLocked] = useState(true);

  return (
    <div className="h-full w-full overflow-hidden" style={{ background: "var(--bg-base)" }}>
      <AnimatePresence>
        {locked && (
          <motion.div key="lock" exit={{ y: "-100%", opacity: 0 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
            <LockScreen onUnlock={() => setLocked(false)} />
          </motion.div>
        )}
      </AnimatePresence>
      {!locked && <Desktop />}
    </div>
  );
}
