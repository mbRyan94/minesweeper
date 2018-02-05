class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfRows = numberOfRows;
    this._numberOfColumns = numberOfColumns;
    this._numberOfBombs = numberOfBombs;
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('Boom! The game is over!');
      this._board.print();
    } else if (!this._board.hasSafeTiles()) {
      console.log('No save tiles left.\nYou won!!!');
    } else {
      console.log('Current Board:');
      this._board.print();
    }
  }

}


class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }
    get playerBoard() {
      return this._playerBoard;
    }

    flipTile(rowIndex, columnIndex) {
      //Prüfen ob Feld leer ist
      if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
        Console.log('This tile has already been flipped!');
      } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
        this._playerBoard[rowIndex][columnIndex] = 'B';
      } else {
        //Zahl der benachbarten Bomben wird im Feld angezeigt - gemäß originalen Minesweeper-Spiel
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
      }
      this._numberOfTiles--;
    }

    getNumberOfNeighborBombs(rowIndex, columnIndex) {
      const neighborOffsets = [[-1,-1],[-1,0],[-1,1],
                               [0,-1],        [0,1],
                               [1,-1],[1,0],[1,1]];
      const numberOfRows = this._bombBoard.length;
      const numberOfColumns = this._bombBoard[0].length;
      let numberOfBombs = 0;
      neighborOffsets.forEach(offset => {
        const neighborRowIndex = rowIndex + offset[0];
        const neighborColumnIndex = columnIndex + offset[1];

        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0
            && neighborColumnIndex < numberOfColumns) {
          if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
            numberOfBombs++;
          }
        }
      });
      return numberOfBombs;
    }

    hasSafeTiles() {
      return this._numberOfTiles !== this._numberOfBombs;

      }

    print(board){
      console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
    }

    static generatePlayerBoard(numberOfRows, numberOfColumns) {
      let board = [];
      for (let rows = 0; rows < numberOfRows; rows++) {
        let row = [];
        //row.push(' ');
        for (let col = 0; col < numberOfColumns; col++) {
          row.push(' ');
        }
        board.push(row);

      }
      return board;
    }

    static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      let board = [];
      for (let rows = 0; rows < numberOfRows; rows++) {
        let row = [];
        //row.push(' ');
        for (let col = 0; col < numberOfColumns; col++) {
          row.push(null);
        }
        board.push(row);
      }

      let numberOfBombsPlaces = 0;

      while (numberOfBombsPlaces < numberOfBombs) {
        let randomRowIndex = Math.floor(Math.random() * numberOfRows);
        let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        if (board[randomRowIndex][randomColumnIndex] !== 'B') {
          board[randomRowIndex][randomColumnIndex] = 'B';
          numberOfBombsPlaces++;
        }

      }
      return board;
    }
  }

  const g = new Game(5, 5, 15);
  g.playMove(2,2);
