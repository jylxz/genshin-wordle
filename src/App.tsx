import React, { useCallback, useState } from "react";
import "./App.css";
import Menu from "./components/Menu";
import Nav from "./components/Nav";
import Keyboard from "./components/Keyboard";
import Modal from "./components/Modal";
import GameBoard from "./components/GameBoard";
import useGameLogic from "./hooks/useGameLogic";
import Music from "./media/JudgmentOfEuthymia.mp3";

function App() {
  const [openMenu, setOpenMenu] = useState(false);
  const [audioRef, setAudioRef] = useState<HTMLAudioElement>();

  const {
    correctWord,
    completeTime,
    inputKey,
    keyboardHints,
    startGame,
    gameStatus,
    wordAttempts,
  } = useGameLogic();

  function menuToggle() {
    setOpenMenu(!openMenu);
  }

  const audioCallback = useCallback(async (node: HTMLAudioElement) => {
    node.muted = false;
    node.volume = 0;
    setAudioRef(node);
  }, []);

  return (
    <div className="App">
      <Modal
        status={gameStatus}
        startGame={startGame}
        completeTime={completeTime}
        correctWord={correctWord}
      />
      <Menu audioRef={audioRef} openMenu={openMenu} setOpenMenu={setOpenMenu} />
      <Nav audioRef={audioRef} menuToggle={menuToggle} />
      <audio ref={audioCallback} src={Music} autoPlay muted></audio>
      <GameBoard wordAttempts={wordAttempts} />
      <Keyboard inputKey={inputKey} hints={keyboardHints} />
    </div>
  );
}

export default App;
