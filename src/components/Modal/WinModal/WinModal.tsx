import React from "react";
import { BsPlayFill } from "react-icons/bs";
import "./WinModal.css"

export default function WinModal({
  handleFreeplay,
  completeTime
}: {
  handleFreeplay: () => void;
  completeTime: string
}) {
  return (
    <div className="modal-win">
      <div className="modal-main">
        <h1>Congratulations!</h1>
        <img
          src="/assets/PaimonWon.webp"
          alt="Genshin Impact's Paimon"
          className="modal-paimon"
        />
        <div className="modal-win-complete">
          <h2>You got the correct word in</h2>
          <div className="modal-win-time">{completeTime}</div>
        </div>
      </div>
      <div className="modal-buttons-heading">Play again?</div>
      <div className="modal-play-buttons">
        <button onClick={() => handleFreeplay()} className="modal-play-freeplay">
          <BsPlayFill size={22} />
          Freeplay
        </button>
      </div>
    </div>
  );
}
