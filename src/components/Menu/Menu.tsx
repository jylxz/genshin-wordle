import React from "react";
import AudioPlayer from "./AudioPlayer/AudioPlayer";
import "./Menu.css";

export default function Menu({
  audioRef,
  openMenu,
  setOpenMenu,
}: {
  audioRef: HTMLAudioElement | undefined;
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  function handleMenuClose(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    setOpenMenu(false);
  }

  return (
    <div
      className={`menu-wrapper ${openMenu ? "open" : "close"}`}
      onClick={(e) => handleMenuClose(e)}
    >
      <div className={`menu `} onClick={(e) => {e.stopPropagation()}}>
        <div className="menu-bg-credit">
          <a
            href="https://www.deviantart.com/sevenics/art/Visions-of-Inazuma-897645086"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="/assets/background.png"
              alt=""
              className="background-thumbnail"
            />
          </a>
          <h3>Visions of Inazuma</h3>
          <div className="background-artist">
            <a
              href="https://www.deviantart.com/sevenics"
              target="_blank"
              rel="noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "4px" }}
            >
              Sevenics
              <img
                src="/assets/DeviantArtLogo.jpeg"
                alt=""
                style={{ width: "1rem", height: "1rem" }}
              />
            </a>
          </div>
        </div>
        <AudioPlayer audioRef={audioRef} />
      </div>
    </div>
  );
}
