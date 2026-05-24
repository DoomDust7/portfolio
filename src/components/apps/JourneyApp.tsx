"use client";

type Era = {
  label: string;
  color: string;
};

type Milestone = {
  year: string;
  icon: string;
  title: string;
  desc: string;
  era: string;
  accent: string;
};

const ERAS: Era[] = [
  { label: "The Spark", color: "#f59e0b" },
  { label: "The Builder Years", color: "#818cf8" },
  { label: "Industry", color: "#22d3ee" },
  { label: "AI Era", color: "#E95420" },
];

const MILESTONES: Milestone[] = [
  {
    year: "2008",
    icon: "🎮",
    title: "The Beginning",
    desc: "Windows 98 PC. Desert Storm. NFS Underground 2 on my dad's XP laptop. A gamer before I knew what code was.",
    era: "The Spark",
    accent: "#f59e0b",
  },
  {
    year: "2015",
    icon: "🌐",
    title: "First Website",
    desc: "Cloned the official OnePlus website in HTML & CSS during high school. First taste of: 'I can make things look like what I see on screen.'",
    era: "The Spark",
    accent: "#f59e0b",
  },
  {
    year: "2017",
    icon: "🕹️",
    title: "Tetris from Scratch",
    desc: "Built Tetris in C++ with a database to store high scores. First time building something with real logic, state, and persistence.",
    era: "The Spark",
    accent: "#f59e0b",
  },
  {
    year: "2019",
    icon: "🎓",
    title: "BTech CSE — MIT Manipal",
    desc: "Enrolled in Computer Science & Engineering. Joined the official CSE club, dove into competitive coding and machine learning.",
    era: "The Builder Years",
    accent: "#818cf8",
  },
  {
    year: "2019",
    icon: "✈️",
    title: "Smart Nomad",
    desc: "Interned at an AI-based travel planner startup. First EDA on Kaggle datasets (Habermann's, Titanic). Understood the ML pipeline end to end.",
    era: "The Builder Years",
    accent: "#818cf8",
  },
  {
    year: "2021",
    icon: "☁️",
    title: "Affine Analytics",
    desc: "Cloud Engineering Intern. Built an MLOps POC: trained XGBoost classifiers, pushed artifacts to Azure Blob, served predictions via Streamlit. Understood the full MLOps loop.",
    era: "The Builder Years",
    accent: "#818cf8",
  },
  {
    year: "2022",
    icon: "📷",
    title: "Samsung PRISM",
    desc: "Selected for a 9-month industry-academia research project with Samsung Research Institute Bangalore. Built an OnDevice Multi-camera Live Video Stitching pipeline: Flutter 3D viewport, AWS backend, MJPEG streaming, ORB/RANSAC homography.",
    era: "Industry",
    accent: "#22d3ee",
  },
  {
    year: "2022",
    icon: "📊",
    title: "Deloitte USI",
    desc: "Tax Technology Intern. Built a Document Management System in ASP.NET Core. Designed a 6-sheet Power BI star schema over ~1M rows — adopted by 10+ stakeholders.",
    era: "Industry",
    accent: "#22d3ee",
  },
  {
    year: "2023",
    icon: "🚚",
    title: "Bosch Limited",
    desc: "Data Science Intern. LSP recommendation system across 13K+ trips (–12% delivery time). NLP pipeline on 3 years of HR survey data (VADER, n-gram analysis).",
    era: "Industry",
    accent: "#22d3ee",
  },
  {
    year: "2023",
    icon: "🛢️",
    title: "Shell",
    desc: "Associate Data Engineer. SAC OSE migration, SAP HANA view revamps (–15% latency), Python automation for ECC→S/4HANA migration across 8+ instances — 50+ hours saved.",
    era: "Industry",
    accent: "#22d3ee",
  },
  {
    year: "2025",
    icon: "🌵",
    title: "Arizona State University",
    desc: "MS in Data Science, Analytics & Engineering. GPA 3.89. Building RAG pipelines, LLM agents, and AI interview platforms. Won 3rd at MLH Innovation Hacks 2.0 (80 teams).",
    era: "AI Era",
    accent: "#E95420",
  },
];

