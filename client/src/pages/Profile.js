import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import OrderList from "../components/OrderList";
import {
  getUserDetails,
  updateUserDetails,
} from "../redux/actions/userDetailsAction";

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userLogin);
  const userDetail = useSelector((state) => state.userDetails);
  const { userInfo } = user;

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo.user._id === id) {
      dispatch(getUserDetails(id, user.userInfo.token));
    } else {
      navigate("/login");
    }
  }, [
    dispatch,
    id,
    navigate,
    user.userInfo.token,
    userInfo.token,
    userInfo.user._id,
  ]);

  const [name, setName] = useState();
  const [password, setPassword] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  // const validPassword = new RegExp(
  //   "^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[d]){1,})(?=(.*[W]){1,})(?!.*s).{8,}$"
  // );

  useEffect(() => {
    if (userDetail.userInfo) {
      const { userInfo } = userDetail;

      setName(userInfo.user.name);
      setPassword(userInfo.user.password);
    }
  }, [userDetail]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!password.length > 0 && !password.name > 0) {
      setAlertMsg("Passwords do not match");
    } else {
      console.log(id, userInfo.token, name, password);
      dispatch(updateUserDetails(id, userInfo.token, name, password));
    }
  };

  return (
    <Container>
      {alertMsg ? <Alert>{alertMsg}</Alert> : ""}
      <Row className="my-5 justify-content-around">
        <Col md={3}>
          <div className="py-3">
            <h4>Profile</h4>
          </div>
          {/* //email */}
          <div>
            <div>
              <h5>Email</h5>
            </div>
            <div class="input-group input-group-sm mb-3">
              <input
                type="text"
                class="form-control"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                disabled
                value={userInfo.user.email}
              />
            </div>
          </div>
          {/* ///name */}

          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary" className="my-3">
                Update
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col md={5}>
          <OrderList />
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
