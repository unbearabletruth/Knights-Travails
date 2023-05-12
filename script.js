class Square {
    constructor(x, y, dist, path){
        this.x = x;
        this.y = y;
        this.dist = dist;
        this.path = path;
    }
}

class Board {
    constructor(boardSize){
        this.board = [];
        this.boardSize = boardSize;
    }

    createBoard(){
        for (let i = 0; i < this.boardSize; i++) {
            let row = [];
            this.board.push(row);
            for (let j = 0; j < this.boardSize; j++) {
                this.board[i][j] = false;
            }
        }
    }

    insideBoard(startX, startY, step){
        if (startX + step[0] > this.boardSize - 1 || startX + step[0] < 0 ||
            startY + step[1] > this.boardSize - 1 || startY + step[1] < 0){
            return false;
        }
        return true;
    }
}

class Knight {
    constructor(start, end){
        this.start = start;
        this.end = end;
        this.moves = {
            move1: [1, 2],
            move2: [2, 1],
            move3: [2, -1],
            move4: [1, -2],
            move5: [-1, -2],
            move6: [-2, -1],
            move7: [-2, 1],
            move8: [-1, 2]
        }
    }

    knightMoves(chess){
        let queue = [];
        let x = this.start[0];
        let y = this.start[1];
        queue.push(new Square(x, y, 0, `${[x, y]}`))
        while (queue !== null){
            let current = queue.shift();
            if (current.x === this.end[0] && current.y === this.end[1]){
                return `steps: ${current.dist}; path: ${current.path}`;
            } 
            for (let move in this.moves) {
                x = current.x + this.moves[move][0];
                y = current.y + this.moves[move][1];
                if (chess.insideBoard(current.x, current.y, this.moves[move]) !== false && chess.board[x][y] !== true){
                    queue.push(new Square(x, y, current.dist + 1, `${current.path} => ${[x, y]}`));
                    chess.board[x][y] = true;
                } 
            }
        }
    }
}


function getInput(){
    let button = document.querySelector("button");
    let startInput = document.querySelector("#startInput");
    let endInput = document.querySelector("#endInput");
    button.addEventListener("click", () => {
        let start = startInput.value.split("").map( Number );
        let end = endInput.value.split("").map( Number );
        init(start, end);
    })
}

function init(start, end){
    clear();
    let chess = new Board(8);
    chess.createBoard();
    let path = new Knight(start, end);
    let move = path.knightMoves(chess);
    renderBoard(chess);
    renderPath(move);
    renderPathText(move);
}

function renderBoard(chess){
    const board = document.querySelector("#board");
    for (let i = chess.boardSize - 1; i >= 0; i--) {
        for (let j = 0; j < chess.boardSize; j++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.id = `${i}${j}`
            if ((i + j) % 2 == 0){
                square.style.backgroundColor = "#44403c";
                square.style.color = "white";
            } else {
                square.style.backgroundColor = "white";
            }
            board.appendChild(square);
        }
    }
}


function renderPath(move){
    let renderedPath = move;
    const numberPattern = /\d+/g;
    renderedPath = renderedPath.match(numberPattern).join('')
    renderedPath = renderedPath.substring(1).match(/.{1,2}/g);
    for (let i = 0; i < renderedPath.length; i++) {
        let step = document.getElementById(`${renderedPath[i]}`);
        if (i === 0){
            step.textContent = "Start"
        }
        if (i > 0 && i < renderedPath.length - 1){
            step.textContent = `step: ${i}`;
        }
        if (i === renderedPath.length - 1){
            step.style.backgroundImage = "url('Knight.svg')";
        }
    }
}

function renderPathText(move){
    let text = document.getElementById("header");
    text.textContent = `shortest path is: ${move}`;
}

function clear(){
    const board = document.querySelector("#board");
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
}

let chess = new Board(8);
renderBoard(chess);
getInput();


