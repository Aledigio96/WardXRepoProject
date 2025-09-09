import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { FaTshirt, FaSearch, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function TopBar() {
  return (
    <Navbar expand="lg" className="topbar-custom">
      <div className="topbar-inner" style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
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
            <Link to="/iscriviti/login" className="nav-link topbar-link">
              Iscriviti/Login
            </Link>
          </Nav>
        </div>

        <Form className="topbar-center">
          <div className="topbar-search-group d-flex">
            <FormControl type="search" placeholder="Cerca abbigliamento, brand..." className="topbar-search-input" aria-label="Search" />
            <Button type="submit" className="topbar-search-btn d-flex align-items-center justify-content-center">
              <FaSearch />
            </Button>
          </div>
        </Form>

        <div className="topbar-right d-flex align-items-center">
          <FaShoppingCart className="topbar-icon" title="Carrello" />
          <FaUserCircle className="topbar-icon" title="Login / Account" />
        </div>
      </div>
    </Navbar>
  );
}

export default TopBar;
