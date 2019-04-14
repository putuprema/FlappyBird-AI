class Pipe {
  constructor(initX, headTop, headBottom, body) {
    this.gap = 150;
    this.lengthTop = 30 + (Math.random() * (height/2 + 1));
    this.lengthBottom = (height-bg.gnd_h) - (this.lengthTop + this.gap);
    this.headTop = headTop;
    this.headBottom = headBottom;
    this.body = body;
    this.w = 77;
    this.x = initX;
  }

  move() {
    this.x -= 3;
  }

  display() {
    image(this.body, this.x, 0, this.w, this.lengthTop);
    image(this.headTop, this.x, this.lengthTop-30, this.w, 30);

    image(this.body, this.x, (height-bg.gnd_h)-this.lengthBottom, this.w, this.lengthBottom);
    image(this.headBottom, this.x, (height-bg.gnd_h)- this.lengthBottom, this.w, 30);
  }

  getTopPipePosition_Y() {
    return this.lengthTop;
  }

  getBottomPipePosition_Y() {
    return (height-bg.gnd_h)-this.lengthBottom;
  }

  getPipePairPosition_X() {
    return this.x;
  }
}
