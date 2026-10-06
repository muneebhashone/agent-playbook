import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_URL } from "@/content/site";

// The shared-link preview: the hero in miniature, in the dark palette from globals.css.
export const socialCardSize = { width: 1200, height: 630 };
export const socialCardAlt = "Agent Playbook: paste one line, your agent writes its own rules file.";

const c = {
  bg: "#161b22",
  panel: "#1d232c",
  ink: "#dfe4ec",
  comment: "#8590a3",
  rule: "#2c3440",
  str: "#a3d48f",
  cursor: "#f2b35b",
};

export async function renderSocialCard() {
  const [regular, semibold] = await Promise.all(
    ["Regular", "SemiBold"].map((w) => readFile(join(process.cwd(), `src/assets/JetBrainsMono-${w}.ttf`))),
  );
  const host = new URL(SITE_URL).host;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: c.bg,
          color: c.ink,
          fontFamily: "JetBrains Mono",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, fontWeight: 600 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: c.panel,
              border: `2px solid ${c.rule}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              color: c.str,
              fontSize: 26,
            }}
          >
            ›<div style={{ width: 10, height: 22, borderRadius: 2, background: c.cursor }} />
          </div>
          agent-playbook
        </div>

        <div style={{ display: "flex", fontSize: 68, fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.04em", maxWidth: 980 }}>
          Paste one line. Your agent writes its own rules file.
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            padding: "26px 30px",
            borderRadius: 14,
            background: c.panel,
            border: `2px solid ${c.rule}`,
            fontSize: 28,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ color: c.comment }}>{"> "}</span>
            <span style={{ color: c.str, marginLeft: 12 }}>{`curl -fsSL ${host}/setup/claude.md`}</span>
            <div style={{ width: 15, height: 32, marginLeft: 10, background: c.cursor }} />
          </div>
          <div style={{ display: "flex", color: c.comment, fontSize: 24 }}>
            # For Claude Code, Codex, and Pi. Built from 15 official guides.
          </div>
        </div>
      </div>
    ),
    {
      ...socialCardSize,
      fonts: [
        { name: "JetBrains Mono", data: regular, weight: 400, style: "normal" },
        { name: "JetBrains Mono", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
