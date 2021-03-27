import Phaser from "phaser";

export const getGameConfig = (options) => {
  const { scene } = options;
  return {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: "arcade",
      arcade: {
        debug: true,
      },
    },
    scene,
  };
};
