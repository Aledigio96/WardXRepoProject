import { useEffect, useState } from "react";
import { Container, Table, Spinner, Alert, Button } from "react-bootstrap";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useSelector } from "react-redux";

function VisualizePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { token } = useSelector((state) => state.auth);

  const postsApi = "http://localhost:3001/api/posts"; // GET tutti i post
  const deletePostApi = (id) => `http://localhost:3001/api/posts/${id}`; // DELETE singolo post

  const eliminaPost = async (post) => {
    const choice = window.confirm("Confermi l'eliminazione del post?");
    if (!choice) return;

    try {
      const res = await fetch(deletePostApi(post.id), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        alert("Post eliminato con successo");
        setPosts((prev) => prev.filter((p) => p.id !== post.id));
      } else {
        const errorData = await res.json().catch(() => null);
        alert(errorData && errorData.message ? `Errore nell'eliminazione: ${errorData.message}` : "Errore nell'eliminazione");
      }
    } catch (error) {
      console.error("Errore di rete: " + error.message);
      alert("Errore di rete: " + error.message);
    }
  };

  useEffect(() => {
    if (!token) {
      setError("Token non disponibile. Effettua di nuovo il login.");
      return;
    }

    setLoading(true);
    setError("");

    fetch(postsApi, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        } else {
          const errorData = await res.json().catch(() => null);
          const errorMsg = errorData && errorData.message ? errorData.message : "Errore nel recupero dei post";
          setError(errorMsg);
        }
      })
      .catch((err) => {
        setError("Errore di rete: " + err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  return (
    <>
      <section className="position-fixed start-0 top-0 z-n1 opacity-50 hero-background text-white text-center d-flex flex-column justify-content-center align-items-center"></section>
      <section className="my-5 py-5 container-fluid">
        <Container className="my-5 py-5 w-75 rounded-3 bg-primary text-white shadow-lg">
          <h5 className="mb-3">Post</h5>

          {loading && <Spinner animation="border" />}
          {error && <Alert variant="danger">{error}</Alert>}

          {!loading && !error && (
            <Table striped hover variant="primary" responsive>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Contenuto</th>
                  <th>Creato il</th>
                  <th>Autore</th>
                  <th>Elimina</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td>{post.id}</td>
                    <td style={{ maxWidth: "400px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{post.content}</td>
                    <td>{new Date(post.createdAt).toLocaleString()}</td>
                    <td>{post.autore?.username || "Sconosciuto"}</td>
                    <td>
                      <Button onClick={() => eliminaPost(post)} variant="danger" size="sm">
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Container>
      </section>
    </>
  );
}

export default VisualizePosts;
