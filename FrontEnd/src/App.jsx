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
import ProfiloPubblico from "./pages/ProfiloPubblico";
import Carrello from "./pages/Carrello";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserFromStorage } from "./redux/actions/authActions";
import Backoffice from "./pages/BackOffice";
import VisualizeUsers from "./components/VisualizeUsers";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      dispatch(setUserFromStorage(JSON.parse(user), token));
    }
  }, [dispatch]);
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
            <Route path="/utente/:username" element={<ProfiloPubblico />} />
            <Route path="/carrello" element={<Carrello />} />
            <Route path="/backoffice" element={<Backoffice />} />
            <Route path="/visualizeusers" element={<VisualizeUsers />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
