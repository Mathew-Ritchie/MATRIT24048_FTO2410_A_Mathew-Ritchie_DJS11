import { useEffect, useState } from "react";
import React from "react";
import usePodcastStore from "../customHooks/usePodcastStore";

export default function GenreDropDown() {
  const { GenreOption, setGenreOption, genreMap } = usePodcastStore();

  const handleGenreChange = (event) => {
    setGenreOption(event.target.value);
  };

  return (
    <div>
      <select id="genre" value={GenreOption} onChange={handleGenreChange}>
        <option value="">All Genres</option>
        {Object.entries(genreMap).map(([genreId, genreName]) => (
          <option key={genreId} value={genreId}>
            {genreName}
          </option>
        ))}
      </select>
    </div>
  );
}
