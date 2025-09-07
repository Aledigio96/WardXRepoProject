import { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

function Social() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      autore: "Luca",
      contenuto: "Nuovo outfit caricato oggi!",
    },
    {
      id: 2,
      autore: "Giulia",
      contenuto: "Adoro questa giacca vintage ❤️",
    },
    {
      id: 2,
      autore: "Giulia",
      contenuto: "Adoro questa giacca vintage ❤️",
    },
    {
      id: 2,
      autore: "Giulia",
      contenuto: "Adoro questa giacca vintage ❤️",
    },
  ]);

  const [newPost, setNewPost] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim() === "") return;

    const nuovoPost = {
      id: Date.now(),
      autore: "Tu",
      contenuto: newPost,
    };

    setPosts([nuovoPost, ...posts]);
    setNewPost("");
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
              <Card.Body>
                <Card.Title>{post.autore}</Card.Title>
                <Card.Text>{post.contenuto}</Card.Text>
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
