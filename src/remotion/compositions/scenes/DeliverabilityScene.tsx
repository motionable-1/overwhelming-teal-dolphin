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

/**
 * Scene: Deliverability & Smart Validation — Modern redesign
 *
 * Layout: Large stat card on the left with animated horizontal bar,
 * glass-panel email feed on the right. No old-school circular meter.
 */

/* ------------------------------------------------------------------ */
/*  Animated number (simple inline interpolate, no Counter component) */
/* ------------------------------------------------------------------ */
const AnimatedNumber: React.FC<{
  to: number;
  delaySec: number;
  durSec?: number;
}> = ({ to, delaySec, durSec = 1.5 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const d = Math.round(delaySec * fps);
  const dur = Math.round(durSec * fps);
  const v = Math.round(
    interpolate(frame - d, [0, dur], [0, to], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }),
  );
  return <>{v}</>;
};

/* ------------------------------------------------------------------ */
/*  Main scene                                                        */
/* ------------------------------------------------------------------ */
export const DeliverabilityScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  /* --- entrance springs --- */
  const cardEntrance = spring({ frame, fps, delay: 8, config: { damping: 16, stiffness: 90 } });
  const panelEntrance = spring({ frame, fps, delay: 16, config: { damping: 16, stiffness: 90 } });
  const badgeEntrance = spring({ frame, fps, delay: 62, config: { damping: 12, stiffness: 120 } });

  /* --- horizontal progress bar --- */
  const barProgress = interpolate(frame, [14, 65], [0, 0.99], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  /* --- email items --- */
  const emails: { label: string; desc: string; status: "ok" | "blocked"; delay: number }[] = [
    { label: "welcome@acme.co", desc: "Welcome email", status: "ok", delay: 18 },
    { label: "orders@acme.co", desc: "Order confirmation", status: "ok", delay: 26 },
    { label: "reset@acme.co", desc: "Password reset", status: "ok", delay: 34 },
    { label: "invalid@bad.xyz", desc: "Suppressed", status: "blocked", delay: 42 },
    { label: "digest@acme.co", desc: "Weekly digest", status: "ok", delay: 50 },
  ];

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
        {/* Title */}
        <FadeInWords
          className="text-[36px] font-semibold tracking-tight text-center text-balance"
          style={{ color: "#292524", maxWidth: 700 }}
          stagger={0.06}
        >
          Land in the inbox, every time.
        </FadeInWords>

        {/* Content row */}
        <div style={{ display: "flex", gap: 28, alignItems: "stretch" }}>

          {/* ─── LEFT: Stat card ─── */}
          <div
            style={{
              width: 340,
              padding: "36px 32px",
              borderRadius: 24,
              background: "linear-gradient(145deg, rgba(255,255,255,0.92), rgba(255,255,255,0.78))",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.6)",
              boxShadow: "0 8px 40px rgba(97,95,255,0.08), 0 1px 3px rgba(0,0,0,0.04)",
              display: "flex",
              flexDirection: "column",
              gap: 28,
              opacity: interpolate(cardEntrance, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(cardEntrance, [0, 1], [30, 0])}px)`,
            }}
          >
            {/* Big stat */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
                <span
                  style={{
                    fontSize: 56,
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    background: "linear-gradient(135deg, #615FFF, #4F39F6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  <AnimatedNumber to={99} delaySec={0.5} durSec={1.8} />
                </span>
                <span
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #615FFF, #4F39F6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  %
                </span>
              </div>
              <span style={{ fontSize: 15, fontWeight: 500, color: "#78716C" }}>
                Inbox deliverability rate
              </span>
            </div>

            {/* Progress bar */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {/* Track */}
              <div
                style={{
                  width: "100%",
                  height: 10,
                  borderRadius: 6,
                  backgroundColor: "#F5F5F4",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Fill */}
                <div
                  style={{
                    width: `${barProgress * 100}%`,
                    height: "100%",
                    borderRadius: 6,
                    background: "linear-gradient(90deg, #615FFF, #4F39F6, #22C55E)",
                    boxShadow: "0 0 16px rgba(97,95,255,0.35)",
                    position: "relative",
                  }}
                >
                  {/* Glowing leading edge */}
                  <div
                    style={{
                      position: "absolute",
                      right: -4,
                      top: -3,
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: "radial-gradient(circle, rgba(34,197,94,0.6), transparent 70%)",
                    }}
                  />
                </div>
              </div>

              {/* Scale labels */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, color: "#A8A29E" }}>0%</span>
                <span style={{ fontSize: 11, color: "#A8A29E" }}>100%</span>
              </div>
            </div>

            {/* Shield row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 16px",
                borderRadius: 14,
                background: "linear-gradient(135deg, #615FFF08, #4F39F604)",
                border: "1px solid #615FFF14",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: "linear-gradient(135deg, #615FFF, #4F39F6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 14px rgba(97,95,255,0.25)",
                }}
              >
                <Img
                  src="https://api.iconify.design/lucide/shield-check.svg?color=%23ffffff&width=22"
                  style={{ width: 22, height: 22 }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#292524" }}>
                  Smart Suppression
                </span>
                <span style={{ fontSize: 12, color: "#A8A29E" }}>
                  Auto-filters invalid contacts
                </span>
              </div>
            </div>
          </div>

          {/* ─── RIGHT: Email feed panel ─── */}
          <div
            style={{
              width: 380,
              padding: "24px 20px",
              borderRadius: 24,
              background: "linear-gradient(145deg, rgba(255,255,255,0.92), rgba(255,255,255,0.78))",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.6)",
              boxShadow: "0 8px 40px rgba(97,95,255,0.08), 0 1px 3px rgba(0,0,0,0.04)",
              display: "flex",
              flexDirection: "column",
              gap: 6,
              opacity: interpolate(panelEntrance, [0, 1], [0, 1]),
              transform: `translateX(${interpolate(panelEntrance, [0, 1], [30, 0])}px)`,
            }}
          >
            {/* Panel header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 8,
                paddingLeft: 4,
                paddingRight: 4,
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 600, color: "#292524" }}>
                Live Email Feed
              </span>
              {/* Animated dot */}
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    backgroundColor: "#22C55E",
                    opacity: 0.6 + Math.sin(t * 4) * 0.4,
                    boxShadow: "0 0 6px rgba(34,197,94,0.4)",
                  }}
                />
                <span style={{ fontSize: 12, color: "#A8A29E" }}>Live</span>
              </div>
            </div>

            {/* Email rows */}
            {emails.map((email, i) => {
              const itemEntrance = spring({
                frame,
                fps,
                delay: email.delay,
                config: { damping: 16, stiffness: 140 },
              });
              const itemOpacity = interpolate(itemEntrance, [0, 1], [0, 1]);
              const itemY = interpolate(itemEntrance, [0, 1], [16, 0]);
              const isBlocked = email.status === "blocked";

              return (
                <React.Fragment key={email.label}>
                  {/* Hairline divider (skip first) */}
                  {i > 0 && (
                    <div
                      style={{
                        height: 1,
                        background: "linear-gradient(90deg, transparent, #E7E5E4, transparent)",
                        marginLeft: 12,
                        marginRight: 12,
                        opacity: itemOpacity,
                      }}
                    />
                  )}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 12px",
                      borderRadius: 12,
                      backgroundColor: isBlocked ? "rgba(254,226,226,0.5)" : "transparent",
                      opacity: itemOpacity,
                      transform: `translateY(${itemY}px)`,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      {/* Status dot */}
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: isBlocked ? "#F87171" : "#22C55E",
                          boxShadow: isBlocked
                            ? "0 0 6px rgba(248,113,113,0.4)"
                            : "0 0 6px rgba(34,197,94,0.4)",
                          flexShrink: 0,
                        }}
                      />
                      <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 500,
                            color: isBlocked ? "#B91C1C" : "#292524",
                            textDecoration: isBlocked ? "line-through" : "none",
                            fontFamily: "monospace",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {email.label}
                        </span>
                        <span style={{ fontSize: 11, color: "#A8A29E" }}>
                          {email.desc}
                        </span>
                      </div>
                    </div>
                    {/* Status pill */}
                    <div
                      style={{
                        padding: "3px 10px",
                        borderRadius: 100,
                        backgroundColor: isBlocked ? "#FEE2E2" : "#F0FDF4",
                        border: `1px solid ${isBlocked ? "#FECACA" : "#BBF7D0"}`,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: isBlocked ? "#DC2626" : "#16A34A",
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {isBlocked ? "blocked" : "delivered"}
                      </span>
                    </div>
                  </div>
                </React.Fragment>
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
