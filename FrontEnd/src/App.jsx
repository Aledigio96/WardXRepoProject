import { BrowserRouter, Routes, Route } from "react-router-dom";

import TopBar from "./components/TopBar";
import Footer from "./components/Footer";

import Home from "./pages/Home";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <TopBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
