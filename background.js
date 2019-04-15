export default class Background {
  constructor(skyImg, gndImg, gndHeight, skyScrollSpeed) {
    this.sky = skyImg;
    this.sky_x = 0;
    this.gnd = gndImg;
    this.gnd_x = 0;
    this.gnd_h = gndHeight;
    this.skyScrollSpeed = skyScrollSpeed;
  }

  display(main) {
    main.image(this.sky, this.sky_x, 0);
    main.image(this.gnd, this.gnd_x, main.height - this.gnd_h);
  }

  scroll() {
    this.sky_x -= this.skyScrollSpeed;
    this.gnd_x -= 3;
    if (this.sky_x < -1334) this.sky_x = 0;
    if (this.gnd_x < -1334) this.gnd_x = 0;
  }
}
