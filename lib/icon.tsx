import { ImageResponse } from "next/og";

/** Icône de l'application (drapeau stylisé + coche), générée en PNG au build. */
export function renderIcon(size: number, opts: { rounded?: boolean } = {}) {
  const pad = Math.round(size * 0.18);
  const r = opts.rounded ? Math.round(size * 0.22) : 0;
  return new ImageResponse(
    (
      <div
        style={{
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1f3a93",
          borderRadius: r,
        }}
      >
        <div
          style={{
            display: "flex",
            width: size - pad * 2,
            height: Math.round((size - pad * 2) * 0.68),
            borderRadius: Math.round(size * 0.06),
            overflow: "hidden",
            border: `${Math.max(1, Math.round(size * 0.02))}px solid white`,
          }}
        >
          <div style={{ flex: 1, background: "#1f3a93" }} />
          <div style={{ flex: 1, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div
              style={{
                width: Math.round(size * 0.09),
                height: Math.round(size * 0.18),
                borderRight: `${Math.max(2, Math.round(size * 0.04))}px solid #1f3a93`,
                borderBottom: `${Math.max(2, Math.round(size * 0.04))}px solid #1f3a93`,
                transform: "rotate(45deg) translateY(-12%)",
              }}
            />
          </div>
          <div style={{ flex: 1, background: "#d62839" }} />
        </div>
      </div>
    ),
    { width: size, height: size },
  );
}
