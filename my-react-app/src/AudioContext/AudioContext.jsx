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

  useEffect(() => {
    if (AudioUrl) {
      audioReference.current.pause();
      audioReference.current.src = AudioUrl;
      audioReference.current.load(); // Important to load the new source

      audioReference.current.addEventListener(
        "loadeddata",
        () => {
          if (isPlaying) {
            audioReference.current.play().catch((error) => {
              console.error("Playback failed after loadeddata:", error);
              setIsPlaying(false);
            });
          }
        },
        { once: true }
      );
    } else {
      audioReference.current.pause();
    }
  }, [AudioUrl, isPlaying]);

  const playAudio = (url) => {
    if (url) {
      setAudioUrl(url);
      setIsPlaying(true);
    } else {
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
      {AudioUrl && (
        <audio
          controls
          ref={audioReference}
          src={AudioUrl}
          onPause={pauseAudio}
          className="responsive-audio"
        />
      )}
    </AudioContext.Provider>
  );
};

export default AudioProvider;
