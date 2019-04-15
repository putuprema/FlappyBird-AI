export default class Bird {
  constructor(main, sprite, frameCount) {
    this.pos = main.createVector(100, 100);
    this.vel = main.createVector(0, 0);
    this.gravity = main.createVector(0, 0.3);
    this.dead = false;
    this.w = 65;
    this.h = 52;
    this.sprite = sprite;
    this.spriteIdx = 0;
    this.animSpeed = 0.3;
    this.animLen = frameCount;
  }

  fly() {
    this.vel.y = -6;
  }

  move() {
    this.vel.add(this.gravity);
    this.pos.add(this.vel);
    this.vel.limit(13);
  }

  display(main) {
    const index = main.floor(this.spriteIdx) % this.animLen;
    main.image(this.sprite[index], this.pos.x, this.pos.y, this.w, this.h);
  }

  animate() {
    this.spriteIdx += this.animSpeed;
  }

  getPositionX() {
    return this.pos.x - (this.w / 2);
  }

  getPositionY() {
    return this.pos.y - (this.h / 2);
  }

  getDistances(pipePairPositionX, topPipePositionY, bottomPipePostitionY, birdPostitionY) {
    this.distToPipe = pipePairPositionX - (this.getPositionX() + this.w);
    this.distToTopPipe_y = birdPostitionY - topPipePositionY;
    this.distToBottomPipe_y = bottomPipePostitionY - (birdPostitionY + this.h);
  }

  getDistanceTo(toWhich) {
    if (toWhich === 'pipe') return this.distToPipe;
    if (toWhich === 'topPipe_y') return this.distToTopPipe_y;
    if (toWhich === 'bottomPipe_y') return this.distToBottomPipe_y;
    return 0;
  }

  checkCollision(main, gndHeight) {
    if (this.pos.y + (this.h / 2 - 6) > (main.height - gndHeight)) {
      this.pos.y = (main.height - gndHeight) - (this.h / 2 - 6);
      this.vel.limit(0);
      this.dead = true;
      this.spriteIdx = 1;
    } else if (this.getDistanceTo('pipe') <= 0 && this.getDistanceTo('pipe') > -130 && (this.getDistanceTo('topPipe_y') <= 0 || this.getDistanceTo('bottomPipe_y') <= 0)) {
      this.dead = true;
      this.spriteIdx = 1;
      if (this.vel.y < 0) this.vel.limit(0);
    }
  }
}
