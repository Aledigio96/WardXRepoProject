import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authActions";
import UserDetails from "../components/UserDetails";
import UserPosts from "../components/UserPosts";
import CreatePostForm from "../components/CreatePostForm";

function Profilo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.auth);
  console.log("Stato Redux:", { user, token });

  const [posts, setPosts] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [errorUser, setErrorUser] = useState("");
  const [errorPosts, setErrorPosts] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log("Token iniziale:", token);

    if (!token) {
      console.log("Token non trovato, reindirizzamento alla pagina di login");
      navigate("/");
      return;
    }

    const fetchUser = async () => {
      console.log("Inizio il recupero dei dati utente con token:", token);
      try {
        const response = await fetch("http://localhost:3001/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Utente non autorizzato");
        const data = await response.json();
        console.log("Profilo utente recuperato:", data);
        // Potresti aggiornare Redux qui se necessario
      } catch (err) {
        console.error("Errore nel recupero utente:", err);
        setErrorUser(err.message);
        dispatch(logout());
        navigate("/");
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, [token, navigate, dispatch]);

  useEffect(() => {
    if (!user) {
      console.log("Utente non trovato, non posso recuperare i post");
      return;
    }

    const fetchPosts = async () => {
      console.log("Inizio il recupero degli annunci per l'utente:", user.username);
      try {
        const res = await fetch(`http://localhost:3001/api/annunci/user/${user.username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Errore nel recupero degli annunci");
        const data = await res.json();
        console.log("Annunci ricevuti:", data);
        setPosts(data);
      } catch (err) {
        console.error("Errore nel recupero degli annunci:", err);
        setErrorPosts(err.message);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, [user, token]);

  const handleLogout = () => {
    console.log("Eseguito il logout");
    dispatch(logout());
    navigate("/");
  };

  const uploadAvatar = async (file, onSuccess) => {
    console.log("Caricamento avatar in corso...");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:3001/api/users/avatar", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) throw new Error("Errore nel caricamento avatar");
      const avatarUrl = await response.text();
      console.log("Avatar caricato correttamente, URL:", avatarUrl);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Errore nel caricamento avatar:", err);
      alert(err.message);
    }
  };

  const handleNewPost = (post) => {
    console.log("Nuovo post creato:", post);
    setPosts((prev) => [post, ...prev]);
    setShowModal(false);
  };

  const handleDeleteSuccess = (deletedId) => {
    console.log("Post eliminato con successo, ID:", deletedId);
    setPosts((prev) => prev.filter((post) => post.id !== deletedId));
  };

  if (loadingUser || loadingPosts) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (errorUser) {
    return (
      <Container className="mt-5 text-center">
        <Alert variant="danger">{errorUser}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <UserDetails user={user} handleLogout={handleLogout} uploadAvatar={uploadAvatar} />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col className="d-flex justify-content-between">
          {user?.role === "ADMIN" && (
            <Button variant="warning" onClick={() => navigate("/backoffice")}>
              Backoffice
            </Button>
          )}

          <Button variant="primary" onClick={() => setShowModal(true)} disabled={!user}>
            Crea un nuovo annuncio
          </Button>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>{errorPosts ? <Alert variant="danger">{errorPosts}</Alert> : <UserPosts posts={posts} onDeleteSuccess={handleDeleteSuccess} />}</Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Nuovo annuncio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreatePostForm onPostCreated={handleNewPost} onCancel={() => setShowModal(false)} />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Profilo;
