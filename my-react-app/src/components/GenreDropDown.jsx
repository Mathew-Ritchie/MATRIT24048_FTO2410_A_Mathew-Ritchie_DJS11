import React from "react";
import { useEffect, useState } from "react";
import usePodcastStore from "../customHooks/usePodcastStore";

export default const GenreDropDown() {
    const {
    podcastData,
    loading,
    error,
    fetchPodcasts,
    sortOption,
    setSortOption,
    GenreOption,
    setGenreOption,
    searchInputValue,
    setSearchInputValue,
    getFilteredAndSortedPodcasts,
  } = usePodcastStore();
    }

    const [filteredAndSortedPodcasts, setFilteredAndSortedPodcasts] =useState([])
}