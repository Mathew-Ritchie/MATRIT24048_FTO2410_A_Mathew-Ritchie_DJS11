import React from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router";
import "./App.css";
import Layout from "./components/Layout";
import MainContent from "./pages/MainContent";
import IndividualShowPage from "./pages/IndividualShowPage.jsx";
import SeasonDetailPage from "./pages/SeasonDetailPage.jsx";
import FavouritesPage from "./pages/FavouritesPage.jsx";
import AudioProvider from "./AudioContext/AudioContext.jsx";
import { ShowIdContext } from "./AudioContext/ShowIdContext.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainContent />} />
          <Route
            path="favourites"
            element={
              <ShowIdContext.Provider value={null}>
                <AudioProvider>
                  <FavouritesPage />
                </AudioProvider>
              </ShowIdContext.Provider>
            }
          />
          <Route path="show/:id" element={<ShowWithAudioProvider />}>
            <Route path=":seasonNumber" element={<SeasonDetailPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function ShowWithAudioProvider() {
  const { id } = useParams();
  return (
    <ShowIdContext.Provider value={id}>
      <AudioProvider>
        <IndividualShowPage />
      </AudioProvider>
    </ShowIdContext.Provider>
  );
}

export default App;
