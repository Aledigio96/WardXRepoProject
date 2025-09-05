import { Container, Row, Col } from "react-bootstrap";
import { FaTshirt, FaRecycle, FaWallet, FaUsers } from "react-icons/fa";

function SezioneSpiegativa() {
  return (
    <section className="sezione-spiegativa py-5">
      <Container>
        <h2 className="text-center mb-4">Perché scegliere WardX?</h2>
        <p className="text-center mb-5 lead">
          Scopri come la nostra piattaforma ti permette di comprare e vendere vestiti usati con facilità, stile e sostenibilità.
        </p>

        <Row className="text-center">
          <Col md={3} className="mb-4">
            <FaTshirt size={50} color="#6a8eff" />
            <h5 className="mt-3">Moda di qualità</h5>
            <p>Vestiti selezionati, sempre aggiornati e di tendenza.</p>
          </Col>

          <Col md={3} className="mb-4">
            <FaRecycle size={50} color="#6a8eff" />
            <h5 className="mt-3">Sostenibilità</h5>
            <p>Riduci gli sprechi dando nuova vita ai capi usati.</p>
          </Col>

          <Col md={3} className="mb-4">
            <FaWallet size={50} color="#6a8eff" />
            <h5 className="mt-3">Prezzi accessibili</h5>
            <p>Risparmia senza rinunciare allo stile.</p>
          </Col>

          <Col md={3} className="mb-4">
            <FaUsers size={50} color="#6a8eff" />
            <h5 className="mt-3">Community attiva</h5>
            <p>Condividi, compra e vendi con appassionati come te.</p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default SezioneSpiegativa;
