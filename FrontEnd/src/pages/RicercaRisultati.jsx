import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Image, Spinner, Button } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fillCart } from "../redux/actions/authActions"; // Assicurati del path corretto

function RisultatiRicerca() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query") || "";
  const [annunci, setAnnunci] = useState([]);
  const [utenti, setUtenti] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    async function fetchRisultati() {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3001/api/search?query=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error("Errore nella ricerca");
        const data = await res.json();
        setAnnunci(data.annunci || []);
        setUtenti(data.utenti || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (query.trim() !== "") {
      fetchRisultati();
    } else {
      setLoading(false);
    }
  }, [query]);

  const aggiungiAlCarrello = (prodotto) => {
    if (window.confirm("Vuoi aggiungere l'articolo al carrello?")) {
      dispatch(fillCart(prodotto));
    }
  };

  return (
    <Container className="my-5">
      <h2>
        Risultati per: <em>{query}</em>
      </h2>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <h4>Annunci</h4>
              {annunci.length === 0 ? (
                <p>Nessun annuncio trovato.</p>
              ) : (
                annunci.map((annuncio) => {
                  const isMyArticle = loggedInUser?.id?.toString() === annuncio?.seller?.id?.toString();

                  return (
                    <Card key={annuncio.id} className="mb-3 shadow-sm rounded-3 card-annuncio">
                      <Row className="g-0">
                        <Col md={4}>
                          <Card.Img
                            variant="top"
                            src={annuncio.image || "/default-image.jpg"}
                            alt={annuncio.titolo}
                            style={{ objectFit: "cover", height: "200px", width: "100%" }}
                          />
                        </Col>

                        <Col md={8}>
                          <Card.Body>
                            <Card.Title className="mb-2" style={{ color: "#9b59b6" }}>
                              {annuncio.titolo}
                            </Card.Title>

                            <Card.Text className="mb-1">
                              <strong>Categoria:</strong> {annuncio.categoriaPrincipale} / {annuncio.categoria}
                            </Card.Text>

                            <Card.Text className="mb-1">
                              <strong>Taglia:</strong> {annuncio.taglia}
                            </Card.Text>

                            <Card.Text className="mb-1">
                              <strong>Condizioni:</strong> {annuncio.condizioni}
                            </Card.Text>

                            <Card.Text className="mb-2">
                              <strong>Disponibilità:</strong>{" "}
                              <span style={{ color: annuncio.isAvailable ? "green" : "red" }}>{annuncio.isAvailable ? "Disponibile" : "Non disponibile"}</span>
                            </Card.Text>

                            <Card.Text className="mb-2" style={{ fontStyle: "italic" }}>
                              {annuncio.descrizione}
                            </Card.Text>
                          </Card.Body>

                          <Card.Footer className="d-flex justify-content-between align-items-center px-3 py-2">
                            <strong style={{ color: "#2c3e50" }}>{annuncio.prezzo.toFixed(2)} €</strong>

                            {isMyArticle ? (
                              <span style={{ color: "#9b59b6", fontWeight: "bold" }}>È un tuo articolo!</span>
                            ) : (
                              <Button
                                variant="success"
                                size="sm"
                                disabled={!annuncio.isAvailable}
                                onClick={() =>
                                  aggiungiAlCarrello({
                                    id: annuncio.id,
                                    titolo: annuncio.titolo,
                                    prezzo: annuncio.prezzo,
                                    taglia: annuncio.taglia,
                                    condizioni: annuncio.condizioni,
                                    categoriaPrincipale: annuncio.categoriaPrincipale,
                                    categoria: annuncio.categoria,
                                    image: annuncio.image,
                                  })
                                }
                              >
                                Acquista
                              </Button>
                            )}
                          </Card.Footer>
                        </Col>
                      </Row>
                    </Card>
                  );
                })
              )}
            </Col>

            <Col md={6}>
              <h4>Utenti</h4>
              {utenti.length === 0 ? (
                <p>Nessun utente trovato.</p>
              ) : (
                utenti.map((utente) => (
                  <Card key={utente.id} className="mb-3 d-flex flex-row align-items-center p-2 shadow-sm rounded-3">
                    <Image src={utente.avatarUrl || "/default-avatar.png"} roundedCircle width={50} height={50} className="me-3" alt={utente.username} />
                    <div>
                      <Card.Title className="mb-0">{utente.username}</Card.Title>
                      <small>
                        {utente.name} {utente.surname}
                      </small>
                      <div className="mt-2">
                        <Link to={`/utente/${utente.username}`} className="btn btn-link p-0">
                          Vai al profilo
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default RisultatiRicerca;
