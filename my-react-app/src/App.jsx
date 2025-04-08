import React from "react";
import { ReactDOM } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./App.css";
import Header from "./Header";

import MainBody from "./MainContent";
import LeftNavBar from "./LeftNavBar";
function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <LeftNavBar />
        <div className="main-content-area">
          <Header />
          <MainBody />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
