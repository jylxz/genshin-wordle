import React, { useEffect, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { BsFillVolumeDownFill } from "react-icons/bs";
import "./AudioPlayer.css"

export default function AudioPlayer({
  audioRef,
}: {
  audioRef: HTMLAudioElement | undefined;
}) {
  const [audioTime, setAudioTime] = useState(audioRef?.currentTime || 0);
  const [audioString, setAudioString] = useState("0:00/0:00");
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    if (audioRef) {
      audioRef.addEventListener("timeupdate", (e) => {
        const target = e.target as HTMLAudioElement;
        const time = new Date(target.currentTime * 1000)
          .toISOString()
          .substring(14, 19);
        const duration = new Date(target.duration * 1000)
          .toISOString()
          .substring(14, 19);

        setAudioTime((target.currentTime / target.duration) * 100);
        setAudioString(`${time}/${duration}`);
      });

      audioRef.addEventListener("volumechange", (e) => {
        const target = e.target as HTMLAudioElement;

        if (target.volume > 0.1 && target.muted) {
          target.muted = false;
        }

        setVolume(target.volume * 100);
      });
    }
  }, [audioRef]);

  function changeAudioTime(e: React.ChangeEvent<HTMLInputElement>) {
    if (audioRef) {
      audioRef.currentTime = (Number(e.target.value) / 100) * audioRef.duration;
    }
  }

  function togglePlayback() {
    if (audioRef?.paused) {
      audioRef.play();
    } else {
      audioRef?.pause();
    }
  }

  function changeVolume(e: React.ChangeEvent<HTMLInputElement>) {
    if (audioRef) {
      audioRef.volume = Number(e.target.value) / 100;
    }
  }

  function volumeToggle() {
    setShowVolumeSlider(!showVolumeSlider);
  }

  return (
    <div className="menu-audio-player">
      <div className="audio-player-controls">
        <button
          onPointerDown={() => togglePlayback()}
          className="audio-player-play"
        >
          {audioRef?.paused ? <FaPlay /> : <FaPause />}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={audioTime}
          onChange={(e) => changeAudioTime(e)}
          className="audio-player-seek"
        />
        <div className="audio-player-time">{audioString}</div>
        <button
          className="audio-player-volume"
          onPointerDown={() => volumeToggle()}
        >
          <BsFillVolumeDownFill size={20} />
        </button>
        {showVolumeSlider && (
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => changeVolume(e)}
            className="audio-player-volume-slider"
          />
        )}
      </div>
      <a
        className="audio-player-track"
        href="https://www.youtube.com/watch?v=Dr5BIWqBQNo"
        target="_blank"
        rel="noreferrer"
      >
        Raiden Shogun Theme Music EXTENDED - Judgment of Euthymia (tnbee mix){" "}
      </a>
    </div>
  );
}
