import React, { useEffect, useState } from "react";
import { KeyboardHints } from "../../hooks/useGameLogic";
import { BsBackspaceReverse } from "react-icons/bs";
import { AiOutlineEnter } from "react-icons/ai";
import "./Keyboard.css";

export default function Keyboard({
  inputKey,
  hints,
}: {
  inputKey: (key: string) => void;
  hints: KeyboardHints;
}) {
  const topRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const middleRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const bottomRow = ["Z", "X", "C", "V", "B", "N", "M"];

  return (
    <div className="keyboard">
      <div className="keyboard-row-top">
        {topRow.map((key) => (
          <Key letter={key} inputKey={inputKey} hints={hints} />
        ))}
      </div>
      <div className="keyboard-row-middle">
        {middleRow.map((key) => (
          <Key letter={key} inputKey={inputKey} hints={hints} />
        ))}
      </div>
      <div className="keyboard-row-bottom">
        <button className="keyboard-key backspace" onClick={() => inputKey("Backspace")}>
          <BsBackspaceReverse />
        </button>
        {bottomRow.map((key) => (
          <Key letter={key} inputKey={inputKey} hints={hints} />
        ))}
        <button className="keyboard-key enter" onClick={() => inputKey("Enter")}>
          <AiOutlineEnter />
        </button>
      </div>
    </div>
  );
}

function Key({
  letter,
  inputKey,
  hints,
}: {
  letter: string;
  inputKey: (key: string) => void;
  hints: KeyboardHints;
}) {
  const [status, setStatus] = useState("");

  useEffect(() => {
    switch (true) {
      case hints.correct.has(letter.toLowerCase()):
        setStatus("correct");
        break;
      case hints.close.has(letter.toLowerCase()):
        setStatus("close");
        break;
      case hints.incorrect.has(letter.toLowerCase()):
        setStatus("incorrect");
        break;
      default:
        setStatus("");
    }
  }, [hints]);

  return (
    <button
      type="button"
      className={`keyboard-key ${status}`}
      onClick={() => inputKey(letter.toLowerCase())}
    >
      {letter}
    </button>
  );
}
