import { Game } from './game.js';
let game = undefined;

function updateUi() {
  const boardHolder = document.getElementById('board-holder');
  const gameName = document.getElementById('game-name');
  const clickTargets = document.getElementById('click-targets');
  if (game === undefined) {
    boardHolder.classList.add('is-invisible');
  } else {
    boardHolder.classList.remove('is-invisible');
  }
  gameName.innerHTML = game.getName();
  if (game.currentPlayer === 1) {
    clickTargets.classList.add('red');
    clickTargets.classList.remove('black');
  } else {
    clickTargets.classList.add('black');
    clickTargets.classList.remove('red');
  }

  for (let i = 0; i <= 5; i++) {
    //i = rows
    for (let j = 0; j <= 6; j++) {
      //j = cols
      const squareId = `square-${i}-${j}`;
      const square = document.getElementById(squareId);
      square.innerHTML = '';
      const tokenValue = game.getTokenAt(j, i);
      if (tokenValue === 1) {
        const squareDiv = document.createElement('div');
        squareDiv.setAttribute('class', 'token red');
        square.appendChild(squareDiv);
      } else if (tokenValue === 2) {
        const squareDiv = document.createElement('div');
        squareDiv.setAttribute('class', 'token black');
        square.appendChild(squareDiv);
      }
    }
  }

  for (let k = 0; k <= 6; k++) {
    //k = kolumn index
    const kolumnId = `column-${k}`;
    const kolumn = document.getElementById(kolumnId);
    if (game.isColumnFull(k)) {
      kolumn.classList.add('full');
    } else {
      kolumn.classList.remove('full');
    }
  }
}

window.addEventListener('DOMContentLoaded', event => {
  const player1Name = document.getElementById('player-1-name');
  const player2Name = document.getElementById('player-2-name');
  const newGameButton = document.getElementById('new-game');
  const clickTargets = document.getElementById('click-targets');

  player1Name.addEventListener('keyup', e => {
    if (player1Name.value !== '' && player2Name.value !== '') {
      newGameButton.disabled = false;
    }
  });

  player2Name.addEventListener('keyup', e => {
    if (player1Name.value !== '' && player2Name.value !== '') {
      newGameButton.disabled = false;
    }
  });
  newGameButton.addEventListener('click', e => {
    game = new Game(player1Name.value, player2Name.value);
    player1Name.value = '';
    player2Name.value = '';
    newGameButton.disabled = true;
    updateUi();
  });

  clickTargets.addEventListener('click', e => {
    const columnId = e.target.id;
    const columnNum = Number.parseInt(columnId[columnId.length - 1]);
    game.playInColumn(columnNum);
    updateUi();
  });
});
