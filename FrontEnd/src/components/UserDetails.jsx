import { useState } from "react";
import { Card, Image, Spinner, Form, Button, Row, Col } from "react-bootstrap";

function UserDetails({ user, setUser, handleLogout, uploadAvatar }) {
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
            src={preview || user.avatarUrl || "https://via.placeholder.com/150"}
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
