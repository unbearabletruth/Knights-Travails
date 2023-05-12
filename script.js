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

let initChessBoard = new Board(8);
export {initChessBoard, Board, Knight}


