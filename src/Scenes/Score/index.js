import BaseScene from "../Base";

import { BUTTON_IMAGE_KEY } from "../../constants/images";

export default class MenuScene extends BaseScene {
  constructor(config) {
    super("ScoreScene", config);
  }

  create() {}

  update() {
    super.create();
    this.show();
  }

  show() {
    const [x, y] = this.screenCenter;
    const score = parseInt(localStorage.getItem("best-score"), 10);

    this.add
      .text(x, y, `Best Score: ${score}`, {
        fontSize: "42px",
        fill: "#fff",
        fontStyle: "bold",
      })
      .setOrigin(0.5, 1);

    this.add
      .image(x, y + 60, BUTTON_IMAGE_KEY)
      .setInteractive()
      .setScale(2)
      .setOrigin(0.5, 1)
      .on("pointerup", () => {
        this.scene.start("MenuScene");
      });
  }
}
