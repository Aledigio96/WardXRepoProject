import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Spinner, Alert, Image } from "react-bootstrap";

function ProfiloPubblico() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [annunci, setAnnunci] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserAndAnnunci = async () => {
      setLoading(true);
      try {
        const resUser = await fetch(`http://localhost:3001/api/users/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!resUser.ok) throw new Error("Utente non trovato");
        const userData = await resUser.json();
        setUser(userData);

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

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

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
            {user.bio && <Card.Text className="mb-0">{user.bio}</Card.Text>}
          </div>
        </Card.Body>
      </Card>

      <Row>
        <Col>
          <h4>Annunci di {user.username}</h4>
          {annunci.length === 0 ? (
            <p>Nessun annuncio pubblicato.</p>
          ) : (
            annunci.map(({ id, titolo, categoriaPrincipale, categoria, taglia, condizioni, isAvailable, descrizione, prezzo, createdAt, image }) => (
              <Card key={id} className="mb-3 card-annuncio d-flex flex-column h-100">
                <Card.Img variant="top" src={image || "/default-image.jpg"} alt={titolo} style={{ objectFit: "cover", height: "200px", width: "100%" }} />

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

                  <Card.Text className="mb-1">
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
                </Card.Footer>
              </Card>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ProfiloPubblico;
