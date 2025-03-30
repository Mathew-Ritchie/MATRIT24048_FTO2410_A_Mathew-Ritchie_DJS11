class LeftNavBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = /*css*/ `
    <style>
            .left-nav-bar {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: 200px;
            background-color: #f0f0f0;
            display: flex;
            flex-direction: column;
            padding: 20px 0;
            box-sizing: border-box;
            border-right: 1px solid #ddd;
          }
          
          .left-nav-bar .nav-item {
            padding: 10px 15px;
            text-decoration: none;
            color: #333;
            transition: background-color 0.3s ease;
          }
          
          .left-nav-bar .nav-item:hover {
            background-color: #e0e0e0;
          }
          
          .left-nav-bar .nav-item.active {
            background-color: #d0d0d0;
          }
          
          .left-nav-bar .nav-button {
            padding: 10px 15px;
            margin-top: 10px;
            background-color: #4caf50;
            color: white;
            border: none;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          
          .left-nav-bar .nav-button:hover {
            background-color: #3e8e41;
          }
    </style>
          
        <nav class="left-nav-bar">
          <button class="nav-button" id="all-shows-btn">All Shows</button>
          <button class="nav-button" id="favourites-btn">Favourites</button>
        </nav>
        `;
  }
  setupEventListeners() {
    const allShowsBtn = this.shadowRoot.getElementById("all-shows-btn");
    const favouritesBtn = this.shadowRoot.getElementById("favourites-btn");

    allShowsBtn.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("allShowsClick"));
    });

    favouritesBtn.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("favouritesClicked"));
    });
  }
}

customElements.define("left-nav-bar", LeftNavBar);
