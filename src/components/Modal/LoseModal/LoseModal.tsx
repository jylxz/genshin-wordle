import React from "react";
import { BsPlayFill } from "react-icons/bs";

export default function LoseModal({
  handleFreeplay,
  correctWord,
}: {
  handleFreeplay: () => void;
  correctWord: string;
}) {
  return (
    <div className="modal-lose">
      <div className="modal-main">
        <h1>Uh oh!</h1>
        <img
          src="/assets/PaimonLose.webp"
          alt="Genshin Impact's Paimon"
          className="modal-paimon"
        />
        <h2>
          The correct word was{" "}
        </h2>
          <span className="modal-correct">
            {correctWord.at(0)?.toUpperCase() + correctWord.slice(1)}
          </span>
      </div>
      <div className="modal-buttons-heading">Play again?</div>
      <div className="modal-play-buttons">
        <button
          onClick={() => handleFreeplay()}
          className="modal-play-freeplay"
        >
          <BsPlayFill size={22} />
          Freeplay
        </button>
      </div>
    </div>
  );
}
