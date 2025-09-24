import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Spinner, Alert, Image, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fillCart } from "../redux/actions/authActions"; // Assicurati che il path sia corretto

function ProfiloPubblico() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [annunci, setAnnunci] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchUserAndAnnunci = async () => {
      setLoading(true);
      try {
        // Fetch user
        const resUser = await fetch(`http://localhost:3001/api/users/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!resUser.ok) throw new Error("Utente non trovato");
        const userData = await resUser.json();
        setUser(userData);

        // Fetch user's announcements
        const resAnnunci = await fetch(`http://localhost:3001/api/annunci/user/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!resAnnunci.ok) throw new Error("Errore nel caricamento degli annunci");
        const annunciData = await resAnnunci.json();
        setAnnunci(annunciData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndAnnunci();
  }, [username, token]);

  const aggiungiAlCarrello = (prodotto) => {
    if (window.confirm("Vuoi aggiungere l'articolo al carrello?")) {
      dispatch(fillCart(prodotto));
    }
  };

  // Loading state
  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Card className="mb-4 shadow-sm">
        <Card.Body className="d-flex align-items-center">
          <Image src={user.avatarUrl || "/default-avatar.png"} roundedCircle width={80} height={80} className="me-4" alt={user.username} />
          <div>
            <Card.Title className="mb-0">{user.username}</Card.Title>
            {user.bio && <Card.Text className="mb-1">{user.bio}</Card.Text>}
            {user.provinciaSigla && (
              <Card.Text className="text-muted mb-0">
                <small>Provincia: {user.provinciaSigla}</small>
              </Card.Text>
            )}
          </div>
        </Card.Body>
      </Card>

      <h4 className="mb-4">Annunci di {user.username}</h4>
      <Row>
        {annunci.length === 0 ? (
          <Col>
            <p>Nessun annuncio pubblicato.</p>
          </Col>
        ) : (
          annunci.map(({ id, titolo, categoriaPrincipale, categoria, taglia, condizioni, isAvailable, descrizione, prezzo, createdAt, image }) => {
            const isMyArticle = loggedInUser?.id?.toString() === user?.id?.toString();

            return (
              <Col key={id} lg={4} md={6} sm={12} className="mb-4">
                <Card className="h-100 card-annuncio d-flex flex-column">
                  {image && <Card.Img variant="top" src={image} alt={titolo} style={{ objectFit: "cover", height: "200px", width: "100%" }} />}

                  <Card.Body className="flex-grow-1">
                    <Card.Title className="mb-2" style={{ color: "#9b59b6" }}>
                      {titolo}
                    </Card.Title>

                    <Card.Text className="mb-1">
                      <strong>Categoria:</strong> {categoriaPrincipale} / {categoria}
                    </Card.Text>
                    <Card.Text className="mb-1">
                      <strong>Taglia:</strong> {taglia}
                    </Card.Text>
                    <Card.Text className="mb-1">
                      <strong>Condizioni:</strong> {condizioni}
                    </Card.Text>
                    <Card.Text className="mb-2">
                      <strong>Disponibilità:</strong>{" "}
                      <span style={{ color: isAvailable ? "green" : "red" }}>{isAvailable ? "Disponibile" : "Non disponibile"}</span>
                    </Card.Text>
                    <Card.Text className="mb-2" style={{ fontStyle: "italic" }}>
                      {descrizione}
                    </Card.Text>
                    {createdAt && <small className="text-muted">Pubblicato il: {new Date(createdAt).toLocaleDateString()}</small>}
                  </Card.Body>

                  <Card.Footer className="d-flex justify-content-between align-items-center">
                    <strong style={{ color: "#2c3e50" }}>{prezzo != null ? `${prezzo.toFixed(2)} €` : "Prezzo non disponibile"}</strong>

                    {isMyArticle ? (
                      <span style={{ color: "#9b59b6", fontWeight: "bold" }}>È un tuo articolo!</span>
                    ) : (
                      <Button
                        variant="success"
                        size="sm"
                        disabled={!isAvailable}
                        onClick={() =>
                          aggiungiAlCarrello({
                            id,
                            titolo,
                            prezzo,
                            taglia,
                            condizioni,
                            categoriaPrincipale,
                            categoria,
                            image,
                          })
                        }
                      >
                        Acquista
                      </Button>
                    )}
                  </Card.Footer>
                </Card>
              </Col>
            );
          })
        )}
      </Row>
    </Container>
  );
}

export default ProfiloPubblico;
