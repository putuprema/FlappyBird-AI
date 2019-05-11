import Matrix from './matrix.js';

// Activation function: for now use sigmoid function
function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

export default class NeuralNetwork {
  constructor(inputNodes, hiddenNodes, outputNodes) {
    this.inputNodes = inputNodes;
    this.hiddenNodes = hiddenNodes;
    this.outputNodes = outputNodes;

    this.weights_ih = new Matrix(this.hiddenNodes, this.inputNodes); // weights between input and hidden layer
    this.weights_ho = new Matrix(this.outputNodes, this.hiddenNodes); // weights between hidden and output layer
    this.hiddenBias = new Matrix(this.hiddenNodes, 1);
    this.outputBias = new Matrix(this.outputNodes, 1);
    this.weights_ih.randomize();
    this.weights_ho.randomize();
    this.hiddenBias.randomize();
    this.outputBias.randomize();
  }

  feedForward(inputArray) {
    let input = Matrix.fromArray(inputArray);

    let hidden = Matrix.multiply(this.weights_ih, input);
    hidden.add(this.hiddenBias);
    hidden.apply(sigmoid); // apply activation function to the hidden layer

    let output = Matrix.multiply(this.weights_ho, hidden);
    output.add(this.outputBias);
    output.apply(sigmoid); // apply activation function to the output layer

    return output.toArray(); // send the result back to user
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

  mutate(mutationRate) {
    this.rand = Math.random();
    this.whichMutate = 1 + (Math.floor(Math.random * 4));
    if (this.rand < mutationRate) {
      switch (this.whichMutate) {
        case 1: this.weights_ih.randomize(); break;
        case 2: this.weights_ho.randomize(); break;
        case 3: this.hiddenBias.randomize(); break;
        case 4: this.outputBias.randomize(); break;
        default: break;
      }
    }
  }
}
