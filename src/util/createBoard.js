const createBoard = (col, row, bombs) => {
    let board = [];
    let mineLocation = [];
    // Crea tablero en blanco

    // x=columna
    for (let y = 0; y < row; y++) {
        let subCol = [];
        for (let x = 0; x < col; x++) {
            subCol.push({
                value: 0,
                revealed: false,
                x: x,
                y: y,
                flagged: false,
            });
        }
        board.push(subCol);
    }

    // Colocar las bombas en lugares random
    let bombsCount = 0;
    while (bombsCount < bombs) {
        let y = randomNum(0, row - 1);
        let x = randomNum(0, col - 1);

        if (board[y][x].value === 0) {
            board[y][x].value = 'X';
            mineLocation.push([y, x]);
            bombsCount++;
        }
    }

    // Agregar Números
    for (let roww = 0; roww < row; roww++) {
        for (let coll = 0; coll < col; coll++) {
            if (board[roww][coll].value === 'X') {
                continue;
            }

            // Top
            if (roww > 0 && board[roww - 1][coll].value === 'X') {
                board[roww][coll].value++;
            }

            // Top Right
            if (roww > 0 && coll < col - 1 && board[roww - 1][coll + 1].value === 'X') {
                board[roww][coll].value++;
            }

            //Right
            if (coll < col - 1 && board[roww][coll + 1].value === 'X') {
                board[roww][coll].value++;
            }

            // Bottom Right
            if (coll < col - 1 && roww < row - 1 && board[roww + 1][coll + 1].value === 'X') {
                board[roww][coll].value++;
            }

            // Bottom
            if (roww < row - 1 && board[roww + 1][coll].value === 'X') {
                board[roww][coll].value++;
            }

            // Bottom Left
            if (roww < row - 1 && coll > 0 && board[roww + 1][coll - 1].value === 'X') {
                board[roww][coll].value++;
            }

            // Left
            if (coll > 0 && board[roww][coll - 1].value === 'X') {
                board[roww][coll].value++;
            }

            // Top Left
            if (coll > 0 && roww > 0 && board[roww - 1][coll - 1].value === 'X') {
                board[roww][coll].value++;
            }
        }
    }
    return{ board, mineLocation}
};

export default createBoard;

function randomNum(min =0, max){
    // min y max
    return Math.floor(Math.random() * (max - min + 1) + min);
}