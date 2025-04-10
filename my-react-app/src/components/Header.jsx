import React, { useContext, useRef, useEffect } from "react";
import "./Header.css";
import { AudioContext } from "../AudioContext/AudioContext";

const Header = ({ onHamburgerClick }) => {
  const { AudioUrl, pauseAudio, isPlaying } = useContext(AudioContext);
  const audioRef = useRef(null);
  const previousAudioUrl = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = AudioUrl || "";
      if (AudioUrl && isPlaying && AudioUrl !== previousAudioUrl.current) {
        audioRef.current.play().catch((error) => {
          console.error("Playback failed in Header:", error);
        });
      } else if (audioRef.current && !isPlaying) {
        audioRef.current.pause();
      }
    }
    previousAudioUrl.current = AudioUrl; // Update the ref after each effect
  }, [AudioUrl, isPlaying]);

  return (
    <header className="header">
      <h1>My Application</h1>

      <audio controls ref={audioRef} onPause={pauseAudio}></audio>
    </header>
  );
};

export default Header;
