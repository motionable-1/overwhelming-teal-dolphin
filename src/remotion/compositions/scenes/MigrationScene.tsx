import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
  Img,
} from "remotion";
import { FadeInWords } from "../../library/components/text/TextAnimation";
import { Counter } from "../../library/components/text/Counter";

/**
 * Scene: Quick Migration & Setup
 * Visual: Animated timeline showing migration steps that resolve fast,
 * plus a "minutes, not days" counter statement.
 */

interface StepProps {
  label: string;
  icon: string;
  delay: number;
  index: number;
}

const MigrationStep: React.FC<StepProps> = ({ label, icon, delay, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    delay,
    config: { damping: 14, stiffness: 120 },
  });
  const x = interpolate(entrance, [0, 1], [-40, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const scale = interpolate(entrance, [0, 1], [0.85, 1]);

  // Checkmark pops in after the step
  const checkDelay = delay + 14;
  const checkEntrance = spring({
    frame,
    fps,
    delay: checkDelay,
    config: { damping: 10, stiffness: 200 },
  });

  // Connector line grows from previous step
  const lineProgress = interpolate(frame, [delay - 6, delay + 4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        opacity,
        transform: `translateX(${x}px) scale(${scale})`,
      }}
    >
      {/* Step number / connector */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
        }}
      >
        {/* Connector line from above (skip for first) */}
        {index > 0 && (
          <div
            style={{
              width: 2,
              height: 28,
              background: `linear-gradient(180deg, #615FFF, #4F39F6)`,
              borderRadius: 1,
              transform: `scaleY(${lineProgress})`,
              transformOrigin: "top",
              marginBottom: 4,
            }}
          />
        )}
        {/* Step circle */}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #615FFF, #4F39F6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 16px rgba(97,95,255,0.25)",
            position: "relative",
          }}
        >
          <Img src={icon} style={{ width: 22, height: 22 }} />

          {/* Check badge */}
          <div
            style={{
              position: "absolute",
              top: -6,
              right: -6,
              width: 22,
              height: 22,
              borderRadius: "50%",
              backgroundColor: "#22C55E",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${interpolate(checkEntrance, [0, 1], [0, 1])})`,
              opacity: interpolate(checkEntrance, [0, 1], [0, 1]),
              boxShadow: "0 2px 8px rgba(34,197,94,0.3)",
            }}
          >
            <Img
              src="https://api.iconify.design/lucide/check.svg?color=%23ffffff&width=14"
              style={{ width: 14, height: 14 }}
            />
          </div>
        </div>
      </div>

      {/* Step label card */}
      <div
        style={{
          padding: "14px 22px",
          backgroundColor: "white",
          borderRadius: 14,
          boxShadow: "0 2px 14px rgba(0,0,0,0.05)",
          border: "1.5px solid #F5F5F4",
        }}
      >
        <span
          style={{
            fontSize: 17,
            fontWeight: 500,
            color: "#292524",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

export const MigrationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const steps = [
    {
      label: "Install SDK & configure API key",
      icon: "https://api.iconify.design/lucide/key.svg?color=%23ffffff&width=22",
    },
    {
      label: "Import your contacts & templates",
      icon: "https://api.iconify.design/lucide/upload.svg?color=%23ffffff&width=22",
    },
    {
      label: "Update DNS records (SPF, DKIM)",
      icon: "https://api.iconify.design/lucide/globe.svg?color=%23ffffff&width=22",
    },
    {
      label: "Start sending — you're live!",
      icon: "https://api.iconify.design/lucide/rocket.svg?color=%23ffffff&width=22",
    },
  ];

  // Counter badge entrance
  const badgeEntrance = spring({
    frame,
    fps,
    delay: 60,
    config: { damping: 12, stiffness: 120 },
  });

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        {/* Title */}
        <FadeInWords
          className="text-[36px] font-semibold tracking-tight text-center text-balance"
          style={{ color: "#292524", maxWidth: 700 }}
          stagger={0.06}
        >
          Migrate in minutes, not days.
        </FadeInWords>

        {/* Timeline steps */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            alignItems: "flex-start",
          }}
        >
          {steps.map((step, i) => (
            <MigrationStep
              key={step.label}
              label={step.label}
              icon={step.icon}
              delay={10 + i * 12}
              index={i}
            />
          ))}
        </div>

        {/* "Minutes" counter badge */}
        <div
          style={{
            transform: `scale(${interpolate(badgeEntrance, [0, 1], [0.7, 1])})`,
            opacity: interpolate(badgeEntrance, [0, 1], [0, 1]),
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "14px 32px",
            borderRadius: 100,
            background: "linear-gradient(135deg, #615FFF10, #4F39F610)",
            border: "1.5px solid #615FFF30",
          }}
        >
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#615FFF",
            }}
          >
            <Counter from={0} to={5} duration={0.8} delay={2.1} />
          </span>
          <span
            style={{ fontSize: 18, fontWeight: 500, color: "#615FFF" }}
          >
            minutes average setup
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
