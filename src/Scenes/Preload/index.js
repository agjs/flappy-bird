import Phaser from "phaser";

import {
  SKY_IMAGE_KEY,
  SKY_IMAGE_PATH,
  BIRD_IMAGE_KEY,
  BIRD_IMAGE_PATH,
  PIPE_IMAGE_PATH,
  PIPE_IMAGE_KEY,
  PAUSE_IMAGE_KEY,
  PAUSE_IMAGE_PATH,
  BUTTON_IMAGE_KEY,
  BUTTON_IMAGE_PATH,
} from "../../constants/images";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.load.image(SKY_IMAGE_KEY, SKY_IMAGE_PATH);
    this.load.image(BIRD_IMAGE_KEY, BIRD_IMAGE_PATH);
    this.load.image(PIPE_IMAGE_KEY, PIPE_IMAGE_PATH);
    this.load.image(PAUSE_IMAGE_KEY, PAUSE_IMAGE_PATH);
    this.load.image(PAUSE_IMAGE_KEY, PAUSE_IMAGE_PATH);
    this.load.image(BUTTON_IMAGE_KEY, BUTTON_IMAGE_PATH);
  }

  create() {
    this.scene.start("MenuScene");
  }
  update() {}
}
