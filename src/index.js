import Phaser from "phaser";
import {
  SKY_IMAGE_KEY,
  SKY_IMAGE_PATH,
  BIRD_IMAGE_KEY,
  BIRD_IMAGE_PATH,
  PIPE_IMAGE_PATH,
  PIPE_IMAGE_KEY,
} from "./constants/images";

import { POINTER_DOWN, SPACE_DOWN } from "./constants/keys";
import { getGameConfig } from "./config";

class Game extends Phaser.Scene {
  constructor() {
    super();
    this.bird = null;
    this.pipesToRender = 4;
    this.pipeHorizontalDistance = 0;
    this.pipes = null;

    this.initialPosition = { x: config.width / 10, y: config.height / 2 };
    this.flap = this.flap.bind(this);
    this.flapVelocity = -250;
  }

  preload() {
    this.load.image(SKY_IMAGE_KEY, SKY_IMAGE_PATH);
    this.load.image(BIRD_IMAGE_KEY, BIRD_IMAGE_PATH);
    this.load.image(PIPE_IMAGE_KEY, PIPE_IMAGE_PATH);
  }

  create() {
    this.addEventListeners();
    this.addAssets();
  }

  update() {
    if (this.bird.y < -this.bird.height || this.bird.y > config.height) {
      this.restart();
    }
  }

  addEventListeners() {
    this.input.on(POINTER_DOWN, this.flap);
    this.input.keyboard.on(SPACE_DOWN, this.flap);
  }

  addAssets() {
    this.add.image(0, 0, SKY_IMAGE_KEY).setOrigin(0, 0);

    this.bird = this.physics.add
      .sprite(this.initialPosition.x, this.initialPosition.y, BIRD_IMAGE_KEY)
      .setOrigin(0, 0);

    this.bird.body.gravity.y = 400;

    this.pipes = this.physics.add.group();

    this.generatePipes();

    this.pipes.setVelocityX(-200);
  }

  flap() {
    this.bird.body.velocity.y = this.flapVelocity;
  }

  resetBirdPosition() {
    this.bird.x = this.initialPosition.x;
    this.bird.y = this.initialPosition.y;
    this.bird.body.velocity.y = 0;
  }

  restart() {
    this.resetBirdPosition();
  }

  placePipes(top, bottom) {
    this.pipeHorizontalDistance += 400;
    const distanceBetweenTopAndBottomPipes = Phaser.Math.Between(...[100, 250]);
    const topPipeY = Phaser.Math.Between(
      20,
      config.height - 20 - distanceBetweenTopAndBottomPipes
    );

    top.x = this.pipeHorizontalDistance;
    top.y = topPipeY;

    bottom.x = this.pipeHorizontalDistance;
    bottom.y = topPipeY + distanceBetweenTopAndBottomPipes;
  }

  generatePipes() {
    for (let i = 0; i < this.pipesToRender; i += 1) {
      const top = this.pipes.create(0, 0, PIPE_IMAGE_KEY).setOrigin(0, 1);
      const bottom = this.pipes.create(0, 0, PIPE_IMAGE_KEY).setOrigin(0, 0);
      this.placePipes(top, bottom);
    }
  }
}

const config = getGameConfig({ scene: Game });

new Phaser.Game(config);
