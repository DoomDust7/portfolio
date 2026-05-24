"use client";
import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import MenuBar from "./MenuBar";
import Sidebar from "./Sidebar";
import AppLauncher from "./AppLauncher";
import ContextMenu from "./ContextMenu";
import Window from "./Window";
import AboutApp from "./apps/AboutApp";
import ExperienceApp from "./apps/ExperienceApp";
import EducationApp from "./apps/EducationApp";
import SkillsApp from "./apps/SkillsApp";
import ProjectsApp from "./apps/ProjectsApp";
import ResumeApp from "./apps/ResumeApp";
import ContactApp from "./apps/ContactApp";
import SpotifyApp from "./apps/SpotifyApp";
import TerminalApp from "./apps/TerminalApp";
import { apps, WALLPAPERS } from "@/lib/data";

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
  spotify: { width: 380, height: 600 },
  terminal: { width: 640, height: 440 },
};

const DEFAULT_POSITIONS: Record<string, { x: number; y: number }> = {
  about: { x: 80, y: 50 },
  experience: { x: 120, y: 60 },
  education: { x: 160, y: 70 },
  skills: { x: 100, y: 55 },
  projects: { x: 90, y: 45 },
  resume: { x: 200, y: 80 },
  contact: { x: 110, y: 55 },
  spotify: { x: 60, y: 40 },
  terminal: { x: 140, y: 65 },
};

const APP_CONTENT: Record<string, React.ReactNode> = {
  about: <AboutApp />,
  experience: <ExperienceApp />,
  education: <EducationApp />,
  skills: <SkillsApp />,
  projects: <ProjectsApp />,
  resume: <ResumeApp />,
  contact: <ContactApp />,
  spotify: <SpotifyApp />,
  terminal: <TerminalApp />,
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
  const [wallpaper, setWallpaper] = useState(WALLPAPERS[0].css);
  const [launcherOpen, setLauncherOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  const openWindow = useCallback((id: string) => {
    zCounter++;
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, isOpen: true, isMinimized: false, zIndex: zCounter }
          : w
      )
    );
    setLauncherOpen(false);
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

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const openApps = new Set(windows.filter((w) => w.isOpen).map((w) => w.id));

  return (
    <div
      className="fixed inset-0"
      style={{ background: "var(--bg-base)" }}
      onContextMenu={handleContextMenu}
      onClick={() => setContextMenu(null)}
    >
      {/* Top panel */}
      <MenuBar onActivities={() => setLauncherOpen(true)} />

      {/* Left sidebar */}
      <Sidebar
        openApps={openApps}
        onOpen={openWindow}
        onActivities={() => setLauncherOpen(true)}
      />

      {/* Desktop canvas — occupies area right of sidebar, below panel */}
      <div
        className="absolute"
        style={{
          top: 32,
          left: 64,
          right: 0,
          bottom: 0,
          background: wallpaper,
          backgroundImage: `${wallpaper}, radial-gradient(rgba(129, 140, 248, 0.06) 1px, transparent 1px)`,
          backgroundSize: "auto, 28px 28px",
          overflow: "hidden",
        }}
      >
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
      </div>

      {/* Activities launcher overlay */}
      <AnimatePresence>
        {launcherOpen && (
          <AppLauncher
            key="launcher"
            onClose={() => setLauncherOpen(false)}
            onOpen={openWindow}
          />
        )}
      </AnimatePresence>

      {/* Right-click context menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onChangeWallpaper={setWallpaper}
          onOpenTerminal={() => openWindow("terminal")}
          onActivities={() => setLauncherOpen(true)}
        />
      )}
    </div>
  );
}
