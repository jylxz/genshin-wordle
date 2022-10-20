import React, { useEffect, useState } from "react";
import WelcomeModal from "./WelcomeModal/WelcomeModal";
import "./Modal.css";
import WinModal from "./WinModal/WinModal";
import LoseModal from "./LoseModal/LoseModal";

export default function Modal({
  status,
  startGame,
  completeTime,
  correctWord
}: {
  status: string;
  startGame: (mode: "today" | "random") => Promise<void>;
  completeTime: string;
  correctWord: string
}) {
  const [modalOpen, setModalOpen] = useState(true);

  useEffect(() => {
    switch (status) {
      case "ongoing": {
        setModalOpen(false);
        break;
      }
      default:
        setModalOpen(true);
    }
  }, [status]);

  function handleWordOfTheDay() {
    startGame("today").then(() => {
      setModalOpen(false);
    });
  }

  function handleFreeplay() {
    startGame("random").then(() => {
      setModalOpen(false);
    });
  }

  return modalOpen ? (
    <div className="modal-wrapper">
      <div className="modal">
        {status === "starting" && (
          <WelcomeModal
            handleFreeplay={handleFreeplay}
            handleWordOfTheDay={handleWordOfTheDay}
          />
        )}
        {status === "win" && (
          <WinModal
            handleFreeplay={handleFreeplay}
            completeTime={completeTime}
          />
        )}
        {status === "lose" && <LoseModal handleFreeplay={handleFreeplay} correctWord={correctWord}/>}
      </div>
    </div>
  ) : null;
}
