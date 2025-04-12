import React, { createContext, useState, useRef, useEffect } from "react";
import "./AudioContext.css";
import { v4 as createId } from "uuid";
import { useShowId } from "./ShowIdContext"; // Ensure the path is correct

export const AudioContext = createContext();

function AudioProvider({ children }) {
  const [AudioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioReference = useRef(new Audio());
  const [currentEpisodeData, setCurrentEpisodeData] = useState(null);
  const showId = useShowId(); // Get showId from the context
  const [watchedTimeout, setWatchedTimeout] = useState(null);
  //   console.log(showId);

  useEffect(() => {
    // console.log("*** Event listener useEffect running ***");
    // console.log("showId from context:", showId); // Log the value from the context

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    const currentAudio = audioReference.current;
    console.log("audioReference.current in useEffect:", currentAudio);

    currentAudio.addEventListener("play", handlePlay);
    currentAudio.addEventListener("pause", handlePause);
    // currentAudio.addEventListener("ended", handleEnded);

    return () => {
      currentAudio.removeEventListener("play", handlePlay);
      currentAudio.removeEventListener("pause", handlePause);
      if (watchedTimeout) {
        clearTimeout(watchedTimeout);
      }
      //   currentAudio.removeEventListener("ended", handleEnded);
    };
  }, [AudioUrl, showId, currentEpisodeData]); // Depend on showId from context

  useEffect(() => {
    if (AudioUrl && audioReference.current) {
      const currentAudio = audioReference.current;
      const shouldPlay = isPlaying;

      if (currentAudio) {
        currentAudio.pause();
        currentAudio.src = AudioUrl;
        currentAudio.load(); // Important to load the new source

        const handleLoadedData = () => {
          if (shouldPlay) {
            currentAudio.play().catch((error) => {
              console.error("Playback failed after loadeddata:", error);
              setIsPlaying(false);
            });
            const timeoutId = setTimeout(() => {
              if (currentEpisodeData?.uniqueId && showId) {
                console.log("Timeout triggered, calling markPodcastAsWatched");
                markPodcastAsWatched(showId, currentEpisodeData.uniqueId);
              }
              setWatchedTimeout(null);
            }, 40000);
            setWatchedTimeout(timeoutId);
          } else if (watchedTimeout) {
            clearTimeout(watchedTimeout);
            setWatchedTimeout(null);
          }
          currentAudio.removeEventListener("loadeddata", handleLoadedData);
        };
        currentAudio.addEventListener("loadeddata", handleLoadedData, { once: true });
      }
    } else {
      if (audioReference.current) {
        audioReference.current.pause();
      }
      if (watchedTimeout) {
        clearTimeout(watchedTimeout);
        setWatchedTimeout(null);
      }
    }
  }, [AudioUrl, currentEpisodeData?.uniqueId, showId]);

  useEffect(() => {
    if (AudioUrl && isPlaying && audioReference.current) {
      audioReference.current.play().catch((error) => {
        console.error("Playback failed during isPlaying change:", error);
        setIsPlaying(false);
      });
    } else if (AudioUrl && !isPlaying && audioReference.current) {
      audioReference.current.pause();
    }
  }, [isPlaying, AudioUrl]);

  const playAudio = (url, episodeData) => {
    // Removed showId from arguments
    if (url) {
      setAudioUrl(url);
      setCurrentEpisodeData(episodeData);
      setIsPlaying(true);
      console.log("playAudio called with episodeData:", episodeData);
    }
  };

  const pauseAudio = () => {
    audioReference.current.pause();
    setIsPlaying(false);
    if (watchedTimeout) {
      clearTimeout(watchedTimeout); // Clear timeout if paused
      setWatchedTimeout(null);
    }
  };

  const markPodcastAsWatched = (showId, episodeUniqueId) => {
    console.log("markPodcastAsWatched called (from timeout)", showId, episodeUniqueId);
    const watchedKey = `watchedPodcasts`;
    const watchedData = localStorage.getItem(watchedKey);
    let watched = watchedData ? JSON.parse(watchedData) : {};

    const uniqueKey = `${showId}_${episodeUniqueId}`;

    if (watched[uniqueKey]) {
      watched[uniqueKey] = {
        lastPlayed: new Date().toISOString(),
        playCount: watched[uniqueKey].playCount + 1,
      };
    } else {
      watched[uniqueKey] = {
        lastPlayed: new Date().toISOString(),
        playCount: 1,
      };
    }

    localStorage.setItem(watchedKey, JSON.stringify(watched));
  };

  return (
    <AudioContext.Provider value={{ AudioUrl, playAudio, pauseAudio, isPlaying }}>
      {children}

      <audio
        controls
        ref={audioReference}
        src={AudioUrl}
        onPause={pauseAudio}
        className="responsive-audio"
      />
    </AudioContext.Provider>
  );
}

export default AudioProvider;
