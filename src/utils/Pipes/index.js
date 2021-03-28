export function placePipes(top, bottom) {
  const rightMostX = this.getRightMostPipe();
  const distanceBetweenTopAndBottomPipes = Phaser.Math.Between(...[100, 250]);
  const topPipeY = Phaser.Math.Between(
    20,
    config.height - 20 - distanceBetweenTopAndBottomPipes
  );
  const pipeHorizontalDistance = Phaser.Math.Between(...[450, 500]);

  top.x = rightMostX + pipeHorizontalDistance;
  top.y = topPipeY;

  bottom.x = top.x;
  bottom.y = topPipeY + distanceBetweenTopAndBottomPipes;
}
