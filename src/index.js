import Phaser from 'phaser';

import Scenes from './Scenes';
import { SHARED_CONFIG } from './constants';

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  scene: Scenes(SHARED_CONFIG),
};

new Phaser.Game(config);
