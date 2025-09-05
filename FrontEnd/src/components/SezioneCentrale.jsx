import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FaTshirt, FaShoePrints, FaUserTie } from "react-icons/fa";
import { GiClothes, GiWatch } from "react-icons/gi";

import CarouselPrincipal from "./CarouselPrincipal";
import "../SezioneCentrale.css";

function SezioneCentrale() {
  const annunci = [
    { id: 1, titolo: "Giacca vintage", descrizione: "Usata, ottime condizioni", prezzo: "€45" },
    { id: 2, titolo: "Sneakers limited", descrizione: "Taglia 42, quasi nuove", prezzo: "€80" },
    { id: 3, titolo: "T-shirt grafica", descrizione: "Cotone 100%, usata poco", prezzo: "€15" },
  ];

  return (
    <section className="hero-streetwear">
      <Container>
        <Row className="text-center mb-5 categorie-icone">
          <Col xs={4} sm={2} className="d-flex flex-column align-items-center categoria-item">
            <FaTshirt size={32} />
            <small>T-Shirt</small>
          </Col>
          <Col xs={4} sm={2} className="d-flex flex-column align-items-center categoria-item">
            <FaUserTie size={32} />
            <small>Giacche</small>
          </Col>
          <Col xs={4} sm={2} className="d-flex flex-column align-items-center categoria-item">
            <GiClothes size={32} />
            <small>Pantaloni</small>
          </Col>
          <Col xs={4} sm={2} className="d-flex flex-column align-items-center categoria-item">
            <GiWatch size={32} />
            <small>Accessori</small>
          </Col>
          <Col xs={4} sm={2} className="d-flex flex-column align-items-center categoria-item">
            <FaShoePrints size={32} />
            <small>Scarpe</small>
          </Col>
          <Col xs={4} sm={2} className="d-flex flex-column align-items-center categoria-item">
            <GiClothes size={32} />
            <small>Altro</small>
          </Col>
        </Row>

        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start">
            <h1 className="street-title">
              WARD<span className="highlight">X</span>
            </h1>
            <p className="lead">Wear your vibes. Share with the community.</p>
            <div className="d-flex flex-wrap gap-3 justify-content-center mt-4">
              <Button className="lentebutton">Scopri ora</Button>
              <Button className="btn btn-outline-secondary">Entra</Button>
            </div>
          </Col>
          <Col md={6}>
            <CarouselPrincipal />
          </Col>
        </Row>

        <Row className="mt-5">
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
    </section>
  );
}

export default SezioneCentrale;
