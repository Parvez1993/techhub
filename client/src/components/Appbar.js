import React from "react";
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
import { userLogout } from "../redux/reducers/UserReducers";
function Appbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userLogin);

  const { userInfo } = user;

  console.log(userInfo);

  const logoutHandler = () => {
    dispatch(userLogout());
  };

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
              {userInfo ? (
                <NavDropdown
                  title={userInfo.user.name}
                  id="basic-nav-dropdown"
                  className="fs-5"
                >
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                  <NavDropdown.Item>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link to="/login">
                  <Navbar.Brand onClick={logoutHandler}>Login</Navbar.Brand>
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
