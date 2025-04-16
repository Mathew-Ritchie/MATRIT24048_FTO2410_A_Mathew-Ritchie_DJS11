import React from "react";
import GenreDropDown from "./SortingAndFiltering/GenreDropDown";
import SearchInput from "./SortingAndFiltering/SearchInput";
import SortingDropDown from "./SortingAndFiltering/SortingDropDown";
import "./main-sorting-headers.css";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import SortingModal from "./SortingAndFiltering/SortingModal";

export default function SortingHeader() {
  return (
    <nav className="show-nav">
      <div className="sorting-input-wrapper">
        <SearchInput />
        <GenreDropDown />
        <SortingDropDown />
        <button className="modal-close-button">Close</button>
      </div>
      <button class="sorting-button" id="hamburger">
        <HiAdjustmentsHorizontal />
      </button>
    </nav>
  );
}
