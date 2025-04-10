import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import usePodcastStore from "../customHooks/usePodcastStore";
import { useParams } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";
import "./individualShowPage.css";
import "./SeasonDetailPage.css";
import { useState, useEffect, useContext } from "react";
import { AudioContext } from "../AudioContext/AudioContext";

export default function SeasonDetailPage() {
  const { id, seasonNumber } = useParams();
  const { showData, loading, error } = usePodcastStore();
  const { playAudio } = useContext(AudioContext);

  if (!showData || !showData.seasons) {
    return <p>Loading season details...</p>;
  }

  const currentSeason = showData.seasons.find((season) => season.season === parseInt(seasonNumber));

  return (
    <div className="season-detail-page">
      {!showData || !showData.seasons ? <CircularProgress size="3rem" /> : ""}
      {loading && <div className="status-circle">{<CircularProgress size="3rem" />}</div>}
      {error && <p className="error-message">Error loading details: {error}</p>}
      <h2>Season {currentSeason.season} Episodes</h2>
      {currentSeason.episodes && (
        <ol className="episode-ol">
          {currentSeason.episodes.map((episode) => (
            <div key={episode.title} className="episode">
              <div>
                <img src={currentSeason.image} className="season-img" />
                <button className="play-btn" onClick={() => playAudio(episode.file)}>
                  <FontAwesomeIcon icon={faCirclePlay} />
                </button>
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
