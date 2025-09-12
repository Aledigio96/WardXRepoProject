import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ScopriOra = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    console.log("User Token:", userToken);

    if (userToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleButtonClick = () => {
    console.log("Is Logged In:", isLoggedIn);
    if (isLoggedIn) {
      navigate("/profilo");
    } else {
      navigate("/iscriviti/login");
    }
  };

  return (
    <div>
      <Container fluid className="hero-section pb-3 pt-3 text-white" style={{ backgroundColor: "#9b59b6" }}>
        <h1 className="display-3">WardX</h1>

        <p className="pwhite">Wear Your Vibes, Share With the Community</p>
      </Container>

      <Container id="features" className="my-5">
        <h2 className="text-center mb-4">Le Funzionalità di WardX</h2>
        <Row>
          <Col md={4}>
            <Card className="text-center">
              <Card.Body>
                <i className="fas fa-user fa-3x mb-3"></i>
                <Card.Title>Profilo Utente</Card.Title>
                <Card.Text>Crea il tuo profilo, pubblica annunci e interagisci con la community. Vendi o compra i tuoi capi preferiti.</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="text-center">
              <Card.Body>
                <i className="fas fa-home fa-3x mb-3"></i>
                <Card.Title>Home</Card.Title>
                <Card.Text>Esplora una selezione di capi in vendita e trova ispirazioni per nuovi outfit. Ti bastano pochi click!</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="text-center">
              <Card.Body>
                <i className="fas fa-comments fa-3x mb-3"></i>
                <Card.Title>Social</Card.Title>
                <Card.Text>Pubblica post, commenta e interagisci con altri utenti. Crea tendenze e scopri nuovi stili!</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container fluid className="community-section bg-light py-5">
        <Row className="align-items-center">
          <Col md={6}>
            <h2 className="text-center mb-4">La Nostra Community & Ecosostenibilità</h2>
            <p className="text-center">
              WardX è una piattaforma che promuove il riuso dei vestiti e l’adozione di uno stile di vita più sostenibile. Partecipa alla nostra community per
              scoprire come possiamo fare la differenza insieme.
            </p>
          </Col>
          <Col md={6}>
            <img src="https://images.pexels.com/photos/1230157/pexels-photo-1230157.jpeg" alt="Community" className="img-fluid" />
          </Col>
        </Row>
      </Container>

      <Container className="text-center my-5">
        <h3>Pronto a fare parte di WardX?</h3>
        <Button variant="primary" size="lg" onClick={handleButtonClick}>
          Registrati Ora
        </Button>
      </Container>
    </div>
  );
};

export default ScopriOra;
