import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import { Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, Route, Router, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../redux/actions/userActions";
import SearchBar from "./SearchBar";
import { createBrowserHistory } from "history";

function Appbar() {
  const history = createBrowserHistory({ window });

  console.log(history);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userLogin.userInfo);
  const [reload, setReload] = useState(false);

  console.log(user);
  const logoutHandler = () => {
    dispatch(logout());
    setReload(true);
  };

  useEffect(() => {
    if (reload) {
      setReload(false);
    }
  }, [reload, setReload]);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link to="/">
          <Navbar.Brand>Techno Hub</Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <LinkContainer to="/products">
              <Nav.Link>
                <i className="fa fa-shopping-bag"></i> Products
              </Nav.Link>
            </LinkContainer>

            {user ? (
              <NavDropdown title={user.user.name} id="username">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user"></i> Sign In
                </Nav.Link>
              </LinkContainer>
            )}
            {user && user.user.isAdmin && (
              <NavDropdown title="Manage" id="adminmenu">
                <LinkContainer to="/admin/userlist">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/productlist">
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/orderlist">
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/categoryList">
                  <NavDropdown.Item>Category</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
            <LinkContainer to="/cart">
              <Nav.Link>
                <i className="fas fa-shopping-cart"></i> Cart
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Appbar;
