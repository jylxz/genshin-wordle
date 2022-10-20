import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { TbMusic, TbMusicOff } from "react-icons/tb";
import "./Nav.css";

export default function Nav({
  audioRef,
  menuToggle,
}: {
  audioRef: HTMLAudioElement | undefined;
  menuToggle: () => void;
}) {
  const [muted, setMuted] = useState(audioRef?.volume === 0);

  useEffect(() => {
    if (audioRef) {
      audioRef.addEventListener("volumechange", handleVolume);
    }

    return () => {
      audioRef?.removeEventListener("volumechange", handleVolume);
    };
  }, [audioRef]);

  function handleVolume(e: Event) {
    const audio = e.target as HTMLAudioElement;

    if (audio.volume === 0) {
      setMuted(true);
    } else {
      setMuted(false);
    }
  }

  function audioMuteToggle() {
    if (audioRef) {
      switch (muted) {
        case true:
          audioRef.volume = 1;
          break;
        case false:
          audioRef.volume = 0;
      }
    }
  }

  return (
    <nav>
      <button className="nav-hamburger-btn" onClick={() => menuToggle()}>
        <GiHamburgerMenu size={24} />
      </button>
      <div className="nav-logo">
        <img
          className="nav-genshin-logo"
          src="/assets/GenshinLogo.png"
          alt="Genshin Impact Logo"
        />
        <span>| Wordle</span>
      </div>
      <button className="nav-mute-button" onClick={() => audioMuteToggle()}>
        {muted ? <TbMusicOff size={24} /> : <TbMusic size={24} />}
      </button>
    </nav>
  );
}
