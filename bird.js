let sprite = [];

function preload() {
  sprite[0] = loadImage('sprites/bird/bird-1.png');
  sprite[1] = loadImage('sprites/bird/bird-2.png');
  sprite[2] = loadImage('sprites/bird/bird-3.png');
  sprite[3] = loadImage('sprites/bird/bird-4.png');
}

class Bird {
  constructor() {
    this.pos = createVector(100, 100);
    this.vel = createVector(0, 0);
    this.gravity = createVector(0, 0.3);
    this.dead = false;
    this.w = 60;
    this.h = 48;
    this.spriteIdx = 0;
    this.animSpeed = 0.3;
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
    let index = floor(this.spriteIdx) % 4;
    image(sprite[index], this.pos.x, this.pos.y, this.w, this.h);
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
    this.distToPipe = pipe[pipeIdx].getPipePairPosition_X() - (bird.getPosition_X() + this.w);
    if (this.distToPipe < -80) pipeIdx++;
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
    else if (this.getDistanceTo("pipe") < -2 && this.getDistanceTo("pipe") > -81) {
      if (this.getDistanceTo("topPipe_y") < 1 || this.getDistanceTo("bottomPipe_y") < 1) {this.dead = true; this.spriteIdx = 1;}
    }
  }
}
