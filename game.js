import { Column } from './column.js';
import { ColumnWinInspector } from './column-win-inspector.js';
import { RowWinInspector } from './row-win-inspector.js';
import { DiagonalWinInspector } from './diagonal-win-inspector.js';

class Game {
  constructor(player1Name, player2Name) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
    this.currentPlayer = 1;
    this.winnerNum = 0;
    this.columns = [
      new Column(),
      new Column(),
      new Column(),
      new Column(),
      new Column(),
      new Column(),
      new Column()
    ];
  }
  getName() {
    if (this.winnerNum === 1) {
      return `${this.player1Name.toUpperCase()} WINS!!`;
    } else if (this.winnerNum === 2) {
      return `${this.player2Name.toUpperCase()} WINS!!`;
    } else if (this.winnerNum === 3) {
      return `${this.player1Name} tied with ${this.player2Name}`;
    } else {
      return `${this.player1Name.toUpperCase()} VS. ${this.player2Name.toUpperCase()}`;
    }
  }

  playInColumn(colIndex) {
    this.columns[colIndex].add(this.currentPlayer);
    this.checkForTie();
    this.checkForColumnWin();
    this.checkForRowWin();
    this.checkForDiagonalWin();

    if (this.currentPlayer === 1) {
      this.currentPlayer = 2;
    } else {
      this.currentPlayer = 1;
    }
  }

  checkForTie() {
    if (this.columns.every(x => x.isFull())) {
      this.winnerNum = 3;
    }
  }

  checkForColumnWin() {
    if (this.winnerNum !== 0) {
      return;
    }
    for (let i = 0; i < this.columns.length; i++) {
      const eachCol = new ColumnWinInspector(this.columns[i]);
      const result = eachCol.inspect();
      if (result !== 0) {
        this.winnerNum = result;
        return;
      }
    }
  }
  checkForRowWin() {
    if (this.winnerNum !== 0) {
      return;
    }
    for (let i = 0; i < 3; i++) {
      const colGroup = this.columns.slice(i, i + 4);
      // console.log(colGroup);
      const rowInspect = new RowWinInspector(colGroup);
      const result = rowInspect.inspect();
      if (result !== 0) {
        this.winnerNum = result;
        return;
      }
    }
  }

  checkForDiagonalWin() {
    if (this.winnerNum !== 0) {
      console.log('is this running?');
      return;
    }
    for (let i = 0; i < 4; i++) {
      const colGroup = this.columns.slice(i, i + 4);
      // console.log(colGroup);
      const diagInspect = new DiagonalWinInspector(colGroup);
      // console.log(diagInspect);
      const result = diagInspect.inspect();
      if (result !== 0) {
        this.winnerNum = result;
        return;
      }
    }
  }

  getTokenAt(colIndex, rowIndex) {
    return this.columns[colIndex].getTokenAt(rowIndex);
  }

  isColumnFull(colIndex) {
    if (this.winnerNum === 1 || this.winnerNum === 2) {
      return true;
    }
    return this.columns[colIndex].isFull();
  }
}

export { Game };
