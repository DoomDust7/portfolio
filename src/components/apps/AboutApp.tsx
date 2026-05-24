"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Mail, Phone, MapPin, GitFork, Link } from "lucide-react";
import { profile } from "@/lib/data";

export default function AboutApp() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const role = profile.roles[roleIndex];
  const displayText = role.slice(0, charIndex);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && charIndex < role.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 60);
    } else if (!deleting && charIndex === role.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 35);
    } else if (deleting && charIndex === 0) {
      timeout = setTimeout(() => {
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % profile.roles.length);
      }, 100);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, role.length, roleIndex]);

  return (
    <div className="app-scroll">
      <div className="flex flex-col md:flex-row items-start gap-8">
        {/* Photo */}
        <div className="flex-shrink-0 mx-auto md:mx-0">
          <div
            className="relative rounded-full overflow-hidden"
            style={{
              width: 120,
              height: 120,
              border: "2px solid rgba(129,140,248,0.4)",
              boxShadow: "0 0 24px rgba(129,140,248,0.2)",
            }}
          >
            <Image
              src="/profile-photo.jpg"
              alt="Manav Ananthakumar"
              fill
              className="object-cover"
              priority
              sizes="120px"
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold" style={{ color: "#e2e8f0" }}>
            {profile.name}
          </h1>
          <div className="mt-1 h-7 flex items-center">
            <span className="text-base font-medium glow-cyan">{displayText}</span>
            <span className="typewriter-cursor" />
          </div>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
            {profile.bio}
          </p>
        </div>
      </div>

      {/* Contact chips */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { icon: <Mail size={14} />, label: profile.email, href: `mailto:${profile.email}` },
          { icon: <Phone size={14} />, label: profile.phone, href: `tel:${profile.phone}` },
          { icon: <MapPin size={14} />, label: profile.location },
          { icon: <GitFork size={14} />, label: "DoomDust7", href: profile.github },
          { icon: <Link size={14} />, label: "LinkedIn", href: profile.linkedin },
        ].map(({ icon, label, href }) => (
          <a
            key={label}
            href={href}
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="glass-card flex items-center gap-2.5 px-4 py-3 rounded-xl transition-all hover:border-purple-500/30"
            style={{ color: "#94a3b8", textDecoration: "none" }}
          >
            <span style={{ color: "var(--accent-purple)" }}>{icon}</span>
            <span className="text-sm truncate">{label}</span>
          </a>
        ))}
      </div>

      {/* Quick stats */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        {[
          { value: "3.89", label: "MS GPA at ASU" },
          { value: "2+", label: "Years Industry Exp." },
          { value: "3", label: "Top Companies" },
        ].map(({ value, label }) => (
          <div
            key={label}
            className="glass-card rounded-xl p-4 text-center"
          >
            <div className="text-2xl font-bold glow-purple">{value}</div>
            <div className="text-xs mt-1" style={{ color: "#64748b" }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
