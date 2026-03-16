import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img, Easing } from "remotion";
import { FadeInWords, BlurReveal } from "../../library/components/text/TextAnimation";
import { ShapeAnimation } from "../../library/components/effects/ShapeAnimation";

const LOGO_SVG = `data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22139%22%20height%3D%2224%22%20fill%3D%22none%22%20viewBox%3D%220%200%20139%2024%22%3E%3Cpath%20stroke%3D%22%23292524%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22m14%2013-2-3-2%203%22%2F%3E%3Cpath%20stroke%3D%22%23292524%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M14.5%205.5C14.5%208%2012%2010%2012%2010S9.5%208%209.5%205.5%2010.62%202%2012%202s2.5%201%202.5%203.5ZM18.5%2015.5C16%2015.5%2014%2013%2014%2013s2-2.5%204.5-2.5S22%2011.62%2022%2013s-1%202.5-3.5%202.5ZM5.5%2015.5C8%2015.5%2010%2013%2010%2013s-2-2.5-4.5-2.5S2%2011.62%202%2013s1%202.5%203.5%202.5Z%22%2F%3E%3Cpath%20stroke%3D%22%23292524%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M16%2022s-3-6-6-9%22%2F%3E%3Cpath%20stroke%3D%22%23292524%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M8%2022s3-6%206-9%22%2F%3E%3Cpath%20fill%3D%22%23292524%22%20d%3D%22m32%2017.834%204.987-11.635h2.137l4.954%2011.635h-2.27l-2.982-7.014a50%2050%200%200%200-.248-.648q-.133-.383-.299-.798-.15-.433-.298-.814-.132-.4-.215-.665l.48-.017q-.1.35-.248.748-.134.382-.282.781l-.298.765q-.15.365-.265.698l-2.983%206.964zm2.237-2.593.778-1.878h5.915l.613%201.878zM51.681%2017.934q-1.54%200-2.717-.649a4.86%204.86%200%200%201-1.856-1.778q-.662-1.147-.662-2.576V6.183h2.17v6.631q0%20.898.414%201.596.414.697%201.11%201.114.696.415%201.541.415.912%200%201.624-.415.712-.416%201.126-1.114.415-.697.415-1.596V6.183h2.087v6.748q0%201.429-.68%202.576a4.74%204.74%200%200%201-1.838%201.778q-1.177.649-2.734.648M63.678%2017.834v-9.64H59.9V6.199h9.809v1.995h-3.877v9.64zM77.821%2018q-1.376%200-2.535-.449-1.143-.448-2.005-1.263a5.6%205.6%200%200%201-1.325-1.911A6%206%200%200%201%2071.492%2012q0-1.28.464-2.377a5.6%205.6%200%200%201%201.325-1.911%206.2%206.2%200%200%201%202.005-1.263q1.16-.45%202.535-.449%201.376%200%202.535.449t2.005%201.28q.845.814%201.309%201.91.48%201.082.48%202.361%200%201.263-.48%202.36a5.9%205.9%200%200%201-1.31%201.928%205.9%205.9%200%200%201-2.004%201.263q-1.16.45-2.535.449m0-2.06q.912%200%201.657-.284a3.9%203.9%200%200%200%201.309-.83q.563-.549.861-1.264.315-.714.315-1.562t-.315-1.562a3.6%203.6%200%200%200-.861-1.247%203.6%203.6%200%200%200-1.31-.83q-.744-.3-1.656-.3-.895%200-1.657.3a3.74%203.74%200%200%200-2.17%202.077A4%204%200%200%200%2073.696%2012q0%20.848.298%201.562a3.9%203.9%200%200%200%20.845%201.264q.563.531%201.325.83a4.7%204.7%200%200%200%201.657.283M91.803%2018a8.4%208.4%200%200%201-2.104-.25%206.1%206.1%200%200%201-1.707-.764%207%207%200%200%201-1.375-1.213l1.325-1.662q.961%201.113%201.906%201.562t2.07.449q.648%200%201.21-.166.564-.166.912-.499.347-.35.347-.831a.92.92%200%200%200-.165-.548%201.3%201.3%200%200%200-.464-.416%203%203%200%200%200-.68-.316%206%206%200%200%200-.811-.216%2011%2011%200%200%200-.895-.166q-.995-.165-1.773-.449a4.5%204.5%200%200%201-1.309-.714%203.1%203.1%200%200%201-.811-1.03q-.266-.583-.266-1.347%200-.765.348-1.396a3.4%203.4%200%200%201%20.994-1.08q.647-.45%201.475-.699A6.4%206.4%200%200%201%2091.836%206q1.077%200%201.922.233a4.8%204.8%200%200%201%201.508.681q.645.45%201.093%201.064L95.001%209.44a3.8%203.8%200%200%200-.895-.847%203.5%203.5%200%200%200-1.094-.515%204%204%200%200%200-1.21-.183q-.695%200-1.225.166-.514.165-.829.482-.297.315-.298.764%200%20.35.182.615.2.267.547.466.364.2.862.332.514.133%201.126.233.944.166%201.757.415.81.25%201.408.632.613.382.944.947.332.55.332%201.33%200%201.147-.613%201.995-.597.83-1.674%201.28-1.077.447-2.518.448M100.036%2017.834V6.199h8.516v1.962h-6.395v7.712h6.462v1.96zm1.061-4.986V10.92h6.61v1.928zM112.446%2017.834V6.199h2.005l7.654%209.092-.298.066a15%2015%200%200%201-.132-1.013q-.05-.533-.1-1.08l-.066-1.131-.033-1.18V6.2h2.137v11.634h-2.038l-7.687-8.959.364-.116a62%2062%200%200%200%20.199%202.244q.05.449.066.847a18%2018%200%200%201%20.067%201.48v4.504zM127.833%2017.834V6.199h5.186q1.392%200%202.485.433%201.11.432%201.889%201.23.795.797%201.193%201.861.414%201.047.414%202.294%200%201.262-.414%202.327a5.1%205.1%200%200%201-1.177%201.844%205.4%205.4%200%200%201-1.888%201.214q-1.11.432-2.502.432zm2.154-1.679-.166-.316h3.115q.945%200%201.657-.282a3.2%203.2%200%200%200%201.209-.798q.482-.515.729-1.197.249-.698.249-1.545%200-.831-.249-1.53a3.3%203.3%200%200%200-.745-1.213%203.24%203.24%200%200%200-1.193-.798q-.712-.282-1.657-.282h-3.164l.215-.283z%22%2F%3E%3C%2Fsvg%3E`;

