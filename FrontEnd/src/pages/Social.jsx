import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card, Image } from "react-bootstrap";

function Social() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:3001/api/posts", {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore nel fetch dei post");
        return res.json();
      })
      .then((data) => setPosts(data))
      .catch((err) => console.error("Errore fetch posts:", err));
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim() === "") return;

    const payload = {
      content: newPost,
    };

    fetch("http://localhost:3001/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore nella creazione del post");
        return res.json();
      })
      .then((newPostFromServer) => {
        setPosts([newPostFromServer, ...posts]);
        setNewPost("");
      })
      .catch((err) => console.error(err));
  };

  const profiliConsigliati = ["Sara", "Marco", "Anna", "Elisa"];

  return (
    <Container fluid className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="newPost">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Condividi qualcosa con la community..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                  />
                </Form.Group>
                <div className="text-end mt-2">
                  <Button variant="primary" type="submit">
                    Pubblica
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          {posts.map((post) => (
            <Card key={post.id} className="mb-3">
              <Card.Body className="d-flex">
                <Image src={post.autore.avatarUrl || "/default-avatar.png"} roundedCircle width={50} height={50} className="me-3" alt={post.autore.username} />
                <div>
                  <Card.Title>{post.autore.username}</Card.Title>
                  <Card.Text>{post.content}</Card.Text>
                  <small className="text-muted">{new Date(post.createdAt).toLocaleString()}</small>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Col>

        <Col md={4}>
          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Profili consigliati</h5>
              <ul className="list-unstyled">
                {profiliConsigliati.map((nome, index) => (
                  <li key={index} className="mb-2">
                    <Button variant="outline-secondary" size="sm">
                      Segui {nome}
                    </Button>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Social;
