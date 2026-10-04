import { ImageResponse } from "next/og";

export const alt = "Atindra Dubey — AI Engineer with a strong Full Stack foundation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#141311",
          color: "#f4f1ea",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, color: "#e4c9a4" }}>
          ATINDRA DUBEY
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ width: 84, height: 2, background: "#e4c9a4" }} />
          <div style={{ fontSize: 68, lineHeight: 1.05, maxWidth: 900 }}>AI Engineer</div>
          <div style={{ fontSize: 30, color: "#c9c2b6", maxWidth: 820 }}>
            Building intelligent products with a strong Full Stack foundation.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
