import React, { createContext, useState, useRef, useEffect } from "react";

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [AudioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioReference = useRef(new Audio());

  useEffect(() => {
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    const currentAudio = audioReference.current;

    currentAudio.addEventListener("play", handlePlay);
    currentAudio.addEventListener("pause", handlePause);
    currentAudio.addEventListener("ended", handleEnded);

    return () => {
      currentAudio.removeEventListener("play", handlePlay);
      currentAudio.removeEventListener("pause", handlePause);
      currentAudio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const playAudio = (url) => {
    if (url) {
      audioReference.current.pause();

      const shouldPlayNewSource = AudioUrl !== url;

      if (shouldPlayNewSource) {
        audioReference.current.src = url;
        setAudioUrl(url);

        audioReference.current.addEventListener(
          "loadeddata",
          () => {
            audioReference.current.play().catch((error) => {
              console.error("Playback failed after loadeddata:", error);
              setIsPlaying(false);
            });
            setIsPlaying(true);
          },
          { once: true }
        );
      } else {
        audioReference.current.play().catch((error) => {
          console.error("Playback failed (same URL):", error);
          setIsPlaying(false);
        });
        setIsPlaying(true);
      }
    } else {
      audioReference.current.pause();
      setAudioUrl(null);
      setIsPlaying(false);
    }
  };

  const pauseAudio = () => {
    audioReference.current.pause();
    setIsPlaying(false);
  };

  return (
    <AudioContext.Provider value={{ AudioUrl, playAudio, pauseAudio, isPlaying }}>
      {children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;
