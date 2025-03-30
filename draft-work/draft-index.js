const mainContent = document.getElementById("main-content");
const sortSelect = document.getElementById("select_zone");
const genreSelect = document.getElementById("genre-select-zone");
const searchInput = document.getElementById("search-input");
const allShowsBtn = document.getElementById("all-shows-btn");

let podcastData = [];

async function displayPodcasts() {
  try {
    mainContent.innerHTML = "<p>Loading...</p>";
    const res = await fetch("https://podcast-api.netlify.app");
    podcastData = await res.json();
    //console.log(data);
    mainContent.innerHTML = "";
    await fetchAndCacheGenres(podcastData); //added function to clean up code.
    sortAndRenderPodcasts();
    populateGenreDropDown();
    sortSelect.style.display = "block";
    genreSelect.style.display = "block";
    searchInput.style.display = "block";
  } catch (error) {
    console.log("error fetching or displaying podcasts", error);
    mainContent.innerHTML = "<p>Failed to load podcasts.</p>";
  }
}

const genreMap = {};

async function getGenre(genreId) {
  if (genreMap[genreId]) {
    return genreMap[genreId]; // Return cached genre name
  }
  try {
    const res = await fetch(`https://podcast-api.netlify.app/genre/${genreId}`);
    const data = await res.json();
    //console.log(data.name);
    genreMap[genreId] = data.title; // Cache the genre name

    return data.title;
  } catch (error) {
    console.error(`Error fetching genre ${genreId}:`, error);
    return "Unknown Genre"; // Return a default if fetch fails
  }
}

async function fetchAndCacheGenres(podcastData) {
  const uniqueGenreIds = new Set();
  podcastData.forEach((show) => {
    show.genres.forEach((genreId) => uniqueGenreIds.add(genreId));
  });
  await Promise.all(Array.from(uniqueGenreIds).map(getGenre));
}

//populate genre select ////
function populateGenreDropDown() {
  const genreDropDown = document.getElementById("genre-select-zone");
  genreDropDown.innerHTML = '<option value="">All Genres</option>'; // Add default option

  for (const genreId in genreMap) {
    const genreTitle = genreMap[genreId];
    const genreOption = document.createElement("option");
    genreOption.value = genreId;
    genreOption.textContent = genreTitle;
    genreDropDown.appendChild(genreOption);
  }
}

const genreArray = Object.entries(genreMap);
console.log(genreArray);

function sortAndRenderPodcasts() {
  const sortOption = sortSelect.value;
  const genreOption = genreSelect.value;
  const searchInputValue = searchInput.value.toLowerCase();

  let filteredData = [...podcastData];

  if (genreOption && genreOption !== "") {
    filteredData = filteredData.filter((show) => show.genres.includes(parseInt(genreOption)));
  }

  if (searchInputValue) {
    filteredData = filteredData.filter((show) =>
      show.title.toLowerCase().includes(searchInputValue)
    );
  }

  let sortedData = [...filteredData]; // Create a copy to avoid modifying the original
  switch (sortOption) {
    case "A-Z":
      sortedData.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "Z-A":
      sortedData.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "Newest update":
      sortedData.sort((a, b) => new Date(b.updated) - new Date(a.updated));
      break;
    case "Oldest update":
      sortedData.sort((a, b) => new Date(a.updated) - new Date(b.updated));
      break;
    default:
      break;
  }

  renderPodcastList(sortedData);
  async function renderPodcastList(data) {
    mainContent.innerHTML = "";
    const podcastPromises = data.map(async (show) => {
      try {
        const genreNames = await Promise.all(show.genres.map((genreId) => getGenre(genreId)));
        const formattedDate = formatDate(show.updated);
        const podcastDiv = document.createElement("div");
        podcastDiv.classList.add("podcast-item");
        podcastDiv.innerHTML = `
        <img src="${show.image} "> 
        <div id="show-info-div">
        <h2>${show.title}</h2>
        <p>Season: ${show.seasons}</p>
        <p>Genres: ${genreNames.join(", ")}</p>
        <p>Updated: ${formattedDate}</P> 
        </div>
        `;

        podcastDiv.addEventListener("click", () => displayShowEpisodes(show.id));
        mainContent.appendChild(podcastDiv);
      } catch (error) {
        console.error("Error displaying podcast:", error);
        const errorDiv = document.createElement("div");
        errorDiv.textContent = "Failed to load podcast.";
        mainContent.appendChild(errorDiv);
      }
    });
    await Promise.all(podcastPromises);
  }
}

async function displayShowEpisodes(showId) {
  mainContent.innerHTML = "<p>Loading Episodes...</p>";
  try {
    const res = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
    const showData = await res.json();
    mainContent.innerHTML = "";
    sortSelect.style.display = "none";
    genreSelect.style.display = "none";
    searchInput.style.display = "none";
    const seasonBtnDiv = document.createElement("div");
    mainContent.appendChild(seasonBtnDiv);

    showData.seasons.forEach((season, index) => {
      const seasonBtn = document.createElement("button");
      seasonBtn.innerHTML = `Season ${season.season} `;
      seasonBtnDiv.appendChild(seasonBtn);

      const seasonDiv = document.createElement("div");
      seasonDiv.classList.add("season-episodes");

      season.episodes.forEach((episode) => {
        seasonDiv.innerHTML += `<p>Episode ${episode.episode}: ${episode.title}</p>`;
      });
      mainContent.appendChild(seasonDiv);

      if (index !== 0) {
        seasonDiv.style.display = "none";
      }
      seasonBtn.addEventListener("click", () => {
        const allSeasonDivs = document.querySelectorAll(".season-episodes");
        allSeasonDivs.forEach((div) => {
          div.style.display = "none";
        });
        seasonDiv.style.display = "block";
      });
    });
  } catch (error) {
    console.error("error fetching episodes", error);
    mainContent.innerHTML = "<p>Failed to load episodes.<p>";
  }
}

function formatDate(dateString) {
  if (!dateString) {
    return "Date un-available";
  }

  try {
    const date = new Date(dateString); // JavaScript's Date object can parse ISO 8601

    if (isNaN(date.getTime())) {
      return "Date un-available"; // Handle invalid dates
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  } catch (error) {
    return "Date un-available"; // Handle parsing errors
  }
}
sortSelect.addEventListener("change", sortAndRenderPodcasts);
genreSelect.addEventListener("change", sortAndRenderPodcasts);
searchInput.addEventListener("input", sortAndRenderPodcasts);
allShowsBtn.addEventListener("click", displayPodcasts);
document.addEventListener("DOMContentLoaded", () => {
  displayPodcasts();
});
