"use client";
import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import MenuBar from "./MenuBar";
import Dock from "./Dock";
import Window from "./Window";
import AppIcon from "./AppIcon";
import AboutApp from "./apps/AboutApp";
import ExperienceApp from "./apps/ExperienceApp";
import EducationApp from "./apps/EducationApp";
import SkillsApp from "./apps/SkillsApp";
import ProjectsApp from "./apps/ProjectsApp";
import ResumeApp from "./apps/ResumeApp";
import ContactApp from "./apps/ContactApp";
import { apps } from "@/lib/data";

type WindowState = {
  id: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
};

const DEFAULT_SIZES: Record<string, { width: number; height: number }> = {
  about: { width: 560, height: 520 },
  experience: { width: 620, height: 560 },
  education: { width: 540, height: 440 },
  skills: { width: 520, height: 500 },
  projects: { width: 680, height: 580 },
  resume: { width: 480, height: 400 },
  contact: { width: 640, height: 520 },
};

const DEFAULT_POSITIONS: Record<string, { x: number; y: number }> = {
  about: { x: 80, y: 50 },
  experience: { x: 120, y: 60 },
  education: { x: 160, y: 70 },
  skills: { x: 100, y: 55 },
  projects: { x: 90, y: 45 },
  resume: { x: 200, y: 80 },
  contact: { x: 110, y: 55 },
};

const APP_CONTENT: Record<string, React.ReactNode> = {
  about: <AboutApp />,
  experience: <ExperienceApp />,
  education: <EducationApp />,
  skills: <SkillsApp />,
  projects: <ProjectsApp />,
  resume: <ResumeApp />,
  contact: <ContactApp />,
};

const initialWindows: WindowState[] = apps.map((app) => ({
  id: app.id,
  isOpen: app.id === "about",
  isMinimized: false,
  isMaximized: false,
  zIndex: app.id === "about" ? 100 : 10,
}));

let zCounter = 200;

export default function Desktop() {
  const [windows, setWindows] = useState<WindowState[]>(initialWindows);

  const openWindow = useCallback((id: string) => {
    zCounter++;
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, isOpen: true, isMinimized: false, zIndex: zCounter }
          : w
      )
    );
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w)));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)));
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
    );
  }, []);

  const focusWindow = useCallback((id: string) => {
    zCounter++;
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: zCounter } : w))
    );
  }, []);

  const openApps = new Set(windows.filter((w) => w.isOpen).map((w) => w.id));

  return (
    <div className="desktop-bg fixed inset-0" style={{ paddingTop: 28, paddingBottom: 56 }}>
      <MenuBar />

      {/* Desktop icons */}
      <div className="absolute top-12 left-6 grid gap-5" style={{ gridTemplateColumns: "repeat(2, 64px)" }}>
        {apps.slice(0, 6).map((app) => (
          <AppIcon key={app.id} {...app} onOpen={openWindow} />
        ))}
      </div>

      {/* Windows */}
      <AnimatePresence>
        {windows.map((win) => {
          const app = apps.find((a) => a.id === win.id)!;
          return (
            <Window
              key={win.id}
              id={win.id}
              title={app.label}
              icon={app.icon}
              isOpen={win.isOpen}
              isMinimized={win.isMinimized}
              isMaximized={win.isMaximized}
              zIndex={win.zIndex}
              defaultPosition={DEFAULT_POSITIONS[win.id]}
              defaultSize={DEFAULT_SIZES[win.id]}
              onClose={() => closeWindow(win.id)}
              onMinimize={() => minimizeWindow(win.id)}
              onMaximize={() => maximizeWindow(win.id)}
              onFocus={() => focusWindow(win.id)}
            >
              {APP_CONTENT[win.id]}
            </Window>
          );
        })}
      </AnimatePresence>

      <Dock openApps={openApps} onOpen={openWindow} />
    </div>
  );
}
