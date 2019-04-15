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
    let index = main.floor(this.spriteIdx) % this.animLen;
    main.image(this.sprite[index], this.pos.x, this.pos.y, this.w, this.h);
  }

  animate() {
    this.spriteIdx += this.animSpeed;
  }

  getPosition_X() {
    return this.pos.x - (this.w/2);
  }

  getPosition_Y() {
    return this.pos.y - (this.h/2);
  }

  getDistances(pipePairPositionX, topPipePositionY, bottomPipePostitionY, birdPostitionY) {
    this.distToPipe = pipePairPositionX - (this.getPosition_X() + this.w);
    this.distToTopPipe_y = birdPostitionY - topPipePositionY;
    this.distToBottomPipe_y = bottomPipePostitionY - (birdPostitionY + this.h);
  }

  getDistanceTo(to_which) {
    if (to_which == "pipe") return this.distToPipe;
    else if (to_which == "topPipe_y") return this.distToTopPipe_y;
    else if (to_which == "bottomPipe_y") return this.distToBottomPipe_y;
  }

  checkCollision(main, gndHeight) {
    if (this.pos.y + (this.h/2 - 6) > (main.height-gndHeight)) {this.pos.y = (main.height-gndHeight) - (this.h/2 - 6); this.vel.limit(0); this.dead = true; this.spriteIdx = 1;}
    else if (this.getDistanceTo("pipe") <= 0 && this.getDistanceTo("pipe") > -130) {
      if (this.getDistanceTo("topPipe_y") <= 0 || this.getDistanceTo("bottomPipe_y") <= 0) {this.dead = true; this.spriteIdx = 1;}
    }
  }
}
