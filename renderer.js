import { initChessBoard, Board, Knight } from "./script.js";

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
            step.textContent = "Start";
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

renderBoard(initChessBoard);
getInput();