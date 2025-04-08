import React from "react";
import { useEffect, useState } from "react";
import usePodcastStore from "../customHooks/usePodcastStore";
import { formatDate } from "../../../draft-work/modules/utils";
import "./MainContent.css";

export default function MainPodcastView() {
  const {
    podcastData,
    loading,
    error,
    fetchPodcasts,
    getFilteredAndSortedPodcasts,
    getGenre,
    displayShowEpisodes,
  } = usePodcastStore();

  // console.log(podcastData);

  const [podcastsToRender, setPodcastsToRender] = useState([]);

  useEffect(() => {
    fetchPodcasts();
  }, [fetchPodcasts]);

  useEffect(() => {
    getFilteredAndSortedPodcasts().then(setPodcastsToRender);
  }, [getFilteredAndSortedPodcasts, podcastData]);

  if (loading) {
    return <p>Loading podcasts...</p>;
  }

  if (error) {
    return <p>Error loading podcasts: {error}</p>;
  }

  if (!podcastsToRender || podcastsToRender.length === 0) {
    return <p>No podcasts found.</p>;
  }
  console.log(podcastsToRender);
  return (
    <main className="main-content">
      {loading && <p>Loading podcasts...</p>}
      {podcastsToRender.map((show) => (
        <div key={show.id} className="podcast-item" onClick={() => displayShowEpisodes(show.id)}>
          <img src={show.image} alt={show.title} className="show-img" />
          <div id="show-info-div">
            <h2>{show.title}</h2>
            <p>Season: {show.seasons}</p>
            <p>Genres: {show.genreNames && show.genreNames.join(", ")}</p>
            <p>Updated: {formatDate(show.updated)}</p>
          </div>
        </div>
      ))}
    </main>
  );
}
