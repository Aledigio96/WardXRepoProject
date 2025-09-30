import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const rimuoviDalCarrello = (index) => ({
  type: "REMOVE_CART",
  payload: index,
});

function Carrello() {
  const { content, contoCart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser && parsedUser.id) {
        user = parsedUser;
      }
    }
  } catch (e) {
    console.error("Errore nel parsing dell'utente:", e);
  }

  // Effetto per resettare il carrello quando l'utente cambia
  useEffect(() => {
    if (user === null) {
      // Resetta il carrello solo quando l'utente è nullo (logout o cambio utente)
      dispatch({ type: "RESET_CART" });
    }
  }, [user, dispatch]);

  const calcolaTotale = () => contoCart.toFixed(2);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4" style={{ color: "#9b59b6" }}>
        Carrello
      </h2>

      {!user ? (
        <div className="text-center my-5">
          <p>Per salvare o acquistare articoli nel carrello, accedi o registrati.</p>
          <Link to="/iscriviti/login">
            <Button variant="primary">Accedi / Registrati</Button>
          </Link>
        </div>
      ) : content.length === 0 ? (
        <p className="text-center">Il carrello è vuoto.</p>
      ) : (
        <>
          <Row>
            {content.map(({ id, titolo, prezzo, taglia, condizioni, categoriaPrincipale, categoria, image, isAvailable = true, descrizione = "" }, index) => (
              <Col key={id || index} md={4} className="mb-4">
                <Card className="h-100 card-annuncio">
                  <Card.Img variant="top" src={image || "/default-image.jpg"} alt={titolo} style={{ objectFit: "cover", height: "200px", width: "100%" }} />
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
                    <Card.Text className="mb-2">
                      <strong>Disponibilità:</strong>{" "}
                      <span style={{ color: isAvailable ? "green" : "red" }}>{isAvailable ? "Disponibile" : "Non disponibile"}</span>
                    </Card.Text>
                    <Card.Text className="mb-2" style={{ fontStyle: "italic" }}>
                      {descrizione}
                    </Card.Text>
                  </Card.Body>

                  <Card.Footer className="d-flex justify-content-between align-items-center">
                    <strong style={{ color: "#2c3e50" }}>{prezzo.toFixed(2)} €</strong>
                    <Button variant="danger" size="sm" onClick={() => dispatch(rimuoviDalCarrello(index))}>
                      Rimuovi
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="d-flex justify-content-between align-items-center">
            <h4>Total: {calcolaTotale()} €</h4>
            <Link to="/checkout">
              <Button variant="success">Procedi al Checkout</Button>
            </Link>
          </div>
        </>
      )}
    </Container>
  );
}

export default Carrello;
