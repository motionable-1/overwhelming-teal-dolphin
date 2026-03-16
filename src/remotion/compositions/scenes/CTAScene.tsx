import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img } from "remotion";
import { FadeInChars, FadeInWords, BlurReveal } from "../../library/components/text/TextAnimation";
import { ShapeAnimation } from "../../library/components/effects/ShapeAnimation";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  // Card entrance
  const cardEntrance = spring({ frame, fps, delay: 5, config: { damping: 14, stiffness: 80 } });
  const cardScale = interpolate(cardEntrance, [0, 1], [0.85, 1]);
  const cardOpacity = interpolate(cardEntrance, [0, 1], [0, 1]);

  // Button pulse
  const btnEntrance = spring({ frame, fps, delay: 30, config: { damping: 10, stiffness: 120 } });
  const btnPulse = 1 + Math.sin(t * 3) * 0.015;

  // URL entrance
  const urlEntrance = spring({ frame, fps, delay: 40, config: { damping: 15, stiffness: 100 } });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      {/* Decorative shapes */}
      <div style={{ position: "absolute", top: 60, left: 140, opacity: 0.12 }}>
        <ShapeAnimation shape="star" animation="rotate" size={60} color="#615FFF" speed={0.2} />
      </div>
      <div style={{ position: "absolute", bottom: 80, right: 160, opacity: 0.1 }}>
        <ShapeAnimation shape="hexagon" animation="breathe" size={80} color="#4F39F6" speed={0.3} />
      </div>

      {/* CTA Card */}
      <div
        style={{
          transform: `scale(${cardScale})`,
          opacity: cardOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 32,
          padding: "60px 80px",
          background: "linear-gradient(135deg, #615FFF, #4F39F6)",
          borderRadius: 32,
          boxShadow: "0 20px 80px rgba(97,95,255,0.3)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle inner glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.12), transparent 60%)",
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            opacity: interpolate(frame, [8, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <Img
            src="https://api.iconify.design/mdi/email-send.svg?color=%23ffffff&width=48"
            style={{ width: 48, height: 48 }}
          />
        </div>

        {/* Title */}
        <FadeInWords
          className="text-[40px] font-bold tracking-tight text-center text-balance"
          style={{ color: "white", maxWidth: 600 }}
          startFrom={10}
          stagger={0.07}
        >
          Start sending smarter today.
        </FadeInWords>

        {/* Subtitle */}
        <div style={{ opacity: interpolate(frame, [25, 38], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          <BlurReveal
            className="text-[20px] font-normal text-center"
            style={{ color: "rgba(255,255,255,0.85)", maxWidth: 450 }}
            startFrom={23}
            stagger={0.03}
          >
            Free to start. Scale when you need to.
          </BlurReveal>
        </div>

        {/* CTA Button */}
        <div
          style={{
            transform: `scale(${interpolate(btnEntrance, [0, 1], [0.7, 1]) * btnPulse})`,
            opacity: interpolate(btnEntrance, [0, 1], [0, 1]),
            padding: "16px 40px",
            backgroundColor: "white",
            borderRadius: 14,
            boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 18, fontWeight: 600, color: "#615FFF" }}>
            Get Started Free
          </span>
          <Img
            src="https://api.iconify.design/lucide/arrow-right.svg?color=%23615FFF&width=20"
            style={{ width: 20, height: 20 }}
          />
        </div>
      </div>

      {/* URL at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: "50%",
          transform: `translateX(-50%) translateY(${interpolate(urlEntrance, [0, 1], [20, 0])}px)`,
          opacity: interpolate(urlEntrance, [0, 1], [0, 1]),
        }}
      >
        <FadeInChars
          className="text-[22px] font-medium tracking-wide text-center"
          style={{ color: "#615FFF" }}
          startFrom={38}
          stagger={0.03}
        >
          autosend.com
        </FadeInChars>
      </div>
    </AbsoluteFill>
  );
};
