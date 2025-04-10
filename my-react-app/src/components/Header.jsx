import React, { useContext, useRef, useEffect } from "react";
import "./Header.css";
import { AudioContext } from "../AudioContext/AudioContext";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const Header = ({ onHamburgerClick }) => {
  const { AudioUrl, pauseAudio, isPlaying } = useContext(AudioContext);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (AudioUrl && isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
          // Handle potential autoplay errors (browser policies)
        });
      } else if (!isPlaying) {
        audioRef.current.pause();
      }
    }
  }, [AudioUrl, isPlaying]);

  return (
    <header className="header">
      <h1>My Application</h1>
      {AudioUrl && (
        <div className="audio-container">
          <audio
            controls
            ref={audioRef}
            src={AudioUrl}
            onPause={pauseAudio}
            className="responsive-audio"
          ></audio>
        </div>
      )}
    </header>
  );
};

export default Header;
