"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Draggable from "react-draggable";
import { AnimatePresence, motion } from "framer-motion";
import { APP_ICONS } from "@/lib/appIcons";

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
  id,
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
  const [size, setSize] = useState({ width: defaultSize.width, height: defaultSize.height });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const onResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startW = size.width;
    const startH = size.height;
    const onMove = (ev: MouseEvent) => {
      setSize({
        width: Math.max(320, startW + ev.clientX - startX),
        height: Math.max(240, startH + ev.clientY - startY),
      });
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const effectiveSize =
    isMaximized || isMobile
      ? { width: "100%", height: "100%" }
      : { width: size.width, height: size.height };

  const positionStyle =
    isMaximized || isMobile ? { top: 32, left: 64, right: 0, bottom: 0 } : {};

  const svgIcon = APP_ICONS[id];

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
              ...effectiveSize,
              ...positionStyle,
            }}
            className="rounded-xl overflow-hidden shadow-2xl flex flex-col"
            onClick={onFocus}
          >
            {/* Title bar */}
            <div
              className="window-titlebar flex items-center gap-3 px-3 py-2 flex-shrink-0"
              style={{
                background: "var(--window-chrome)",
                borderBottom: "1px solid var(--window-border)",
                minHeight: 40,
              }}
            >
              {/* Traffic lights */}
              <div className="flex items-center gap-1.5">
                <button
                  className="traffic-red w-3 h-3 rounded-full hover:brightness-110 transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  aria-label="Close"
                />
                <button
                  className="traffic-yellow w-3 h-3 rounded-full hover:brightness-110 transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMinimize();
                  }}
                  aria-label="Minimize"
                />
                <button
                  className="traffic-green w-3 h-3 rounded-full hover:brightness-110 transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMaximize();
                  }}
                  aria-label="Maximize"
                />
              </div>

              {/* Title + icon */}
              <div className="flex items-center gap-2 flex-1 justify-center">
                {svgIcon ? (
                  <div style={{ position: "relative", width: 18, height: 18, flexShrink: 0 }}>
                    <Image
                      src={svgIcon}
                      alt={title}
                      fill
                      className="object-contain"
                      sizes="18px"
                    />
                  </div>
                ) : (
                  <span className="text-base">{icon}</span>
                )}
                <span className="text-sm font-medium" style={{ color: "#94a3b8" }}>
                  {title}
                </span>
              </div>
            </div>

            {/* Content */}
            <div
              className="flex-1 overflow-hidden"
              style={{ background: "var(--bg-window)", minHeight: 0 }}
            >
              {children}
            </div>

            {/* Resize handle */}
            {!isMaximized && !isMobile && (
              <div
                className="resize-handle"
                onMouseDown={onResizeStart}
                style={{ zIndex: 10 }}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  style={{ position: "absolute", bottom: 3, right: 3 }}
                >
                  <path
                    d="M9 1L1 9M9 5L5 9M9 9"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            )}
          </motion.div>
        </Draggable>
      )}
    </AnimatePresence>
  );
}
