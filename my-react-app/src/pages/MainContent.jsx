import React from "react";
import { useEffect, useState } from "react";
import usePodcastStore from "../customHooks/usePodcastStore";
import { formatDate } from "../../../draft-work/modules/utils";
import "./MainContent.css";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router";
import SortingHeader from "../components/SortingHeader";

export default function MainPodcastView() {
  const {
    podcastData,
    loading,
    error,
    fetchPodcasts,
    getFilteredAndSortedPodcasts,
    displayShowEpisodes,
    GenreOption,
    sortOption,
    searchInputValue,
  } = usePodcastStore();

  const [podcastsToRender, setPodcastsToRender] = useState([]);

  useEffect(() => {
    fetchPodcasts();
  }, [fetchPodcasts]);

  useEffect(() => {
    getFilteredAndSortedPodcasts().then(setPodcastsToRender);
  }, [getFilteredAndSortedPodcasts, podcastData, GenreOption, searchInputValue, sortOption]);

  return (
    <main className="main-content">
      {loading && <div className="status-circle">{<CircularProgress size="3rem" />}</div>}
      {error && <p>Error loading podcasts: {error}</p>}
      <SortingHeader />
      <div className="show-wrapper">
        {podcastsToRender.map((show) => (
          <Link key={show.id} to={`/show/${show.id}`} className="show-link">
            <div
              key={show.id}
              className="podcast-item"
              onClick={() => displayShowEpisodes(show.id)}
            >
              <h2 className="show-title">{show.title}</h2>
              <div className="show-info-wrapper">
                <img src={show.image} alt={show.title} className="show-img" />
                <div id="show-info-div" className="show-info-div">
                  <p>Season: {show.seasons}</p>
                  <p>Genres: {show.genreNames && show.genreNames.join(", ")}</p>
                  <p>Updated: {formatDate(show.updated)}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
