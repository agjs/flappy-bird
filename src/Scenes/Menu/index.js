import Phaser from 'phaser';

import { SKY_IMAGE_KEY } from '../../constants/images';

export default class MenuScene extends Phaser.Scene {
  constructor(config) {
    super('MenuScene');
    this.config = config;
  }

  create() {
    this.add.image(0, 0, SKY_IMAGE_KEY).setOrigin(0, 0);
    this.scene.start('PlayScene');
  }
  update() {}
}
