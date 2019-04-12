class Bird {
  constructor() {
    this.pos = createVector(100, 100);
    this.vel = createVector(0, 0);
    this.gravity = createVector(0, 0.3);
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
    fill(0);
    rect(this.pos.x, this.pos.y, 30, 30);
  }

  getPosition_X() {
    return this.pos.x;
  }

  getPosition_Y() {
    return this.pos.y;
  }

  getDistances() {
    this.distToPipe = pipe[pipeIdx].getPipePairPosition_X() - (bird.getPosition_X() + 30);
    if (this.distToPipe < -80) pipeIdx++;
    this.distToTopPipe_y = bird.getPosition_Y() - pipe[pipeIdx].getTopPipePosition_Y();
    this.distToBottomPipe_y = pipe[pipeIdx].getBottomPipePosition_Y() - (bird.getPosition_Y() + 30);
  }

  getDistanceTo(to_which) {
    if (to_which == "pipe") return this.distToPipe;
    else if (to_which == "topPipe_y") return this.distToTopPipe_y;
    else if (to_which == "bottomPipe_y") return this.distToBottomPipe_y;
  }
}
