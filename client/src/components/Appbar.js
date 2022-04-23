import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import {
  Nav,
  Container,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../redux/actions/userActions";

function Appbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userLogin);
  const [reload, setReload] = useState(false);

  const { userInfo } = user;

  const logoutHandler = () => {
    console.log("ami i worked");
    dispatch(logout());
    setReload(true);
  };

  useEffect(() => {
    if (reload) {
      setReload(false);
    }
  }, [reload, setReload]);

  console.log("hahahha", userInfo);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link to="/">
          <Navbar.Brand>Techno Hub</Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto align-items-center">
            <Link to="/cart">
              <Navbar.Brand>Cart</Navbar.Brand>
            </Link>

            <div>
              {userInfo !== null ? (
                <>
                  <NavDropdown
                    title={user.name}
                    id="basic-nav-dropdown"
                    className="fs-5"
                  >
                    <LinkContainer to={`/profile/${userInfo.user._id}`}>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Link to="/login">
                  <Navbar.Brand>login</Navbar.Brand>
                </Link>
              )}
            </div>
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
