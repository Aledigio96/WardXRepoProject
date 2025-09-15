import { useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";

function UserPosts({ posts, onDeleteSuccess }) {
  const [loadingId, setLoadingId] = useState(null);

  const token = localStorage.getItem("token");

  const handleDelete = async (id) => {
    if (!token) {
      alert("Utente non autenticato. Effettua il login.");
      return;
    }

    const conferma = window.confirm("Sei sicuro di voler eliminare questo annuncio?");
    if (!conferma) return;

    try {
      setLoadingId(id);

      const response = await fetch(`http://localhost:3001/api/annunci/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Errore DELETE:", text);
        throw new Error("Errore durante l'eliminazione");
      }

      alert("Annuncio eliminato con successo!");
      if (onDeleteSuccess) onDeleteSuccess(id);
    } catch (error) {
      console.error("Errore eliminazione:", error);
      alert("Errore durante l'eliminazione dell'annuncio.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleEdit = (id) => {
    alert(`TODO: creare funzionalità di modifica per l'annuncio con ID: ${id}`);
  };

  if (!posts || posts.length === 0) return <p>Nessun annuncio pubblicato.</p>;

  return (
    <>
      <h4 className="mb-4">I tuoi annunci</h4>
      <Row>
        {posts.map(({ id, titolo, descrizione, prezzo, taglia, condizioni, isAvailable, categoriaPrincipale, categoria, imageUrls, createdAt }) => (
          <Col key={id} md={4} sm={6} xs={12} className="mb-4">
            <Card className="h-100 card-annuncio d-flex flex-column">
              {imageUrls?.length > 0 && <Card.Img variant="top" src={imageUrls[0]} alt={titolo} style={{ objectFit: "cover", height: "180px" }} />}

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
                <div className="d-flex gap-2">
                  <Button size="sm" variant="outline-secondary" onClick={() => handleEdit(id)}>
                    Modifica
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(id)} disabled={loadingId === id}>
                    {loadingId === id ? "..." : "Elimina"}
                  </Button>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default UserPosts;
