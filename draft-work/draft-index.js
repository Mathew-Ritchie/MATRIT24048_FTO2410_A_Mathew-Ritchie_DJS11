import { formatDate } from "./modules/utils.js";

document.addEventListener("DOMContentLoaded", () => {
  displayPodcasts();
});

const mainContent = document.getElementById("main-content");
const sortSelect = document.getElementById("select_zone");
//const genreSelect = document.getElementById("genre-select-zone");
const searchInput = document.getElementById("search-input");
//const allShowsBtn = document.getElementById("all-shows-btn");
const leftNavBar = document.getElementById("left-nav-bar");
const genreDropdown = document.querySelector("genre-dropdown");

let podcastData = [];

async function displayPodcasts() {
  mainContent.innerHTML = "";
  try {
    mainContent.innerHTML = "<p>Loading...</p>";
    const res = await fetch("https://podcast-api.netlify.app");
    podcastData = await res.json();
    //console.log(data);
    mainContent.innerHTML = "";
    await fetchAndCacheGenres(podcastData); //added function to clean up code.
    sortSelect.style.display = "block";
    //genreSelect.style.display = "block";
    searchInput.style.display = "block";
    sortAndRenderPodcasts();
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

const genreArray = Object.entries(genreMap);
console.log(genreArray);

function sortAndRenderPodcasts() {
  const sortOption = sortSelect.value;
  const genreOption = genreDropdown.shadowRoot.getElementById("genre-select-zone").value;
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

        podcastDiv.addEventListener("click", (event) => {
          event.stopPropagation();

          displayShowEpisodes(show.id);
        });
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
  renderPodcastList(sortedData);
}

async function displayShowEpisodes(showId) {
  mainContent.innerHTML = "";
  mainContent.innerHTML = "<p>Loading Episodes...</p>";
  try {
    const res = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
    const showData = await res.json();
    mainContent.innerHTML = "";
    sortSelect.style.display = "none";
    //genreSelect.style.display = "none";
    searchInput.style.display = "none";

    const seasonBtnDiv = document.createElement("div");
    mainContent.appendChild(seasonBtnDiv);
    const seasonContentDiv = document.createElement("div");
    mainContent.appendChild(seasonContentDiv);
    //season buttons

    showData.seasons.forEach((season, index) => {
      const seasonBtn = document.createElement("button");
      seasonBtn.innerHTML = `Season ${season.season} `;
      seasonBtnDiv.appendChild(seasonBtn);

      //episodes
      const seasonDiv = document.createElement("div");
      seasonDiv.classList.add("season-episodes");

      season.episodes.forEach((episode) => {
        seasonDiv.innerHTML += `<p>Episode ${episode.episode}: ${episode.title}</p>`;
      });

      if (index !== 0) {
        seasonDiv.style.display = "none";
      } else {
        displaySeasonImage(season.image, seasonContentDiv);
        seasonContentDiv.appendChild(seasonDiv);
      }
      seasonBtn.addEventListener("click", () => {
        const allSeasonDivs = document.querySelectorAll(".season-episodes");
        allSeasonDivs.forEach((div) => {
          div.style.display = "none";
        });
        seasonDiv.style.display = "block";
        displaySeasonImage(season.image, seasonContentDiv);
        seasonContentDiv.appendChild(seasonDiv);
      });
    });
  } catch (error) {
    console.error("error fetching episodes", error);
    mainContent.innerHTML = "<p>Failed to load episodes.<p>";
  }
}

function displaySeasonImage(imageUrl, contentDiv) {
  const existingImage = contentDiv.querySelector("img");
  if (existingImage) {
    contentDiv.removeChild(existingImage);
  }

  const seasonImg = document.createElement("img");
  seasonImg.src = imageUrl;
  contentDiv.appendChild(seasonImg);
}

sortSelect.addEventListener("change", sortAndRenderPodcasts);

// genreSelect.addEventListener("change", sortAndRenderPodcasts);

genreDropdown.addEventListener("genreDropdownPopulated", () => {
  sortAndRenderPodcasts();
});

genreDropdown.addEventListener("genreSelected", (event) => {
  sortAndRenderPodcasts();
});

searchInput.addEventListener("input", sortAndRenderPodcasts);

leftNavBar.addEventListener("allShowsClick", () => {
  console.log("All Shows button clicked from the component!");
  displayPodcasts();
});
