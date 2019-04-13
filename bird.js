class Bird {
  constructor(sprite, frameCount) {
    this.pos = createVector(100, 100);
    this.vel = createVector(0, 0);
    this.gravity = createVector(0, 0.3);
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

  display() {
    let index = floor(this.spriteIdx) % this.animLen;
    image(this.sprite[index], this.pos.x, this.pos.y, this.w, this.h);
  }

  animate() {
    this.spriteIdx += this.animSpeed;
  }

  getPosition_X() {
    return this.pos.x;
  }

  getPosition_Y() {
    return this.pos.y;
  }

  getDistances() {
    this.distToPipe = pipe[pipeIdx].getPipePairPosition_X() - (this.getPosition_X() + this.w);
    if (this.distToPipe < -139) pipeIdx++; // -1 * (this.w + pipe.w) = -142
    this.distToTopPipe_y = bird.getPosition_Y() - pipe[pipeIdx].getTopPipePosition_Y();
    this.distToBottomPipe_y = pipe[pipeIdx].getBottomPipePosition_Y() - (bird.getPosition_Y() + this.h);
  }

  getDistanceTo(to_which) {
    if (to_which == "pipe") return this.distToPipe;
    else if (to_which == "topPipe_y") return this.distToTopPipe_y;
    else if (to_which == "bottomPipe_y") return this.distToBottomPipe_y;
  }

  checkCollision() {
    this.getDistances();
    if (this.pos.y + (this.h - 6) > height) {this.pos.y = height - (this.h - 6); this.vel.limit(0); this.dead = true; this.spriteIdx = 1;}
    else if (this.getDistanceTo("pipe") <= 0 && this.getDistanceTo("pipe") > -140) {
      if (this.getDistanceTo("topPipe_y") <= 0 || this.getDistanceTo("bottomPipe_y") <= 0) {this.dead = true; this.spriteIdx = 1;}
    }
  }
}
