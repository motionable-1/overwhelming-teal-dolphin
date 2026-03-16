import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img } from "remotion";
import { FadeInWords, SlideInText } from "../../library/components/text/TextAnimation";
import { Counter } from "../../library/components/text/Counter";

export const PricingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Bar chart animation for volume vs contact comparison
  const barEntrance = spring({ frame, fps, delay: 12, config: { damping: 15, stiffness: 100 } });

  // Volume bar (grows to show savings)
  const volumeBarHeight = interpolate(barEntrance, [0, 1], [0, 180]);
  // Contact bar (grows taller to show cost)
  const contactBarHeight = interpolate(barEntrance, [0, 1], [0, 260]);

  // Cost labels
  const labelOpacity = interpolate(frame, [35, 48], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Checkmark entrance
  const checkEntrance = spring({ frame, fps, delay: 50, config: { damping: 10, stiffness: 200 } });

  // Savings badge
  const savingsEntrance = spring({ frame, fps, delay: 55, config: { damping: 12, stiffness: 150 } });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 40 }}>
        {/* Title */}
        <FadeInWords
          className="text-[36px] font-semibold tracking-tight text-center text-balance"
          style={{ color: "#292524", maxWidth: 700 }}
          stagger={0.06}
        >
          Pay for volume, not contacts.
        </FadeInWords>

        {/* Comparison chart */}
        <div style={{ display: "flex", gap: 60, alignItems: "flex-end", height: 300 }}>
          {/* Contact-based (competitor) */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ opacity: labelOpacity, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: "#DC2626" }}>
                $<Counter from={0} to={299} duration={1} delay={1.2} />
              </span>
              <span style={{ fontSize: 13, color: "#A8A29E" }}>/month</span>
            </div>
            <div
              style={{
                width: 120,
                height: contactBarHeight,
                background: "linear-gradient(180deg, #FCA5A5, #EF4444)",
                borderRadius: "12px 12px 4px 4px",
                boxShadow: "0 4px 20px rgba(239,68,68,0.2)",
              }}
            />
            <span style={{ fontSize: 14, fontWeight: 500, color: "#78716C", textAlign: "center" }}>
              Contact-based
            </span>
          </div>

          {/* VS divider */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, paddingBottom: 30 }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: "#D6D3D1", opacity: labelOpacity }}>vs</span>
          </div>

          {/* Volume-based (AutoSend) */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ opacity: labelOpacity, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: "#615FFF" }}>
                $<Counter from={0} to={49} duration={1} delay={1.2} />
              </span>
              <span style={{ fontSize: 13, color: "#A8A29E" }}>/month</span>
            </div>
            <div
              style={{
                width: 120,
                height: volumeBarHeight,
                background: "linear-gradient(180deg, #A5B4FC, #615FFF)",
                borderRadius: "12px 12px 4px 4px",
                boxShadow: "0 4px 20px rgba(97,95,255,0.25)",
                position: "relative",
              }}
            >
              {/* Checkmark badge */}
              <div
                style={{
                  position: "absolute",
                  top: -16,
                  right: -16,
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  backgroundColor: "#22C55E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `scale(${interpolate(checkEntrance, [0, 1], [0, 1])})`,
                  opacity: interpolate(checkEntrance, [0, 1], [0, 1]),
                  boxShadow: "0 2px 10px rgba(34,197,94,0.3)",
                }}
              >
                <Img src="https://api.iconify.design/lucide/check.svg?color=%23ffffff&width=20" style={{ width: 20, height: 20 }} />
              </div>
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#615FFF", textAlign: "center" }}>
              Volume-based
            </span>
          </div>
        </div>

        {/* Savings badge */}
        <div
          style={{
            transform: `scale(${interpolate(savingsEntrance, [0, 1], [0.7, 1])})`,
            opacity: interpolate(savingsEntrance, [0, 1], [0, 1]),
            padding: "12px 28px",
            borderRadius: 100,
            background: "linear-gradient(135deg, #615FFF10, #4F39F610)",
            border: "1.5px solid #615FFF30",
          }}
        >
          <SlideInText
            className="text-[18px] font-medium text-center"
            style={{ color: "#615FFF" }}
            startFrom={53}
            direction="bottom"
            distance={20}
            stagger={0.03}
          >
            Scale without surprise bills
          </SlideInText>
        </div>
      </div>
    </AbsoluteFill>
  );
};
