import { useState } from "react";
import { Card, Image, Spinner, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"; // Usa Redux per ottenere lo stato e dispatch
import { uploadAvatar } from "../redux/actions/authActions";

function UserDetails({ handleLogout }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Prendi l'oggetto user dallo stato Redux
  const token = useSelector((state) => state.auth.token); // Ottieni il token dallo stato Redux
  const avatarUrl = user?.avatarUrl; // Se l'utente esiste, prendi l'avatarUrl

  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Mostra un'anteprima dell'immagine
    setPreview(URL.createObjectURL(file));
    setUploading(true);

    // Dispatch dell'azione per caricare l'avatar
    await dispatch(uploadAvatar(file, token));

    setUploading(false);
  };

  return (
    <Card className="w-100 p-4 mb-4">
      <Row className="align-items-center">
        <Col md={3} className="text-center">
          <Image
            src={preview || avatarUrl || "https://placehold.co/150x150"} // Usa l'avatarUrl aggiornato
            roundedCircle
            width={150}
            height={150}
            style={{ objectFit: "cover", marginBottom: "1rem" }}
          />

          <Form.Group controlId="formFile" className="text-center">
            <Form.Label>Carica nuova foto</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading} // Disabilita il controllo durante il caricamento
            />
            {uploading && (
              <div className="mt-2">
                <Spinner animation="border" size="sm" /> Caricamento...
              </div>
            )}
          </Form.Group>
        </Col>

        <Col md={6}>
          <h5 className="mb-3">Informazioni profilo</h5>
          <p>
            <strong>Nome:</strong> {user.name}
          </p>
          <p>
            <strong>Cognome:</strong> {user.surname}
          </p>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Provincia:</strong> {user.provinciaSigla || "N/A"}
          </p>
        </Col>

        <Col md={3} className="text-center">
          <Button variant="danger" onClick={handleLogout} className="mt-3 w-100">
            Logout
          </Button>
        </Col>
      </Row>
    </Card>
  );
}

export default UserDetails;
