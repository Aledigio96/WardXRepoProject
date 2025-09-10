import { Row, Col, Card } from "react-bootstrap";

function UserPosts({ posts }) {
  if (!posts || posts.length === 0) return <p>Nessun annuncio pubblicato.</p>;

  return (
    <>
      <h4 className="mb-4">I tuoi annunci</h4>
      <Row>
        {posts.map(({ id, titolo, descrizione, prezzo, taglia, condizioni, isAvailable, categoriaPrincipale, categoria, imageUrls, createdAt }) => (
          <Col key={id} md={4} sm={6} xs={12} className="mb-4">
            <Card className="h-100 card-annuncio">
              {imageUrls && imageUrls.length > 0 && <Card.Img variant="top" src={imageUrls[0]} alt={titolo} style={{ objectFit: "cover", height: "180px" }} />}

              <Card.Body>
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

              <Card.Footer>
                <strong style={{ color: "#2c3e50" }}>{prezzo != null ? `${prezzo.toFixed(2)} €` : "Prezzo non disponibile"}</strong>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default UserPosts;
