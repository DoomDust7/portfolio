"use client";
import { Download, FileText } from "lucide-react";

export default function ResumeApp() {
  return (
    <div className="app-scroll flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold" style={{ color: "#e2e8f0" }}>
          Resume
        </h2>
        <a
          href="/Manav_Resume.pdf"
          download
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:opacity-80"
          style={{
            background: "linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))",
            color: "#0f172a",
          }}
        >
          <Download size={14} />
          Download
        </a>
      </div>

      <div
        className="flex-1 rounded-xl overflow-hidden glass-card flex items-center justify-center"
        style={{ minHeight: 300 }}
      >
        <div className="text-center space-y-4">
          <FileText size={48} style={{ color: "var(--accent-purple)", margin: "0 auto" }} />
          <p className="text-sm" style={{ color: "#94a3b8" }}>
            Resume available for download
          </p>
          <a
            href="/Manav_Resume.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
            style={{
              background: "linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))",
              color: "#0f172a",
            }}
          >
            <Download size={14} />
            Download PDF
          </a>
          <p className="text-xs mt-2" style={{ color: "#64748b" }}>
            Or view on{" "}
            <a
              href="https://linkedin.com/in/manav-ananthakumar-954874155"
              target="_blank"
              rel="noreferrer"
              style={{ color: "var(--accent-cyan)" }}
            >
              LinkedIn
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
