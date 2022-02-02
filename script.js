// X & O
let width = 3;
let height = 3;
let filltowin = 3;
let players = 2;

let gameOver = false;
let board = [];
let colors = [];
let winnerColor;
let currentTurn = 0;

function setupBoard() {
    for (let i = 0; i < width; i++) {
        board.push([]);
        for (let j = 0; j < height; j++) {
            newCell(i, j, j == 0);
            board[i].push('');
        }
    }
    for (let i = 0; i < players; i++) {
        colors.push(getRandomInt(255));
    }
    winnerColor = getRandomInt(255);
}

function newCell(row, column, newline) {
    let el = document.createElement('div');
    el.classList.add('cell');
    if (newline) {
        el.style.clear = 'both';
    }
    el.dataset.mark = '';
    el.dataset.row = row;
    el.dataset.column = column;
    el.onclick = cellClick;
    let boardElement = document.getElementById('board');
    boardElement.appendChild(el);
}

function cellClick(event) {
    if (gameOver)
        return;
    if (event.target.dataset.mark != '')
        return;

    let row = event.target.dataset.row;
    let column = event.target.dataset.column;

    event.target.dataset.mark = currentTurn;
    event.target.style.backgroundColor = rainbow(colors[currentTurn]);
    board[row][column] = currentTurn;
    currentTurn++;
    if (currentTurn == players) {
        currentTurn = 0;
    }

    checkWinner();
}

function checkWinner() {
    let winner = findWinner();
    if (winner !== undefined) {
        gameOver = true;
        let cells = document.getElementsByClassName('cell');
        for (let cell of cells) {
            if (cell.dataset.mark === winner.toString()) {
                cell.classList.add('winner');
                cell.style.backgroundColor = rainbow(winnerColor);
            }
        }
    }
}

function findWinner() {
    let winner;
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            winner = getWinner(i, j);
            if (winner !== undefined) {
                return winner;
            }
        }
    }
}

function getWinner(row, column) {
    let player = board[row][column];
    if (player === '')
        return;

    // horizontal
    let ticks = 0;
    for (let i = row; i < width; i++) {
        if (board[i][column] === player) {
            ticks++;
        } else {
            break;
        }
    }
    if (ticks >= filltowin)
        return player;

    // vertical
    ticks = 0;
    for (let i = column; i < height; i++) {
        if (board[row][i] === player) {
            ticks++;
        } else {
            break;
        }
    }
    if (ticks >= filltowin)
        return player;

    // diagonal
    ticks = 0;
    let row2 = row;
    let column2 = column;
    while (row2 < width && column2 < height) {
        if (board[row2][column2] === player) {
            ticks++;
        } else {
            break;
        }
        row2++;
        column2++;
    }
    if (ticks >= filltowin)
        return player;

    // diagonal 2
    ticks = 0;
    while (row < width && column >= 0) {
        if (board[row][column] === player) {
            ticks++;
        } else {
            break;
        }
        row++;
        column--;
    }
    if (ticks >= filltowin)
        return player;

}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function rainbow(n) {
    n = n * 240 / 255;
    return 'hsl(' + n + ',100%,50%)';
}

function start() {
    let widthEl = document.getElementById('width');
    let heightEl = document.getElementById('height');
    let playerEl = document.getElementById('players');
    let filltowinEl = document.getElementById('filltowin');

    width = widthEl.value || width;
    height = heightEl.value || height;
    players = playerEl.value || players;
    filltowin = filltowinEl.value || filltowin;

    gameOver = false;
    board = [];
    colors = [];
    currentTurn = 0;
    let boardElement = document.getElementById('board');
    boardElement.innerHTML = '';

    setupBoard();
}