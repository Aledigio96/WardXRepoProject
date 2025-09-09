import { useState } from "react";
import { Form, Button, Alert, Spinner, Modal, Row, Col } from "react-bootstrap";

function CreatePostForm({ onPostCreated }) {
  const [show, setShow] = useState(false);

  const [titolo, setTitolo] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [prezzo, setPrezzo] = useState("");
  const [taglia, setTaglia] = useState("");
  const [condizioni, setCondizioni] = useState("");
  const [available, setAvailable] = useState(true);
  const [categoriaPrincipale, setCategoriaPrincipale] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imageUrls, setImageUrls] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleImageUrlChange = (index, value) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
  };

  const addImageUrlField = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const resetForm = () => {
    setTitolo("");
    setDescrizione("");
    setPrezzo("");
    setTaglia("");
    setCondizioni("");
    setAvailable(true);
    setCategoriaPrincipale("");
    setCategoria("");
    setImageUrls([""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Devi essere autenticato");
      setLoading(false);
      return;
    }

    const dto = {
      titolo,
      descrizione,
      prezzo: parseFloat(prezzo),
      taglia,
      condizioni: condizioni || null,
      isAvailable: available,
      categoriaPrincipale: categoriaPrincipale || null,
      categoria: categoria || null,
      imageUrls: imageUrls.filter((url) => url.trim() !== ""),
    };

    try {
      const res = await fetch("http://localhost:3001/api/annunci", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dto),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Errore nella creazione dell'annuncio");
      }

      const createdPost = await res.json();
      setSuccess("Annuncio creato con successo!");
      resetForm();

      if (onPostCreated) onPostCreated(createdPost);

      setTimeout(() => {
        setShow(false);
        setSuccess("");
      }, 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        Crea nuovo annuncio
      </Button>

      <Modal show={show} onHide={() => setShow(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Crea un nuovo annuncio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="titolo">
                  <Form.Label>Titolo *</Form.Label>
                  <Form.Control type="text" value={titolo} onChange={(e) => setTitolo(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="prezzo">
                  <Form.Label>Prezzo *</Form.Label>
                  <Form.Control type="number" step="0.01" value={prezzo} onChange={(e) => setPrezzo(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="taglia">
                  <Form.Label>Taglia *</Form.Label>
                  <Form.Control type="text" value={taglia} onChange={(e) => setTaglia(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="condizioni">
                  <Form.Label>Condizioni *</Form.Label>
                  <Form.Select value={condizioni} onChange={(e) => setCondizioni(e.target.value)} required>
                    <option value="">Seleziona</option>
                    <option value="NUOVO">Nuovo</option>
                    <option value="USATO_BUONO">Usato buono</option>
                    <option value="USATO_ACCETTABILE">Usato accettabile</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="descrizione">
                  <Form.Label>Descrizione *</Form.Label>
                  <Form.Control as="textarea" rows={8} value={descrizione} onChange={(e) => setDescrizione(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="available">
                  <Form.Check type="checkbox" label="Disponibile" checked={available} onChange={(e) => setAvailable(e.target.checked)} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="categoriaPrincipale">
                  <Form.Label>Categoria Principale *</Form.Label>
                  <Form.Select value={categoriaPrincipale} onChange={(e) => setCategoriaPrincipale(e.target.value)} required>
                    <option value="">Seleziona</option>
                    <option value="UOMO">Uomo</option>
                    <option value="DONNA">Donna</option>
                    <option value="BAMBINO">Bambino</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="categoria">
                  <Form.Label>Categoria *</Form.Label>
                  <Form.Select value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
                    <option value="">Seleziona</option>
                    <option value="TSHIRT">T-Shirt</option>
                    <option value="GIACCHE">Giacche</option>
                    <option value="PANTALONI">Pantaloni</option>
                    <option value="ACCESSORI">Accessori</option>
                    <option value="SCARPE">Scarpe</option>
                    <option value="ALTRO">Altro</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>URL Immagini *</Form.Label>
              {imageUrls.map((url, index) => (
                <Form.Control
                  key={index}
                  type="text"
                  placeholder={`URL immagine ${index + 1}`}
                  value={url}
                  onChange={(e) => handleImageUrlChange(index, e.target.value)}
                  className="mb-2"
                  required
                />
              ))}
              <Button variant="outline-secondary" onClick={addImageUrlField} disabled={loading}>
                + Aggiungi un'altra immagine
              </Button>
            </Form.Group>

            <div className="d-flex justify-content-end mt-4">
              <Button variant="secondary" onClick={() => setShow(false)} className="me-2" disabled={loading}>
                Annulla
              </Button>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" /> Caricamento...
                  </>
                ) : (
                  "Crea Annuncio"
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreatePostForm;
