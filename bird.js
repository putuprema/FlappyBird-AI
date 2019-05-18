import NeuralNetwork from './neuralnetwork.js';

export default class Bird {
  constructor(main, sprite, frameCount, isBest) {
    this.pos = main.createVector(100, 100 + Math.random() * (main.height / 2));
    this.vel = main.createVector(0, 0);
    this.gravity = main.createVector(0, 0.3);
    this.dead = false;
    this.w = 65;
    this.h = 52;
    this.sprite = sprite;
    this.spriteIdx = 0;
    this.animSpeed = 0.3;
    this.animLen = frameCount;
    this.brain = new NeuralNetwork(4, 3, 1);
    this.fitnessScore = 0;
    this.doScoring = true;
    this.isBest = isBest;
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

  getDistances(pipePairPositionX, topPipePositionY, bottomPipePostitionY, birdPostitionY, gndPosY) {
    this.distToPipe = pipePairPositionX - (this.getPositionX() + this.w);
    this.distToTopPipe_y = birdPostitionY - topPipePositionY;
    this.distToBottomPipe_y = bottomPipePostitionY - (this.pos.y + (this.h / 2 - 6));
    this.distToGround = gndPosY - (this.pos.y + (this.h / 2 - 6));
  }

  getDistanceTo(toWhich) {
    if (toWhich === 'pipe') return this.distToPipe;
    if (toWhich === 'topPipe_y') return this.distToTopPipe_y;
    if (toWhich === 'bottomPipe_y') return this.distToBottomPipe_y;
    if (toWhich === 'ground') return this.distToGround;
    return 0;
  }

  think() {
    this.inputs = [this.distToPipe, this.distToTopPipe_y, this.distToBottomPipe_y, this.vel.y];
    this.outputs = this.brain.feedForward(this.inputs);
    if (this.outputs[0] >= 0.5) this.fly();
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

  updateFitness() {
    if (this.distToBottomPipe_y >= 8 && this.distToTopPipe_y >= 20) this.fitnessScore += 100;
    else this.fitnessScore -= Math.abs(this.distToTopPipe_y);
    if (this.distToPipe < -30 && this.doScoring) {
      this.fitnessScore += 1000; this.doScoring = false;
    } else if (this.distToPipe < -131) this.doScoring = true;
  }
}
