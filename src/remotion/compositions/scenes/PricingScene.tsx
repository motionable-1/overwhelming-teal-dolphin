import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing, Img } from "remotion";
import { FadeInWords, SlideInText } from "../../library/components/text/TextAnimation";

/**
 * Simple animated price display — no Counter component, just interpolate.
 */
const AnimatedPrice: React.FC<{
  to: number;
  color: string;
  delaySeconds: number;
}> = ({ to, color, delaySeconds }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = Math.round(delaySeconds * fps);
  const durationFrames = Math.round(1 * fps);

  const value = Math.round(
    interpolate(frame - delayFrames, [0, durationFrames], [0, to], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }),
  );

  return (
    <span style={{ fontSize: 28, fontWeight: 700, color }}>
      ${value}
    </span>
  );
};

const MAX_BAR_HEIGHT = 220;

export const PricingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Bar chart animation
  const barEntrance = spring({ frame, fps, delay: 12, config: { damping: 15, stiffness: 100 } });

  // Bar heights
  const contactBarHeight = interpolate(barEntrance, [0, 1], [0, MAX_BAR_HEIGHT]);
  const volumeBarHeight = interpolate(barEntrance, [0, 1], [0, MAX_BAR_HEIGHT * 0.55]);

  // Labels fade in
  const labelOpacity = interpolate(frame, [35, 48], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Checkmark entrance
  const checkEntrance = spring({ frame, fps, delay: 50, config: { damping: 10, stiffness: 200 } });

  // Savings badge
  const savingsEntrance = spring({ frame, fps, delay: 55, config: { damping: 12, stiffness: 150 } });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 36 }}>
        {/* Title */}
        <FadeInWords
          className="text-[36px] font-semibold tracking-tight text-center text-balance"
          style={{ color: "#292524", maxWidth: 700 }}
          stagger={0.06}
        >
          Pay for volume, not contacts.
        </FadeInWords>

        {/* Comparison chart — bars grow upward from a shared baseline */}
        <div style={{ display: "flex", gap: 50, alignItems: "flex-end" }}>
          {/* Contact-based (competitor) */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, width: 140 }}>
            {/* Bar area with fixed height — bar grows upward inside */}
            <div
              style={{
                width: 120,
                height: MAX_BAR_HEIGHT,
                position: "relative",
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: contactBarHeight,
                  background: "linear-gradient(180deg, #FCA5A5, #EF4444)",
                  borderRadius: "12px 12px 4px 4px",
                  boxShadow: "0 4px 20px rgba(239,68,68,0.2)",
                }}
              />
            </div>
            {/* Label + price below bar */}
            <div
              style={{
                opacity: labelOpacity,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: 14,
                gap: 2,
              }}
            >
              <AnimatedPrice to={299} color="#DC2626" delaySeconds={1.2} />
              <span style={{ fontSize: 13, color: "#A8A29E" }}>/month</span>
              <span style={{ fontSize: 14, fontWeight: 500, color: "#78716C", marginTop: 4 }}>
                Contact-based
              </span>
            </div>
          </div>

          {/* VS divider */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingBottom: 50,
            }}
          >
            <span style={{ fontSize: 18, fontWeight: 700, color: "#D6D3D1", opacity: labelOpacity }}>vs</span>
          </div>

          {/* Volume-based (AutoSend) */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, width: 140 }}>
            {/* Bar area with fixed height — bar grows upward inside */}
            <div
              style={{
                width: 120,
                height: MAX_BAR_HEIGHT,
                position: "relative",
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <div
                style={{
                  width: "100%",
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
            </div>
            {/* Label + price below bar */}
            <div
              style={{
                opacity: labelOpacity,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: 14,
                gap: 2,
              }}
            >
              <AnimatedPrice to={49} color="#615FFF" delaySeconds={1.2} />
              <span style={{ fontSize: 13, color: "#A8A29E" }}>/month</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#615FFF", marginTop: 4 }}>
                Volume-based
              </span>
            </div>
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
