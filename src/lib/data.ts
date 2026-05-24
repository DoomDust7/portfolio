export const profile = {
  name: "Manav Ananthakumar",
  email: "kmanav262@gmail.com",
  phone: "+1 480-227-4187",
  location: "Tempe, AZ",
  linkedin: "https://linkedin.com/in/manav-ananthakumar-954874155",
  github: "https://github.com/DoomDust7",
  roles: ["Data Engineer", "AI/LLM Builder", "MS Data Science @ ASU"],
  bio: "Data Engineer with 2+ years at Shell, Bosch, and Deloitte, now pursuing an MS in Data Science at Arizona State University (GPA 3.89). I build AI systems — from RAG pipelines and LLM agents to algorithmic trading platforms. Won 3rd place at MLH Innovation Hacks 2.0 among 80 teams.",
};

export const experience = [
  {
    company: "Shell",
    role: "Associate Data Engineer",
    period: "Aug 2023 – Aug 2025",
    location: "Bangalore, India",
    color: "#FFCD00",
    bullets: [
      "Owned end-to-end SAC OSE migration, re-engineering 7+ legacy stories connected to multi-instance SAP ECC sources and validating data parity across business units post-cutover.",
      "Revamped SAP HANA calculation views across Downstream and Group Finance targets, cutting data processing latency by 15% on enterprise-wide financial reporting pipelines.",
      "Built a Python automation framework for ECC-to-S/4HANA brownfield migration, applying surrogate key logic to cross-compare data dumps across 8+ ECC instances.",
      "Validated S/4HANA-to-SAC data integrity across Downstream, Group Finance, and Upstream HANA targets, serving as the sign-off layer for production go-live readiness.",
    ],
  },
  {
    company: "Bosch Limited",
    role: "Data Science Intern",
    period: "Jan 2023 – Jun 2023",
    location: "Bangalore, India",
    color: "#E2001A",
    bullets: [
      "Built an LSP recommendation system over 13K+ trip records across 201 routes using a distance-slab bucketing approach, cutting delivery times by 12%.",
      "Designed an NLP pipeline on 3 years of GPTW survey data using VADER sentiment scoring, text2emotion classification, and NLTK n-gram analysis, improving employee satisfaction by 8%.",
      "Traced data quality issues in Travis 2.0 logistics records via Power BI profiling and Python validation, improving data completeness by 15% and forecast accuracy by 7%.",
    ],
  },
  {
    company: "Deloitte USI",
    role: "Tax Technology Intern",
    period: "May 2022 – Jul 2022",
    location: "Bangalore, India",
    color: "#86BC25",
    bullets: [
      "Built a Document Management System in ASP.NET Core 8 MVC + EF Core + SQLite with bcrypt-authenticated login and .pbix-only upload validation.",
      "Modeled a 6-sheet star schema (~1M rows, 14 manufacturers) in Power BI with DAX measures for rolling-12M market share, YTD units, and YoY delta — adopted by 10+ stakeholders.",
    ],
  },
];

export const education = [
  {
    school: "Arizona State University",
    degree: "MS in Data Science, Analytics and Engineering",
    period: "Aug 2025 – May 2027",
    location: "Tempe, AZ",
    gpa: "3.89 / 4.0",
    courses: ["Machine Learning", "Big Data Analytics", "Data Mining"],
  },
  {
    school: "Manipal Institute of Technology",
    degree: "B.Tech, Computer Science and Engineering",
    period: "Jul 2019 – Jul 2023",
    location: "Manipal, India",
    gpa: "3.5 / 4.0",
    courses: ["Machine Learning", "Operating Systems", "Computer Networks"],
  },
];

