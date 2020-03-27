class Column {
  constructor() {
    this.rows = [null, null, null, null, null, null];
    // this.row1 = null;
    // this.row2 = null;
    // this.row3 = null;
    // this.row4 = null;
    // this.row5 = null;
    // this.row6 = null;
  }

  add(playerNumber) {
    for (let i = this.rows.length - 1; i >= 0; i--) {
      if (this.rows[i] === null) {
        this.rows[i] = playerNumber;
        return;
      }
    }
  }

  getTokenAt(rowIndex) {
    return this.rows[rowIndex];
  }

  isFull() {
    return this.rows[0] !== null;
  }
}

export { Column };
