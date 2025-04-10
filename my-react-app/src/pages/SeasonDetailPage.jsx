import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FaRegStar } from "react-icons/fa";
import usePodcastStore from "../customHooks/usePodcastStore";
import { useParams } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";
import "./individualShowPage.css";
import "./SeasonDetailPage.css";
import { AudioContext } from "../AudioContext/AudioContext";
import { useState, useEffect } from "react";
import { v4 as createId } from "uuid";

export default function SeasonDetailPage() {
  const { id, seasonNumber } = useParams();
  const { showData, loading, error, displayShowEpisodes } = usePodcastStore();
  const { playAudio } = useContext(AudioContext);
  const [currentSeason, setCurrentSeason] = useState(null);

  useEffect(() => {
    const fetchShowDetails = async () => {
      const data = await displayShowEpisodes(id);
      if (data && data.seasons) {
        setCurrentSeason(data.seasons.find((season) => season.season === parseInt(seasonNumber)));
      }
    };

    fetchShowDetails();
  }, [id, seasonNumber, displayShowEpisodes]);

  if (loading) {
    return (
      <div className="season-detail-page">
        <div className="status-circle">
          <CircularProgress size="3rem" />
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="season-detail-page">
        <p className="error-message">Error loading details: {error}</p>
      </div>
    );
  }
  if (!currentSeason) {
    return (
      <div className="season-detail-page">
        <p>Loading season details...</p>
      </div>
    );
  }

  return (
    <div className="season-detail-page">
      <h2>Season {currentSeason.season} Episodes</h2>
      {console.log(currentSeason)}
      {currentSeason.episodes && (
        <ol className="episode-ol">
          {currentSeason.episodes.map((episode) => (
            <div key={episode.title} className="episode">
              <div>
                {currentSeason.image && (
                  <img
                    src={currentSeason.image}
                    className="season-img"
                    alt={`Season ${currentSeason.season}`}
                  />
                )}
                <button
                  key={createId()}
                  className="play-btn"
                  onClick={() => {
                    console.log("playAudio called with:", episode.file);
                    playAudio(episode.file);
                  }}
                >
                  <FontAwesomeIcon icon={faCirclePlay} />
                </button>
                <audio controls src={episode.file}></audio>
                <li>
                  <h3>{episode.title}</h3>
                  <p>{episode.description}</p>
                </li>
              </div>
              <button className="favourites-btn">
                <FaRegStar />
              </button>
            </div>
          ))}
        </ol>
      )}
    </div>
  );
}
