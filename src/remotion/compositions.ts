import { Main } from "./compositions/Main";

// Single composition configuration
// Total = 120+120+130+120+120+130+120+120+120 - 8*18 = 1100 - 144 = 956 frames
export const composition = {
  id: "Main",
  component: Main,
  durationInFrames: 956,
  fps: 30,
  width: 1280,
  height: 720,
};
