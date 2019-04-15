/* eslint-disable no-param-reassign */
import Pipe from './pipe.js';
import Background from './background.js';
import Bird from './bird.js';

const myGame = new p5((main) => {
  const gndHeight = 115;
  const sprite = [];
  const pipe = [];
  const pipeCount = 500;
  let bird;
  let pipeIdx = 0;
  let score = 0;
  let best = 0;
  let doScoring = true;
  let skyRes;
  let gndRes;
  let font;
  let bg;
  let pipeInitX;

  const debug = () => {
    main.textSize(17);
    main.fill(255);
    main.stroke(0);
    main.strokeWeight(3);
    main.text('X Distance to Pipe: ', 30, 400);
    main.text(bird.getDistanceTo('pipe'), 200, 400);

    main.text('Y Distance to Top Pipe: ', 30, 420);
    main.text(bird.getDistanceTo('topPipe_y'), 200, 420);

    main.text('Y Distance to Bottom Pipe: ', 30, 440);
    main.text(bird.getDistanceTo('bottomPipe_y'), 200, 440);

    main.textSize(30);
    if (bird.dead) {
      main.text('YOU ARE DEAD!', 30, 500);
      main.text('Best: ', 30, 550);
      main.text(best, 150, 550);
    }
  };

  const scoring = () => {
    main.textSize(50);
    main.text(score, main.width / 2, 100);
    if (bird.dead) {
      if (score > best) best = score;
    }
    if (bird.getDistanceTo('pipe') < -30 && doScoring) {
      score += 1; doScoring = false; console.log(score); 
    } else if (bird.getDistanceTo('pipe') < -140) doScoring = true;
  };

  main.preload = () => {
    font = main.loadFont('fonts/BebasNeue.ttf');
    skyRes = main.loadImage('sprites/sky.png');
    gndRes = main.loadImage('sprites/ground.png');
    sprite[0] = main.loadImage('sprites/bird/bird-1.png');
    sprite[1] = main.loadImage('sprites/bird/bird-2.png');
    sprite[2] = main.loadImage('sprites/bird/bird-3.png');
    sprite[3] = main.loadImage('sprites/bird/bird-4.png');
    sprite[4] = main.loadImage('sprites/pipe/pipe_head_top.png');
    sprite[5] = main.loadImage('sprites/pipe/pipe_head_bottom.png');
    sprite[6] = main.loadImage('sprites/pipe/pipe_body.png');
  };

  main.setup = () => {
    main.createCanvas(360, 720);
    bird = new Bird(main, sprite, 4);
    bg = new Background(skyRes, gndRes, gndHeight, 2);
    main.textFont(font);

    pipeInitX = main.width + 100;
    for (let i = 0; i < pipeCount; i += 1) {
      pipe[i] = new Pipe(main, gndHeight, pipeInitX, sprite[4], sprite[5], sprite[6]);
      pipeInitX += 250;
    }
  };

  main.draw = () => {
    main.imageMode(main.CORNER);
    bg.display(main);
    if (!bird.dead) bg.scroll();
    for (let i = 0; i < pipeCount; i += 1) {
      if (pipe[i].getPipePairPositionX() <= main.width) pipe[i].display(main, gndHeight);
      if (!bird.dead) pipe[i].move();
    }
    main.imageMode(main.CENTER);
    bird.display(main);
    if (!bird.dead) bird.animate();
    bird.move();
    bird.getDistances(
      pipe[pipeIdx].getPipePairPositionX(),
      pipe[pipeIdx].getTopPipePositionY(),
      pipe[pipeIdx].getBottomPipePositionY(main, gndHeight),
      bird.getPositionY(),
    );
    if (bird.getDistanceTo('pipe') < -140) pipeIdx += 1;
    bird.checkCollision(main, gndHeight);
    scoring();
    debug();
  };

  main.touchStarted = () => {
    if (!bird.dead) bird.fly();
    else if (bird.dead && bird.pos.y === (main.height - bg.gnd_h) - (bird.h / 2 - 6)) {
      bird = new Bird(main, sprite, 4);
      bg = new Background(skyRes, gndRes, gndHeight, 2);
      score = 0;
      doScoring = true;
      pipeIdx = 0;
      pipeInitX = main.width + 100;
      for (let i = 0; i < pipeCount; i += 1) {
        pipe[i] = new Pipe(main, gndHeight, pipeInitX, sprite[4], sprite[5], sprite[6]);
        pipeInitX += 250;
      }
    }
    return false;
  };

  main.keyPressed = () => {
    if (!bird.dead && main.key === ' ') bird.fly();
    else if (bird.dead) {
      if (main.key === 'r') {
        bird = new Bird(main, sprite, 4);
        bg = new Background(skyRes, gndRes, gndHeight, 2);
        score = 0;
        doScoring = true;
        pipeIdx = 0;
        pipeInitX = main.width + 100;
        for (let i = 0; i < pipeCount; i += 1) {
          pipe[i] = new Pipe(main, gndHeight, pipeInitX, sprite[4], sprite[5], sprite[6]);
          pipeInitX += 250;
        }
      }
    }
    return false;
  };
});
