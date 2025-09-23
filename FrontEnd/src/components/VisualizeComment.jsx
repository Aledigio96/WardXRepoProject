import { useEffect, useState } from "react";
import { Container, Table, Spinner, Alert, Button } from "react-bootstrap";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useSelector } from "react-redux";

function VisualizeComments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { token } = useSelector((state) => state.auth);

  const commentsApi = "http://localhost:3001/api/commenti"; // GET tutti i commenti
  const deleteCommentApi = (id) => `http://localhost:3001/api/commenti/${id}`; // DELETE commento

  const eliminaCommento = async (comment) => {
    const choice = window.confirm("Confermi l'eliminazione del commento?");
    if (!choice) return;

    try {
      const res = await fetch(deleteCommentApi(comment.id), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        alert("Commento eliminato con successo");
        setComments((prev) => prev.filter((c) => c.id !== comment.id));
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

    fetch(commentsApi, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          console.log("Dati ricevuti dai commenti:", data);

          // Log dettagliato per ogni commento
          data.forEach((comment, i) => {
            console.log(`Commento #${i} - post:`, comment.post);
            console.log(`Commento #${i} - user:`, comment.user);
          });

          setComments(data);
        } else {
          const errorData = await res.json().catch(() => null);
          const errorMsg = errorData && errorData.message ? errorData.message : "Errore nel recupero dei commenti";
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
        <Container className="my-5 py-5 w-75 rounded-3 bg-dark text-white shadow-lg">
          <h5 className="mb-3">Commenti</h5>

          {loading && <Spinner animation="border" />}
          {error && <Alert variant="danger">{error}</Alert>}

          {!loading && !error && (
            <Table striped hover variant="dark" responsive>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Testo</th>
                  <th>Creato il</th>
                  <th>Post ID</th>
                  <th>Utente</th>
                  <th>Elimina</th>
                </tr>
              </thead>
              <tbody>
                {comments.map((comment) => (
                  <tr key={comment.id}>
                    <td>{comment.id}</td>
                    <td
                      style={{
                        maxWidth: "400px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {comment.testo}
                    </td>
                    <td>{new Date(comment.createdAt).toLocaleString()}</td>
                    <td>
                      {/* Logato anche qui nel render */}
                      {console.log("Render comment.post:", comment.post)}
                      {comment.postId || "Sconosciuto"}
                    </td>
                    <td>
                      {console.log("Render comment.user:", comment.user)}
                      {comment.username || "Sconosciuto"}
                    </td>
                    <td>
                      <Button onClick={() => eliminaCommento(comment)} variant="danger" size="sm">
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

export default VisualizeComments;
