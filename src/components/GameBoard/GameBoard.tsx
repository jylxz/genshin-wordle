import React from "react";
import { WordAttempt } from "../../hooks/useGameLogic";
import "./GameBoard.css";

export default function GameBoard({
  wordAttempts,
}: {
  wordAttempts: WordAttempt[];
}) {
  return (
    <div className="board-wrapper">
      <div className="board">
        {Array.from({
          length: 6,
        }).map((value, index) => (
          <React.Fragment key={index}>
            <BoardRow row={index} wordAttempts={wordAttempts} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function BoardRow({
  row,
  wordAttempts,
}: {
  row: number;
  wordAttempts: WordAttempt[];
}) {
  const word = wordAttempts[row];

  return (
    <div className="board-row">
      {Array.from({ length: 5 }).map((value, index) => (
        <div
          className={`board-box ${word.hints[index]?.hint}`}
          key={`box-${row}-${index}-${word.word.at(index)}`}
        >
          {word?.word.at(index)?.toUpperCase()}
        </div>
      ))}
    </div>
  );
}
