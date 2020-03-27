import { Game } from './game.js';

class GameJsonSerializer extends Game {
  constructor() {
    super(player1Name, player2Name);
    this.array = [];
  }

  fillArray() {}
}
