import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Spinner, Alert, Container } from "react-bootstrap";
import { useSelector } from "react-redux";

function ModificaAnnuncio() {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [formData, setFormData] = useState({
    titolo: "",
    descrizione: "",
    prezzo: "",
    taglia: "",
    condizioni: "",
    isAvailable: true,
    categoriaPrincipale: "",
    categoria: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // 🔄 Carica i dati esistenti dell'annuncio
  useEffect(() => {
    if (!isAuthenticated || !token) {
      setError("Utente non autenticato.");
      setLoading(false);
      return;
    }

    const fetchAnnuncio = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/annunci/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Errore nel recupero dei dati");

        const data = await response.json();

        // ⚠️ Adatta i nomi dei campi se necessario
        setFormData({
          titolo: data.titolo || "",
          descrizione: data.descrizione || "",
          prezzo: data.prezzo || "",
          taglia: data.taglia || "",
          condizioni: data.condizioni || "",
          isAvailable: data.isAvailable || false,
          categoriaPrincipale: data.categoriaPrincipale || "",
          categoria: data.categoria || "",
        });

        if (data.imageUrl) setCurrentImageUrl(data.imageUrl);
      } catch (err) {
        console.error(err);
        setError("Errore nel caricamento dell'annuncio.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnuncio();
  }, [id, token, isAuthenticated]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token || !isAuthenticated) {
      alert("Utente non autenticato.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const dtoBlob = new Blob([JSON.stringify(formData)], {
        type: "application/json",
      });

      const form = new FormData();
      form.append("dto", dtoBlob);
      if (imageFile) {
        form.append("image", imageFile);
      }

      const response = await fetch(`http://localhost:3001/api/annunci/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      if (!response.ok) throw new Error("Errore durante il salvataggio.");

      alert("Annuncio aggiornato con successo!");
      navigate("/profilo");
    } catch (err) {
      console.error(err);
      setError("Errore durante il salvataggio.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner animation="border" variant="primary" />;

  return (
    <Container style={{ maxWidth: "600px" }} className="mt-4">
      <h2 className="mb-4">Modifica Annuncio</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="titolo" className="mb-3">
          <Form.Label>Titolo</Form.Label>
          <Form.Control type="text" name="titolo" value={formData.titolo} onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="descrizione" className="mb-3">
          <Form.Label>Descrizione</Form.Label>
          <Form.Control as="textarea" name="descrizione" rows={4} value={formData.descrizione} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="prezzo" className="mb-3">
          <Form.Label>Prezzo (€)</Form.Label>
          <Form.Control type="number" step="0.01" name="prezzo" value={formData.prezzo} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="taglia" className="mb-3">
          <Form.Label>Taglia</Form.Label>
          <Form.Control type="text" name="taglia" value={formData.taglia} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="condizioni" className="mb-3">
          <Form.Label>Condizioni</Form.Label>
          <Form.Control type="text" name="condizioni" value={formData.condizioni} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="isAvailable" className="mb-3">
          <Form.Check type="checkbox" label="Disponibile" name="isAvailable" checked={formData.isAvailable} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="categoriaPrincipale" className="mb-3">
          <Form.Label>Categoria Principale</Form.Label>
          <Form.Control type="text" name="categoriaPrincipale" value={formData.categoriaPrincipale} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="categoria" className="mb-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Control type="text" name="categoria" value={formData.categoria} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="image" className="mb-3">
          <Form.Label>Immagine (opzionale)</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
          {currentImageUrl && <img src={currentImageUrl} alt="Anteprima" style={{ marginTop: "10px", maxWidth: "100%" }} />}
        </Form.Group>

        <Button variant="primary" type="submit" disabled={saving}>
          {saving ? "Salvataggio in corso..." : "Salva modifiche"}
        </Button>
      </Form>
    </Container>
  );
}

export default ModificaAnnuncio;
