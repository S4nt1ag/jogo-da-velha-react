import React from 'react';
import './GameModeSelection.css';

function GameModeSelection({ onSelectMode }) {
    return (
        <div className="game-mode-selection">
            <h1>Escolha o Modo de Jogo</h1>
            <div className='button-game-selection'>
                <button onClick={() => onSelectMode("1P")}>1 Jogador</button>
                <button onClick={() => onSelectMode("2P")}>2 Jogadores</button>
            </div>
        </div>
    );
}

export default GameModeSelection;
