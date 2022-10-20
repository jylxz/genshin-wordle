import React from "react";
import { BsCalendarDate, BsPlayFill } from "react-icons/bs";
import "./WelcomeModal.css"

export default function WelcomeModal({
  handleWordOfTheDay,
  handleFreeplay,
}: {
  handleWordOfTheDay: () => void;
  handleFreeplay: () => void
}) {
  

  return (
    <div className="modal-welcome">
      <div className="modal-main">
        <h1>Welcome to Genshin Impact Wordle!</h1>
        <img src="/assets/Paimon.webp" alt="Genshin Impact's Paimon" className="modal-paimon"/>
        <h2>A wordle game based on the Genshin Impact universe</h2>
      </div>
      <div className="modal-buttons-heading">Choose Mode</div>
      <div className="modal-welcome-buttons">
        <button
          onClick={() => handleWordOfTheDay()}
          className="modal-button-word"
        >
          <BsCalendarDate size={22} />
          Word of the Day
        </button>
        <button
          onClick={() => handleFreeplay()}
          className="modal-button-freeplay"
        >
          <BsPlayFill size={22} />
          Freeplay
        </button>
      </div>
      <div className="modal-credit"></div>
    </div>
  );
}
