class Pipe {
  constructor(initX) {
    this.gap = 120;
    this.lengthTop = random(30, height/2);
    this.lengthBottom = height - (this.lengthTop + this.gap);
    this.x = initX;
  }

  move() {
    this.x -= 3;
  }

  display() {
    rect(this.x, 0, 50, this.lengthTop);
    rect(this.x, height-this.lengthBottom, 50, this.lengthBottom);
  }

  getTopPipePosition_Y() {
    return this.lengthTop;
  }

  getBottomPipePosition_Y() {
    return height-this.lengthBottom;
  }

  getPipePairPosition_X() {
    return this.x;
  }
}
