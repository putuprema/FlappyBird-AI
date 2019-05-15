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

  train(_inputs, _targets) {
    let outputs = this.feedForward(_inputs);
    outputs = Matrix.fromArray(outputs);
    const targets = Matrix.fromArray(_targets);
    const outputErrors = Matrix.subtract(targets, outputs);
    const hiddenErrors = Matrix.multiply(Matrix.transpose(this.weights_ho), outputErrors);
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

  visualize(main, startX, startY, canvasWidth) {
    const inputPosX = startX;
    let nodePosY = startY;
    const hiddenPosX = startX + (canvasWidth / 2);
    const outputPosX = startX + canvasWidth;

    class Circle {
      constructor(whichLayer, label, posX, posY) {
        this.posX = posX;
        this.posY = posY;
        this.label = label;
        this.whichLayer = whichLayer;
      }

      display() {
        main.fill('white');
        main.stroke(0);
        main.strokeWeight(1);
        main.ellipse(this.posX, this.posY, 30, 30);
        main.fill('black');
        main.strokeWeight(0);
        if (this.whichLayer === 'input') main.text(Math.floor(this.label), this.posX, this.posY + 5);
        else main.text(main.nf(this.label, 1, 1), this.posX, this.posY + 5);
      }
    }

    let inputNodes = [];
    let hiddenNodes = [];
    let outputNodes = [];

    for (let i = 0; i < this.inputNodes; i += 1) {
      inputNodes.push(new Circle('input', this.input.toArray()[i], inputPosX, nodePosY));
      nodePosY += 45;
    }
    nodePosY = startY;
    for (let i = 0; i < this.hiddenNodes; i += 1) {
      hiddenNodes.push(new Circle('hidden', this.hidden.toArray()[i], hiddenPosX, nodePosY));
      nodePosY += 45;
    }
    nodePosY = startY;
    for (let i = 0; i < this.outputNodes; i += 1) {
      outputNodes.push(new Circle('output', this.output.toArray()[i], outputPosX, nodePosY));
      nodePosY += 45;
    }

    for (let i = 0; i < this.weights_ih.rows; i += 1) {
      for (let j = 0; j < this.weights_ih.columns; j += 1) {
        if (this.weights_ih.matrix[i][j] >= 0) {
          main.stroke('blue'); // positive weights are colored blue
        } else {
          main.stroke('orange'); // negative weights are colored orange
        }
        main.strokeWeight(main.map(Math.abs(this.weights_ih.matrix[i][j]), 0, 1, 0.5, 3.5));
        main.line(inputNodes[j].posX, inputNodes[j].posY, hiddenNodes[i].posX, hiddenNodes[i].posY);
      }
    }

    for (let i = 0; i < this.weights_ho.rows; i += 1) {
      for (let j = 0; j < this.weights_ho.columns; j += 1) {
        if (this.weights_ho.matrix[i][j] >= 0) {
          main.stroke('blue'); // positive weights are colored blue
        } else {
          main.stroke('orange'); // negative weights are colored orange
        }
        main.strokeWeight(main.map(Math.abs(this.weights_ho.matrix[i][j]), -1, 1, 0.5, 3.5));
        main.line(hiddenNodes[j].posX, hiddenNodes[j].posY, outputNodes[i].posX, outputNodes[i].posY);
      }
    }

    main.textAlign(main.CENTER);
    main.textSize(15);

    for (let i = 0; i < this.inputNodes; i += 1) {
      inputNodes[i].display();
    }
    for (let i = 0; i < this.hiddenNodes; i += 1) {
      hiddenNodes[i].display();
    }
    for (let i = 0; i < this.outputNodes; i += 1) {
      if (this.output.toArray()[i] >= 0.5) { main.fill('white'); main.ellipse(outputNodes[i].posX, outputNodes[i].posY, 40, 40); }
      outputNodes[i].display();
    }

    inputNodes = [];
    hiddenNodes = [];
    outputNodes = [];
  }
}
