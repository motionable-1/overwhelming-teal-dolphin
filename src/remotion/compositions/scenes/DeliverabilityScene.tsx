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
import { FadeInWords, SlideInText } from "../../library/components/text/TextAnimation";
import { Counter } from "../../library/components/text/Counter";

/**
 * Scene: Deliverability & Smart Validation
 * Visual: Animated inbox with emails flowing in, a validation shield,
 * and a deliverability meter climbing to 99%.
 */

export const DeliverabilityScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // Meter entrance
  const meterEntrance = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 16, stiffness: 100 },
  });

  // Meter fill grows
  const meterFill = interpolate(frame, [15, 70], [0, 0.99], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Shield entrance
  const shieldEntrance = spring({
    frame,
    fps,
    delay: 25,
    config: { damping: 12, stiffness: 120 },
  });

  // Email flow items
  const emails = [
    { label: "Welcome email", status: "delivered", delay: 12 },
    { label: "Order confirmation", status: "delivered", delay: 22 },
    { label: "Password reset", status: "delivered", delay: 32 },
    { label: "invalid@bad.xyz", status: "blocked", delay: 42 },
    { label: "Weekly digest", status: "delivered", delay: 52 },
  ];

  // Bottom badge
  const badgeEntrance = spring({
    frame,
    fps,
    delay: 62,
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
          gap: 36,
        }}
      >
        {/* Title */}
        <FadeInWords
          className="text-[36px] font-semibold tracking-tight text-center text-balance"
          style={{ color: "#292524", maxWidth: 700 }}
          stagger={0.06}
        >
          Land in the inbox, every time.
        </FadeInWords>

        {/* Main content: meter + email list */}
        <div
          style={{
            display: "flex",
            gap: 48,
            alignItems: "center",
          }}
        >
          {/* Left: Deliverability meter */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              opacity: interpolate(meterEntrance, [0, 1], [0, 1]),
              transform: `scale(${interpolate(meterEntrance, [0, 1], [0.8, 1])})`,
            }}
          >
            {/* Circular meter */}
            <div style={{ position: "relative", width: 180, height: 180 }}>
              {/* Background ring */}
              <svg
                width={180}
                height={180}
                viewBox="0 0 180 180"
                style={{ position: "absolute", top: 0, left: 0 }}
              >
                <circle
                  cx={90}
                  cy={90}
                  r={76}
                  fill="none"
                  stroke="#E7E5E4"
                  strokeWidth={10}
                />
                {/* Filled arc */}
                <circle
                  cx={90}
                  cy={90}
                  r={76}
                  fill="none"
                  stroke="url(#meterGrad)"
                  strokeWidth={10}
                  strokeLinecap="round"
                  strokeDasharray={`${meterFill * 2 * Math.PI * 76} ${2 * Math.PI * 76}`}
                  transform="rotate(-90 90 90)"
                />
                <defs>
                  <linearGradient
                    id="meterGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#615FFF" />
                    <stop offset="100%" stopColor="#22C55E" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Center text */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: 40,
                    fontWeight: 700,
                    color: "#292524",
                    lineHeight: 1,
                  }}
                >
                  <Counter
                    from={0}
                    to={99}
                    duration={1.8}
                    delay={0.5}
                  />
                  <span style={{ fontSize: 24, fontWeight: 600 }}>%</span>
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#A8A29E",
                    marginTop: 4,
                  }}
                >
                  deliverability
                </span>
              </div>
            </div>
          </div>

          {/* Center: Shield icon */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              transform: `scale(${interpolate(shieldEntrance, [0, 1], [0.5, 1])})`,
              opacity: interpolate(shieldEntrance, [0, 1], [0, 1]),
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 20,
                background: "linear-gradient(135deg, #615FFF, #4F39F6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 32px rgba(97,95,255,0.3)",
              }}
            >
              <Img
                src="https://api.iconify.design/lucide/shield-check.svg?color=%23ffffff&width=36"
                style={{ width: 36, height: 36 }}
              />
            </div>
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#615FFF",
                whiteSpace: "nowrap",
              }}
            >
              Smart Filter
            </span>
          </div>

          {/* Right: Email flow list */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              width: 320,
            }}
          >
            {emails.map((email) => {
              const itemEntrance = spring({
                frame,
                fps,
                delay: email.delay,
                config: { damping: 16, stiffness: 140 },
              });
              const itemOpacity = interpolate(
                itemEntrance,
                [0, 1],
                [0, 1],
              );
              const itemX = interpolate(
                itemEntrance,
                [0, 1],
                [30, 0],
              );
              const isBlocked = email.status === "blocked";

              return (
                <div
                  key={email.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 16px",
                    backgroundColor: isBlocked
                      ? "#FEF2F2"
                      : "white",
                    borderRadius: 12,
                    border: `1.5px solid ${isBlocked ? "#FECACA" : "#F5F5F4"}`,
                    boxShadow: "0 1px 6px rgba(0,0,0,0.03)",
                    opacity: itemOpacity,
                    transform: `translateX(${itemX}px)`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Img
                      src={
                        isBlocked
                          ? "https://api.iconify.design/lucide/x-circle.svg?color=%23EF4444&width=18"
                          : "https://api.iconify.design/lucide/mail-check.svg?color=%2322C55E&width=18"
                      }
                      style={{ width: 18, height: 18 }}
                    />
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: isBlocked ? "#DC2626" : "#44403C",
                        textDecoration: isBlocked
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {email.label}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: isBlocked ? "#EF4444" : "#22C55E",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {email.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom badge */}
        <div
          style={{
            transform: `scale(${interpolate(badgeEntrance, [0, 1], [0.7, 1])})`,
            opacity: interpolate(badgeEntrance, [0, 1], [0, 1]),
            padding: "12px 28px",
            borderRadius: 100,
            background: "linear-gradient(135deg, #615FFF10, #4F39F610)",
            border: "1.5px solid #615FFF30",
          }}
        >
          <SlideInText
            className="text-[17px] font-medium text-center"
            style={{ color: "#615FFF" }}
            startFrom={58}
            direction="bottom"
            distance={18}
            stagger={0.03}
          >
            Intelligent suppression protects your sender reputation
          </SlideInText>
        </div>
      </div>
    </AbsoluteFill>
  );
};
