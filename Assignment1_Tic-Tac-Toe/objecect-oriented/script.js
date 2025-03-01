class Game {
    constructor(boardElement, statusElement) {
      // Keep track of board state, current player, game status
      this.boardState = Array(9).fill('');
      this.currentPlayer = 'X';
      this.gameOver = false;
  
      this.boardElement = boardElement;
      this.statusElement = statusElement;
  
      this.render();
      this.updateStatus();
    }
  
    // Render the game board to the DOM
    render() {
        // Clear board first
        this.boardElement.innerHTML = '';
      
        // Loop through boardState
        this.boardState.forEach((cellVal, index) => {
          const cellDiv = document.createElement('div');
          cellDiv.classList.add('cell');
          cellDiv.textContent = cellVal;
      
          // Conditionally add color classes
          if (cellVal === 'X') {
            cellDiv.classList.add('x');
          } else if (cellVal === 'O') {
            cellDiv.classList.add('o');
          }
      
          cellDiv.addEventListener('click', () => this.handleMove(index));
          this.boardElement.appendChild(cellDiv);
        });
      }
      
  
    // Handle a player's move
    handleMove(index) {
      if (this.gameOver || this.boardState[index] !== '') return;
  
      // Mark the cell with the current player's symbol
      this.boardState[index] = this.currentPlayer;
  
      // Check if there's a winner
      if (this.checkWinner()) {
        this.gameOver = true;
        this.updateStatus(`${this.currentPlayer} wins!`);
      } else if (this.boardState.every(cell => cell !== '')) {
        // No empty cells => draw
        this.gameOver = true;
        this.updateStatus("It's a draw!");
      } else {
        // Switch player
        this.currentPlayer = (this.currentPlayer === 'X') ? 'O' : 'X';
        this.updateStatus();
      }
  
      this.render();
    }
  
    // Check for a winning combination
    checkWinner() {
      const winningCombinations = [
        [0,1,2], [3,4,5], [6,7,8], // rows
        [0,3,6], [1,4,7], [2,5,8], // columns
        [0,4,8], [2,4,6]           // diagonals
      ];
      return winningCombinations.some(([a,b,c]) => {
        return (
          this.boardState[a] &&
          this.boardState[a] === this.boardState[b] &&
          this.boardState[b] === this.boardState[c]
        );
      });
    }
  
    // Update the status text
    updateStatus(message) {
      if (message) {
        this.statusElement.textContent = message;
      } else {
        this.statusElement.textContent = `Player ${this.currentPlayer}'s turn`;
      }
    }
  
    // Restart the game
    restart() {
      this.boardState = Array(9).fill('');
      this.currentPlayer = 'X';
      this.gameOver = false;
      this.render();
      this.updateStatus();
    }
  }
  
  // Wait until DOM is loaded
  window.addEventListener('DOMContentLoaded', () => {
    const boardElement = document.getElementById('board');
    const statusElement = document.getElementById('status');
    const restartBtn = document.getElementById('restartBtn');
  
    const game = new Game(boardElement, statusElement);
  
    restartBtn.addEventListener('click', () => {
      game.restart();
    });
  });
  