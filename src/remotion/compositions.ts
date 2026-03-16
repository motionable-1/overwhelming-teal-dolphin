import { Main } from "./compositions/Main";

// Single composition configuration
// Total = 120+120+130+120+120+120+120 - 6*18 = 850 - 108 = 742 frames
export const composition = {
  id: "Main",
  component: Main,
  durationInFrames: 742,
  fps: 30,
  width: 1280,
  height: 720,
};
