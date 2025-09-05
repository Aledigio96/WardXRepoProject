import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 py-4">
      <Container>
        <Row>
          <Col md={4}>
            <div className="d-flex flex-column align-items-center">
              <h5>Chi siamo</h5>
              <p>Informazioni sulla nostra azienda.</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="d-flex flex-column align-items-center">
              <h5 className="mb-3">Link utili</h5>
              <ul className="list-unstyled d-flex gap-3 m-0 p-0">
                <li>
                  <a href="#" className="text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    Servizi
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    Contatti
                  </a>
                </li>
              </ul>
            </div>
          </Col>
          <Col md={4}>
            <div className="d-flex flex-column align-items-center">
              <h5>Contattaci</h5>
              <p>
                Email: info@azienda.com
                <br />
                Telefono: +39 123 456 7890
              </p>
            </div>
          </Col>
        </Row>
        <hr className="border-light pt-0 mt-0" />
        <p className="text-center mb-0">&copy; {new Date().getFullYear()} WardX. Tutti i diritti riservati.</p>
      </Container>
    </footer>
  );
};

export default Footer;
