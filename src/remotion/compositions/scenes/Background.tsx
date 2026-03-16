import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

/**
 * Persistent animated background for all scenes.
 * Clean #FAFAF9 base with floating brand-colored shapes and subtle grid.
 */
export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  // Floating shapes data (deterministic)
  const shapes = [
    { x: 120, y: 80, size: 180, color: "#615FFF", opacity: 0.06, speed: 0.3, phase: 0 },
    { x: 1050, y: 150, size: 220, color: "#4F39F6", opacity: 0.05, speed: 0.25, phase: 1.2 },
    { x: 600, y: 500, size: 140, color: "#615FFF", opacity: 0.04, speed: 0.35, phase: 2.4 },
    { x: 200, y: 450, size: 100, color: "#4F39F6", opacity: 0.07, speed: 0.2, phase: 0.8 },
    { x: 900, y: 380, size: 160, color: "#615FFF", opacity: 0.05, speed: 0.28, phase: 1.8 },
    { x: 1100, y: 550, size: 120, color: "#4F39F6", opacity: 0.06, speed: 0.32, phase: 3.0 },
  ];

  // Subtle entrance for the background
  const bgOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#FAFAF9", opacity: bgOpacity }}>
      {/* Subtle dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, #615FFF 0.8px, transparent 0.8px)",
          backgroundSize: "40px 40px",
          opacity: 0.06 + Math.sin(t * 0.5) * 0.01,
        }}
      />

      {/* Floating blurred shapes */}
      {shapes.map((s, i) => {
        const floatY = Math.sin(t * s.speed + s.phase) * 20;
        const floatX = Math.cos(t * s.speed * 0.7 + s.phase) * 12;
        const scaleBreath = 1 + Math.sin(t * s.speed * 0.5 + s.phase) * 0.08;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: s.x + floatX,
              top: s.y + floatY,
              width: s.size,
              height: s.size,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${s.color}${Math.round(s.opacity * 255).toString(16).padStart(2, "0")}, transparent 70%)`,
              transform: `scale(${scaleBreath})`,
              filter: "blur(40px)",
            }}
          />
        );
      })}

      {/* Subtle top-left radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 20% 15%, rgba(97,95,255,0.08), transparent 55%)",
        }}
      />

      {/* Subtle bottom-right radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 80% 85%, rgba(79,57,246,0.06), transparent 55%)",
        }}
      />
    </AbsoluteFill>
  );
};
