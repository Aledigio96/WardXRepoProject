import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FaMale, FaFemale, FaChild } from "react-icons/fa";
import CarouselPrincipal from "./CarouselPrincipal";
import "../SezioneCentrale.css";
import { useState } from "react";

function SezioneCentrale() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPerson, setSelectedPerson] = useState("");

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

  const annunci = [
    { id: 1, titolo: "Giacca vintage", descrizione: "Usata, ottime condizioni", prezzo: "€45" },
    { id: 2, titolo: "Sneakers limited", descrizione: "Taglia 42, quasi nuove", prezzo: "€80" },
    { id: 3, titolo: "T-shirt grafica", descrizione: "Cotone 100%, usata poco", prezzo: "€15" },
  ];

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

  return (
    <>
      <div className="carousel-title-wrapper text-center my-4">
        <h1 className="street-title">
          WARD<span className="highlight">X</span>
        </h1>
        <p className="lead">Wear your vibes. Share with the community.</p>
        <div className="d-flex flex-wrap gap-3 justify-content-center mt-4">
          <Button className="lentebutton">Scopri ora</Button>
          <Button variant="outline-secondary">Entra</Button>
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
          {annunci.map(({ id, titolo, descrizione, prezzo }) => (
            <Col key={id} md={4} className="mb-4">
              <Card className="h-100 card-annuncio">
                <Card.Body>
                  <Card.Title>{titolo}</Card.Title>
                  <Card.Text>{descrizione}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">{prezzo}</small>
                </Card.Footer>
              </Card>
            </Col>
          ))}
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

      <style jsx>{`
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
