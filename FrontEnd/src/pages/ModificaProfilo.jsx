import { useState, useEffect } from "react";
import { Form, Button, Card, Spinner, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function ModificaProfilo() {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    bio: "",
    provinciaSigla: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        surname: user.surname || "",
        username: user.username || "",
        email: user.email || "",
        bio: user.bio || "",
        provinciaSigla: user.provinciaSigla || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("http://localhost:3001/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          surname: formData.surname,
          username: formData.username,
          email: formData.email,
          bio: formData.bio,
          provinciaSigla: formData.provinciaSigla,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Errore durante l'aggiornamento del profilo");
      }

      const updatedUser = await response.json();

      dispatch({ type: "SET_USER_PROFILE", payload: updatedUser });

      setSuccess(true);

      setTimeout(() => {
        navigate("/profilo");
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 w-100" style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h3 className="mb-4">Modifica Profilo</h3>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Profilo aggiornato con successo!</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="surname">
          <Form.Label>Cognome</Form.Label>
          <Form.Control type="text" name="surname" value={formData.surname} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="bio">
          <Form.Label>Bio</Form.Label>
          <Form.Control as="textarea" name="bio" value={formData.bio} onChange={handleChange} rows={3} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="provinciaSigla">
          <Form.Label>Provincia (Sigla)</Form.Label>
          <Form.Control type="text" name="provinciaSigla" value={formData.provinciaSigla} onChange={handleChange} maxLength={2} placeholder="Es: RM, MI" />
        </Form.Group>

        <Button type="submit" disabled={loading} className="w-100">
          {loading ? (
            <>
              <Spinner animation="border" size="sm" /> Salvataggio...
            </>
          ) : (
            "Salva modifiche"
          )}
        </Button>
      </Form>
    </Card>
  );
}

export default ModificaProfilo;
