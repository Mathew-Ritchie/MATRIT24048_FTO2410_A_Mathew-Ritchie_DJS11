import React from "react";
import { ReactDOM } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import Layout from "./components/Layout";
import MainContent from "./pages/MainContent";
import IndividualShowPage from "./pages/IndividualShowPage.jsx";
import SeasonDetailPage from "./pages/SeasonDetailPage.jsx";
import FavouritesPage from "./pages/FavouritesPage.jsx";
import { AudioProvider } from "./AudioContext/AudioContext.jsx";

function App() {
  return (
    <BrowserRouter>
      <AudioProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainContent />} />
            <Route path="favourites" element={<FavouritesPage />} />
            <Route path="show/:id" element={<IndividualShowPage />}>
              <Route path=":seasonNumber" element={<SeasonDetailPage />} />
            </Route>
          </Route>
        </Routes>
      </AudioProvider>
    </BrowserRouter>
  );
}

export default App;
