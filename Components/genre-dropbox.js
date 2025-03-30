class GenreDropDown extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    this.render();
    await this.fetchAndPopulateGenres();
    this.setupEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = /*HTML*/ `
    <style>

    </style>
    
    <select id="genre-select-zone"></select>
    `;
  }

  async fetchAndPopulateGenres() {
    try {
      const res = await fetch("https://podcast-api.netlify.app");
      const podcastData = await res.json();
      const genreMap = {};

      async function getGenre(genreId) {
        if (genreMap[genreId]) {
          return genreMap[genreId];
        }
        try {
          const genreRes = await fetch(`https://podcast-api.netlify.app/genre/${genreId}`);
          const genreData = await genreRes.json();
          genreMap[genreId] = genreData.title;
          return genreData.title;
        } catch (error) {
          console.error(`Error fetching genre ${genreId}:`, error);
          return "Unknown Genre";
        }
      }

      const uniqueGenreIds = new Set();
      podcastData.forEach((show) => {
        show.genres.forEach((genreId) => uniqueGenreIds.add(genreId));
      });
      await Promise.all(Array.from(uniqueGenreIds).map(getGenre));

      window.genreMap = genreMap; // Store in window.genreMap
      this.populateGenreDropDown();
    } catch (error) {
      console.error("Error fetching or processing genres:", error);
    }
  }

  populateGenreDropDown() {
    const genreDropDown = this.shadowRoot.getElementById("genre-select-zone");
    genreDropDown.innerHTML = '<option value="">All Genres</option>';
    if (window.genreMap) {
      // Check if genreMap exists
      for (const genreId in window.genreMap) {
        const genreTitle = window.genreMap[genreId];
        const genreOption = document.createElement("option");
        genreOption.value = genreId;
        genreOption.textContent = genreTitle;
        genreDropDown.appendChild(genreOption);
      }
      this.dispatchEvent(new CustomEvent("genreDropdownPopulated"));
    } else {
      console.error("genreMap is not defined.");
    }
  }

  setupEventListeners() {
    const genreDropDown = this.shadowRoot.getElementById("genre-select-zone");

    genreDropDown.addEventListener("change", () => {
      const selectedGenre = genreDropDown.value;
      this.dispatchEvent(new CustomEvent("genreSelected", { detail: { genre: selectedGenre } }));
    });
  }
}
customElements.define("genre-dropdown", GenreDropDown);
