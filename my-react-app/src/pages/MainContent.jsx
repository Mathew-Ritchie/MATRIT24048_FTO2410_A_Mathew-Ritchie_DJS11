import React from "react";
import { useEffect, useState } from "react";
import usePodcastStore from "../customHooks/usePodcastStore";
import { formatDate } from "../../../draft-work/modules/utils";
import "./MainContent.css";
import CircularProgress from "@mui/material/CircularProgress";
import GenreDropDown from "../components/GenreDropDown";

export default function MainPodcastView() {
  const {
    podcastData,
    loading,
    error,
    fetchPodcasts,
    getFilteredAndSortedPodcasts,
    getGenre,
    displayShowEpisodes,
    GenreOption,
  } = usePodcastStore();

  // console.log(podcastData);

  const [podcastsToRender, setPodcastsToRender] = useState([]);

  useEffect(() => {
    fetchPodcasts().then(() => console.log("Podcast Data:", podcastData));
  }, [fetchPodcasts]);

  useEffect(() => {
    //console.log("MainPodcastView - GenreOption:", GenreOption);
    getFilteredAndSortedPodcasts().then(setPodcastsToRender);
  }, [getFilteredAndSortedPodcasts, podcastData, GenreOption]);

  return (
    <main className="main-content">
      {loading && <div className="status-circle">{<CircularProgress size="3rem" />}</div>}
      {error && <p>Error loading podcasts: {error}</p>}
      {podcastsToRender.map((show) => (
        <div key={show.id} className="podcast-item" onClick={() => displayShowEpisodes(show.id)}>
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
      ))}
    </main>
  );
}
