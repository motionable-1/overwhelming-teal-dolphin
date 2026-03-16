import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img } from "remotion";
import { FadeInWords, SlideInText } from "../../library/components/text/TextAnimation";

interface ToolCardProps {
  label: string;
  icon: string;
  delay: number;
  index: number;
}

const ToolCard: React.FC<ToolCardProps> = ({ label, icon, delay, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay, config: { damping: 14, stiffness: 120 } });
  const y = interpolate(entrance, [0, 1], [40, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  // Shake animation after appearing
  const shakePhase = Math.max(0, frame - delay - 25);
  const shakeX = shakePhase > 0 && shakePhase < 20
    ? Math.sin(shakePhase * 1.5 + index) * 3 * (1 - shakePhase / 20)
    : 0;

  // Red flash when "breaking"
  const breakFrame = delay + 50;
  const isBreaking = frame >= breakFrame && frame < breakFrame + 15;
  const breakOpacity = isBreaking
    ? interpolate(frame, [breakFrame, breakFrame + 15], [0.3, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  return (
    <div
      style={{
        transform: `translateY(${y}px) translateX(${shakeX}px)`,
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        padding: "24px 28px",
        backgroundColor: "white",
        borderRadius: 16,
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        border: `1.5px solid ${isBreaking ? "#EF4444" : "#E7E5E4"}`,
        position: "relative",
        overflow: "hidden",
        width: 180,
      }}
    >
      {/* Red break flash overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#EF4444",
          opacity: breakOpacity,
          borderRadius: 14,
        }}
      />
      <Img src={icon} style={{ width: 40, height: 40 }} />
      <span style={{ fontSize: 16, fontWeight: 500, color: "#44403C", textAlign: "center" }}>
        {label}
      </span>
    </div>
  );
};

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tools = [
    { label: "Transactional", icon: "https://api.iconify.design/lucide/mail.svg?color=%23615FFF&width=40" },
    { label: "Marketing", icon: "https://api.iconify.design/lucide/megaphone.svg?color=%23615FFF&width=40" },
    { label: "Automation", icon: "https://api.iconify.design/lucide/bot.svg?color=%23615FFF&width=40" },
    { label: "Analytics", icon: "https://api.iconify.design/lucide/bar-chart-3.svg?color=%23615FFF&width=40" },
  ];

  // Disconnected lines between cards
  const lineOpacity = interpolate(frame, [35, 50], [0, 0.4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lineDash = interpolate(frame, [35, 60], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // "Frustrated" cross mark
  const crossEntrance = spring({ frame, fps, delay: 55, config: { damping: 10, stiffness: 200 } });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 48 }}>
        {/* Title */}
        <FadeInWords
          className="text-[36px] font-semibold tracking-tight text-center text-balance"
          style={{ color: "#292524", maxWidth: 700 }}
          stagger={0.06}
          duration={0.4}
        >
          Too many tools. Too much friction.
        </FadeInWords>

        {/* Tool cards with broken connections */}
        <div style={{ display: "flex", gap: 24, alignItems: "center", position: "relative" }}>
          {tools.map((tool, i) => (
            <React.Fragment key={tool.label}>
              <ToolCard label={tool.label} icon={tool.icon} delay={8 + i * 6} index={i} />
              {i < tools.length - 1 && (
                <svg width="30" height="2" style={{ opacity: lineOpacity }}>
                  <line
                    x1="0" y1="1" x2="30" y2="1"
                    stroke="#D6D3D1"
                    strokeWidth="2"
                    strokeDasharray={`4 ${lineDash}`}
                  />
                </svg>
              )}
            </React.Fragment>
          ))}

          {/* Red X overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              opacity: interpolate(crossEntrance, [0, 1], [0, 1]),
              transform: `scale(${interpolate(crossEntrance, [0, 1], [0.3, 1])}) rotate(${interpolate(crossEntrance, [0, 1], [-15, 0])}deg)`,
            }}
          >
            <svg width="120" height="120" viewBox="0 0 120 120">
              <line x1="25" y1="25" x2="95" y2="95" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
              <line x1="95" y1="25" x2="25" y2="95" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
            </svg>
          </div>
        </div>

        {/* Subtitle */}
        <div style={{ opacity: interpolate(frame, [50, 65], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          <SlideInText
            className="text-[20px] font-normal text-center"
            style={{ color: "#78716C", maxWidth: 550 }}
            startFrom={48}
            direction="bottom"
            distance={30}
            stagger={0.03}
          >
            Scattered tools mean scattered data and wasted hours.
          </SlideInText>
        </div>
      </div>
    </AbsoluteFill>
  );
};
