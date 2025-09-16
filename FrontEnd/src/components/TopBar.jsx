import { useState, useEffect } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaTshirt, FaSearch, FaShoppingCart, FaUserCircle } from "react-icons/fa";

function TopBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  useEffect(() => {
    setSearchQuery("");
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery.length > 0) {
      navigate(`/risultati?query=${encodeURIComponent(trimmedQuery)}`);
      setSearchQuery("");
    }
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

        <div className="topbar-right d-flex align-items-center">
          {!isLoggedIn && (
            <Link to="/iscriviti/login" className="nav-link topbar-link">
              Iscriviti/Login
            </Link>
          )}

          <FaShoppingCart className="topbar-icon" title="Carrello" />
          <FaUserCircle className="topbar-icon" title="Login / Account" />
        </div>
      </div>
    </Navbar>
  );
}

export default TopBar;
