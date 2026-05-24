"use client";
import { skills } from "@/lib/data";

export default function SkillsApp() {
  return (
    <div className="app-scroll">
      <h2 className="text-lg font-bold mb-6" style={{ color: "#e2e8f0" }}>
        Skills & Technologies
      </h2>
      <div className="space-y-5">
        {skills.map((group) => (
          <div key={group.category} className="glass-card rounded-xl p-5">
            <h3
              className="text-sm font-semibold mb-3 uppercase tracking-wider"
              style={{ color: "var(--accent-cyan)" }}
            >
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="skill-tag">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
