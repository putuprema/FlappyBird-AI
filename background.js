class Background {
  constructor(skyImg, gndImg, skyScrollSpeed) {
    this.sky = skyImg;
    this.sky_x = 0;
    this.gnd = gndImg;
    this.gnd_x = 0;
    this.gnd_h = 115;
    this.skyScrollSpeed = skyScrollSpeed;
  }

  display() {
    image(this.sky, this.sky_x, 0);
    image(this.gnd, this.gnd_x, height-this.gnd_h);
  }

  scroll() {
    this.sky_x -= this.skyScrollSpeed;
    this.gnd_x -= 3;
    if (this.sky_x < -1334) this.sky_x = 0;
    if (this.gnd_x < -1334) this.gnd_x = 0;
  }
}
