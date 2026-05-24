"use client";
import { useEffect, useState } from "react";

export type BatteryData = {
  level: number;   // 0–1
  charging: boolean;
} | null;

export function useBattery(): BatteryData {
  const [battery, setBattery] = useState<BatteryData>(null);

  useEffect(() => {
    const nav = navigator as Navigator & {
      getBattery?: () => Promise<{
        level: number;
        charging: boolean;
        addEventListener: (event: string, handler: () => void) => void;
        removeEventListener: (event: string, handler: () => void) => void;
      }>;
    };

    if (!nav.getBattery) return;

    let cleanup: (() => void) | null = null;

    nav.getBattery().then((b) => {
      const update = () => setBattery({ level: b.level, charging: b.charging });
      update();
      b.addEventListener("levelchange", update);
      b.addEventListener("chargingchange", update);
      cleanup = () => {
        b.removeEventListener("levelchange", update);
        b.removeEventListener("chargingchange", update);
      };
    });

    return () => cleanup?.();
  }, []);

  return battery;
}
