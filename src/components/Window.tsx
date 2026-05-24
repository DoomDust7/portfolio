"use client";
import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { AnimatePresence, motion } from "framer-motion";

interface WindowProps {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  defaultPosition: { x: number; y: number };
  defaultSize: { width: number; height: number };
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  children: React.ReactNode;
}

export default function Window({
  title,
  icon,
  isOpen,
  isMinimized,
  isMaximized,
  zIndex,
  defaultPosition,
  defaultSize,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  children,
}: WindowProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const windowStyle = isMaximized || isMobile
    ? { top: 28, left: 0, right: 0, bottom: 56, width: "100%", height: "calc(100% - 84px)" }
    : { width: defaultSize.width, height: defaultSize.height };

  return (
    <AnimatePresence>
      {isOpen && !isMinimized && (
        <Draggable
          nodeRef={nodeRef as React.RefObject<HTMLElement>}
          handle=".window-titlebar"
          disabled={isMaximized || isMobile}
          defaultPosition={defaultPosition}
          bounds="parent"
        >
          <motion.div
            ref={nodeRef}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              position: "absolute",
              zIndex,
              ...(isMaximized || isMobile ? windowStyle : { width: defaultSize.width, height: defaultSize.height }),
            }}
            className="rounded-xl overflow-hidden shadow-2xl flex flex-col"
            onClick={onFocus}
          >
            {/* Title bar */}
            <div
              className="window-titlebar flex items-center gap-3 px-3 py-2 flex-shrink-0"
              style={{
                background: "#1a2235",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                minHeight: 40,
              }}
            >
              {/* Traffic lights */}
              <div className="flex items-center gap-1.5">
                <button
                  className="traffic-red w-3 h-3 rounded-full hover:brightness-110 transition-all"
                  onClick={(e) => { e.stopPropagation(); onClose(); }}
                  aria-label="Close"
                />
                <button
                  className="traffic-yellow w-3 h-3 rounded-full hover:brightness-110 transition-all"
                  onClick={(e) => { e.stopPropagation(); onMinimize(); }}
                  aria-label="Minimize"
                />
                <button
                  className="traffic-green w-3 h-3 rounded-full hover:brightness-110 transition-all"
                  onClick={(e) => { e.stopPropagation(); onMaximize(); }}
                  aria-label="Maximize"
                />
              </div>
              <div className="flex items-center gap-2 flex-1 justify-center">
                <span className="text-base">{icon}</span>
                <span className="text-sm font-medium" style={{ color: "#94a3b8" }}>{title}</span>
              </div>
            </div>

            {/* Content */}
            <div
              className="flex-1 overflow-hidden"
              style={{ background: "var(--bg-window)", minHeight: 0 }}
            >
              {children}
            </div>
          </motion.div>
        </Draggable>
      )}
    </AnimatePresence>
  );
}
