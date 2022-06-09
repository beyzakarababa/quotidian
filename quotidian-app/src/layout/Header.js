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
import { useHistory } from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";

export default function Header() {
  let history = useHistory();
  const handleSignOut = () => {
    localStorage.setItem("authKey", JSON.stringify("false"));
    toast.success("You are succesfully signed out");
    history.push("login");

  }
  return (
    <div>
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
          <Button variant="outline-secondary" onClick={handleSignOut}>Sign out</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}


