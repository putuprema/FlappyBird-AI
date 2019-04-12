let bird;
let pipe = [];
let pipeCount = 500;
let pipeIdx = 0;
let score = 0;
let doScoring = true;

function setup() {
  createCanvas(360, 640);
  bird = new Bird();

  let pipeInitX = width + 100;
  for (let i = 0; i < pipeCount; i++) {
    pipe[i] = new Pipe(pipeInitX);
    pipeInitX += 250;
  }
}

function draw() {
  background(104, 247, 255);
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
  else if (bird.getDistanceTo("pipe") < -80) doScoring = true;
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
