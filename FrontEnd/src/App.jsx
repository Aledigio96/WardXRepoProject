import { BrowserRouter } from "react-router-dom";

import TopBar from "./components/TopBar";

import SezioneCentrale from "./components/SezioneCentrale";
import "./App.css";
import Footer from "./components/Footer";
import SezioneSpiegativa from "./components/SezioneSpiegativa";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="app-wrapper">
          <TopBar />
          <main className="main-content">
            <SezioneCentrale />
            <SezioneSpiegativa />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
