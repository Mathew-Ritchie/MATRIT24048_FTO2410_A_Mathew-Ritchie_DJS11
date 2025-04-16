import React, { useState } from "react";
import GenreDropDown from "./SortingAndFiltering/GenreDropDown";
import SearchInput from "./SortingAndFiltering/SearchInput";
import SortingDropDown from "./SortingAndFiltering/SortingDropDown";
import "./main-sorting-headers.css";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";

export default function SortingHeader() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  return (
    <nav className="show-nav">
      <div className="sorting-input-wrapper" style={{ display: isModalVisible ? "flex" : "none" }}>
        <SearchInput />
        <GenreDropDown />
        <SortingDropDown />
        <button className="modal-close-button" onClick={hideModal}>
          Close
        </button>
      </div>
      <button className="open-sorting-button" id="hamburger" onClick={toggleModal}>
        <HiAdjustmentsHorizontal />
      </button>
    </nav>
  );
}
