let bird;
let pipe = [];
let pipeCount = 500;
let pipeIdx = 0;
let score = 0;
let best = 0;
let doScoring = true;
let bg;
let sprite = [];
let font;

function preload() {
  font = loadFont('fonts/BebasNeue.ttf');
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
  textFont(font);

  let pipeInitX = width + 100;
  for (let i = 0; i < pipeCount; i++) {
    pipe[i] = new Pipe(pipeInitX, sprite[4], sprite[5], sprite[6]);
    pipeInitX += 250;
  }
}

function draw() {
  imageMode(CORNER);
  image(bg, 0, 0);
  for (let i = 0; i < pipeCount; i++) {
    pipe[i].display();
    if (!bird.dead) pipe[i].move();
  }
  imageMode(CENTER);
  bird.display();
  if (!bird.dead) bird.animate();
  bird.move();
  bird.checkCollision();
  scoring();
  debug();
}

function scoring() {
  textSize(50);
  text(score, width/2, 100);
  if (bird.dead) {
    if (score > best) best = score;
  }
  if (bird.getDistanceTo("pipe") < -30 && doScoring == true) {score++; console.log(score); doScoring = false;}
  else if (bird.getDistanceTo("pipe") < -139) doScoring = true; // -1 * (bird.w + pipe.w) - 3 = -142
}

function keyPressed() {
  if (!bird.dead && key == ' ') bird.fly();
  else if (bird.dead){
    if (key == 'r') {
      bird = new Bird(sprite, 4);
      score = 0;
      doScoring = true;
      pipeIdx = 0;
      pipeInitX = width + 100;
      for (let i = 0; i < pipeCount; i++) {
        pipe[i] = new Pipe(pipeInitX, sprite[4], sprite[5], sprite[6]);
        pipeInitX += 250;
      }
    }
  }
  return false;
}

function debug() {
  textSize(17);
  fill(255);
  stroke(0);
  strokeWeight(3);
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
  if (bird.dead) {
    text("YOU ARE DEAD!", 30, 500);
    text("Best: ", 30, 550);
    text(best, 150, 550);
  }

}
