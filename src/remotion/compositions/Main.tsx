import { AbsoluteFill, Sequence, useCurrentFrame, Artifact } from "remotion";
import { loadFont as loadGeist } from "@remotion/google-fonts/Inter";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { Audio } from "@remotion/media";

import {
  getPresentation,
} from "../library/components/layout/Transition";

import { Background } from "./scenes/Background";
import { HeroIntro } from "./scenes/HeroIntro";
import { ProblemScene } from "./scenes/ProblemScene";
import { SolutionScene } from "./scenes/SolutionScene";
import { FeaturesScene } from "./scenes/FeaturesScene";
import { PricingScene } from "./scenes/PricingScene";
import { IntegrationScene } from "./scenes/IntegrationScene";
import { CTAScene } from "./scenes/CTAScene";

const { fontFamily } = loadGeist("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

// Scene durations (in frames at 30fps)
const SCENE_DURATIONS = {
  hero: 120,        // 4s
  problem: 120,     // 4s
  solution: 130,    // 4.3s
  features: 120,    // 4s
  pricing: 120,     // 4s
  integration: 120, // 4s
  cta: 120,         // 4s
};

const TRANSITION_DURATION = 18; // 0.6s transitions
// 6 transitions total

// Audio URLs
const WHOOSH_SFX = "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1773638124660_6rzz0tfrzf_sfx_Subtle_modern_tech_whoosh_tran.mp3";
const POP_SFX = "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1773638127482_butec94nzm6_sfx_Soft_UI_notification_pop__gent.mp3";
const AMBIENT_SFX = "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1773638130086_xs4sz0k7k3c_sfx_Gentle_ambient_digital_hum_wit.mp3";

export const Main: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <>
      {/* Thumbnail artifact */}
      {frame === 0 && (
        <Artifact content={Artifact.Thumbnail} filename="thumbnail.jpeg" />
      )}

      <AbsoluteFill
        style={{
          fontFamily,
          fontWeight: 400,
          WebkitFontSmoothing: "antialiased",
        }}
      >
        {/* Persistent animated background */}
        <Background />

        {/* Scene transitions */}
        <TransitionSeries>
          {/* Scene 1: Hero Intro */}
          <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.hero}>
            <HeroIntro />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={getPresentation("blurDissolve")}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 2: Problem */}
          <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.problem}>
            <ProblemScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={getPresentation("morphRounded")}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 3: Solution */}
          <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.solution}>
            <SolutionScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={getPresentation("blurDissolve")}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 4: Features */}
          <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.features}>
            <FeaturesScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={getPresentation("wipeRight")}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 5: Pricing */}
          <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.pricing}>
            <PricingScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={getPresentation("blurDissolve")}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 6: Integration */}
          <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.integration}>
            <IntegrationScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={getPresentation("zoomIn")}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 7: CTA */}
          <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.cta}>
            <CTAScene />
          </TransitionSeries.Sequence>
        </TransitionSeries>

        {/* Ambient background audio - loops throughout */}
        <Audio src={AMBIENT_SFX} volume={0.08} loop />

        {/* Transition whoosh sounds */}
        <Sequence from={SCENE_DURATIONS.hero - TRANSITION_DURATION} layout="none">
          <Audio src={WHOOSH_SFX} volume={0.15} />
        </Sequence>
        <Sequence
          from={SCENE_DURATIONS.hero + SCENE_DURATIONS.problem - 2 * TRANSITION_DURATION}
          layout="none"
        >
          <Audio src={WHOOSH_SFX} volume={0.12} />
        </Sequence>
        <Sequence
          from={
            SCENE_DURATIONS.hero +
            SCENE_DURATIONS.problem +
            SCENE_DURATIONS.solution -
            3 * TRANSITION_DURATION
          }
          layout="none"
        >
          <Audio src={WHOOSH_SFX} volume={0.12} />
        </Sequence>

        {/* Pop sound for key moments */}
        <Sequence from={25} layout="none">
          <Audio src={POP_SFX} volume={0.1} />
        </Sequence>
      </AbsoluteFill>
    </>
  );
};
