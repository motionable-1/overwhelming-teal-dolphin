import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img } from "remotion";
import { FadeInWords, FadeInChars } from "../../library/components/text/TextAnimation";

export const SolutionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Central hub entrance
  const hubScale = spring({ frame, fps, delay: 5, config: { damping: 12, stiffness: 100 } });
  const hubSize = interpolate(hubScale, [0, 1], [0.5, 1]);
  const hubOpacity = interpolate(hubScale, [0, 1], [0, 1]);

  // Orbiting items
  const orbitItems = [
    { label: "Transactional", icon: "https://api.iconify.design/lucide/mail.svg?color=%23ffffff&width=28", angle: 0 },
    { label: "Marketing", icon: "https://api.iconify.design/lucide/megaphone.svg?color=%23ffffff&width=28", angle: 90 },
    { label: "Automation", icon: "https://api.iconify.design/lucide/bot.svg?color=%23ffffff&width=28", angle: 180 },
    { label: "Analytics", icon: "https://api.iconify.design/lucide/bar-chart-3.svg?color=%23ffffff&width=28", angle: 270 },
  ];

  // Pulse ring
  const pulseScale = 1 + Math.sin(frame / fps * 2) * 0.05;
  const pulseOpacity = 0.15 + Math.sin(frame / fps * 2) * 0.05;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 40 }}>
        {/* Title */}
        <FadeInWords
          className="text-[36px] font-semibold tracking-tight text-center text-balance"
          style={{ color: "#292524", maxWidth: 700 }}
          stagger={0.06}
        >
          One platform. All your email.
        </FadeInWords>

        {/* Hub diagram */}
        <div style={{ position: "relative", width: 420, height: 420 }}>
          {/* Pulse ring */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 280,
              height: 280,
              borderRadius: "50%",
              border: "2px solid #615FFF",
              transform: `translate(-50%, -50%) scale(${pulseScale})`,
              opacity: pulseOpacity,
            }}
          />

          {/* Second pulse ring */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 340,
              height: 340,
              borderRadius: "50%",
              border: "1.5px solid #4F39F6",
              transform: `translate(-50%, -50%) scale(${1 + Math.sin(frame / fps * 1.5 + 1) * 0.04})`,
              opacity: 0.1 + Math.sin(frame / fps * 1.5 + 1) * 0.03,
            }}
          />

          {/* Center hub */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%) scale(${hubSize})`,
              opacity: hubOpacity,
              width: 130,
              height: 130,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #615FFF, #4F39F6)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 40px rgba(97,95,255,0.3)",
            }}
          >
            <Img
              src="https://api.iconify.design/mdi/email-send.svg?color=%23ffffff&width=36"
              style={{ width: 36, height: 36 }}
            />
            <span style={{ color: "white", fontSize: 14, fontWeight: 600, marginTop: 4 }}>AutoSend</span>
          </div>

          {/* Orbiting items */}
          {orbitItems.map((item, i) => {
            const itemDelay = 15 + i * 8;
            const itemEntrance = spring({ frame, fps, delay: itemDelay, config: { damping: 14, stiffness: 100 } });
            const baseAngle = item.angle;
            const rotateSpeed = frame * 0.15;
            const currentAngle = baseAngle + rotateSpeed;
            const rad = (currentAngle * Math.PI) / 180;
            const radius = 155;
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;

            // Connection line
            const lineOpacity = interpolate(itemEntrance, [0, 1], [0, 0.3]);

            return (
              <React.Fragment key={item.label}>
                {/* Connection line */}
                <svg
                  style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", overflow: "visible" }}
                  width="420"
                  height="420"
                  viewBox="-210 -210 420 420"
                >
                  <line
                    x1={0} y1={0}
                    x2={x} y2={y}
                    stroke="#615FFF"
                    strokeWidth="1.5"
                    opacity={lineOpacity}
                    strokeDasharray="4 4"
                  />
                </svg>

                {/* Orbit item */}
                <div
                  style={{
                    position: "absolute",
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: `translate(-50%, -50%) scale(${interpolate(itemEntrance, [0, 1], [0.3, 1])})`,
                    opacity: interpolate(itemEntrance, [0, 1], [0, 1]),
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 14,
                      background: "linear-gradient(135deg, #615FFF, #4F39F6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 20px rgba(97,95,255,0.25)",
                    }}
                  >
                    <Img src={item.icon} style={{ width: 28, height: 28 }} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "#44403C", whiteSpace: "nowrap" }}>
                    {item.label}
                  </span>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* Subtitle */}
        <div style={{ opacity: interpolate(frame, [45, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          <FadeInChars
            className="text-[20px] font-normal text-center"
            style={{ color: "#78716C", maxWidth: 550 }}
            startFrom={43}
            stagger={0.02}
          >
            A lightweight SendGrid alternative built to scale.
          </FadeInChars>
        </div>
      </div>
    </AbsoluteFill>
  );
};
