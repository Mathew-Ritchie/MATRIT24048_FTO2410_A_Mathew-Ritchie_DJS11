import React from "react";
import { ReactDOM } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import Layout from "./components/Layout";
import MainContent from "./pages/MainContent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainContent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
