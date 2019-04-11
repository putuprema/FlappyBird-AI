let bird;
let pipe = [];
let pipeCount = 500;

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

  for (let i = 0; i < pipeCount; i++) {
    pipe[i].display();
    pipe[i].move();
  }
}

function keyPressed() {
  bird.fly();
  return false;
}
