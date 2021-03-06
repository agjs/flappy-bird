import BaseScene from "../Base";

export default class MenuScene extends BaseScene {
  constructor(config) {
    super("MenuScene", config);

    this.menu = [
      {
        name: "PlayScene",
        text: "Play",
      },
      {
        name: "ScoreScene",
        text: "Score",
      },
      {
        name: null,
        text: "Quit",
      },
    ];
  }

  create() {
    super.create();
    super.createMenu(this.menu).forEach(this.addMenuEvent.bind(this));
  }

  addMenuEvent(menuItem) {
    const { text, scene } = menuItem;

    text.setInteractive();

    text.on("pointerover", () => {
      text.setStyle({ fill: "#ff0" });
    });

    text.on("pointerout", () => {
      text.setStyle({ fill: "#fff" });
    });

    text.on("pointerup", () => {
      if (scene.name === "Quit") {
        return this.game.destroy(true);
      }

      this.scene.start(scene.name);
    });
  }

  update() {}
}