export const skills = [
  {
    category: "Programming",
    items: ["Python", "C/C++", "SQL", "React", "ASP.NET Core"],
  },
  {
    category: "ML Frameworks",
    items: ["PyTorch", "TensorFlow", "Scikit-learn", "HuggingFace Transformers"],
  },
  {
    category: "AI & LLM Engineering",
    items: ["RAG", "Prompt Engineering", "LLM Evaluation", "Hybrid Retrieval", "Embeddings", "Cross-Encoder Reranking"],
  },
  {
    category: "LLM APIs & Frameworks",
    items: ["OpenAI API", "Gemini API", "Claude API", "LangChain"],
  },
  {
    category: "Data Platforms",
    items: ["Databricks", "Microsoft Azure", "Qdrant", "Elasticsearch (BM25)", "SAP HANA", "SAP S/4HANA"],
  },
  {
    category: "Backend & DevOps",
    items: ["FastAPI", "Docker", "MLflow", "Linux"],
  },
  {
    category: "Visualization",
    items: ["Streamlit", "Tableau", "Power BI", "SAP Analytics Cloud"],
  },
];

export type Project = {
  title: string;
  description: string;
  stack: string[];
  github?: string;
  live?: string;
  award?: string;
  category: "AI/ML" | "Full Stack" | "Data" | "Internship";
};

export const projects: Project[] = [
  {
    title: "PitchMirror",
    description:
      "Multi-agent AI interview simulation platform using Gemini 2.5 Flash Native Audio, AssemblyAI transcription, and a LangChain ReAct agent loop with Firecrawl for company-aware pre-session research. Implements role-specific evaluation pipelines (recruiter, investor, professor, coding) and thread-level progress tracking with hidden steering memory.",
    stack: ["React 19", "Node.js", "Gemini 2.5 Flash Audio", "AssemblyAI", "LangChain", "Firecrawl", "Anam SDK"],
    github: "https://github.com/DoomDust7/TeamNotNull_InnovationHacks",
    live: "https://teamnotnull-innovationhacks.onrender.com/",
    award: "3rd Place – MLH Innovation Hacks 2.0 (80 teams)",
    category: "AI/ML",
  },
  {
    title: "RegLens",
    description:
      "Production-grade RAG Compliance Intelligence Platform for citation-backed retrieval over legacy financial policy documents with metadata-aware versioning. Implements hybrid search (vector similarity + BM25) via Elasticsearch with cross-encoder reranking, improving retrieval precision and reducing hallucinated responses on complex regulatory queries.",
    stack: ["FastAPI", "LangChain", "OpenAI", "Qdrant", "Elasticsearch", "Docker"],
    github: "https://github.com/DoomDust7/compliance-intelligence-platform",
    category: "AI/ML",
  },
  {
    title: "QuantaMine",
    description:
      "AI-driven platform using Python and Gemini API to generate, backtest, and evaluate algorithmic trading strategies, translating natural-language descriptions into executable Python models via LLM code generation. Built a model evaluation engine computing Sharpe ratio, max drawdown, and cumulative return metrics.",
    stack: ["FastAPI", "Next.js 15", "Gemini API", "FinBERT", "NewsAPI", "SSE", "Docker"],
    github: "https://github.com/DoomDust7/QuantaMine",
    category: "AI/ML",
  },
  {
    title: "Interview Intelligence Engine",
    description:
      "Semantic search and AI synthesis engine over customer research transcripts, built as a demo for Great Question's AI internship application. Enables intelligent querying and synthesis across qualitative research data.",
    stack: ["Python", "Semantic Search", "AI Synthesis", "Vector Embeddings"],
    github: "https://github.com/DoomDust7/interview-intelligence-engine",
    category: "AI/ML",
  },
  {
    title: "Intelligent Bistro",
    description:
      "AI-powered restaurant ordering app built with Expo and Node.js, leveraging Google Gemini for natural-language menu navigation, personalized recommendations, and smart order management.",
    stack: ["Expo", "Node.js", "Google Gemini", "TypeScript"],
    github: "https://github.com/DoomDust7/intelligent-bistro",
    category: "AI/ML",
  },
  {
    title: "GG-Mart",
    description:
      "Full-featured online marketplace with product listings, cart management, user authentication, and order processing. Built with a modern TypeScript stack.",
    stack: ["TypeScript", "React", "Node.js"],
    github: "https://github.com/DoomDust7/GG-Mart",
    category: "Full Stack",
  },
  {
    title: "AWS Amplify React",
    description:
      "Comprehensive implementation of major AWS services available via Amplify — authentication, storage, API, hosting, and real-time subscriptions integrated into a React application.",
    stack: ["React", "AWS Amplify", "JavaScript"],
    github: "https://github.com/DoomDust7/AWS-react",
    category: "Full Stack",
  },
  {
    title: "DSE-501 Statistics Project",
    description:
      "Air quality sensor calibration, temporal pattern analysis, and PCA on environmental datasets. Delivered via Streamlit interactive dashboard, Jupyter notebook, and Tableau visualizations.",
    stack: ["Python", "Streamlit", "Tableau", "Jupyter", "PCA"],
    github: "https://github.com/DoomDust7/DSE-501-Statistics-for-Data-Analyst-Project",
    category: "Data",
  },
  {
    title: "Rain in Australia — ML",
    description:
      "End-to-end machine learning pipeline predicting next-day rainfall in Australia using meteorological features, feature engineering, and ensemble classifiers with model evaluation dashboards.",
    stack: ["Python", "Scikit-learn", "Pandas", "Jupyter"],
    github: "https://github.com/DoomDust7/rain-in-australia-revamp",
    category: "Data",
  },
  {
    title: "Deloitte USI Case Study",
    description:
      "Nike Sales Analytics internship case study — ASP.NET Core 8 MVC Document Management System with bcrypt auth and a Power BI dashboard (6-sheet star schema, ~1M rows, 14 manufacturers) adopted by 10+ stakeholders.",
    stack: ["ASP.NET Core 8", "Power BI", "Python Dash", "SQLite", "DAX"],
    github: "https://github.com/DoomDust7/Deloitte-USI-Internship-CaseStudy",
    category: "Internship",
  },
  {
    title: "LSP Simulator (Bosch)",
    description:
      "Logistics Service Provider optimization simulator using distance and cost as metrics. Implements the distance-slab bucketing approach across 13K+ trip records spanning 201 routes.",
    stack: ["Python", "Streamlit", "Pandas", "NLP"],
    github: "https://github.com/DoomDust7/LSP-Simulator",
    category: "Internship",
  },
];

