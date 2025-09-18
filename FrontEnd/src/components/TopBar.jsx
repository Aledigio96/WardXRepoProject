import { useState, useEffect } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaTshirt, FaSearch, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux"; // Importa useSelector per ottenere lo stato del carrello
import { useDispatch } from "react-redux"; // Importa useDispatch per gestire l'azione di logout
import { logout } from "../redux/actions/authActions"; // Importa l'azione di logout

function TopBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Recupera lo stato dell'utente da Redux
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = !!user; // Se esiste un utente, allora è loggato

  // Ottieni il numero di prodotti nel carrello dallo store Redux
  const numeroProdotti = useSelector((state) => state.cart.content.length);

  // Reset del searchQuery ogni volta che la location cambia
  useEffect(() => {
    setSearchQuery("");
  }, [location.pathname]);

  // Gestore per la ricerca
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery.length > 0) {
      navigate(`/risultati?query=${encodeURIComponent(trimmedQuery)}`);
      setSearchQuery("");
    }
  };

  // Funzione di logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Rimuovi il token dal localStorage
    dispatch(logout()); // Dispatcia l'azione di logout
    navigate("/"); // Reindirizza alla home
  };

  return (
    <Navbar expand="lg" className="topbar-custom">
      <div
        className="topbar-inner"
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="topbar-left d-flex align-items-center">
          <Navbar.Brand href="/" className="topbar-logo d-flex align-items-center">
            <FaTshirt className="me-2" />
            WardX
          </Navbar.Brand>
          <Nav className="topbar-nav d-flex align-items-center">
            <Link to="/" className="nav-link topbar-link">
              Home
            </Link>
            <Link to="/social" className="nav-link topbar-link">
              Social
            </Link>

            {isLoggedIn && (
              <Link to="/profilo" className="nav-link topbar-link">
                Profilo
              </Link>
            )}
          </Nav>
        </div>

        {/* Form di ricerca */}
        <Form onSubmit={handleSearchSubmit} className="topbar-center">
          <div className="topbar-search-group d-flex">
            <FormControl
              type="search"
              placeholder="Cerca abbigliamento, brand, utenti..."
              className="topbar-search-input"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" className="topbar-search-btn d-flex align-items-center justify-content-center">
              <FaSearch />
            </Button>
          </div>
        </Form>

        {/* Sezione icone carrello e account */}
        <div className="topbar-right d-flex align-items-center">
          {!isLoggedIn ? (
            <Link to="/iscriviti/login" className="nav-link topbar-link">
              Iscriviti/Login
            </Link>
          ) : (
            <>
              {/* Icona per il logout */}
              <Button variant="link" onClick={handleLogout} className="topbar-link">
                Logout
              </Button>

              {/* Icona per il profilo */}
              <Link to="/profilo" className="nav-link topbar-link">
                <FaUserCircle className="topbar-icon" title="Account" />
              </Link>
            </>
          )}

          {/* Carrello */}
          <Link to="/carrello" style={{ position: "relative", display: "inline-block" }}>
            <FaShoppingCart className="topbar-icon" title="Carrello" />
            {/* Badge con il numero di articoli nel carrello */}
            {numeroProdotti > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -5,
                  right: -10,
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {numeroProdotti}
              </span>
            )}
          </Link>
        </div>
      </div>
    </Navbar>
  );
}

export default TopBar;
