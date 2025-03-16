import React from "react";
import "./MainContent.css";

const MainContent = ({ children }) => {
  return (
    <main className="main-content">
      {children}
      <h1>Hello Everyone!</h1>
      <p>What are you up to today?</p>
    </main>
  );
};

export default MainContent;
