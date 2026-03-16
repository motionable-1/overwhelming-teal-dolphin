import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img } from "remotion";
import { FadeInWords } from "../../library/components/text/TextAnimation";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  delay: number;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, delay, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay, config: { damping: 14, stiffness: 100 } });
  const y = interpolate(entrance, [0, 1], [50, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const scale = interpolate(entrance, [0, 1], [0.9, 1]);

  // Subtle hover-like float
  const t = frame / fps;
  const floatY = Math.sin(t * 0.8 + index * 1.2) * 3;

  return (
    <div
      style={{
        transform: `translateY(${y + floatY}px) scale(${scale})`,
        opacity,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        padding: "28px 24px",
        backgroundColor: "white",
        borderRadius: 20,
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        border: "1.5px solid #F5F5F4",
        width: 260,
        minHeight: 180,
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 14,
          background: "linear-gradient(135deg, #615FFF12, #4F39F608)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Img src={icon} style={{ width: 28, height: 28 }} />
      </div>

      {/* Text */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontSize: 18, fontWeight: 600, color: "#292524", letterSpacing: "-0.01em" }}>
          {title}
        </span>
        <span style={{ fontSize: 14, fontWeight: 400, color: "#78716C", lineHeight: 1.5 }}>
          {description}
        </span>
      </div>
    </div>
  );
};

export const FeaturesScene: React.FC = () => {
  const features = [
    {
      title: "Simple API",
      description: "Ship emails in minutes with SDKs for every language.",
      icon: "https://api.iconify.design/lucide/code.svg?color=%23615FFF&width=28",
    },
    {
      title: "Real-Time Tracking",
      description: "Monitor opens, clicks, and deliveries as they happen.",
      icon: "https://api.iconify.design/lucide/activity.svg?color=%23615FFF&width=28",
    },
    {
      title: "Smart Suppression",
      description: "Auto-filter invalid contacts to protect your reputation.",
      icon: "https://api.iconify.design/lucide/shield-check.svg?color=%23615FFF&width=28",
    },
    {
      title: "Campaign Builder",
      description: "Create and personalize campaigns with ease.",
      icon: "https://api.iconify.design/lucide/palette.svg?color=%23615FFF&width=28",
    },
  ];

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 44 }}>
        {/* Title */}
        <FadeInWords
          className="text-[36px] font-semibold tracking-tight text-center text-balance"
          style={{ color: "#292524", maxWidth: 700 }}
          stagger={0.06}
        >
          Built for speed. Designed for scale.
        </FadeInWords>

        {/* Feature grid */}
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center", maxWidth: 1140 }}>
          {features.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              delay={10 + i * 8}
              index={i}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
