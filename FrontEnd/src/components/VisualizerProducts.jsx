import { useEffect, useState } from "react";
import { Container, Table, Spinner, Alert, Button, Image } from "react-bootstrap";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

function VisualizeProducts() {
  const [annunci, setAnnunci] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { token } = useSelector((state) => state.auth);

  const annunciApi = "http://localhost:3001/api/annunci";

  const eliminaAnnuncio = async (annuncio) => {
    const deleteApi = `http://localhost:3001/api/annunci/${annuncio.id}`;
    const choice = window.confirm("Confermi l'eliminazione del prodotto?");
    if (!choice) return;

    try {
      const res = await fetch(deleteApi, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        alert("Eliminazione avvenuta con successo");
        setAnnunci((prev) => prev.filter((a) => a.id !== annuncio.id));
      } else {
        const errorData = await res.json().catch(() => null);
        alert(errorData?.message ? `Errore: ${errorData.message}` : "Errore nell'eliminazione");
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

    fetch(annunciApi, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setAnnunci(data);
          } else if (data && Array.isArray(data.content)) {
            setAnnunci(data.content);
          } else {
            setAnnunci([]);
          }
        } else {
          const errorData = await res.json().catch(() => null);
          setError(errorData?.message || "Errore nel recupero annunci");
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
        <Container className="my-5 py-5 w-100 rounded-3 bg-dark text-white shadow-lg">
          <h5 className="mb-3">Lista Annunci</h5>

          {loading && <Spinner animation="border" />}
          {error && <Alert variant="danger">{error}</Alert>}

          {!loading && !error && (
            <Table striped hover variant="dark" responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Titolo</th>
                  <th>Descrizione</th>
                  <th>Prezzo</th>
                  <th>Taglia</th>
                  <th>Condizione</th>
                  <th>Categoria Principale</th>
                  <th>Categoria</th>
                  <th>Disponibile</th>
                  <th>Immagine</th>
                  <th>Venditore</th>
                  <th>Elimina</th>
                </tr>
              </thead>
              <tbody>
                {annunci.map((a) => (
                  <tr key={a.id}>
                    <td>{a.id}</td>
                    <td>{a.titolo}</td>
                    <td>{a.descrizione}</td>
                    <td>{a.prezzo} €</td>
                    <td>{a.taglia}</td>
                    <td>{a.condizioni}</td>
                    <td>{a.categoriaPrincipale}</td>
                    <td>{a.categoria}</td>
                    <td>{a.isAvailable ? "Sì" : "No"}</td>
                    <td>{a.image ? <Image src={a.image} alt="Prodotto" thumbnail width={80} height={80} /> : "Nessuna immagine"}</td>
                    <td>{a.seller?.username || `ID: ${a.seller?.id}`}</td>
                    <td>
                      <Button onClick={() => eliminaAnnuncio(a)} variant="danger" size="sm">
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

export default VisualizeProducts;
