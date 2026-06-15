import { ImageResponse } from "next/og";
import { OG_IMAGE_ALT, OG_IMAGE_SIZE } from "@/lib/seo/constants";

export const alt = OG_IMAGE_ALT;
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#0F0F0F",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 600,
            color: "#F5F5F0",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          GARIHC
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 400,
            color: "#BFA67A",
            marginTop: 28,
            maxWidth: 900,
            lineHeight: 1.35,
          }}
        >
          Premium digital systems for ambitious brands.
        </div>
      </div>
    ),
    { ...size }
  );
}
