import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [show, setShow] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    provinciaSigla: "",
  });

  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    navigate("/");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isLogin ? "/auth/login" : "/auth/register";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          isLogin
            ? {
                email: formData.email,
                password: formData.password,
              }
            : formData
        ),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Errore durante la richiesta");
      }

      const data = await response.json();

      if (isLogin) {
        localStorage.setItem("token", data.accessToken);
      }

      setShow(false);
      navigate("/profilo");
    } catch (error) {
      alert("Errore: " + error.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isLogin ? "Login" : "Registrati"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" name="name" placeholder="Inserisci nome" value={formData.name} onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Cognome</Form.Label>
                <Form.Control type="text" name="surname" placeholder="Inserisci cognome" value={formData.surname} onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" placeholder="Inserisci username" value={formData.username} onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Provincia</Form.Label>
                <Form.Control
                  type="text"
                  name="provinciaSigla"
                  placeholder="Sigla provincia (es: MI)"
                  value={formData.provinciaSigla}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Inserisci email" name="email" value={formData.email} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            {isLogin ? "Accedi" : "Registrati"}
          </Button>
        </Form>

        <div className="text-center mt-3">
          <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="text-decoration-none">
            {isLogin ? "Non hai un account? Registrati" : "Hai già un account? Accedi"}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default LoginPage;
