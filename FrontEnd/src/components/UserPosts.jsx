import { Col, Card } from "react-bootstrap";

function UserPosts({ posts }) {
  if (!posts || posts.length === 0) return <p>Nessun annuncio pubblicato.</p>;

  return (
    <Col md={8}>
      <h4 className="mb-3">I tuoi annunci</h4>
      {posts.map((post) => (
        <Card key={post.id} className="mb-3">
          <Card.Body>
            <Card.Title>{post.titolo}</Card.Title>
            <Card.Text>{post.descrizione}</Card.Text>
            {post.createdAt && <small className="text-muted">Pubblicato il: {new Date(post.createdAt).toLocaleDateString()}</small>}
          </Card.Body>
        </Card>
      ))}
    </Col>
  );
}

export default UserPosts;
