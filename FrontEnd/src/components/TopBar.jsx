import { useState, useEffect } from "react";
import { Navbar, Nav, Form, FormControl, Button, Container } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaTshirt, FaSearch, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";

function TopBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = !!user;
  const numeroProdotti = useSelector((state) => state.cart.content.length);

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };

  return (
    <Navbar expand="lg" bg="light" className="mb-3">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <FaTshirt className="me-2" />
          WardX
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="topbar-navbar" />
        <Navbar.Collapse id="topbar-navbar">
          <Nav className="me-auto">
            <Container fluid className=" d-flex justify-content-between">
              <div className=" d-flex gap-4">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/social">
                  Social
                </Nav.Link>
                {isLoggedIn && (
                  <Nav.Link as={Link} to="/profilo">
                    Profilo
                  </Nav.Link>
                )}
              </div>
            </Container>
          </Nav>
          <Form className="d-flex mx-auto my-2 my-lg-0" onSubmit={handleSearchSubmit}>
            <FormControl
              type="search"
              placeholder="Cerca abbigliamento, brand, utenti..."
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" variant="outline-secondary">
              <FaSearch />
            </Button>
          </Form>
          <Nav className="ms-auto d-flex align-items-center">
            {!isLoggedIn ? (
              <Nav.Link as={Link} to="/iscriviti/login">
                Iscriviti/Login
              </Nav.Link>
            ) : (
              <>
                <Button variant="link" onClick={handleLogout} className="p-0 me-2 text-decoration-none text-dark">
                  Logout
                </Button>
              </>
            )}
          </Nav>
          <div className="topbar-icons">
            <Nav.Link as={Link} to="/carrello" className="position-relative">
              <FaShoppingCart size={22} title="Carrello" />
              {numeroProdotti > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "12px" }}>
                  {numeroProdotti}
                </span>
              )}
            </Nav.Link>
            <Nav.Link as={Link} to="/profilo">
              <FaUserCircle size={22} title="Account" />
            </Nav.Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopBar;
