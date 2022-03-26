// HTML elements represented as variables
const gameBoardTiles = document.querySelectorAll('#gameboard li');
const winStatus = document.querySelector('#gameWon');
const tieStatus = document.querySelector('#gameTie');

/*
 * Create the two players
 */

const Player = (shape, turn, name, mark) => {
  this.shape = shape;
  this.turn = turn;
  this.name = name;
  this.mark = mark;
  return { shape, turn, name, mark };
} 

const playerCross = Player('cross', true, '1', '×');
const playerBowl = Player('bowl', false, '2', 'o');
const players = [playerCross, playerBowl];

/*
 * Create all tiles and push to array for score keeping
 */

gameBoard = [1,2,3,4,5,6,7,8,9];

const checkGameStatus = (player) => {

  const _allEqual = arr => arr.every( v => v === arr[0] )

  /*
   * Horrific code, don't care
   */

  const unmarkedTiles = document.querySelectorAll("li:not([data-mark])");

  const _disableInput = () => {
    for (let i = 0; i < unmarkedTiles.length; i++) {
      unmarkedTiles[i].setAttribute('data-mark', '');
      
    }
  }

  const winningConditions = [
    gameBoard.slice(0, 3),
    gameBoard.slice(3, 6),
    gameBoard.slice(7, 9),
    [ gameBoard[0], gameBoard[3], gameBoard[6] ],
    [ gameBoard[1], gameBoard[4], gameBoard[7] ],
    [ gameBoard[2], gameBoard[5], gameBoard[8] ],
    [ gameBoard[0], gameBoard[4], gameBoard[8] ],
    [ gameBoard[2], gameBoard[4], gameBoard[6] ]
  ]

  for (let i = 0; i< winningConditions.length; i++) {
    if (_allEqual( winningConditions[i] )) {
      _disableInput();
      winStatus.firstElementChild.innerText = player.name;
      winStatus.removeAttribute('hidden');
      return;
    }
    
  }

  if (
    gameBoard.filter(
      tile => tile.length > 2).length === 9

  ) {
      _disableInput();
      tieStatus.removeAttribute('hidden');
  }
}

function takeTurn() {

  _currentPlayer = players.find( player => {
    return player.turn === true;
  });

  _waitingPlayer = players.find( player => {
    return player.turn === false;
  });

  _tileIndex = Array.from(gameBoardTiles).indexOf(this);

  if(this.hasAttribute('data-mark')){
    return;
  }

  //Update DOM
  this.setAttribute('data-mark', _currentPlayer.shape);
  this.innerText = _currentPlayer.mark;

  //Update tile in array
  gameBoard[_tileIndex] = _currentPlayer.shape;

  checkGameStatus(_currentPlayer);

  //Swap Players
  _currentPlayer.turn = false;
  _waitingPlayer.turn = true;

}

/*
 * Set Event Listeners to tiles and new game button
 */

for (let index = 0; index < gameBoardTiles.length; index++) {
  gameBoardTiles[index].addEventListener('click', takeTurn)
}

document.querySelector('button').addEventListener('click', function(event){
  for (let i = 0; i < gameBoardTiles.length; i++) {

    //reset gameboard
        gameBoardTiles[i].innerText = '';
        gameBoardTiles[i].removeAttribute('data-mark');

  }

  gameBoard = [1,2,3,4,5,6,7,8,9];
  winStatus.setAttribute('hidden', '');
  tieStatus.setAttribute('hidden', '');
  playerCross.turn = true;
  playerBowl.turn = false;

})