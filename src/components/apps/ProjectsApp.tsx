"use client";
import { useState } from "react";
import { GitFork, ExternalLink, Trophy } from "lucide-react";
import { projects, type Project } from "@/lib/data";

type Filter = "All" | "AI/ML" | "Full Stack" | "Data" | "Internship";
const FILTERS: Filter[] = ["All", "AI/ML", "Full Stack", "Data", "Internship"];

export default function ProjectsApp() {
  const [active, setActive] = useState<Filter>("All");

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="app-scroll">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2 className="text-lg font-bold" style={{ color: "#e2e8f0" }}>
          Projects
        </h2>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-tab${active === f ? " active" : ""}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filtered.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className="glass-card rounded-xl p-5 transition-all hover:border-purple-500/20"
      style={{
        borderLeft: "3px solid rgba(129,140,248,0.4)",
      }}
    >
      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-semibold text-sm" style={{ color: "#e2e8f0" }}>
            {project.title}
          </h3>
          {project.award && (
            <span className="award-badge">
              <Trophy size={10} />
              {project.award}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-all hover:opacity-80"
              style={{
                background: "rgba(34,211,238,0.1)",
                border: "1px solid rgba(34,211,238,0.2)",
                color: "var(--accent-cyan)",
              }}
            >
              <ExternalLink size={11} />
              Live
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-all hover:opacity-80"
              style={{
                background: "rgba(129,140,248,0.1)",
                border: "1px solid rgba(129,140,248,0.2)",
                color: "var(--accent-purple)",
              }}
            >
              <GitFork size={11} />
              GitHub
            </a>
          )}
        </div>
      </div>

      <p className="text-xs leading-relaxed mb-3" style={{ color: "#94a3b8" }}>
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {project.stack.map((t) => (
          <span key={t} className="tech-tag">{t}</span>
        ))}
      </div>
    </div>
  );
}
