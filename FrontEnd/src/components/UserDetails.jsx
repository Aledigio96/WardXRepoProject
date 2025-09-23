import { useState } from "react";
import { Card, Image, Spinner, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { uploadAvatar } from "../redux/actions/authActions";

function UserDetails({ handleLogout }) {
  const dispatch = useDispatch();

  // Stato globale da Redux
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  // Stato locale
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    await dispatch(uploadAvatar(file, token));

    setUploading(false);
    setPreview(null); // Reset preview per usare immagine aggiornata dal Redux
  };

  const avatarSrc = preview || user?.avatarUrl || "https://placehold.co/150x150";

  return (
    <Card className="w-100 p-4 mb-4">
      <Row className="align-items-center">
        <Col md={3} className="text-center">
          <Image src={avatarSrc} roundedCircle width={150} height={150} style={{ objectFit: "cover", marginBottom: "1rem" }} alt="Avatar utente" />

          <Form.Group controlId="formFile" className="text-center">
            <Form.Label>Carica nuova foto</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} />
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
            <strong>Nome:</strong> {user?.name || "N/A"}
          </p>
          <p>
            <strong>Cognome:</strong> {user?.surname || "N/A"}
          </p>
          <p>
            <strong>Username:</strong> {user?.username || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {user?.email || "N/A"}
          </p>
          <p>
            <strong>Provincia:</strong> {user?.provinciaSigla || "N/A"}
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
