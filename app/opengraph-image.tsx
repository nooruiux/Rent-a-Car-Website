import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Rent — Find your dream car within a minute in Dubai";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const car = await readFile(path.join(process.cwd(), "public/images/hero-lamborghini-huracan.png"));
  const carSrc = `data:image/png;base64,${car.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#f5f6fb", position: "relative", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 0 0 72px", width: 600, gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#1aa9e5", fontSize: 44, fontWeight: 700 }}>Rent</div>
          <div style={{ fontSize: 30, color: "#202020" }}>Rent a car in Dubai</div>
          <div style={{ fontSize: 64, lineHeight: 1.15, fontWeight: 700, color: "#202020" }}>Find your dream car within a minute</div>
          <div style={{ display: "flex", marginTop: 8, background: "#1aa9e5", color: "#fefefe", fontSize: 26, padding: "14px 28px", borderRadius: 6, alignSelf: "flex-start" }}>
            Get Started →
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={carSrc} width={680} height={439} alt="" style={{ position: "absolute", right: -40, top: 110 }} />
        <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: 14, background: "#005085" }} />
      </div>
    ),
    size,
  );
}
