import { useCallback, useEffect, useState } from 'react';
import './JogoDaVelha2P.css';

function JogoDaVelha2P() {
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
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

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
    possibleWaysToWin.forEach(cells => {
      if (cells.every(cell => cell === "O")) winner = "O";
      if (cells.every(cell => cell === "X")) winner = "X";
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
        } else {
          message = `Vencedor: ${winner}. Deseja jogar novamente?`;
        }
        if (window.confirm(message)) {
          resetGame();
        }
      }, 100);
    }
  }, [winner, resetGame]);

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
        {winner && (
          <h2 className="winner">
            {winner === "Empate" ? "Empate! Deu velha!" : `Vencedor: ${winner}`}
          </h2>
        )}
      </main>
    </div>
  );
}

export default JogoDaVelha2P;