// Pre-compute which milestones start a new era (pure, no mutation during render)
const MILESTONE_META = MILESTONES.map((m, i) => ({
  showEraLabel: i === 0 || m.era !== MILESTONES[i - 1].era,
  isLeft: i % 2 === 0,
}));

export default function JourneyApp() {
  return (
    <div className="app-scroll" style={{ paddingBottom: "2rem" }}>
      <div className="mb-6">
        <h2 className="text-lg font-bold" style={{ color: "#e2e8f0" }}>
          My Journey
        </h2>
        <p className="text-xs mt-1" style={{ color: "#64748b" }}>
          From Windows 98 to AI systems — the full arc.
        </p>
      </div>

      {/* Era legend */}
      <div className="flex flex-wrap gap-2 mb-8">
        {ERAS.map((era) => (
          <div
            key={era.label}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
            style={{
              background: `${era.color}18`,
              border: `1px solid ${era.color}44`,
              color: era.color,
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: era.color }} />
            {era.label}
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical spine */}
        <div
          className="absolute"
          style={{
            left: "50%",
            top: 0,
            bottom: 0,
            width: 2,
            transform: "translateX(-50%)",
            background: "linear-gradient(to bottom, rgba(129,140,248,0.08), rgba(129,140,248,0.25), rgba(34,211,238,0.25), rgba(233,84,32,0.1))",
          }}
        />

        <div className="space-y-2">
          {MILESTONES.map((m, i) => {
            const { isLeft, showEraLabel } = MILESTONE_META[i];
            const era = ERAS.find((e) => e.label === m.era)!;

            return (
              <div key={i}>
                {/* Era divider */}
                {showEraLabel && (
                  <div className="relative flex items-center justify-center py-3">
                    <div
                      className="px-4 py-1 rounded-full text-xs font-bold z-10"
                      style={{
                        background: `${era.color}22`,
                        border: `1px solid ${era.color}55`,
                        color: era.color,
                      }}
                    >
                      — {era.label} —
                    </div>
                  </div>
                )}

                {/* Milestone row */}
                <div className="relative flex items-start gap-0" style={{ minHeight: 80 }}>
                  {/* Left card */}
                  <div className="flex-1 pr-6 flex justify-end">
                    {isLeft ? (
                      <MilestoneCard m={m} align="right" />
                    ) : (
                      <div />
                    )}
                  </div>

                  {/* Center dot + year */}
                  <div
                    className="flex-shrink-0 flex flex-col items-center"
                    style={{ width: 48, marginTop: 10 }}
                  >
                    <div
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: "50%",
                        background: m.accent,
                        border: "2px solid rgba(8,12,20,1)",
                        boxShadow: `0 0 10px ${m.accent}88`,
                        zIndex: 2,
                      }}
                    />
                    <div
                      className="text-xs font-bold mt-1"
                      style={{ color: m.accent, whiteSpace: "nowrap" }}
                    >
                      {m.year}
                    </div>
                  </div>

                  {/* Right card */}
                  <div className="flex-1 pl-6 flex justify-start">
                    {!isLeft ? (
                      <MilestoneCard m={m} align="left" />
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MilestoneCard({ m, align }: { m: Milestone; align: "left" | "right" }) {
  return (
    <div
      className="glass-card rounded-xl p-4 max-w-xs"
      style={{
        borderLeft: align === "left" ? `3px solid ${m.accent}` : undefined,
        borderRight: align === "right" ? `3px solid ${m.accent}` : undefined,
        textAlign: align,
      }}
    >
      <div className="flex items-center gap-2" style={{ justifyContent: align === "right" ? "flex-end" : "flex-start" }}>
        <span className="text-xl">{m.icon}</span>
        <span className="text-sm font-bold" style={{ color: "#e2e8f0" }}>{m.title}</span>
      </div>
      <p className="text-xs mt-2 leading-relaxed" style={{ color: "#94a3b8" }}>
        {m.desc}
      </p>
    </div>
  );
}
