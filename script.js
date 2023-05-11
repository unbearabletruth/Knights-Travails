//board
//knight all possible moves
//start position
//end position
//borders you can't go beyond
//searching algorithm
let board = [];
let boardSize = 8;
let start = [0, 0];
let end = [4, 4];




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
    let queue = [];
    let counter = 0;
    queue.push(start)
    while (queue !== null){
        counter ++;
        current = queue.shift();
        console.log("before x y", current)
        let x = current[0];
        let y = current[1];

        if (current === end){
            return current;
        }
        for (let move in moves) {
            if (isInsideBoard(current, moves[move], boardSize) !== false && board[x + moves[move][0]][y + moves[move][1]] !== true){
                queue.push([x + moves[move][0], y + moves[move][1]]);
                console.log([x + moves[move][0], y + moves[move][1]])
                //console.log(queue)
                board[x + moves[move][0]][y + moves[move][1]] = true;
            }
            if (x + moves[move][0] === end[0] && y + moves[move][1] === end[1]){
                return counter;
            }
            
        }
    }
}

console.log(knightMoves(start, end))

