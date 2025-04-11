import React from "react";
import { useEffect, useState } from "react";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaRegStar, FaStar as FaSolidStar } from "react-icons/fa";
import { AudioContext } from "../AudioContext/AudioContext";
import { useContext } from "react";
import "./FavouritesPage.css";

export default function FavouritesPage() {
  const [favouriteEpisodes, setFavouriteEpisodes] = useState([]);
  const { playAudio } = useContext(AudioContext);

  useEffect(() => {
    const storedFavourites = localStorage.getItem("favouriteEpisodes");
    if (storedFavourites) {
      setFavouriteEpisodes(JSON.parse(storedFavourites));
    }
  }, []);

  const handleRemoveFavourite = (episodeToRemove) => {
    const updateFavourites = favouriteEpisodes.filter(
      (fav) =>
        !(
          fav.title === episodeToRemove.title &&
          fav.file === episodeToRemove.file &&
          fav.img === episodeToRemove.img &&
          fav.showTitle === episodeToRemove.showTitle &&
          fav.season === episodeToRemove.season
        )
    );

    setFavouriteEpisodes(updateFavourites);
    localStorage.setItem("favouriteEpisodes", JSON.stringify(updateFavourites));
  };

  return (
    <div className="favourites-page">
      <h2>My Favourite Episodes</h2>
      {favouriteEpisodes.length === 0 ? (
        <p>No favourite episodes yet.</p>
      ) : (
        <ol className="favourite-episodes-list">
          {favouriteEpisodes.map((episode) => (
            <div key={episode.title} className="favourite-episode-outer-div">
              <div className="favourite-episode-inner-div">
                <img
                  src={episode.img}
                  alt={`Favourite Episode: ${episode.title}`}
                  className="favourites-img"
                />
                {/* <li className="favourites-li"> */}
                <h4 className="favourites-eps-title">{episode.title}</h4>
                {episode.season && <p className="favourite-season">Season: {episode.season}</p>}
                {episode.episode && <p className="favourite-episode">Ep. {episode.episode}</p>}
                {episode.showTitle && <h3 className="favourite-show-title">{episode.showTitle}</h3>}
                {/* <p>{episode.description}</p> */}
                {/* </li> */}
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

            //    <li
            //       key={`${episode.title}-${episode.file}-${episode.showTitle}-${episode.season}`}
            //       className="favourite-episode-item"
            //     >
            //       <div className="episode-details">
            //         {episode.img && (
            //           <img
            //             src={episode.img}
            //             alt={`Favourite Episode: ${episode.title}`}
            //             style={{ width: "50px", height: "50px", marginRight: "10px" }}
            //           />
            //         )}
            //         {episode.showTitle && <h3>{episode.showTitle}</h3>}
            //         {episode.season && <p>Season: {episode.season}</p>}
            //         <h4>{episode.title}</h4>
            //         <p>{episode.description}</p>
            //       </div>
            //       <div className="episode-actions">
            //         <button className="play-btn" onClick={() => playAudio(episode.file)}>
            //           <FontAwesomeIcon icon={faCirclePlay} />
            //         </button>
            //         <button
            //           className="remove-favourite-btn"
            //           onClick={() => handleRemoveFavourite(episode)}
            //         >
            //           Remove
            //           <FaSolidStar />
            //         </button>
            //       </div>
            //     </li>
          ))}
        </ol>
      )}
    </div>
  );
}
