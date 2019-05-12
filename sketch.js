/* eslint-disable no-param-reassign */
import Pipe from './pipe.js';
import Background from './background.js';
import Bird from './bird.js';

const myGame = new p5((main) => {
  const MUTATION_RATE = 0.09;
  const POPULATION_SIZE = 50;
  const gndHeight = 115;
  const sprite = [];
  const pipe = [];
  const pipeCount = 5000;
  let doScoring = true;
  let globalScore = 0;
  let bestGlobal = 0;
  let bird = [];
  let deadBirdIdx = [];
  let birdsDead = 0;
  let pipeIdx = 0;
  let skyRes;
  let gndRes;
  let font;
  let bg;
  let pipeInitX;
  let bestBirdIdx = 0;
  let generation = 1;

  const naturalSelection = () => {
    let newGen = [];
    newGen[0] = new Bird(main, sprite, 4);
    newGen[0].brain = bird[bestBirdIdx].brain.copy();
    for (let i = 1; i < POPULATION_SIZE; i += 1) {
      newGen[i] = new Bird(main, sprite, 4);
      newGen[i].brain = bird[bestBirdIdx].brain.copy();
      newGen[i].brain.mutate(MUTATION_RATE);
    }
    return newGen;
  };

  const reset = () => {
    deadBirdIdx = [];
    birdsDead = 0;
    // for (let i = 0; i < POPULATION_SIZE; i += 1) {
    //   bird[i] = new Bird(main, sprite, 4);
    // }
    bg = new Background(skyRes, gndRes, gndHeight, 2);
    globalScore = 0;
    doScoring = true;
    pipeIdx = 0;
    pipeInitX = main.width + 100;
    for (let i = 0; i < pipeCount; i += 1) {
      pipe[i] = new Pipe(main, gndHeight, pipeInitX, sprite[4], sprite[5], sprite[6]);
      // pipe[i].x = pipeInitX;
      pipeInitX += 300;
    }
    generation += 1;
  };

  const findBestBird = () => {
    let maxScore = -1;
    for (let i = 0; i < POPULATION_SIZE; i += 1) {
      if (bird[i].fitnessScore > maxScore) {
        maxScore = bird[i].fitnessScore;
        bestBirdIdx = i;
      }
    }
  };

  const findElement = (arr, value) => {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i] === value) return value;
    }
    return undefined;
  };

  const debug = () => {
    main.textSize(17);
    main.textAlign(main.LEFT);
    main.text('Generation:        ' + generation, 30, 50);
    main.text('Birds Alive:        ' + (POPULATION_SIZE - birdsDead), 30, 70);
    for (let i = 0; i < POPULATION_SIZE; i += 1) {
      if (!bird[i].dead) {
        main.text('Bird ' + i + ' stats:', 30, 460);
        main.text('Fitness Score: ', 30, 480);
        main.text(Math.floor(bird[i].fitnessScore), 200, 480);
        main.text('X Distance to Pipe: ', 30, 500);
        main.text(Math.floor(bird[i].getDistanceTo('pipe')), 200, 500);
        main.text('Y Distance to Top Pipe: ', 30, 520);
        main.text(Math.floor(bird[i].getDistanceTo('topPipe_y')), 200, 520);
        main.text('Y Distance to Bottom Pipe: ', 30, 540);
        main.text(Math.floor(bird[i].getDistanceTo('bottomPipe_y')), 200, 540);
        main.text('Y Distance to Ground: ', 30, 560);
        main.text(Math.floor(bird[i].getDistanceTo('ground')), 200, 560);
        main.textSize(25);
        main.text('Brain Decision: ', 30, 590);
        if (bird[i].outputs[0] >= 0.5) main.text('FLY !!!', 200, 590);
        break;
      }
    }
  };

  const scoring = () => {
    main.fill(255);
    main.stroke(0);
    main.strokeWeight(3);
    main.textAlign(main.CENTER);
    main.textSize(50);
    const pipePairPositionX = pipe[pipeIdx].getPipePairPositionX();
    const dummyBirdX = 100 - (65 / 2);
    const dummyDistToPipe = pipePairPositionX - (dummyBirdX + 65);
    if (dummyDistToPipe < -132) pipeIdx += 1;
    main.text(globalScore, main.width / 2, 150);
    main.textSize(25);
    main.text('Best: ' + bestGlobal, main.width / 2, 190);
    if (dummyDistToPipe < -30 && doScoring) {
      globalScore += 1; doScoring = false; if (globalScore > bestGlobal) bestGlobal = globalScore;
    } else if (dummyDistToPipe < -132) doScoring = true;
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
    for (let i = 0; i < POPULATION_SIZE; i += 1) {
      bird[i] = new Bird(main, sprite, 4);
    }
    bg = new Background(skyRes, gndRes, gndHeight, 2);
    main.textFont(font);
    pipeInitX = main.width + 100;
    for (let i = 0; i < pipeCount; i += 1) {
      pipe[i] = new Pipe(main, gndHeight, pipeInitX, sprite[4], sprite[5], sprite[6]);
      pipeInitX += 300;
    }
  };

  main.draw = () => {
    main.imageMode(main.CORNER);
    bg.display(main);
    if (birdsDead !== POPULATION_SIZE) bg.scroll();
    for (let i = 0; i < pipeCount; i += 1) {
      if (pipe[i].getPipePairPositionX() <= main.width) pipe[i].display(main, gndHeight);
      if (birdsDead !== POPULATION_SIZE) pipe[i].move();
    }
    scoring();
    main.imageMode(main.CENTER);
    for (let i = POPULATION_SIZE - 1; i >= 0; i -= 1) {
      if (!bird[i].dead) {
        bird[i].display(main);
        bird[i].animate();
        bird[i].think();
        bird[i].move();
        bird[i].getDistances(
          pipe[pipeIdx].getPipePairPositionX(),
          pipe[pipeIdx].getTopPipePositionY(),
          pipe[pipeIdx].getBottomPipePositionY(main, gndHeight),
          bird[i].getPositionY(),
          (main.height - gndHeight),
        );
        bird[i].checkCollision(main, gndHeight);
        bird[i].updateFitness();
      } else if (bird[i].dead && birdsDead !== POPULATION_SIZE) {
        const found = findElement(deadBirdIdx, i);
        if (found === undefined) {
          deadBirdIdx.push(i);
          birdsDead += 1;
        }
      }
    }
    debug();
    if (birdsDead === POPULATION_SIZE) {
      findBestBird();
      bird = naturalSelection();
      reset();
    }
  };
});
