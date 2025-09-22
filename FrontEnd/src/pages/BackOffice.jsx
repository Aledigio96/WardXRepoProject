import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Backoffice = () => {
  return (
    <>
      <div>
        <h1>Backoffice Admin</h1>
        <p>Qui puoi gestire gli utenti e i contenuti del sito.</p>
      </div>
      <Button>
        <Link to="/visualizeusers" style={{ textDecoration: "none", color: "white" }}>
          Visualizza Utenti
        </Link>
      </Button>
      <Button>
        <Link to="/visualizeproducts" style={{ textDecoration: "none", color: "white" }}>
          Visualizza Annunci
        </Link>
      </Button>
    </>
  );
};

export default Backoffice;
