"use client";
import { useState } from "react";
import { Music, ExternalLink } from "lucide-react";

type Tab = "playlists" | "custom";

const PLAYLISTS = [
  {
    label: "Deep Focus",
    description: "Keep calm and focus",
    id: "37i9dQZF1DWZeKCadgRdKQ",
    type: "playlist",
    color: "#1DB954",
  },
  {
    label: "Lo-Fi Beats",
    description: "Chill lo-fi hip hop",
    id: "37i9dQZF1DWWQRwui0ExPn",
    type: "playlist",
    color: "#818cf8",
  },
  {
    label: "Coding Mode",
    description: "Electronic focus music",
    id: "37i9dQZF1DX5trt9i14X7j",
    type: "playlist",
    color: "#22d3ee",
  },
  {
    label: "Peaceful Piano",
    description: "Relax and indulge",
    id: "37i9dQZF1DX4sWSpwq3LiO",
    type: "playlist",
    color: "#f0abfc",
  },
];

function embedUrl(type: string, id: string) {
  return `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`;
}

export default function SpotifyApp() {
  const [active, setActive] = useState(PLAYLISTS[0]);
  const [tab, setTab] = useState<Tab>("playlists");
  const [customUrl, setCustomUrl] = useState("");
  const [customEmbed, setCustomEmbed] = useState<string | null>(null);
  const [customError, setCustomError] = useState("");

  const handleCustomLoad = () => {
    setCustomError("");
    // Parse: https://open.spotify.com/playlist/ID or spotify:playlist:ID
    const match =
      customUrl.match(/open\.spotify\.com\/(track|album|playlist|artist)\/([A-Za-z0-9]+)/) ||
      customUrl.match(/spotify:(track|album|playlist|artist):([A-Za-z0-9]+)/);
    if (!match) {
      setCustomError("Paste a valid Spotify link (e.g. https://open.spotify.com/playlist/…)");
      return;
    }
    setCustomEmbed(embedUrl(match[1], match[2]));
  };

  const currentEmbed =
    tab === "custom" && customEmbed
      ? customEmbed
      : embedUrl(active.type, active.id);

  return (
    <div className="flex flex-col h-full" style={{ background: "#121212" }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{
          background: "rgba(0,0,0,0.4)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center gap-2">
          <Music size={16} style={{ color: "#1DB954" }} />
          <span className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>
            Spotify
          </span>
        </div>
        <a
          href="https://open.spotify.com"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-xs hover:opacity-80 transition-opacity"
          style={{ color: "#1DB954" }}
        >
          <ExternalLink size={11} />
          Open Spotify
        </a>
      </div>

      {/* Tabs */}
      <div
        className="flex gap-1 px-3 pt-2 pb-1 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        {(["playlists", "custom"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-3 py-1 rounded-full text-xs font-medium transition-all capitalize"
            style={{
              background: tab === t ? "#1DB954" : "rgba(255,255,255,0.06)",
              color: tab === t ? "#000" : "#94a3b8",
            }}
          >
            {t === "playlists" ? "Featured" : "Custom URL"}
          </button>
        ))}
      </div>

      {/* Playlist picker (only for Featured tab) */}
      {tab === "playlists" && (
        <div className="flex gap-2 px-3 py-2 flex-shrink-0 overflow-x-auto">
          {PLAYLISTS.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p)}
              className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all text-left"
              style={{
                background:
                  active.id === p.id
                    ? `${p.color}22`
                    : "rgba(255,255,255,0.05)",
                border: `1px solid ${active.id === p.id ? p.color + "55" : "rgba(255,255,255,0.08)"}`,
                color: active.id === p.id ? p.color : "#94a3b8",
                minWidth: 100,
              }}
            >
              <div className="font-semibold">{p.label}</div>
              <div className="text-xs opacity-70">{p.description}</div>
            </button>
          ))}
        </div>
      )}

      {/* Custom URL input */}
      {tab === "custom" && (
        <div className="flex flex-col gap-2 px-3 py-2 flex-shrink-0">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Paste Spotify link (track, album, playlist…)"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCustomLoad()}
              className="flex-1 px-3 py-2 rounded-lg text-xs outline-none"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#e2e8f0",
              }}
            />
            <button
              onClick={handleCustomLoad}
              className="px-3 py-2 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
              style={{ background: "#1DB954", color: "#000" }}
            >
              Load
            </button>
          </div>
          {customError && (
            <p className="text-xs" style={{ color: "#f87171" }}>
              {customError}
            </p>
          )}
          {!customEmbed && !customError && (
            <p className="text-xs" style={{ color: "#64748b" }}>
              Paste any Spotify link — track, album, playlist, or artist.
            </p>
          )}
        </div>
      )}

      {/* Spotify iframe */}
      <div className="flex-1 min-h-0">
        <iframe
          key={currentEmbed}
          src={currentEmbed}
          width="100%"
          height="100%"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          style={{ border: "none", display: "block" }}
          title="Spotify Player"
        />
      </div>

      {/* Footer note */}
      <div
        className="px-3 py-1.5 text-center text-xs flex-shrink-0"
        style={{
          color: "#475569",
          background: "rgba(0,0,0,0.3)",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        Log into Spotify for full playback · previews available without login
      </div>
    </div>
  );
}
