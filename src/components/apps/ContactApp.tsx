"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, GitFork, Link, Send } from "lucide-react";
import { profile } from "@/lib/data";

export default function ContactApp() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error" | "rate-limited">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.status === 429) {
        setStatus("rate-limited");
      } else if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <div className="app-scroll">
      <h2 className="text-lg font-bold mb-6" style={{ color: "#e2e8f0" }}>
        Get In Touch
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact info */}
        <div className="space-y-3">
          {[
            { icon: <Mail size={15} />, label: profile.email, href: `mailto:${profile.email}` },
            { icon: <Phone size={15} />, label: profile.phone, href: `tel:${profile.phone}` },
            { icon: <MapPin size={15} />, label: profile.location },
            { icon: <GitFork size={15} />, label: "github.com/DoomDust7", href: profile.github },
            { icon: <Link size={15} />, label: "LinkedIn Profile", href: profile.linkedin },
          ].map(({ icon, label, href }) => (
            <a
              key={label}
              href={href}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="glass-card flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:border-purple-500/30"
              style={{ color: "#94a3b8", textDecoration: "none" }}
            >
              <span style={{ color: "var(--accent-purple)" }}>{icon}</span>
              <span className="text-sm">{label}</span>
            </a>
          ))}
        </div>

        {/* Contact form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {(["name", "email"] as const).map((field) => (
            <input
              key={field}
              type={field === "email" ? "email" : "text"}
              placeholder={field === "name" ? "Your Name" : "Your Email"}
              value={form[field]}
              onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
              required
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#e2e8f0",
              }}
            />
          ))}
          <textarea
            placeholder="Your Message"
            rows={4}
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            required
            className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all resize-none"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#e2e8f0",
            }}
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-50"
            style={{
              background: "linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))",
              color: "#0f172a",
            }}
          >
            <Send size={14} />
            {status === "sending" ? "Sending…" : "Send Message"}
          </button>

          {status === "sent" && (
            <p className="text-xs text-center" style={{ color: "#4ade80" }}>
              Message sent! I&apos;ll get back to you soon.
            </p>
          )}
          {status === "rate-limited" && (
            <p className="text-xs text-center" style={{ color: "#f87171" }}>
              Too many requests. Please try again in an hour.
            </p>
          )}
          {status === "error" && (
            <p className="text-xs text-center" style={{ color: "#f87171" }}>
              Something went wrong. Email me directly at{" "}
              <a href={`mailto:${profile.email}`} style={{ color: "var(--accent-cyan)" }}>
                {profile.email}
              </a>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
