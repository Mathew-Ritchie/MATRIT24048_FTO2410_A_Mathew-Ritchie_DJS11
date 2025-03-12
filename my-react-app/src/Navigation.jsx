import React from "react";
import "./navigation.css";

function Navigation() {
  return (
    <nav>
      <button id="all-shows-button" class="all-shows-button nav-btns">
        All Shows
      </button>
      <button id="favourite-shows-button" class="favourite-shows-button nav-btns">
        Favourites
      </button>
    </nav>
  );
}

export default Navigation;
