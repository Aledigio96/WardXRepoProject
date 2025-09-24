import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Social from "./pages/Social";
import LoginPage from "./pages/LoginPage";
import Profilo from "./pages/Profilo";
import ScopriOra from "./pages/ScopriOra";
import RisultatiRicerca from "./pages/RicercaRisultati";
import ProfiloPubblico from "./pages/ProfiloPubblico";
import Carrello from "./pages/Carrello";
import Backoffice from "./pages/BackOffice";
import VisualizeUsers from "./components/VisualizeUsers";
import VisualizeProducts from "./components/VisualizerProducts";
import VisualizePosts from "./components/VisualizePost";
import VisualizeComments from "./components/VisualizeComment";

import { setUserFromStorage } from "./redux/actions/authActions";
import "./App.css";
import Unauthorized from "./components/Unauthorized";
import ModificaAnnuncio from "./pages/ModificaAnnuncio";
import ModificaProfilo from "./pages/ModificaProfilo";

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
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/modifica-annuncio/:id" element={<ModificaAnnuncio />} />
            <Route path="/modifica-profilo" element={<ModificaProfilo />} />

            <Route
              path="/backoffice"
              element={
                <ProtectedRoute>
                  <Backoffice />
                </ProtectedRoute>
              }
            />
            <Route
              path="/visualizeusers"
              element={
                <ProtectedRoute>
                  <VisualizeUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/visualizeproducts"
              element={
                <ProtectedRoute>
                  <VisualizeProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/visualizepost"
              element={
                <ProtectedRoute>
                  <VisualizePosts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/visualizecomment"
              element={
                <ProtectedRoute>
                  <VisualizeComments />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
