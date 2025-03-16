import "./App.css";
import Header from "./Header";

import MainBody from "./MainContent";
import LeftNavBar from "./LeftNavBar";
function App() {
  return (
    <div className="app-container">
      <LeftNavBar />
      <div className="main-content-area">
        <Header />
        <MainBody />
      </div>
    </div>
  );
}

export default App;
