import React from "react";
import usePodcastStore from "../customHooks/usePodcastStore";
import { useParams } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";
import "./individualShowPage.css";
import { useState, useEffect } from "react";

export default function SeasonDetailPage() {
  const { id, seasonNumber } = useParams();
  const { showData, loading, error } = usePodcastStore();

  if (!showData || !showData.seasons) {
    return <p>Loading season details...</p>;
  }

  const currentSeason = showData.seasons.find((season) => season.season === parseInt(seasonNumber));

  return (
    <div className="season-detail-page">
      {loading && <div className="status-circle">{<CircularProgress size="3rem" />}</div>}
      {error && <p className="error-message">Error loading details: {error}</p>}
      <h2>Season {currentSeason.season} Episodes</h2>
      {currentSeason.episodes && (
        <ul>
          {currentSeason.episodes.map((episode) => (
            <li key={episode.title}>
              <h3>{episode.title}</h3>
              <p>{episode.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
