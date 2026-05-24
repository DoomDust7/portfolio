"use client";
import { useEffect, useRef, useState } from "react";
import { profile, skills, projects } from "@/lib/data";

type Line = { type: "prompt" | "output" | "error" | "info" | "blank"; text: string };

const NEOFETCH = `
<span style="color:#E95420">   ██████╗ </span>  manav@portfolio
<span style="color:#E95420">  ██╔═══██╗</span>  ───────────────
<span style="color:#E95420">  ██║   ██║</span>  <span style="color:#818cf8">OS:</span>     Portfolio OS 1.0
<span style="color:#E95420">  ██║   ██║</span>  <span style="color:#818cf8">Shell:</span>  portfolio-bash
<span style="color:#E95420">  ╚██████╔╝</span>  <span style="color:#818cf8">Role:</span>   Data Engineer & AI Builder
<span style="color:#E95420">   ╚═════╝ </span>  <span style="color:#818cf8">Based:</span>  Tempe, AZ
            <span style="color:#818cf8">Uni:</span>    ASU — MS Data Science
            <span style="color:#818cf8">GPA:</span>    3.89 / 4.0
            <span style="color:#818cf8">Skills:</span> ${skills.reduce((n, s) => n + s.items.length, 0)} technologies
            <span style="color:#818cf8">Projects:</span>${projects.length} on GitHub
`;

function runCommand(cmd: string, history: string[]): Line[] {
  const parts = cmd.trim().split(" ");
  const base = parts[0].toLowerCase();
  const arg = parts.slice(1).join(" ");

  switch (base) {
    case "":
      return [];
    case "help":
      return [
        { type: "info", text: "Available commands:" },
        { type: "output", text: "  whoami   — who am I?" },
        { type: "output", text: "  neofetch — system info with ASCII art" },
        { type: "output", text: "  ls       — list portfolio sections" },
        { type: "output", text: "  cat      — cat about | contact" },
        { type: "output", text: "  skills   — print skills list" },
        { type: "output", text: "  projects — list GitHub projects" },
        { type: "output", text: "  contact  — contact information" },
        { type: "output", text: "  date     — current date & time" },
        { type: "output", text: "  echo     — echo <message>" },
        { type: "output", text: "  history  — show command history" },
        { type: "output", text: "  clear    — clear the terminal" },
      ];

    case "whoami":
      return [{ type: "output", text: `${profile.name} — ${profile.roles[0]} & ${profile.roles[1]}` }];

    case "neofetch":
      return [{ type: "info", text: "__NEOFETCH__" }];

    case "ls":
      return [
        { type: "info", text: "drwxr-xr-x  about/  experience/  education/  skills/  projects/  resume/  contact/" },
      ];

    case "cat":
      if (arg === "about" || arg === "./about") {
        return [{ type: "output", text: profile.bio }];
      }
      if (arg === "contact" || arg === "./contact") {
        return [
          { type: "output", text: `Email:    ${profile.email}` },
          { type: "output", text: `Phone:    ${profile.phone}` },
          { type: "output", text: `LinkedIn: ${profile.linkedin}` },
          { type: "output", text: `GitHub:   ${profile.github}` },
          { type: "output", text: `Location: ${profile.location}` },
        ];
      }
      return [{ type: "error", text: `cat: ${arg}: No such file or directory` }];

    case "skills":
      return skills.flatMap((s) => [
        { type: "info", text: `[${s.category}]` },
        { type: "output", text: `  ${s.items.join(", ")}` },
      ]);

    case "projects":
      return projects.map((p) => ({
        type: "output" as const,
        text: `${p.award ? "🏆 " : ""}${p.title.padEnd(32)} ${p.github ?? ""}`,
      }));

    case "contact":
      return [
        { type: "output", text: `Email:    ${profile.email}` },
        { type: "output", text: `Phone:    ${profile.phone}` },
        { type: "output", text: `LinkedIn: ${profile.linkedin}` },
        { type: "output", text: `GitHub:   ${profile.github}` },
        { type: "output", text: `Location: ${profile.location}` },
      ];

    case "date":
      return [{ type: "output", text: new Date().toString() }];

    case "echo":
      return [{ type: "output", text: arg || "" }];

    case "history":
      return history.map((h, i) => ({ type: "output" as const, text: `  ${String(i + 1).padStart(3)}  ${h}` }));

    case "clear":
      return [{ type: "blank", text: "__CLEAR__" }];

    default:
      return [{ type: "error", text: `bash: ${base}: command not found. Type 'help' for available commands.` }];
  }
}

export default function TerminalApp() {
  const [lines, setLines] = useState<Line[]>([
    { type: "info", text: `Portfolio OS 1.0 — ${profile.name}` },
    { type: "output", text: 'Type "help" to see available commands.' },
    { type: "blank", text: "" },
  ]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const submit = () => {
    const cmd = input.trim();
    const newCmdHistory = cmd ? [cmd, ...cmdHistory] : cmdHistory;

    const promptLine: Line = { type: "prompt", text: cmd };
    const result = runCommand(cmd, newCmdHistory);

    if (result.length === 1 && result[0].text === "__CLEAR__") {
      setLines([]);
    } else {
      setLines((prev) => [...prev, promptLine, ...result]);
    }

    if (cmd) setCmdHistory(newCmdHistory);
    setHistIndex(-1);
    setInput("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIndex + 1, cmdHistory.length - 1);
      setHistIndex(next);
      setInput(cmdHistory[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIndex - 1, -1);
      setHistIndex(next);
      setInput(next === -1 ? "" : cmdHistory[next]);
    }
  };

  return (
    <div
      className="flex flex-col h-full"
      style={{ background: "#0d1117", fontFamily: '"Ubuntu Mono", monospace' }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Output area */}
      <div className="flex-1 overflow-y-auto p-4 terminal-output" style={{ minHeight: 0 }}>
        {lines.map((line, i) => {
          if (line.type === "prompt") {
            return (
              <div key={i} className="flex gap-2">
                <span className="terminal-prompt flex-shrink-0">manav@portfolio:~$</span>
                <span className="terminal-cmd">{line.text}</span>
              </div>
            );
          }
          if (line.type === "blank") return <div key={i} className="h-1" />;
          if (line.type === "info" && line.text === "__NEOFETCH__") {
            return (
              <div
                key={i}
                className="terminal-info"
                dangerouslySetInnerHTML={{ __html: NEOFETCH }}
                style={{ whiteSpace: "pre" }}
              />
            );
          }
          if (line.type === "error") return <div key={i} className="terminal-error">{line.text}</div>;
          if (line.type === "info") return <div key={i} className="terminal-info">{line.text}</div>;
          return <div key={i} className="terminal-cmd">{line.text}</div>;
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input row */}
      <div
        className="flex items-center gap-2 px-4 py-2 flex-shrink-0"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.3)" }}
      >
        <span className="terminal-prompt text-sm flex-shrink-0">manav@portfolio:~$</span>
        <input
          ref={inputRef}
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          className="flex-1 bg-transparent outline-none text-sm"
          style={{ color: "#e2e8f0", fontFamily: '"Ubuntu Mono", monospace', caretColor: "#22d3ee" }}
          spellCheck={false}
          autoComplete="off"
        />
      </div>
    </div>
  );
}
