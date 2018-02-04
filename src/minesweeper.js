class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);

    get playerBoard() {
      return.this._playerBoard;
    }

    flipTile(rowIndex, columnIndex) => {
      this._rowIndex = rowIndex;
      this._columnIndex = columnIndex;
      this.getNumberOfNeighborBombs(rowIndex, columnIndex);
      //Prüfen ob Feld leer ist
      if (playerBoard[rowIndex][columnIndex] !== ' ') {
        Console.log('This tile has already been flipped!');
      } else if (bombBoard[rowIndex][columnIndex] === 'B') {
        playerBoard[rowIndex][columnIndex] = 'B';
      } else {
        //Zahl der benachbarten Bomben wird im Feld angezeigt - gemäß originalen Minesweeper-Spiel
        playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
      }
      this._numberOfTiles--;
    }

  }
}




const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
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
};

//console.log(generatePlayerBoard(10,10));

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
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
};

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  const neighborOffsets = [[-1,-1],[-1,0],[-1,1],
                           [0,-1],        [0,1],
                           [1,-1],[1,0],[1,1]];
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  let numberOfBombs = 0;
  neighborOffsets.forEach(offset => {
    const neighborRowIndex = rowIndex + offset[0];
    const neighborColumnIndex = columnIndex + offset[1];

    if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0
        && neighborColumnIndex < numberOfColumns) {
      if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
        numberOfBombs++;
      }
    }
  });
  return numberOfBombs;
};



const printBoard = (board) => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
};

let playerBoard = generatePlayerBoard(3,3);
let bombBoard = generateBombBoard(3,3,3);

console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);

flipTile(playerBoard, bombBoard, 1, 2);
console.log('Updated Player Board:');
printBoard(playerBoard);
