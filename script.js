//board
//knight all possible moves
//start position
//end position
//borders you can't go beyond
//searching algorithm
let board = [];
let boardSize = 8;
let start = [0, 0];
let end = [3, 3];

class Square {
    constructor(x, y, dist, path){
        this.x = x;
        this.y = y;
        this.dist = dist;
        this.path = path;
    }
}


for (let i = 0; i < boardSize - 1; i++) {
    let row = [];
    board.push(row);
    for (let j = 0; j < boardSize - 1; j++) {
        board[i][j] = false;
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

function isInsideBoard(startX, startY, end, boardSize){
    if (startX + end[0] > boardSize - 1 || startX + end[0] < 0 ||
        startY + end[1] > boardSize - 1 || startY + end[1] < 0){
        return false;
    }
    return true;
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
            if (isInsideBoard(current.x, current.y, moves[move], boardSize) !== false && board[current.x + moves[move][0]][current.y + moves[move][1]] !== true){
                queue.push(new Square(current.x + moves[move][0], current.y + moves[move][1], current.dist + 1, `${current.path} => ${[current.x + moves[move][0], current.y + moves[move][1]]}`));
                board[current.x + moves[move][0]][current.y + moves[move][1]] = true;
            } 
        }
    }
}

console.log(knightMoves(start, end))

