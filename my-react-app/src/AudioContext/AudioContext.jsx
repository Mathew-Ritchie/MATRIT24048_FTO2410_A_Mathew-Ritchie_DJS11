import React, { Children } from "react";
import { createContext, useState, useRef } from "react";

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [AudioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioReference = useRef(new Audio());

  const playAudio = (url) => {
    if (url) {
      if (AudioUrl !== url) {
        audioReference.current.src = url;
        setAudioUrl(url);
        setIsPlaying(true);
        audioReference.current.play().catch((error) => {
          console.error("Playback failed:", error);
          setIsPlaying(false);
        });
      } else if (!isPlaying) {
        // Only play if not already playing
        setIsPlaying(true);
        audioReference.current.play().catch((error) => {
          console.error("Playback failed:", error);
          setIsPlaying(false);
        });
      }
    } else {
      setIsPlaying(false);
      audioReference.current.pause();
      setAudioUrl(null);
    }
  };

  const pauseAudio = () => {
    setIsPlaying(false);
    audioReference.current.pause();
  };

  return (
    <AudioContext.Provider value={{ AudioUrl, playAudio, pauseAudio }}>
      {children}
    </AudioContext.Provider>
  );
};
