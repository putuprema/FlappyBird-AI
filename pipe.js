export default class Pipe {
  constructor(main, gndHeight, initX, headTop, headBottom, body) {
    this.gap = 150;
    this.lengthTop = 80 + Math.floor(Math.random() * 250);
    this.lengthBottom = (main.height - gndHeight) - (this.lengthTop + this.gap);
    this.headTop = headTop;
    this.headBottom = headBottom;
    this.body = body;
    this.w = 77;
    this.x = initX;
  }

  move() {
    this.x -= 3;
  }

  display(main, gndHeight) {
    main.image(this.body, this.x, 0, this.w, this.lengthTop);
    main.image(this.headTop, this.x, this.lengthTop - 30, this.w, 30);

    main.image(
      this.body,
      this.x,
      (main.height - gndHeight) - this.lengthBottom,
      this.w,
      this.lengthBottom,
    );
    main.image(this.headBottom, this.x, (main.height - gndHeight) - this.lengthBottom, this.w, 30);
  }

  getTopPipePositionY() {
    return this.lengthTop;
  }

  getBottomPipePositionY(main, gndHeight) {
    return (main.height - gndHeight) - this.lengthBottom;
  }

  getPipePairPositionX() {
    return this.x;
  }
}
