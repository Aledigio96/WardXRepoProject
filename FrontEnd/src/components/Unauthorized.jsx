import React from "react";
import { Link } from "react-router-dom";

import "../style/Unauthorized.css";

const Unauthorized = () => {
  return (
    <div className="unauthorized-container">
      <h1>🚫 Accesso Negato</h1>
      <p>Non hai i permessi necessari per accedere a questa pagina.</p>
      <Link to="/" className="btn-go-home">
        Torna alla Home
      </Link>
    </div>
  );
};

export default Unauthorized;
