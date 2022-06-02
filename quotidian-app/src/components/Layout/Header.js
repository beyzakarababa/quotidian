import React from "react";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

export default function Header() {
  return (
    <Navbar variant="light" expand="lg" style={{backgroundColor:"#dce0e6" }}>
      <Container fluid>
        <Navbar.Brand href="#">quotidian</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{maxHeight: "100px"}}
            navbarScroll
          >
            <Nav.Link href="#action1">Issue Board</Nav.Link>
            <NavDropdown title="Workspaces" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/">My Workspace</NavDropdown.Item>
            </NavDropdown>
          </Nav>  
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