export const HeroIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance spring
  const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 }, durationInFrames: 25 });
  const logoOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Decorative line draw
  const lineWidth = interpolate(frame, [8, 35], [0, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Tagline entrance delay
  const taglineOpacity = interpolate(frame, [25, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      {/* Decorative animated shapes */}
      <div style={{ position: "absolute", top: 80, right: 120, opacity: 0.15 }}>
        <ShapeAnimation shape="hexagon" animation="rotate" size={90} color="#615FFF" speed={0.15} />
      </div>
      <div style={{ position: "absolute", bottom: 100, left: 100, opacity: 0.12 }}>
        <ShapeAnimation shape="ring" animation="breathe" size={70} color="#4F39F6" strokeWidth={3} speed={0.4} />
      </div>
      <div style={{ position: "absolute", top: 200, left: 200, opacity: 0.1 }}>
        <ShapeAnimation shape="diamond" animation="pulse" size={50} color="#615FFF" speed={0.5} />
      </div>

      {/* Main content container */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
        {/* Logo */}
        <div
          style={{
            transform: `scale(${interpolate(logoScale, [0, 1], [0.6, 1])})`,
            opacity: logoOpacity,
          }}
        >
          <Img src={LOGO_SVG} style={{ width: 420, height: "auto" }} />
        </div>

        {/* Decorative accent line */}
        <div
          style={{
            width: lineWidth,
            height: 3,
            background: "linear-gradient(90deg, #615FFF, #4F39F6)",
            borderRadius: 2,
          }}
        />

        {/* Tagline */}
        <div style={{ opacity: taglineOpacity }}>
          <FadeInWords
            className="text-[32px] font-medium tracking-tight text-center text-balance"
            style={{ color: "#292524", maxWidth: 700 }}
            startFrom={20}
            stagger={0.08}
          >
            Email for teams who ship with agents
          </FadeInWords>
        </div>

        {/* Subtitle */}
        <div style={{ opacity: interpolate(frame, [40, 55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          <BlurReveal
            className="text-[20px] font-normal tracking-normal text-center"
            style={{ color: "#78716C", maxWidth: 600 }}
            startFrom={38}
            stagger={0.03}
            duration={0.6}
          >
            Transactional · Marketing · Automation — One Platform
          </BlurReveal>
        </div>
      </div>
    </AbsoluteFill>
  );
};
