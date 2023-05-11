//board
//knight all possible moves
//start position
//end position
//borders you can't go beyond
//searching algorithm
let start = [0, 0];
let end = [7, 7];

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

    isInsideBoard(startX, startY, step){
        if (startX + step[0] > this.boardSize - 1 || startX + step[0] < 0 ||
            startY + step[1] > this.boardSize - 1 || startY + step[1] < 0){
            return false;
        }
        return true;
    }
}


const moves = {
    move1: [1, 2],
    move2: [2, 1],
    move3: [2, -1],
    move4: [1, -2],
    move5: [-1, -2],
    move6: [-2, -1],
    move7: [-2, 1],
    move8: [-1, 2]
}



function knightMoves(start, end){
    let queue = [];
    queue.push(new Square(start[0], start[1], 0, `${[start[0], start[1]]}`))
    while (queue !== null){
        current = queue.shift();
        if (current.x === end[0] && current.y === end[1]){
            return `steps: ${current.dist}; path: ${current.path}`;
        } 
        for (let move in moves) {
            if (chessBoard.isInsideBoard(current.x, current.y, moves[move]) !== false && chessBoard.board[current.x + moves[move][0]][current.y + moves[move][1]] !== true){
                queue.push(new Square(current.x + moves[move][0], current.y + moves[move][1], current.dist + 1, `${current.path} => ${[current.x + moves[move][0], current.y + moves[move][1]]}`));
                chessBoard.board[current.x + moves[move][0]][current.y + moves[move][1]] = true;
            } 
        }
    }
}

let chessBoard = new Board(8);
chessBoard.createBoard();
console.log()
console.log(knightMoves(start, end))