export const apps = [
  { id: "about", label: "About", icon: "👤" },
  { id: "experience", label: "Experience", icon: "💼" },
  { id: "education", label: "Education", icon: "🎓" },
  { id: "skills", label: "Skills", icon: "⚡" },
  { id: "projects", label: "Projects", icon: "🚀" },
  { id: "resume", label: "Resume", icon: "📄" },
  { id: "contact", label: "Contact", icon: "✉️" },
  { id: "spotify", label: "Spotify", icon: "🎵" },
  { id: "terminal", label: "Terminal", icon: "🖥️" },
];

export const WALLPAPERS = [
  { id: "aurora", label: "Aurora", css: "radial-gradient(ellipse at 20% 50%, #1a0533 0%, #080c14 50%, #0d1f3c 100%)" },
  { id: "ubuntu", label: "Ubuntu", css: "linear-gradient(135deg, #2C001E 0%, #3D0D2B 40%, #1a0028 100%)" },
  { id: "ocean", label: "Ocean", css: "linear-gradient(160deg, #0a1628 0%, #0c2a4a 60%, #051020 100%)" },
  { id: "forest", label: "Forest", css: "radial-gradient(ellipse at top, #001a0d 0%, #000d05 100%)" },
  { id: "sunset", label: "Sunset", css: "linear-gradient(160deg, #1a0033 0%, #3d0011 50%, #1f0a00 100%)" },
];
