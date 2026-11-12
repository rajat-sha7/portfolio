import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

// The picture shown when the site link is shared (WhatsApp, LinkedIn, X, Slack...)
export const alt = `${site.name} – ${site.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const avatar = await readFile(join(process.cwd(), "public/avatar.png"));
  const avatarSrc = `data:image/png;base64,${avatar.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 80px",
          background: "linear-gradient(135deg, #00070E 0%, #001959 55%, #1E3FAE 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "10px 22px",
              borderRadius: 999,
              border: "2px solid rgba(142,170,255,0.5)",
              color: "#B9CBFF",
              fontSize: 24,
              letterSpacing: 4,
            }}
          >
            PORTFOLIO
          </div>
          <div style={{ marginTop: 28, fontSize: 84, fontWeight: 700, lineHeight: 1.05 }}>{site.name}</div>
          <div style={{ marginTop: 14, fontSize: 46, fontWeight: 600, color: "#8EAAFF" }}>{site.jobTitle}</div>
          <div style={{ marginTop: 28, fontSize: 28, lineHeight: 1.4, color: "#DCE5FF" }}>
            React · Next.js · SvelteKit · Headless CMS · AI
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            width: 400,
            height: 400,
            borderRadius: 400,
            overflow: "hidden",
            background: "linear-gradient(180deg, #4C7DFE 0%, #001959 100%)",
            border: "6px solid rgba(255,255,255,0.18)",
          }}
        >
          <img src={avatarSrc} width={400} height={396} alt="" />
        </div>
      </div>
    ),
    size
  );
}
