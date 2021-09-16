import React, { useEffect, useState } from 'react';
import createBoard from '../util/createBoard';
import revealed from '../util/reveal';
import Cell from './Cell';
import flagicon from '../images/bxs-flag.svg';
import Modal from './Modal';
import Timer from './Timer';

const Board = () => {
    const [grid, setGrid] = useState([]);
    const [nonMineCount, setNonMineCount] = useState(0);
    const [mineLocation, setMineLocation] = useState([]);
    const [flag, setFlag] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [difficulty, setDifficulty] = useState("m");
    const [start, setStart] = useState(false);

    useEffect(() => {
        // Llamar a la funcion
        freeshBoard(difficulty);
    }, [difficulty]);

    const freeshBoard = (dif) => {
        // facil 10x10 minas 10
        // Medio 18x14 minas 40
        // Dificil 24x20 minas 99
        if (dif === "f") {
            const newBoard = createBoard(10, 10, 10);
            setGrid(newBoard.board);
            setMineLocation(newBoard.mineLocation);
            setNonMineCount(10 * 10 - 10);
            setFlag(10);
        } else if (dif === "m") {
            const newBoard = createBoard(18, 14, 40);
            setGrid(newBoard.board);
            setMineLocation(newBoard.mineLocation);
            setNonMineCount(18 * 14 - 40);
            setFlag(40);
        } else if (dif === "d") {
            const newBoard = createBoard(24, 20, 99);
            setGrid(newBoard.board);
            setMineLocation(newBoard.mineLocation);
            setNonMineCount(24 * 20 - 99);
            setFlag(99);
        }
        setGameOver(false);
        setStart(false);
    }

    const reset = () => {
        freeshBoard(difficulty);
    }

    const changeState = (e) => {
        setDifficulty(e.target.value);
    }

    // ClickDerecho Colocar bandera a celda
    const updateFlag = (e, x, y) => {
        // No mostrar el menu desplegable al hacer click derecho
        e.preventDefault();
        if (!gameOver) {
            // Copiar el estado actual del tablero
            let newGrid = JSON.parse(JSON.stringify(grid));
            if (!newGrid[y][x].revealed) {
                if (newGrid[y][x].flagged) {
                    newGrid[y][x].flagged = false;
                    setFlag(flag + 1);
                } else if (!newGrid[y][x].flagged && flag !== 0) {
                    newGrid[y][x].flagged = true;
                    setFlag(flag - 1);
                }
            }
            setGrid(newGrid);
        }
        if (!start) {
            setStart(true);
        }
    }

    // Revelar la celda
    const revealCell = (x, y) => {
        // Copiar el estado actual del tablero
        if (!gameOver) {
            let newGrid = JSON.parse(JSON.stringify(grid));
            if (!newGrid[y][x].flagged) {
                if (newGrid[y][x].value === 'X') {
                    alert('Encontraste una Mina');
                    for (let i = 0; i < mineLocation.length; i++) {
                        newGrid[mineLocation[i][0]][mineLocation[i][1]].revealed = true;
                    }
                    setGrid(newGrid);
                    setGameOver(true);
                } else {
                    let newRevealedBoard = revealed(newGrid, x, y, nonMineCount);
                    setGrid(newRevealedBoard.arr);
                    setNonMineCount(newRevealedBoard.newNonMinesCount);
                    if(newRevealedBoard.newNonMinesCount === 0){
                        setGameOver(true);
                    }
                }
            }
        }
        if (!start) {
            setStart(true);
        }
    }

    return (
        <React.Fragment>
            <select name="dificultad" value={difficulty} onChange={(e) => changeState(e)}>
                <option value="f">Fácil</option>
                <option value="m">Medio</option>
                <option value="d">Difícil</option>
            </select>
            <div className="blockCenter">
                <p className="blockCenter px-5">
                    <img src={flagicon} alt="Flag" style={{ paddingRight: 3 }} />
                    {flag}
                </p>
                <Timer gameOver={gameOver} start={start} />

            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                {gameOver ? <Modal reset={reset} /> : null}
                {!grid ?
                    <div>Loading</div>
                    :
                    grid.map((singleRow, index1) => {
                        return (
                            <div className="blockCenter" key={index1}>
                                {singleRow.map((singleBlock, index2) => {
                                    return (
                                        <Cell
                                            lengthBoard={grid.length}
                                            details={singleBlock}
                                            updateFlag={updateFlag}
                                            revealCell={revealCell}
                                            key={index2} />
                                    );
                                })}
                            </div>
                        )
                    })
                }
            </div>
        </React.Fragment>
    );
}

export default Board;