import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FaRegStar, FaStar as FaSolidStar } from "react-icons/fa";
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
  const { showData, loading, error, displayShowEpisodes, podcastData } = usePodcastStore();
  const { playAudio } = useContext(AudioContext);
  const [currentSeason, setCurrentSeason] = useState(null);
  // const [podcastinfo, setPodcastinfo] = useState(null);
  const [favourites, setFavourites] = useState(() => {
    const storedFavourites = localStorage.getItem("favouriteEpisodes");
    return storedFavourites ? JSON.parse(storedFavourites) : [];
  });

  console.log(currentSeason);
  console.log(showData);

  useEffect(() => {
    localStorage.setItem("favouriteEpisodes", JSON.stringify(favourites));
  }, [favourites]);

  // useEffect(() => {
  //   const fetchPodcastDetails = async () => {
  //     const data = await podcastData(id);
  //     if (data) {
  //       setPodcastinfo(data);
  //     }
  //   };
  //   fetchPodcastDetails();
  // }, [id, podcastData]);

  useEffect(() => {
    const fetchShowDetails = async () => {
      const data = await displayShowEpisodes(id);
      if (data && data.seasons) {
        setCurrentSeason(data.seasons.find((season) => season.season === parseInt(seasonNumber)));
      }
    };
    fetchShowDetails();
  }, [id, seasonNumber, displayShowEpisodes]);

  const isFavourite = (episode) => {
    return favourites.some(
      (fav) =>
        fav.title === episode.title &&
        fav.file === episode.file &&
        fav.img === currentSeason?.image &&
        fav.showTitle === showData?.title &&
        fav.season === currentSeason?.season
    );
  };

  const handleAddToFavourites = (episode) => {
    const episodeWithShowAndSeason = {
      ...episode,
      showTitle: showData?.title,
      season: currentSeason?.season,
      img: currentSeason?.image,
    };
    if (isFavourite(episode)) {
      setFavourites((prevFavourites) =>
        prevFavourites.filter(
          (fav) =>
            !(
              fav.title === episode.title &&
              fav.file === episode.file &&
              fav.img === currentSeason?.image &&
              fav.showTitle === showData?.title &&
              fav.season === currentSeason?.season
            )
        )
      );
    } else {
      setFavourites((prevFavourites) => [...prevFavourites, episodeWithShowAndSeason]);
    }
  };

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
      {/* {console.log(currentSeason)} */}
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
                    playAudio(episode.file);
                  }}
                >
                  <FontAwesomeIcon icon={faCirclePlay} />
                </button>
                {/* <audio controls src={episode.file}></audio> */}
                <li>
                  <h3>{episode.title}</h3>
                  <p>{episode.description}</p>
                </li>
              </div>
              <button className="favourites-btn" onClick={() => handleAddToFavourites(episode)}>
                {isFavourite(episode) ? <FaSolidStar /> : <FaRegStar />}
              </button>
            </div>
          ))}
        </ol>
      )}
    </div>
  );
}
