import Matrix from './matrix.js';

// Activation function: for now use sigmoid function
function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

export default class NeuralNetwork {
  constructor(i, h, o) {
    if (i instanceof NeuralNetwork) {
      this.inputNodes = i.inputNodes;
      this.hiddenNodes = i.hiddenNodes;
      this.outputNodes = i.outputNodes;

      this.weights_ih = i.weights_ih.copy();
      this.weights_ho = i.weights_ho.copy();
      this.hiddenBias = i.hiddenBias.copy();
      this.outputBias = i.outputBias.copy();
    } else {
      this.inputNodes = i;
      this.hiddenNodes = h;
      this.outputNodes = o;

      this.weights_ih = new Matrix(this.hiddenNodes, this.inputNodes); // weights between input and hidden layer
      this.weights_ho = new Matrix(this.outputNodes, this.hiddenNodes); // weights between hidden and output layer
      this.hiddenBias = new Matrix(this.hiddenNodes, 1);
      this.outputBias = new Matrix(this.outputNodes, 1);
      this.weights_ih.randomize();
      this.weights_ho.randomize();
      this.hiddenBias.randomize();
      this.outputBias.randomize();
    }
  }

  feedForward(inputArray) {
    this.input = Matrix.fromArray(inputArray);

    this.hidden = Matrix.multiply(this.weights_ih, this.input);
    this.hidden.add(this.hiddenBias);
    this.hidden.apply(sigmoid); // apply activation function to the hidden layer

    this.output = Matrix.multiply(this.weights_ho, this.hidden);
    this.output.add(this.outputBias);
    this.output.apply(sigmoid); // apply activation function to the output layer

    return this.output.toArray(); // send the result back to user
  }

  train(inputs, targets) {
    let outputs = this.feedForward(inputs);
    outputs = Matrix.fromArray(outputs);
    targets = Matrix.fromArray(targets);
    let outputErrors = Matrix.subtract(targets, outputs);
    let hiddenErrors = Matrix.multiply(Matrix.transpose(this.weights_ho), outputErrors);
    /*
    * Formula for calculating hidden errors (assume 2 hidden nodes and 2 output nodes)
    * hiddenErrors     = weights between hidden & output (transposed) * outputErrors
    * | hiddenError1 | =                                 | w11  w21 | * | outputError1 |
    * | hiddenError2 |                                   | w12  w22 |   | outputError2 |
    */
    console.table(outputs.matrix);
    console.table(targets.matrix);
    console.table(outputErrors.matrix);
    console.table(this.weights_ho.matrix);
    console.table(hiddenErrors.matrix);
  }

  copy() {
    return new NeuralNetwork(this);
  }

  mutate(mutationRate) {
    const mutate = (x) => {
      const rand = Math.random();
      if (rand < mutationRate) return Math.random() * 2 - 1;
      return x;
    };

    this.weights_ih.apply(mutate);
    this.weights_ho.apply(mutate);
    this.hiddenBias.apply(mutate);
    this.outputBias.apply(mutate);
  }

  visualize(main, startX, startY, canvasWidth, canvasLength) {
    let inputPosX = startX;
    let nodePosY = startY;
    let hiddenPosX = startX + (canvasWidth / 2);
    let outputPosX = startX + canvasWidth;

    class InputNodes {
      constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;
      }

      display() {
        main.fill('white');
        main.stroke(0);
        main.strokeWeight(1);
        main.ellipse(this.posX, this.posY, 30, 30);
      }
    }

    class HiddenNodes {
      constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;
      }

      display() {
        main.fill('white');
        main.stroke(0);
        main.strokeWeight(1);
        main.ellipse(this.posX, this.posY, 30, 30);
      }
    }

    class OutputNodes {
      constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;
      }

      display() {
        main.fill('white');
        main.stroke(0);
        main.strokeWeight(1);
        main.ellipse(this.posX, this.posY, 30, 30);
      }
    }

    let inputNodes = [];
    let hiddenNodes = [];
    let outputNodes = [];

    for (let i = 0; i < this.inputNodes; i += 1) {
      inputNodes[i] = new InputNodes(inputPosX, nodePosY);
      nodePosY += 45;
    }
    nodePosY = startY;
    for (let i = 0; i < this.hiddenNodes; i += 1) {
      hiddenNodes[i] = new HiddenNodes(hiddenPosX, nodePosY);
      nodePosY += 45;
    }
    nodePosY = startY;
    for (let i = 0; i < this.outputNodes; i += 1) {
      outputNodes[i] = new OutputNodes(outputPosX, nodePosY);
      nodePosY += 45;
    }

    main.stroke('orange');

    for (let i = 0; i < this.weights_ih.rows; i += 1) {
      for (let j = 0; j < this.weights_ih.columns; j += 1) {
        main.strokeWeight(main.map(this.weights_ih.matrix[i][j], -1, 1, 0.5, 3.5));
        main.line(inputNodes[j].posX, inputNodes[j].posY, hiddenNodes[i].posX, hiddenNodes[i].posY);
      }
    }

    for (let i = 0; i < this.weights_ho.rows; i += 1) {
      for (let j = 0; j < this.weights_ho.columns; j += 1) {
        main.strokeWeight(main.map(this.weights_ho.matrix[i][j], -1, 1, 0.5, 3.5));
        main.line(hiddenNodes[j].posX, hiddenNodes[j].posY, outputNodes[i].posX, outputNodes[i].posY);
      }
    }

    main.textAlign(main.CENTER);
    main.textSize(15);

    for (let i = 0; i < this.inputNodes; i += 1) {
      inputNodes[i].display();
      main.fill('black');
      main.strokeWeight(0);
      main.text(Math.floor(this.input.toArray()[i]), inputNodes[i].posX, inputNodes[i].posY + 5);
    }
    nodePosY = startY;
    for (let i = 0; i < this.hiddenNodes; i += 1) {
      hiddenNodes[i].display();
      main.fill('black');
      main.strokeWeight(0);
      main.text(main.nf(this.hidden.toArray()[i], 1, 1), hiddenNodes[i].posX, hiddenNodes[i].posY + 5);
    }
    nodePosY = startY;
    for (let i = 0; i < this.outputNodes; i += 1) {
      if (this.output.toArray()[i] >= 0.5) { main.fill('white'); main.ellipse(outputNodes[i].posX, outputNodes[i].posY, 40, 40); }
      outputNodes[i].display();
      main.fill('black');
      main.strokeWeight(0);
      main.text(main.nf(this.output.toArray()[i], 1, 1), outputNodes[i].posX, outputNodes[i].posY + 5);
    }
  }
}
