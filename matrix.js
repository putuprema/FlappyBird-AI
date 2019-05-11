export default class Matrix {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.matrix = [];

    // Initialize matrix with zeros
    for (let i = 0; i < this.rows; i += 1) {
      this.matrix[i] = [];
      for (let j = 0; j < this.columns; j += 1) {
        this.matrix[i][j] = 0;
      }
    }
  }

  static fromArray(arr) { // Create 1 column matrix from an array
    const result = new Matrix(arr.length, 1);
    for (let i = 0; i < arr.length; i += 1) {
      result.matrix[i][0] = arr[i];
    }
    return result;
  }

  toArray() { // Flat the matrix into one dimensional array (going through columns first)
    let arr = [];
    for (let i = 0; i < this.rows; i += 1) {
      for (let j = 0; j < this.columns; j += 1) {
        arr.push(this.matrix[i][j]);
      }
    }
    return arr;
  }

  randomize() {
    for (let i = 0; i < this.rows; i += 1) {
      for (let j = 0; j < this.columns; j += 1) {
        this.matrix[i][j] = Math.random() * 2 - 1;
      }
    }
  }

  add(n) {
    if (n instanceof Matrix) { // IF n is a matrix then do matrix sum
      for (let i = 0; i < this.rows; i += 1) {
        for (let j = 0; j < this.columns; j += 1) {
          this.matrix[i][j] += n.matrix[i][j];
        }
      }
    } else { // ELSE do scalar sum
      for (let i = 0; i < this.rows; i += 1) {
        for (let j = 0; j < this.columns; j += 1) {
          this.matrix[i][j] += n;
        }
      }
    }
  }

  static subtract(m1, m2) { // Static function for two matrices subtraction
    if (m1.rows !== m2.rows || m1.columns !== m2.columns) {
      // console.log("Both matrix must have the same number of rows and columns!");
      return undefined;
    }
    const result = new Matrix(m1.rows, m1.columns);
    for (let i = 0; i < result.rows; i += 1) {
      for (let j = 0; j < result.columns; j += 1) {
        result.matrix[i][j] = m1.matrix[i][j] - m2.matrix[i][j];
      }
    }
    return result;
  }

  subtract(n) {
    if (n instanceof Matrix) { // IF n is a matrix then do matrix subtract
      for (let i = 0; i < this.rows; i += 1) {
        for (let j = 0; j < this.columns; j += 1) {
          this.matrix[i][j] -= n.matrix[i][j];
        }
      }
    } else { // ELSE do scalar subtract
      for (let i = 0; i < this.rows; i += 1) {
        for (let j = 0; j < this.columns; j += 1) {
          this.matrix[i][j] -= n;
        }
      }
    }
  }

  static multiply(m1, m2) { // Static function for matrix multiplication
    if (m1.columns !== m2.rows) {
      // console.log('Columns of Matrix 1 must == Rows of Matrix 2');
      return undefined;
    }

    const result = new Matrix(m1.rows, m2.columns);
    for (let i = 0; i < result.rows; i += 1) {
      for (let j = 0; j < result.columns; j += 1) {
        for (let k = 0; k < m1.columns; k += 1) {
          result.matrix[i][j] += (m1.matrix[i][k] * m2.matrix[k][j]);
        }
      }
    }

    return result;
  }

  multiply(n) { // Regular function for scalar multiplication
    for (let i = 0; i < this.rows; i += 1) {
      for (let j = 0; j < this.columns; j += 1) {
        this.matrix[i][j] *= n;
      }
    }
  }

  static transpose(m1) {
    const result = new Matrix(m1.columns, m1.rows);
    for (let i = 0; i < m1.rows; i += 1) {
      for (let j = 0; j < m1.columns; j += 1) {
        result.matrix[j][i] = m1.matrix[i][j];
      }
    }
    return result;
  }

  apply(func) { // apply a function to every element of the matrix
    for (let i = 0; i < this.rows; i += 1) {
      for (let j = 0; j < this.columns; j += 1) {
        this.matrix[i][j] = func(this.matrix[i][j]);
      }
    }
  }
}
