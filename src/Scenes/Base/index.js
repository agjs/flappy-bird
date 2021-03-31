import Phaser from "phaser";
import { SKY_IMAGE_KEY } from "../../constants/images";

export default class BaseScene extends Phaser.Scene {
  constructor(key, config) {
    super(key);
    this.config = config;
    this.screenCenter = [config.width / 2, config.height / 2];
  }

  create() {
    this.add.image(0, 0, SKY_IMAGE_KEY).setOrigin(0, 0);
  }
  update() {}

  createMenu(menu) {
    const [x, y] = this.screenCenter;
    let lastMenuPositionY = 0;

    return menu.map((item, index) => {
      if (index > 0) {
        lastMenuPositionY += 40;
      }

      const text = this.add
        .text(x, y + lastMenuPositionY, item.text, {
          fontSize: "42px",
          fill: "#fff",
          fontStyle: "bold",
        })
        .setOrigin(0.5, 1);

      return { text, scene: item };
    });
  }
}
