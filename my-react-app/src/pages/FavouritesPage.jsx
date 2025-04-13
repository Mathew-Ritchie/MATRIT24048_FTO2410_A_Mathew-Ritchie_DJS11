import React from "react";
import { useEffect, useState } from "react";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaRegStar, FaStar as FaSolidStar } from "react-icons/fa";
import { AudioContext } from "../AudioContext/AudioContext";
import { useContext } from "react";
import FavSortingDropDown from "../components/SortingAndFiltering/FavouritesSorting";
import "./FavouritesPage.css";
import { ShowIdContext } from "../AudioContext/ShowIdContext";

export default function FavouritesPage() {
  const [favouriteEpisodes, setFavouriteEpisodes] = useState([]);
  const [sortedFavourites, setSortedFavourites] = useState([]);
  const { playAudio } = useContext(AudioContext);

  //   useEffect(() => {
  //     console.log("Sort Option:", sortOption);
  //   }, [sortOption]);
  // Getting Favourites from localStoreage
  useEffect(() => {
    const storedFavourites = localStorage.getItem("favouriteEpisodes");
    if (storedFavourites) {
      const initialFavourites = JSON.parse(storedFavourites);
      setFavouriteEpisodes(initialFavourites);
      setSortedFavourites(initialFavourites);
    }
  }, []);

  //recieve soirted eps from FavSortingDropDown
  const handleSortChange = (sortedList) => {
    setSortedFavourites(sortedList);
  };

  //filtering and removing object from local storage
  const handleRemoveFavourite = (episodeToRemove) => {
    const updateFavourites = favouriteEpisodes.filter(
      (fav) =>
        !(
          fav.title === episodeToRemove.title &&
          fav.file === episodeToRemove.file &&
          fav.img === episodeToRemove.img &&
          fav.showTitle === episodeToRemove.showTitle &&
          fav.season === episodeToRemove.season &&
          fav.addedAt === episodeToRemove.addedAt
        )
    );

    setFavouriteEpisodes(updateFavourites);
    setSortedFavourites(updateFavourites);
    localStorage.setItem("favouriteEpisodes", JSON.stringify(updateFavourites));
  };

  const getWatchedPlayCount = (episode) => {
    const watchedData = localStorage.getItem("watchedPodcasts");
    if (watchedData) {
      const watched = JSON.parse(watchedData);
      const uniqueKey = `${episode.showId}_${episode.title}`;
      return watched[uniqueKey]?.playCount || 0;
    }
    return 0;
  };

  return (
    <div className="favourites-page">
      <div className="title-sorting-container">
        <h2 className="favourites-title">My Favourite Episodes</h2>
        <FavSortingDropDown episodes={favouriteEpisodes} onSortChange={handleSortChange} />
      </div>
      {favouriteEpisodes.length === 0 ? (
        <p>No favourite episodes yet.</p>
      ) : (
        <ol className="favourite-episodes-list">
          {/* {console.log("Value of sortedFavourites before map:", sortedFavourites)} */}
          {sortedFavourites.map((episode) => {
            console.log("FavouritesPage - Episode Show ID:", episode.showId);
            return (
              <ShowIdContext.Provider
                key={`${episode.title}-${episode.file}`}
                value={episode.showId}
              >
                <div key={episode.title} className="favourite-episode-outer-div">
                  <div className="favourite-episode-inner-div">
                    <img
                      src={episode.img}
                      alt={`Favourite Episode: ${episode.title}`}
                      className="favourites-img"
                    />
                    {/* <li className="favourites-li"> */}
                    <p className="favourites-eps-title">{episode.title}</p>
                    {/* {episode.season && <p className="favourite-season">Season: {episode.season}</p>} */}
                    {episode.episode && (
                      <p className="favourite-episode">
                        {" "}
                        S.{episode.season}.Ep.{episode.episode}
                      </p>
                    )}
                    {episode.showTitle && (
                      <p className="favourite-show-title">{episode.showTitle}</p>
                    )}
                    {episode.addedAt && (
                      <p className="added-at">
                        Added:{" "}
                        {new Date(episode.addedAt).toLocaleString(undefined, {
                          year: "2-digit",
                          month: "numeric",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </p>
                    )}
                    <p className="play-count">Plays: {getWatchedPlayCount(episode)}</p>

                    <button
                      className="play-btn"
                      onClick={() =>
                        playAudio(episode.file, { ...episode, currentShowId: episode.showId })
                      }
                    >
                      <FontAwesomeIcon icon={faCirclePlay} />
                    </button>
                    <button
                      className="remove-favourite-btn"
                      onClick={() => handleRemoveFavourite(episode)}
                    >
                      <FaSolidStar />
                    </button>
                  </div>
                </div>
              </ShowIdContext.Provider>
            );
          })}
        </ol>
      )}
    </div>
  );
}
