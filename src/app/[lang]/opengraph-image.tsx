import { ImageResponse } from "next/og";
import { LANGUAGES, getDictionary, isLang } from "@/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Tiago Guerra — portfolio";

export function generateStaticParams() {
  return LANGUAGES.map((lang) => ({ lang }));
}

/**
 * Rendered to a PNG at build time, one per language. Deliberately typographic: the
 * renderer supports only a subset of CSS, and a link preview is read at thumbnail size
 * where a detailed map would turn to mud anyway.
 */
export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(isLang(lang) ? lang : "pt");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#05070a",
          padding: "72px",
          color: "#e6edf3",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "24px", color: "#4cc2ff" }}>
          <div style={{ fontSize: 30, letterSpacing: "0.24em" }}>GRU</div>
          <div style={{ display: "flex", width: "220px", height: "2px", background: "#1c2b38" }} />
          <div style={{ fontSize: 34 }}>✈</div>
          <div style={{ display: "flex", width: "220px", height: "2px", background: "#1c2b38" }} />
          <div style={{ fontSize: 30, letterSpacing: "0.24em" }}>YVR</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: "-0.03em" }}>
            {dict.hero.name}
          </div>
          <div style={{ fontSize: 34, color: "#7d8b9a", marginTop: "18px" }}>
            {dict.hero.role}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#4cc2ff",
            borderTop: "1px solid #1c2b38",
            paddingTop: "28px",
          }}
        >
          {dict.canada.kicker}
        </div>
      </div>
    ),
    size,
  );
}
