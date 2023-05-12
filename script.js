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

    knightMoves(){
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


export let chess = new Board(8);
chess.createBoard();
let path = new Knight([0, 0], [5, 1])
let move = path.knightMoves()
console.log(move)

function getInput(){

}

function renderBoard(){
    const board = document.querySelector("#board");
    for (let i = chess.boardSize - 1; i >= 0; i--) {
        for (let j = 0; j < chess.boardSize; j++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.id = `${i}${j}`
            board.appendChild(square);
        }
    }
    renderPath();
}

function renderPath(){
    let renderedPath = move;
    const numberPattern = /\d+/g;
    renderedPath = renderedPath.match(numberPattern).join('')
    renderedPath = renderedPath.substring(1).match(/.{1,2}/g);
    for (let i = 0; i < renderedPath.length; i++) {
        let wasOn = document.getElementById(`${renderedPath[i]}`);
        wasOn.style.backgroundColor = "red";
        if (i === renderedPath.length - 1){
            wasOn.style.backgroundImage = "url('Knight.svg')";
        }
    }
    renderPathText();
}

function renderPathText(){
    let text = document.getElementById("header");
    text.textContent = move;
}

renderBoard()

