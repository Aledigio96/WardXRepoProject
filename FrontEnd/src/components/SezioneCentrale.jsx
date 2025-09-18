import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FaMale, FaFemale, FaChild } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CarouselPrincipal from "./CarouselPrincipal";
import "../SezioneCentrale.css";
import { fillCart, loadAnnunci } from "../redux/actions/authActions";

function SezioneCentrale() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPerson, setSelectedPerson] = useState("");

  const dispatch = useDispatch();

  // Ottieni gli annunci dallo store Redux
  const { annunci, loading, error } = useSelector((state) => state.annunci);
  const user = useSelector((state) => state.auth.user); // Ottieni l'utente dallo store

  const categories = [
    { id: "tshirt", label: "T-SHIRT", icon: <FaMale color="#9b59b6" /> },
    { id: "giacche", label: "GIACCHE", icon: <FaFemale color="#9b59b6" /> },
    { id: "pantaloni", label: "PANTALONI", icon: <FaChild color="#9b59b6" /> },
    { id: "accessori", label: "ACCESSORI", icon: <FaMale color="#9b59b6" /> },
    { id: "scarpe", label: "SCARPE", icon: <FaFemale color="#9b59b6" /> },
    { id: "altro", label: "ALTRO", icon: <FaChild color="#9b59b6" /> },
  ];

  const peopleIcons = [
    { id: "uomo", icon: <FaMale size={48} color="#9b59b6" />, label: "Uomo" },
    { id: "donna", icon: <FaFemale size={48} color="#9b59b6" />, label: "Donna" },
    { id: "bambino", icon: <FaChild size={48} color="#9b59b6" />, label: "Bambino" },
  ];

  useEffect(() => {
    // Carica gli annunci al montaggio del componente
    dispatch(loadAnnunci());
  }, [dispatch]);

  const handleIconClick = (personId) => {
    setSelectedPerson(personId);
    setSelectedCategory("");
    setShowModal(true);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCategory("");
    setSelectedPerson("");
  };

  const aggiungiAlCarrello = (prodotto) => {
    if (window.confirm("Vuoi aggiungere l'articolo al carrello?")) {
      dispatch(fillCart(prodotto));
    }
  };

  if (loading) return <p>Caricamento in corso...</p>;
  if (error) return <p>Errore nel recupero degli annunci: {error}</p>;

  return (
    <>
      <div className="carousel-title-wrapper text-center my-4">
        <h1 className="street-title">
          WARD<span className="highlight">X</span>
        </h1>
        <p className="lead">Wear your vibes. Share with the community.</p>
        <div className="d-flex flex-wrap gap-3 justify-content-center mt-4">
          <Link to="/scopriora">
            <Button className="lentebutton">Scopri ora</Button>
          </Link>
          <Link to="/iscriviti/login">
            <Button variant="outline-secondary">Entra</Button>
          </Link>
        </div>
      </div>

      <div className="fullwidth-carousel-wrapper">
        <CarouselPrincipal />
      </div>

      <Container className="mt-5">
        <Row className="text-center mb-5 justify-content-center">
          {peopleIcons.map(({ id, icon, label }) => (
            <Col key={id} xs={4} sm={2} className="d-flex flex-column align-items-center" onClick={() => handleIconClick(id)} style={{ cursor: "pointer" }}>
              {icon}
              <small style={{ color: "#9b59b6" }}>{label}</small>
            </Col>
          ))}
        </Row>

        <Row>
          <h2 className="text-center mb-4" style={{ color: "#9b59b6" }}>
            Ultimi Annunci
          </h2>
          {annunci.map((annuncio) => {
            // Cerca la proprietà sellerId, sellerID o seller_id
            const sellerId = annuncio.sellerId ?? annuncio.sellerID ?? annuncio.seller_id ?? null;

            const userIdStr = user ? String(user.id) : null;
            const sellerIdStr = sellerId ? String(sellerId) : null;
            const isMyArticle = userIdStr && sellerIdStr && userIdStr === sellerIdStr;

            return (
              <Col key={annuncio.id} md={4} className="mb-4">
                <Card className="h-100 card-annuncio">
                  <Card.Img
                    variant="top"
                    src={annuncio.image || "/default-image.jpg"}
                    alt={annuncio.titolo}
                    style={{ objectFit: "cover", height: "200px", width: "100%" }}
                  />
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

                  <Card.Footer className="d-flex justify-content-between align-items-center">
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
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content-category">
            <h4 className="mb-3">Seleziona Categoria</h4>
            {selectedPerson && (
              <p>
                Hai selezionato: <strong>{selectedPerson.toUpperCase()}</strong>
              </p>
            )}
            <div className="d-flex flex-wrap justify-content-center gap-3">
              {categories.map(({ id, label, icon }) => (
                <Button key={id} variant={selectedCategory === id ? "warning" : "outline-secondary"} onClick={() => handleCategorySelect(id)}>
                  <span className="me-2">{icon}</span> {label}
                </Button>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="secondary" onClick={handleCloseModal}>
                Chiudi
              </Button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1050;
        }
        .modal-content-category {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          max-width: 500px;
          width: 90%;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </>
  );
}

export default SezioneCentrale;
