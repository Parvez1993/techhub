import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Nav, Container, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
function Appbar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link to="/">
          <Navbar.Brand>Techno Hub</Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">
            <Link to="/cart">
              <Navbar.Brand>Cart</Navbar.Brand>
            </Link>
            <Link to="/login">
              <Navbar.Brand>Login</Navbar.Brand>
            </Link>
          </Nav>
          <Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Appbar;
