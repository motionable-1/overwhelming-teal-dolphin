import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img } from "remotion";
import { FadeInWords } from "../../library/components/text/TextAnimation";

interface PersonaCardProps {
  title: string;
  items: string[];
  icon: string;
  gradient: string;
  delay: number;
  side: "left" | "right";
}

const PersonaCard: React.FC<PersonaCardProps> = ({ title, items, icon, gradient, delay, side }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay, config: { damping: 14, stiffness: 100 } });
  const x = interpolate(entrance, [0, 1], [side === "left" ? -60 : 60, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  return (
    <div
      style={{
        transform: `translateX(${x}px)`,
        opacity,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        padding: 32,
        backgroundColor: "white",
        borderRadius: 24,
        boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
        border: "1.5px solid #F5F5F4",
        width: 340,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: gradient,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 16px rgba(97,95,255,0.2)",
          }}
        >
          <Img src={icon} style={{ width: 28, height: 28 }} />
        </div>
        <span style={{ fontSize: 22, fontWeight: 600, color: "#292524", letterSpacing: "-0.01em" }}>
          {title}
        </span>
      </div>

      {/* Items with staggered bullets */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map((item, i) => {
          const itemDelay = delay + 12 + i * 6;
          const itemEntrance = spring({ frame, fps, delay: itemDelay, config: { damping: 16, stiffness: 120 } });
          const itemOpacity = interpolate(itemEntrance, [0, 1], [0, 1]);
          const itemX = interpolate(itemEntrance, [0, 1], [20, 0]);

          return (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                opacity: itemOpacity,
                transform: `translateX(${itemX}px)`,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #615FFF, #4F39F6)",
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 15, color: "#57534E", lineHeight: 1.4 }}>{item}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const IntegrationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Connecting line between the two cards
  const lineEntrance = spring({ frame, fps, delay: 30, config: { damping: 20, stiffness: 100 } });
  const lineWidth = interpolate(lineEntrance, [0, 1], [0, 100]);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 44 }}>
        {/* Title */}
        <FadeInWords
          className="text-[36px] font-semibold tracking-tight text-center text-balance"
          style={{ color: "#292524", maxWidth: 700 }}
          stagger={0.06}
        >
          For developers and marketers alike.
        </FadeInWords>

        {/* Persona cards */}
        <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
          <PersonaCard
            title="Developers"
            items={["RESTful API & SDKs", "Webhook events", "Quick integration"]}
            icon="https://api.iconify.design/lucide/code.svg?color=%23ffffff&width=28"
            gradient="linear-gradient(135deg, #615FFF, #4F39F6)"
            delay={8}
            side="left"
          />

          {/* Connecting element */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: lineWidth,
                height: 2,
                background: "linear-gradient(90deg, #615FFF, #4F39F6)",
                borderRadius: 1,
              }}
            />
            <div
              style={{
                opacity: interpolate(lineEntrance, [0, 1], [0, 1]),
                transform: `scale(${interpolate(lineEntrance, [0, 1], [0.5, 1])})`,
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #615FFF, #4F39F6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 16px rgba(97,95,255,0.3)",
              }}
            >
              <Img
                src="https://api.iconify.design/lucide/link.svg?color=%23ffffff&width=22"
                style={{ width: 22, height: 22 }}
              />
            </div>
            <div
              style={{
                width: lineWidth,
                height: 2,
                background: "linear-gradient(90deg, #4F39F6, #615FFF)",
                borderRadius: 1,
              }}
            />
          </div>

          <PersonaCard
            title="Marketers"
            items={["Visual campaign builder", "A/B testing", "Audience segmentation"]}
            icon="https://api.iconify.design/lucide/megaphone.svg?color=%23ffffff&width=28"
            gradient="linear-gradient(135deg, #4F39F6, #615FFF)"
            delay={14}
            side="right"
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
