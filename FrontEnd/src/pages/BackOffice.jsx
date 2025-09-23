import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Backoffice = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1>Backoffice Admin</h1>
        <p>Qui puoi gestire gli utenti e i contenuti del sito.</p>
      </div>

      <div className="d-flex justify-content-center gap-3 flex-wrap">
        <Button as={Link} to="/visualizeusers" variant="primary">
          Visualizza Utenti
        </Button>
        <Button as={Link} to="/visualizeproducts" variant="primary">
          Visualizza Annunci
        </Button>
        <Button as={Link} to="/visualizepost" variant="primary">
          Visualizza Post
        </Button>
        <Button as={Link} to="/visualizecomment" variant="primary">
          Visualizza Commenti
        </Button>
      </div>
    </div>
  );
};

export default Backoffice;
