// OBJECTS TO CREATE:
// i) Gameboard object (must contain an array that stores gameboard)
// ii) Player object
// ii) Game flow object

// GUIDELINES FOR MODULE/FACTORY USAGE:

// Only ONE of something - module
// Eg: gameBoard, displayController

// Multiple of something - factory
// Eg: player

// Contents of the gameboard array will be rendered on the page

// Build functions for:
// i) Add mark to a spot (tie this to DOM)
// ii) Check if a spot has already been marked
// iii) Check whether the game is over (three in a row / tie)

// ADDITIONAL SUGGESTIONS:
// i) Allow players to enter their names
// ii) Add a start/restart button
// iii) Congratulate the winning player
// iv) Create AI for easy/normal/hard mode (latter using MINIMAX algorithm)


let xWinsCount = 0;
let oWinsCount = 0;
let tiesCount = 0;

// HELPER FUNCTION TO RETURN WINNING INDICES
const getWinningIndices = () => {
  const winningIndices = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  for (const index of winningIndices) {
    if (
      gameBoard.gameBoardArray[index[0]] === gameBoard.gameBoardArray[index[1]] &&
      gameBoard.gameBoardArray[index[1]] === gameBoard.gameBoardArray[index[2]] &&
      gameBoard.gameBoardArray[index[0]] !== ''
    ) {
      return index; // Return the indices of the winning cells
    }
  }
  return []; // Return an empty array if no winner
};

// MODULE TO STORE GAMEBOARD INFO AND DISPLAY IT
const gameBoard = (() => {
  let gameBoardArray = ['', '', '', '', '', '', '', '', ''];

  const displayGameBoard = () => {
    const xoCell = document.querySelectorAll('.cell');
    for (let i = 0; i < xoCell.length; i++) {
      xoCell[i].textContent = gameBoard.gameBoardArray[i];
      xoCell[i].classList.remove('highlighted-cell'); // Remove the class initially
    }

    // Highlight the winning cells
    const winningIndices = getWinningIndices();
    for (const index of winningIndices) {
      xoCell[index].classList.add('highlighted-cell');
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    displayGameBoard();
  });

  return { gameBoardArray, displayGameBoard };
})();

// MODULE TO STORE PLAYER DETAILS AND HANDLE ACTIONS
const players = (() => {
  const createPlayer = (name, marker) => {
    return { name, marker };
  }

  const player1 = createPlayer('Player X', 'X');
  const player2 = createPlayer('Player O', 'O');

  return { player1, player2 }
})();

// FUNCTION TO UPDATE SCCOREBOARD

const updateScoreboard = () => {
  const xWinsElement = document.querySelector('.x-wins');
  const oWinsElement = document.querySelector('.o-wins');
  const tiesElement = document.querySelector('.ties');
  
  xWinsElement.textContent = `X Wins: ${xWinsCount}`;
  oWinsElement.textContent = `O Wins: ${oWinsCount}`;
  tiesElement.textContent = `Ties: ${tiesCount}`;
};


// FUNCTION TO UPDATE TURN INDICATOR
const updateTurnIndicator = () => {
  if (checkGameOver()) {
    const lastMovePlayer = currentPlayer === players.player1 ? players.player2 : players.player1;
    if (lastMovePlayer === players.player1) {
      xWinsCount++;
      turnIndicator.textContent = "Player X wins!";
    } 
    else {
      oWinsCount++;
      turnIndicator.textContent = "Player O wins!";
    }
  } 
  else if (!gameBoard.gameBoardArray.includes('')) {
    tiesCount++;
    turnIndicator.textContent = "It's a tie!";
  } 
  else {
    turnIndicator.textContent = `${currentPlayer.name}'s Turn`;
  }

  updateScoreboard();
};

// FUNCTION TO HANDLE CELL CLICKS
let currentPlayer = players.player1;
const turnIndicator = document.querySelector('.turn-indicator');
const gameStatus = document.querySelector('.game-status');
console.log(currentPlayer)
const handleCellClick = (e) => {
  // Check whether game is over
  if (!checkGameOver()) {
    const cellIndex = parseInt(e.target.id.replace('cell', '')) - 1;
    console.log('currentPlayer:', currentPlayer);
    console.log('gameBoardArray:', gameBoard.gameBoardArray);
    console.log('cellIndex:', cellIndex);

    // Check whether cell is empty
    if (!gameBoard.gameBoardArray[cellIndex]) {
      gameBoard.gameBoardArray[cellIndex] = currentPlayer.marker;
      gameBoard.displayGameBoard();

      // Toggle between players
      currentPlayer = currentPlayer === players.player1 ? players.player2 : players.player1;
      updateTurnIndicator();
    }
  }
}

gameBoard.displayGameBoard();
const xoCell = document.querySelectorAll('.cell');
xoCell.forEach(cell => cell.addEventListener('click', handleCellClick));

// CHECK WHETHER GAME IS OVER
const checkGameOver = () => {
  const winningIndices = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  for (const index of winningIndices) {
    if (
      gameBoard.gameBoardArray[index[0]] === gameBoard.gameBoardArray[index[1]] &&
      gameBoard.gameBoardArray[index[1]] === gameBoard.gameBoardArray[index[2]] &&
      gameBoard.gameBoardArray[index[0]] !== ''
    ) {
      return true;
    }
  }
  return false;
};

// Attach the event listener to each cell
xoCell.forEach(cell => {
  cell.addEventListener('click', () => {
    if (!checkGameOver() && !cell.textContent) {
      handleCellClick(event);
      if (checkGameOver()) {
        displayGameOverAlert();
        // Remove event listeners to prevent further moves
        xoCell.forEach(cell => cell.removeEventListener('click', handleCellClick));
      }
    }
  });
});

// Reset the game
const resetGame = () => {
  gameBoard.gameBoardArray = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = players.player1;
  gameBoard.displayGameBoard();
  xoCell.forEach(cell => cell.addEventListener('click', handleCellClick));
  updateTurnIndicator();
};


// Attach the event listener to the restart button
const restartButton = document.querySelector('.restart-button')
restartButton.addEventListener('click', () => {
  resetGame();
});










