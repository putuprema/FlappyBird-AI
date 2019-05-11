/* eslint-disable no-param-reassign */
import Pipe from './pipe.js';
import Background from './background.js';
import Bird from './bird.js';

const myGame = new p5((main) => {
  const MUTATION_RATE = 0.1;
  const POPULATION_SIZE = 100;
  const gndHeight = 115;
  const sprite = [];
  const pipe = [];
  const pipeCount = 500;
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
  let bestBirdIdx;

  const naturalSelection = () => {
    let newGen = [];
    newGen[0] = new Bird(main, sprite, 4);
    newGen[0].brain = bird[bestBirdIdx].brain;
    for (let i = 1; i < POPULATION_SIZE; i += 1) {
      newGen[i] = new Bird(main, sprite, 4);
      newGen[i].brain = bird[bestBirdIdx].brain;
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
      // pipe[i] = new Pipe(main, gndHeight, pipeInitX, sprite[4], sprite[5], sprite[6]);
      pipe[i].x = pipeInitX;
      pipeInitX += 250;
    }
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
    main.fill(255);
    main.stroke(0);
    main.strokeWeight(3);
    main.text('X Distance to Pipe: ', 30, 400);
    main.text(bird[0].getDistanceTo('pipe'), 200, 400);

    main.text('Y Distance to Top Pipe: ', 30, 420);
    main.text(bird[0].getDistanceTo('topPipe_y'), 200, 420);

    main.text('Y Distance to Bottom Pipe: ', 30, 440);
    main.text(bird[0].getDistanceTo('bottomPipe_y'), 200, 440);

    main.text('Y Distance to Ground: ', 30, 460);
    main.text(bird[0].getDistanceTo('ground'), 200, 460);

    main.text('bird[0] score: ', 30, 480);
    main.text(bird[0].fitnessScore, 200, 480);

    // if (!bird[0].dead) {
    //   main.text('bird[0] output0: ', 30, 500);
    //   main.text(bird[0].outputs[0], 200, 500);

    //   main.text('bird[0] output1: ', 30, 520);
    //   main.text(bird[0].outputs[1], 200, 520);
    // }

    // main.textSize(30);
    // if (birdsDead === POPULATION_SIZE) {
    //   main.text('YOU ARE DEAD!', 30, 500);
    // }
  };

  const scoring = () => {
    let pipePairPositionX = pipe[pipeIdx].getPipePairPositionX();
    let dummyBirdX = 100 - (65 / 2);
    let dummyDistToPipe = pipePairPositionX - (dummyBirdX + 65);
    if (dummyDistToPipe < -128) pipeIdx += 1;
    main.textSize(50);
    main.text(globalScore, main.width / 2, 100);
    if (birdsDead === POPULATION_SIZE) {
      if (globalScore > bestGlobal) bestGlobal = globalScore;
    }
    if (dummyDistToPipe < -30 && doScoring) {
      globalScore += 1; doScoring = false;
    } else if (dummyDistToPipe < -128) doScoring = true;
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
      pipeInitX += 250;
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
    for (let i = 0; i < POPULATION_SIZE; i += 1) {
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
    main.textSize(17);
    main.text('bird[0] output0: ', 30, 500);
    main.text(bird[0].outputs[0], 200, 500);
    
    main.text('bird[0] output1: ', 30, 520);
    main.text(bird[0].outputs[1], 200, 520);
    if (birdsDead === POPULATION_SIZE) {
      findBestBird();
      bird = naturalSelection();
      reset();
    }
    debug();
  };
});
