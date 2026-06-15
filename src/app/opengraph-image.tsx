import { ImageResponse } from "next/og";
import { SITE_NAME, TAGLINE } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE_NAME} — ${TAGLINE}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#faf7f2",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "#0e7c6b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "34px",
              fontWeight: 700,
            }}
          >
            A
          </div>
          <div style={{ fontSize: "34px", fontWeight: 700, color: "#1c2321" }}>
            AegeanPulse
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "68px",
              fontWeight: 700,
              color: "#1c2321",
              lineHeight: 1.1,
              maxWidth: "900px",
            }}
          >
            Practical AI Solutions for Small Business Growth
          </div>
          <div
            style={{
              marginTop: "28px",
              fontSize: "30px",
              color: "#5f6864",
              maxWidth: "820px",
            }}
          >
            AI automation, agents, chatbots, and strategy — affordable,
            fixed-scope, and built for real business use.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "26px",
            color: "#0e7c6b",
            fontWeight: 600,
          }}
        >
          <div
            style={{ width: "44px", height: "4px", background: "#0e7c6b" }}
          />
          aegeanpulse.com
        </div>
      </div>
    ),
    { ...size },
  );
}
