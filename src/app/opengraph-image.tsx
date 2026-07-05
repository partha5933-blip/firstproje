import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Lux Lens Studio";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#050505",
          color: "#f7f7f2",
          padding: 72,
          fontFamily: "Arial"
        }}
      >
        <div
          style={{
            height: 2,
            width: 280,
            background: "#d7b56d",
            marginBottom: 28
          }}
        />
        <div style={{ fontSize: 78, fontWeight: 700, lineHeight: 0.95 }}>Lux Lens Studio</div>
        <div style={{ marginTop: 24, maxWidth: 840, fontSize: 30, color: "#d9d2c3" }}>
          Premium photography portfolio, lead generation, and integrated CRM.
        </div>
      </div>
    ),
    size
  );
}
