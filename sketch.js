let bird;
let pipe = [];
let pipeCount = 500;
let pipeIdx = 0;

function setup() {
  createCanvas(500, 600);
  bird = new Bird();

  let pipeInitX = width + 100;
  for (let i = 0; i < pipeCount; i++) {
    pipe[i] = new Pipe(pipeInitX);
    pipeInitX += 250;
  }
}

function draw() {
  background(104, 247, 255);
  bird.display();
  bird.move();
  debug();
  for (let i = 0; i < pipeCount; i++) {
    pipe[i].display();
    pipe[i].move();
  }
}

function keyPressed() {
  bird.fly();
  return false;
}

function debug() {
  // textSize()
  text("X Distance to Pipe: ", 30, 400);
  let x_distance = pipe[pipeIdx].getPipePairPosition_X() - bird.getPosition_X();
  if (x_distance < 0) pipeIdx++;
  text(x_distance, 200, 400);

  text("Y Distance to Top Pipe: ", 30, 420);
  let y_distance_top = bird.pos.y - pipe[pipeIdx].getTopPipePosition_Y();
  text(y_distance_top, 200, 420);

  text("Y Distance to Bottom Pipe: ", 30, 440);
  let y_distance_bottom = pipe[pipeIdx].getBottomPipePosition_Y() - (bird.getPosition_Y() + 30);
  text(y_distance_bottom, 200, 440);
}
