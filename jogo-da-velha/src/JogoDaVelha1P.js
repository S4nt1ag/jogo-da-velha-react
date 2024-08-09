import { useCallback, useEffect, useState } from 'react';
import './JogoDaVelha1P.css';

function JogoDaVelha1P() {
  const emptyBoard = Array(9).fill("");
  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState("O");
  const [winner, setWinner] = useState("");

  const handleCellClick = (index) => {
    if (winner || board[index] !== "") return;

    const newBoard = board.map((item, itemIndex) =>
      itemIndex === index ? currentPlayer : item
    );
    setBoard(newBoard);
    checkWinner(newBoard);
    setCurrentPlayer("X");
  };

  const botMove = useCallback((newBoard) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const findBestMove = (board, player) => {
      for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] === player && board[b] === player && board[c] === "") return c;
        if (board[a] === player && board[c] === player && board[b] === "") return b;
        if (board[b] === player && board[c] === player && board[a] === "") return a;
      }
      return null;
    };

    let move = findBestMove(newBoard, "X");
    if (move === null) {
      move = findBestMove(newBoard, "O");
    }
    if (move === null) {
      const emptyCells = newBoard
        .map((item, index) => (item === "" ? index : null))
        .filter((item) => item !== null);
      if (emptyCells.length > 0) {
        move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      }
    }

    if (move !== null) {
      const updatedBoard = newBoard.map((item, index) =>
        index === move ? "X" : item
      );
      setBoard(updatedBoard);
      checkWinner(updatedBoard);
      setCurrentPlayer("O");
    }
  }, []);

  const checkWinner = (board) => {
    const possibleWaysToWin = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],
      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],
      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];

    let winner = "";
    possibleWaysToWin.forEach((cells) => {
      if (cells.every((cell) => cell === "O")) winner = "O";
      if (cells.every((cell) => cell === "X")) winner = "X";
    });

    if (winner) {
      setWinner(winner);
    } else if (board.every(cell => cell !== "")) {
      setWinner("Empate");
    }
  };

  const resetGame = useCallback(() => {
    setBoard(emptyBoard);
    setWinner("");
    setCurrentPlayer("O");
  }, [emptyBoard]);

  useEffect(() => {
    if (winner) {
      setTimeout(() => {
        let message = "";
        if (winner === "Empate") {
          message = "Deu velha! Deseja jogar novamente?";
        } else if (winner === "O") {
          message = "Você venceu! Deseja jogar novamente?";
        } else if (winner === "X") {
          message = "O bot venceu! Deseja jogar novamente?";
        }
        if (window.confirm(message)) {
          resetGame();
        }
      }, 100);
    } else if (currentPlayer === "X") {
      setTimeout(() => botMove(board), 500);
    }
  }, [winner, currentPlayer, board, botMove, resetGame]);

  return (
    <div className="App">
      <main>
        <h1 className='title'>Jogo da Velha</h1>
        <div className={`board ${winner ? "game-over" : ""}`}>
          {board.map((item, index) => (
            <div
              className={`cell ${item}`}
              key={index}
              onClick={() => handleCellClick(index)}
            >
              {item}
            </div>
          ))}
        </div>
        {winner && winner !== "Empate" && (
          <h2 className="winner">
            {winner === "O" ? "Você venceu!" : "O bot venceu!"}
          </h2>
        )}
        {winner === "Empate" && (
          <h2 className="winner">Empate! Deu velha!</h2>
        )}
      </main>
    </div>
  );
}

export default JogoDaVelha1P;
