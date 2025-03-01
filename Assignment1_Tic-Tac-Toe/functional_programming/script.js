// A plain JS object to hold the current state
let state = {
    board: Array(9).fill(''),
    currentPlayer: 'X',
    gameOver: false,
    winner: null
  };
  
  // Pure function to check for a winner
  function checkWinner(board) {
    const winningCombinations = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];
    for (const [a,b,c] of winningCombinations) {
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        return board[a]; // 'X' or 'O'
      }
    }
    return null;
  }
  
  // Function that returns a new state after a move
  function makeMove(oldState, index) {
    // If gameOver or cell is occupied, just return oldState as-is
    if (oldState.gameOver || oldState.board[index] !== '') {
      return oldState;
    }
  
    const newBoard = [...oldState.board];
    newBoard[index] = oldState.currentPlayer;
  
    const newWinner = checkWinner(newBoard);
    const isBoardFull = newBoard.every(cell => cell !== '');
    const newGameOver = (newWinner !== null) || isBoardFull;
  
    return {
      board: newBoard,
      currentPlayer: oldState.currentPlayer === 'X' ? 'O' : 'X',
      gameOver: newGameOver,
      winner: newWinner
    };
  }
  
  // Renders the board and status to the DOM
  function render(currentState) {
    const boardElem = document.getElementById('board');
    const statusElem = document.getElementById('status');
  
    boardElem.innerHTML = '';
  
    // Set status message
    if (currentState.winner) {
      statusElem.textContent = `${currentState.winner} wins!`;
    } else if (currentState.gameOver) {
      statusElem.textContent = "It's a draw!";
    } else {
      statusElem.textContent = `Player ${currentState.currentPlayer}'s turn`;
    }
  
    // Create each cell
    currentState.board.forEach((cellVal, index) => {
      const cellDiv = document.createElement('div');
      cellDiv.classList.add('cell');
      cellDiv.textContent = cellVal;
  
      // Conditionally add color classes
      if (cellVal === 'X') {
        cellDiv.classList.add('x');
      } else if (cellVal === 'O') {
        cellDiv.classList.add('o');
      }
  
      // On click, update state and re-render
      cellDiv.addEventListener('click', () => {
        state = makeMove(state, index);
        render(state);
      });
      
      boardElem.appendChild(cellDiv);
    });
  }
  function restartGame() {
    return {
      board: Array(9).fill(''),
      currentPlayer: 'X',
      gameOver: false,
      winner: null
    };
  }
  
  // On page load, render the initial state and set up the restart button
  window.addEventListener('DOMContentLoaded', () => {
    render(state);
  
    document.getElementById('restartBtn').addEventListener('click', () => {
      state = restartGame();
      render(state);
    });
  });
  