import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function Navigbar() {
  return (
    <Navbar className="bg-dark" style={{fontWeight:'700', fontFamily:'cursive'}}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="text-warning">
          Home
        </Navbar.Brand>
        <Navbar.Toggle />
        <Nav className="ml-auto">
        <Nav.Link as={Link} to="/signup" className="text-warning">
          Signup
          </Nav.Link>
          <Nav.Link as={Link} to="/logout" className="text-warning">
            Logout
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigbar;
