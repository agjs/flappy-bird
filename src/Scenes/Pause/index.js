import BaseScene from "../Base";

export default class PauseScene extends BaseScene {
  constructor(config) {
    super("PauseScene", config);

    this.menu = [
      {
        name: null,
        text: "Continue",
      },
      {
        name: "MenuScene",
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
      if (scene.text === "Continue") {
        this.scene.stop();
        this.scene.resume("PlayScene");
      } else {
        this.scene.stop("PlayScene");
        this.scene.start(scene.name);
      }
    });
  }

  update() {}
}
