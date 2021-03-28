export function resetBirdPosition() {
  this.bird.x = this.initialPosition.x;
  this.bird.y = this.initialPosition.y;
  this.bird.body.velocity.y = 0;
  console.log(this.bird);
}
