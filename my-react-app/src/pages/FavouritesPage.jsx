import React from "react";
import { useEffect, useState } from "react";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaRegStar, FaStar as FaSolidStar } from "react-icons/fa";
import { AudioContext } from "../AudioContext/AudioContext";
import { useContext } from "react";
import FavSortingDropDown from "../components/SortingAndFiltering/FavouritesSorting";
import "./FavouritesPage.css";

export default function FavouritesPage() {
  const [favouriteEpisodes, setFavouriteEpisodes] = useState([]);
  const [sortOption, setSortOption] = useState("A-Z");
  const { playAudio } = useContext(AudioContext);

  //   useEffect(() => {
  //     console.log("Sort Option:", sortOption);
  //   }, [sortOption]);
  // Getting Favourites from localStoreage
  useEffect(() => {
    const storedFavourites = localStorage.getItem("favouriteEpisodes");
    if (storedFavourites) {
      setFavouriteEpisodes(JSON.parse(storedFavourites));
    }
  }, []);

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
    localStorage.setItem("favouriteEpisodes", JSON.stringify(updateFavourites));
  };

  //Sorting items on favourites page.

  const sortFavourites = (episodes, option) => {
    const copyEpisodes = [...episodes];

    switch (option) {
      case "A-Z":
        return copyEpisodes.sort((a, b) => {
          const titleA = a.showTitle ? a.showTitle.toLowerCase() : "";
          const titleB = b.showTitle ? b.showTitle.toLowerCase() : "";
          if (titleA < titleB) return -1;
          if (titleA > titleB) return 1;
          return 0; // if show titles are the same.
        });
      case "Z-A":
        return copyEpisodes.sort((a, b) => {
          const titleA = a.showTitle ? a.showTitle.toLowerCase() : "";
          const titleB = b.showTitle ? b.showTitle.toLowerCase() : "";
          if (titleA < titleB) return 1;
          if (titleA > titleB) return -1;
          // If show titles are the same, maintain original order
          return 0;
        });
      case "Newest":
        return copyEpisodes.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
      case "Oldest":
        return copyEpisodes.sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt));
      default:
        return copyEpisodes;
    }
  };

  const sortedFavourites = sortFavourites(favouriteEpisodes, sortOption);
  useEffect(() => {
    console.log("Sorted Favourites:", sortedFavourites);
  }, [sortedFavourites]);

  return (
    <div className="favourites-page">
      <div>
        <h2>My Favourite Episodes</h2>
        <FavSortingDropDown setSortOption={setSortOption} />
      </div>
      {favouriteEpisodes.length === 0 ? (
        <p>No favourite episodes yet.</p>
      ) : (
        <ol className="favourite-episodes-list">
          {sortedFavourites.map((episode) => (
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
                {episode.showTitle && <p className="favourite-show-title">{episode.showTitle}</p>}
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

                <button className="play-btn" onClick={() => playAudio(episode.file)}>
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
          ))}
        </ol>
      )}
    </div>
  );
}
