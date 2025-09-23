import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUserProfile } from "../redux/actions/authActions";
import UserDetails from "../components/UserDetails";
import UserPosts from "../components/UserPosts";
import CreatePostForm from "../components/CreatePostForm";

function Profilo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.auth);

  const [posts, setPosts] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [errorUser, setErrorUser] = useState("");
  const [errorPosts, setErrorPosts] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Carica il profilo utente
  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Utente non autorizzato");
        const data = await response.json();

        // ✅ Salva utente nel Redux
        dispatch(setUserProfile(data));
        localStorage.setItem("user", JSON.stringify(data)); // (opzionale) salva in localStorage
      } catch (err) {
        setErrorUser(err.message);
        dispatch(logout());
        navigate("/");
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, [token, dispatch, navigate]);

  // Carica gli annunci dell’utente
  useEffect(() => {
    if (!user) return;

    const fetchPosts = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/annunci/user/${user.username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Errore nel recupero degli annunci");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setErrorPosts(err.message);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, [user, token]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleNewPost = (post) => {
    setPosts((prev) => [post, ...prev]);
    setShowModal(false);
  };

  const handleDeleteSuccess = (deletedId) => {
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
          <UserDetails handleLogout={handleLogout} />
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
