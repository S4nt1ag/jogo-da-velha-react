import { useState } from 'react';
import './App.css';
import JogoDaVelha1P from './JogoDaVelha1P';
import JogoDaVelha2P from './JogoDaVelha2P';
import GameModeSelection from './GameModeSelection';

function App() {
  const [gameMode, setGameMode] = useState(null);

  const handleSelectMode = (mode) => {
    setGameMode(mode);
  };

  return (
    <div className="App">
      {gameMode === null ? (
        <GameModeSelection onSelectMode={handleSelectMode} />
      ) : gameMode === "1P" ? (
        <JogoDaVelha1P />
      ) : (
        <JogoDaVelha2P />
      )}
    </div>
  );
}

export default App;
