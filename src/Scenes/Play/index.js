import Phaser from "phaser";
import {
  BIRD_IMAGE_KEY,
  PAUSE_IMAGE_KEY,
  PIPE_IMAGE_KEY,
} from "../../constants/images";

import { POINTER_DOWN, SPACE_DOWN } from "../../constants/keys";

import BaseScene from "../Base";

export default class PlayScene extends BaseScene {
  constructor(config) {
    super("PlayScene", config);

    this.bird = null;

    this.pipesToRender = 4;
    this.pipeHorizontalDistance = 400;
    this.pipes = null;
    this.flapVelocity = -250;

    this.score = 0;
    this.bestScore = parseInt(localStorage.getItem("best-score")) || 0;
    this.scoreText = null;
  }

  create() {
    super.create();
    this.addBird();
    this.addPipes();
    this.addColliders();
    this.addScore();
    this.initEvents();
    this.addPauseButton();
    this.addSceneEvents();
  }

  update() {
    this.checkGameStatus();
    this.recyclePipes();
  }

  addSceneEvents() {
    if (this.pauseEvent) {
      return;
    }
    this.pauseEvent = this.events.on("resume", () => {
      this.initialTime = 3;
      this.countdownText = this.add
        .text(...this.screenCenter, this.initialTime, {
          fontSize: "90px",
          fill: "#fff",
          fontStyle: "bold",
        })
        .setOrigin(0.5);
      this.timedEvent = this.time.addEvent({
        delay: 1000,
        callback: this.countdown,
        callbackScope: this,
        loop: true,
      });
    });
  }

  countdown() {
    this.initialTime -= 1;
    this.countdownText.setText(this.initialTime);

    if (this.initialTime <= 0) {
      this.countdownText.setText("");
      this.physics.resume();
      this.timedEvent.remove();
    }
  }

  addPauseButton() {
    this.add
      .image(this.config.width - 10, this.config.height - 10, PAUSE_IMAGE_KEY)
      .setInteractive()
      .setScale(3)
      .setOrigin(1)
      .on("pointerdown", () => {
        this.physics.pause();
        this.scene.pause();
        this.scene.launch("PauseScene");
      });
  }

  addBird() {
    this.bird = this.physics.add
      .sprite(
        this.config.startPosition.x,
        this.config.startPosition.y,
        BIRD_IMAGE_KEY
      )
      .setOrigin(0, 0);

    this.bird.body.gravity.y = 400;
    this.bird.setCollideWorldBounds(true);
  }

  addPipes() {
    this.pipes = this.physics.add.group();
    for (let i = 0; i < this.pipesToRender; i += 1) {
      const top = this.pipes
        .create(0, 0, PIPE_IMAGE_KEY)
        .setImmovable(true)
        .setOrigin(0, 1);
      const bottom = this.pipes
        .create(0, 0, PIPE_IMAGE_KEY)
        .setImmovable(true)
        .setOrigin(0, 0);
      this.placePipes(top, bottom);
    }
    this.pipes.setVelocityX(-200);
  }

  addColliders() {
    this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);
  }

  addScore() {
    this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, {
      fontSize: "24px",
      fontStyle: "bold",
      fill: "#000",
    });
    this.bestScoreText = this.add.text(
      16,
      40,
      `Best Score: ${this.bestScore}`,
      {
        fontSize: "24px",
        fontStyle: "bold",
        fill: "#000",
      }
    );
  }

  initEvents() {
    this.input.on(POINTER_DOWN, this.flap, this);
    this.input.keyboard.on(SPACE_DOWN, this.flap, this);
  }

  flap() {
    this.bird.body.velocity.y = this.flapVelocity;
  }

  gameOver() {
    this.physics.pause();
    this.bird.setTint(0xff0000);
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.scene.restart();
      },
      loop: false,
    });

    if (this.score > this.bestScore) {
      this.bestScore = this.score;
      localStorage.setItem("best-score", this.score);
    }
    this.score = 0;
  }

  checkGameStatus() {
    if (
      this.bird.y <= 0 ||
      this.bird.getBounds().bottom >= this.config.height
    ) {
      this.gameOver();
    }
  }

  placePipes(top, bottom) {
    const rightMostX = this.getRightMostPipe();
    const distanceBetweenTopAndBottomPipes = Phaser.Math.Between(...[100, 250]);
    const topPipeY = Phaser.Math.Between(
      20,
      this.config.height - 20 - distanceBetweenTopAndBottomPipes
    );

    const pipeHorizontalDistance = Phaser.Math.Between(...[450, 500]);

    top.x = rightMostX + pipeHorizontalDistance;
    top.y = topPipeY;
    bottom.x = top.x;
    bottom.y = topPipeY + distanceBetweenTopAndBottomPipes;
  }

  getRightMostPipe() {
    let rightMostX = 0;
    this.pipes.getChildren().forEach((pipe) => {
      rightMostX = Math.max(pipe.x, rightMostX);
    });
    return rightMostX;
  }

  recyclePipes() {
    const pipes = [];
    this.pipes.getChildren().forEach((pipe) => {
      if (pipe.getBounds().right <= 0) {
        pipes.push(pipe);
        if (pipes.length === 2) {
          this.placePipes(...pipes);
          this.incrementScore();
        }
      }
    });
  }

  incrementScore() {
    this.score += 1;
    this.scoreText.setText(`Score ${this.score}`);
  }
}
