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
}
