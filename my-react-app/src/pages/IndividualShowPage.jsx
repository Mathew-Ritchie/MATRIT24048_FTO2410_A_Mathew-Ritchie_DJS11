import React from "react";
import usePodcastStore from "../customHooks/usePodcastStore";
import { useParams, NavLink, Outlet } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";
import "./individualShowPage.css";
import { useState, useEffect } from "react";
import TextExpansion from "../components/TextExpansion/TextExpansion.jsx";

export default function IndividualShowPage() {
  const { id } = useParams();
  const { showData, loading, error } = usePodcastStore();
  // const { SelectedSeasonImage, setSelectedSeasonImage } = useState(null);

  // const handleSeasonClick = (seasonNumber) => {
  //   const selectedSeason = showData?.season?.find((season) => {
  //     season.season === parseInt(seasonNumber);
  //   });
  //   if (selectedSeason && selectedSeason.image) {
  //     setSelectedSeasonImage(selectedSeason.image);
  //   } else {
  //     setSelectedSeasonImage(null);
  //   }
  // };

  // const displayImage = SelectedSeasonImage || showData?.image;

  // console.log(showData);

  return (
    <div className="individual-show-page">
      {loading && <div className="status-circle">{<CircularProgress size="3rem" />}</div>}
      {error && <p>Error loading podcasts: {error}</p>}
      {showData && (
        <div>
          <div className="Showpage-show-details-wrap">
            <img src={showData.image} alt={`Season Image`} className="show-img-large" />

            <div>
              <h1>{showData.title}</h1>

              {/* <img src={showData.image} alt={showData.title} className="show-img-large" /> */}
              {/* <p className="show-description">{showData.description}</p> */}
              <TextExpansion text={showData.description} maxLength={200} />
            </div>
          </div>
          <div className="season-btn-div">
            {showData.seasons.map((season) => (
              <NavLink
                className={({ isActive }) => (isActive ? "season-btns-active" : "season-btns")}
                key={season.season}
                to={`${season.season}`}
                // style={({ isActive }) => (isActive ? activeStyles : null)}
                // onClick={() => handleSeasonClick(season.season)}
              >
                Season {season.season}
                {/* <button className="season-btns">Season {season.season}</button> */}
              </NavLink>
            ))}
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
}

// const [showDetails, setShowDetails] = useState(null);

// useEffect(() => {
//   if (id) {
//     displayShowEpisodes(id)
//       .then((data) => {
//         setShowDetails(data);
//       })
//       .catch((err) => {
//         console.error("error fetching individual show data", err);
//       });
//   }
// }, [id, displayShowEpisodes]);

// console.log(showDetails);
