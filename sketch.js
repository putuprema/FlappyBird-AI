let bird;
let pipe = [];
let pipeCount = 500;
let pipeIdx = 0;
let score = 0;
let doScoring = true;
let bg;
let sprite = [];

function preload() {
  bg = loadImage('sprites/bg.png');
  sprite[0] = loadImage('sprites/bird/bird-1.png');
  sprite[1] = loadImage('sprites/bird/bird-2.png');
  sprite[2] = loadImage('sprites/bird/bird-3.png');
  sprite[3] = loadImage('sprites/bird/bird-4.png');
  sprite[4] = loadImage('sprites/pipe/pipe_head_top.png');
  sprite[5] = loadImage('sprites/pipe/pipe_head_bottom.png');
  sprite[6] = loadImage('sprites/pipe/pipe_body.png');
}

function setup() {
  createCanvas(360, 640);
  bird = new Bird(sprite, 4);

  let pipeInitX = width + 100;
  for (let i = 0; i < pipeCount; i++) {
    pipe[i] = new Pipe(pipeInitX, sprite[4], sprite[5], sprite[6]);
    pipeInitX += 250;
  }
}

function draw() {
  image(bg, 0, 0);
  for (let i = 0; i < pipeCount; i++) {
    pipe[i].display();
    if (!bird.dead) pipe[i].move();
  }
  bird.display();
  if (!bird.dead) bird.animate();
  bird.move();
  bird.checkCollision();
  scoring();
  debug();
}

function scoring() {
  if (bird.getDistanceTo("pipe") < 0 && doScoring == true) {score++; console.log(score); doScoring = false;}
  else if (bird.getDistanceTo("pipe") < -130) doScoring = true;
}

function keyPressed() {
  if (!bird.dead) bird.fly();
  return false;
}

function debug() {
  textSize(12);
  text("X Distance to Pipe: ", 30, 400);
  let x_distance = bird.getDistanceTo("pipe");
  text(x_distance, 200, 400);

  text("Y Distance to Top Pipe: ", 30, 420);
  let y_distance_top = bird.getDistanceTo("topPipe_y");
  text(y_distance_top, 200, 420);

  text("Y Distance to Bottom Pipe: ", 30, 440);
  let y_distance_bottom = bird.getDistanceTo("bottomPipe_y");
  text(y_distance_bottom, 200, 440);

  textSize(30);
  if (bird.dead) text("YOU ARE DEAD!", 30, 500);
}
