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

function isInsideBoard(start, end, boardSize){
    if (start[0] + end[0] > boardSize - 1 || start[0] + end[0] < 0 ||
        start[1] + end[1] > boardSize - 1 || start[1] + end[1] < 0){
        return false;
    }
    return true;
}

function knightMoves(start, end){
    
    queue.push(start)
    let x = start[0];
    let y = start[1];
    board[x][y] = true;
    while (queue !== null){
        current = queue.shift();
        if (current === end){
            return current;
        }
        for (let move in moves) {
            if (isInsideBoard(current, moves[move], boardSize) !== false){
                queue.push([current[0] + moves[move][0], current[1] + moves[move][1]])
            }
            if (current[0] + moves[move][0] === end[0] && current[1] + moves[move][1] === end[1]){
                return "hey"
            }
            
        }
    }
}

//knightMoves(start, end)
let queue = [];
queue.push(start)
current = queue.shift();
for (let move in moves) {
    if (isInsideBoard(current, moves[move], boardSize) !== false){
        queue.push([current[0] + moves[move][0], current[1] + moves[move][1]])
    }}
console.log(queue)
