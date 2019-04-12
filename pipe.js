class Pipe {
  constructor(initX) {
    this.gap = 150;
    this.lengthTop = random(30, height/2);
    this.lengthBottom = height - (this.lengthTop + this.gap);
    this.headTop = loadImage('sprites/pipe/pipe_head_top.png');
    this.headBottom = loadImage('sprites/pipe/pipe_head_bottom.png');
    this.body = loadImage('sprites/pipe/pipe_body.png');
    this.w = 77;
    this.x = initX;
  }

  move() {
    this.x -= 3;
  }

  display() {
    image(this.body, this.x, 0, this.w, this.lengthTop);
    image(this.headTop, this.x, this.lengthTop-30, this.w, 30);

    image(this.body, this.x, height-this.lengthBottom, this.w, this.lengthBottom);
    image(this.headBottom, this.x, height-this.lengthBottom, this.w, 30);
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
