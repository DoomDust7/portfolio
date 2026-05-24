"use client";
import { education } from "@/lib/data";
import { MapPin, Calendar, Award } from "lucide-react";

export default function EducationApp() {
  return (
    <div className="app-scroll">
      <h2 className="text-lg font-bold mb-6" style={{ color: "#e2e8f0" }}>
        Education
      </h2>
      <div className="space-y-5">
        {education.map((edu, i) => (
          <div key={i} className="glass-card rounded-xl p-6">
            <div className="flex flex-wrap justify-between gap-3">
              <div>
                <h3 className="font-bold text-base" style={{ color: "#e2e8f0" }}>
                  {edu.school}
                </h3>
                <p className="text-sm mt-0.5" style={{ color: "var(--accent-purple)" }}>
                  {edu.degree}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1 text-xs" style={{ color: "#64748b" }}>
                <div className="flex items-center gap-1">
                  <Calendar size={11} />
                  {edu.period}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={11} />
                  {edu.location}
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                style={{
                  background: "rgba(251,191,36,0.1)",
                  border: "1px solid rgba(251,191,36,0.25)",
                }}
              >
                <Award size={13} style={{ color: "#fbbf24" }} />
                <span className="text-sm font-semibold" style={{ color: "#fbbf24" }}>
                  GPA {edu.gpa}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs mb-2" style={{ color: "#64748b" }}>
                Relevant Courses
              </p>
              <div className="flex flex-wrap gap-2">
                {edu.courses.map((c) => (
                  <span key={c} className="skill-tag">{c}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
