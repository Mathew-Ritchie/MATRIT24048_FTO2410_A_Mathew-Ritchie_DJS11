import React from "react";
import usePodcastStore from "../customHooks/usePodcastStore";
import { useParams, Link, Outlet } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";
import "./individualShowPage.css";
import { useState, useEffect } from "react";
import TextExpansion from "../components/TextExpansion/TextExpansion.jsx";

export default function IndividualShowPage() {
  const { id } = useParams();
  const { displayShowEpisodes, showData, loading, error } = usePodcastStore();
  const [showDetails, setShowDetails] = useState(null);

  useEffect(() => {
    if (id) {
      displayShowEpisodes(id)
        .then((data) => {
          setShowDetails(data);
        })
        .catch((err) => {
          console.error("error fetching individual show data", err);
        });
    }
  }, [id, displayShowEpisodes]);

  return (
    <div className="individual-show-page">
      {loading && <div className="status-circle">{<CircularProgress size="3rem" />}</div>}
      {error && <p>Error loading podcasts: {error}</p>}
      {showData && (
        <div>
          <h1>{showData.title}</h1>

          {/* <img src={showData.image} alt={showData.title} className="show-img-large" /> */}
          {/* <p className="show-description">{showData.description}</p> */}
          <TextExpansion text={showData.description} maxLength={50} />
          <div>
            {showData.seasons.map((season) => (
              <Link key={season.season} to={`${season.season}`}>
                <button>Season {season.season}</button>
              </Link>
            ))}
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
}
