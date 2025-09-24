import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/authActions";

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
  const dispatch = useDispatch();

  const handleClose = () => {
    console.log("Chiusura modal e reindirizzamento alla home");
    setShow(false);
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Cambiato campo ${name}: ${value}`);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchUserProfile = async (token) => {
    console.log("Recupero del profilo utente con token:", token);
    try {
      const response = await fetch("http://localhost:3001/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Errore nel recupero del profilo");
      }

      const userData = await response.json();
      console.log("Profilo utente recuperato:", userData);

      dispatch(login(userData, token));
      return userData;
    } catch (error) {
      console.error("Errore nel recupero del profilo:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin ? "http://localhost:3001/auth/login" : "http://localhost:3001/auth/register";

    const body = isLogin
      ? {
          email: formData.email,
          password: formData.password,
        }
      : {
          name: formData.name,
          surname: formData.surname,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          provinciaSigla: formData.provinciaSigla,
        };

    console.log("Invio richiesta:", url, body);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errData = await response.json();
        console.error("Errore nella richiesta:", errData.message);
        throw new Error(errData.message || "Errore durante la richiesta");
      }

      const data = await response.json();
      console.log("Risposta ricevuta:", data);

      if (isLogin && data.accessToken) {
        console.log("Token di accesso ricevuto, recupero profilo utente");
        await fetchUserProfile(data.accessToken);
      }

      if (data.accessToken) {
        localStorage.setItem("token", data.accessToken);
      }

      if (!isLogin) {
        alert("Registrazione completata con successo!");
      }

      setShow(false);
      console.log("Login o registrazione completata, reindirizzamento al profilo");
      navigate("/profilo");
    } catch (error) {
      console.error("Errore durante il login o la registrazione:", error);
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
            <Form.Control type="email" name="email" placeholder="Inserisci email" value={formData.email} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
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
