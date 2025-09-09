import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserDetails from "../components/UserDetails";
import UserPosts from "../components/UserPosts";
import CreatePostForm from "../components/CreatePostForm";

function Profilo() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [errorUser, setErrorUser] = useState("");
  const [errorPosts, setErrorPosts] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
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
        setUser(data);
      } catch (err) {
        setErrorUser(err.message);
        localStorage.removeItem("token");
        navigate("/");
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem("token");
    if (!token) return;

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
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const uploadAvatar = async (file, onSuccess) => {
    const token = localStorage.getItem("token");
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
      setUser((prev) => ({ ...prev, avatarUrl }));
      if (onSuccess) onSuccess();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleNewPost = (post) => {
    setPosts((prev) => [post, ...prev]);
    setShowModal(false);
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
          <UserDetails user={user} setUser={setUser} handleLogout={handleLogout} uploadAvatar={uploadAvatar} />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col className="d-flex justify-content-end">
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Crea un nuovo annuncio
          </Button>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>{errorPosts ? <Alert variant="danger">{errorPosts}</Alert> : <UserPosts posts={posts} />}</Col>
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
