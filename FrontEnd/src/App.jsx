import { BrowserRouter, Routes, Route } from "react-router-dom";

import TopBar from "./components/TopBar";
import Footer from "./components/Footer";

import Home from "./pages/Home";

import "./App.css";
import Social from "./pages/Social";
import LoginPage from "./pages/LoginPage";
import Profilo from "./pages/Profilo";
import ScopriOra from "./pages/ScopriOra";
import RisultatiRicerca from "./pages/RicercaRisultati";

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <TopBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/social" element={<Social />} />
            <Route path="/iscriviti/login" element={<LoginPage />} />
            <Route path="/profilo" element={<Profilo />} />
            <Route path="/scopriora" element={<ScopriOra />} />
            <Route path="/risultati" element={<RisultatiRicerca />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
