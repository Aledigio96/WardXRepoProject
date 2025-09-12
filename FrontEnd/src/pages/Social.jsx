import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card, Image } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";

function Social() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [commentsByPost, setCommentsByPost] = useState({});
  const [newComments, setNewComments] = useState({});
  const [userId, setUserId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const id = decoded.sub || decoded.id || decoded.userId;
        const idNum = id != null ? Number(id) : null;
        setUserId(idNum);
        console.log("Decoded JWT:", decoded);
        console.log("User ID dal token (numero):", idNum);
      } catch (error) {
        console.error("Errore nella decodifica del token:", error);
      }
    }
  }, [token]);

  useEffect(() => {
    async function fetchPostsAndComments() {
      try {
        const resPosts = await fetch("http://localhost:3001/api/posts", {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });
        if (!resPosts.ok) throw new Error("Errore nel fetch dei post");
        const dataPosts = await resPosts.json();
        console.log("Posts fetched:", dataPosts);
        setPosts(dataPosts);

        const commentsPromises = dataPosts.map(async (post) => {
          const resComments = await fetch(`http://localhost:3001/api/commenti/post/${post.id}`, {
            headers: {
              "Content-Type": "application/json",
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          });
          if (!resComments.ok) throw new Error("Errore nel fetch dei commenti");
          const comments = await resComments.json();
          return { postId: post.id, comments };
        });

        const commentsResults = await Promise.all(commentsPromises);

        const commentsMap = {};
        commentsResults.forEach(({ postId, comments }) => {
          commentsMap[postId] = comments;
        });

        setCommentsByPost(commentsMap);
      } catch (err) {
        console.error(err);
      }
    }

    fetchPostsAndComments();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPost.trim() === "") return;

    const payload = { content: newPost };

    try {
      const res = await fetch("http://localhost:3001/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Errore nella creazione del post");
      const newPostFromServer = await res.json();
      setPosts([newPostFromServer, ...posts]);
      setNewPost("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddComment = async (postId) => {
    const testo = newComments[postId];
    if (!testo || testo.trim() === "") return;

    if (!userId) {
      alert("Devi essere loggato per commentare");
      return;
    }

    const payload = {
      testo,
      postId,
      userId,
    };

    try {
      const res = await fetch("http://localhost:3001/api/commenti", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Errore nella creazione del commento");
      const newComment = await res.json();

      setCommentsByPost((prev) => ({
        ...prev,
        [postId]: [newComment, ...(prev[postId] || [])],
      }));
      setNewComments((prev) => ({ ...prev, [postId]: "" }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const res = await fetch(`http://localhost:3001/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      if (!res.ok) throw new Error("Errore durante l'eliminazione del post");
      setPosts((prev) => prev.filter((post) => post.id !== postId));
      setCommentsByPost((prev) => {
        const updated = { ...prev };
        delete updated[postId];
        return updated;
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId, postId) => {
    try {
      const res = await fetch(`http://localhost:3001/api/commenti/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      if (!res.ok) throw new Error("Errore durante l'eliminazione del commento");
      setCommentsByPost((prev) => ({
        ...prev,
        [postId]: (prev[postId] || []).filter((c) => c.id !== commentId),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const profiliConsigliati = ["Sara", "Marco", "Anna", "Elisa"];

  return (
    <Container fluid className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          {/* FORM PER NUOVO POST */}
          <Card className="mb-4 shadow-sm" style={{ backgroundColor: "rgba(44, 38, 44, 0.1)" }}>
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
                  <Button variant="primary" type="submit" disabled={newPost.trim() === ""}>
                    Pubblica
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          {/* LISTA POST */}
          {posts.map((post) => {
            return (
              <Card key={post.id} className="mb-3" style={{ backgroundColor: "rgba(44, 38, 44, 0.1)" }}>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="d-flex">
                      <Image
                        src={post.autore?.avatarUrl || "/default-avatar.png"}
                        roundedCircle
                        width={50}
                        height={50}
                        className="me-3"
                        alt={post.autore?.username || "Utente"}
                      />
                      <div>
                        <Card.Title>{post.autore?.username || "Utente"}</Card.Title>
                        <Card.Text>{post.content}</Card.Text>
                        <small className="text-muted">{new Date(post.createdAt).toLocaleString()}</small>
                      </div>
                    </div>
                    {post.autore?.id != null && userId != null && post.autore.id === userId && (
                      <Button variant="danger" size="sm" onClick={() => handleDeletePost(post.id)}>
                        Elimina Post
                      </Button>
                    )}
                  </div>

                  <div className="mt-3">
                    {(commentsByPost[post.id] || []).map((comment) => (
                      <Card key={comment.id} className="mb-2" style={{ backgroundColor: "rgba(128, 0, 128, 0.05)" }}>
                        <Card.Body className="d-flex justify-content-between align-items-start">
                          <div className="d-flex">
                            <Image
                              src={comment.avatarUrl || "/default-avatar.png"}
                              roundedCircle
                              width={40}
                              height={40}
                              className="me-2"
                              alt={comment.username || "Utente"}
                            />
                            <div>
                              <strong>{comment.username || "Utente"}</strong>
                              <p className="mb-1">{comment.testo}</p>
                              <small className="text-muted">{new Date(comment.createdAt).toLocaleString()}</small>
                            </div>
                          </div>
                          {comment.userId != null && userId != null && comment.userId === userId && (
                            <Button variant="outline-danger" size="sm" onClick={() => handleDeleteComment(comment.id, post.id)}>
                              Elimina Commento
                            </Button>
                          )}
                        </Card.Body>
                      </Card>
                    ))}
                  </div>

                  {userId != null && (
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleAddComment(post.id);
                      }}
                    >
                      <Form.Group controlId={`newComment-${post.id}`}>
                        <Form.Control
                          type="text"
                          placeholder="Scrivi un commento..."
                          value={newComments[post.id] || ""}
                          onChange={(e) =>
                            setNewComments((prev) => ({
                              ...prev,
                              [post.id]: e.target.value,
                            }))
                          }
                        />
                      </Form.Group>
                      <Button type="submit" variant="primary" size="sm" className="mt-2" disabled={!newComments[post.id]?.trim()}>
                        Commenta
                      </Button>
                    </Form>
                  )}
                </Card.Body>
              </Card>
            );
          })}
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
