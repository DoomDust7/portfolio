"use client";
import { experience } from "@/lib/data";
import { MapPin, Calendar } from "lucide-react";

export default function ExperienceApp() {
  return (
    <div className="app-scroll">
      <h2 className="text-lg font-bold mb-6" style={{ color: "#e2e8f0" }}>
        Work Experience
      </h2>
      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute left-3.5 top-3 bottom-3"
          style={{ width: 1, background: "rgba(129,140,248,0.2)" }}
        />

        <div className="space-y-8">
          {experience.map((job, i) => (
            <div key={i} className="flex gap-6">
              {/* Dot */}
              <div className="flex-shrink-0 mt-1">
                <div
                  className="timeline-dot"
                  style={{ borderColor: job.color }}
                />
              </div>

              {/* Content */}
              <div className="glass-card rounded-xl p-5 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-base" style={{ color: "#e2e8f0" }}>
                      {job.role}
                    </h3>
                    <div
                      className="text-sm font-medium mt-0.5"
                      style={{ color: job.color }}
                    >
                      {job.company}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 text-xs" style={{ color: "#64748b" }}>
                    <div className="flex items-center gap-1">
                      <Calendar size={11} />
                      {job.period}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={11} />
                      {job.location}
                    </div>
                  </div>
                </div>

                <ul className="mt-4 space-y-2">
                  {job.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2 text-sm" style={{ color: "#94a3b8" }}>
                      <span style={{ color: "var(--accent-purple)", flexShrink: 0 }}>▸</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
