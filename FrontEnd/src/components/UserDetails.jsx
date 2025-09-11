import { useState } from "react";
import { Card, Image, Spinner, Form, Button, Row, Col } from "react-bootstrap";

function UserDetails({ user, handleLogout, uploadAvatar }) {
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setUploading(true);
    await uploadAvatar(file, () => setPreview(null));
    setUploading(false);
  };

  return (
    <Card className="w-100 p-4 mb-4">
      <Row className="align-items-center">
        <Col md={3} className="text-center">
          <Image
            src={
              preview ||
              user.avatarUrl ||
              "data:image/png;base64,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"
            }
            roundedCircle
            width={150}
            height={150}
            style={{ objectFit: "cover", marginBottom: "1rem" }}
          />

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
