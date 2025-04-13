export const resetPlayCounts = () => {
  if (window.confirm("Are you sure you want to reset the play counts for all episodes?")) {
    localStorage.removeItem("watchedPodcasts");
    window.location.reload();
  }
};

export const removeAllFavourites = (setFavouriteEpisodes, setSortedFavourites) => {
  if (window.confirm("Are you sure you want to remove all favourite episodes?")) {
    localStorage.removeItem("favouriteEpisodes");
    setFavouriteEpisodes([]);
    setSortedFavourites([]);
  }
};
