import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserDetails } from "../redux/actions/userDetailsAction";

function AdminUpdateUser() {
  const { id } = useParams();
  const dispatch = useDispatch();
  let userDetail = useSelector((state) => state.userDetails);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  console.log(userDetail);

  useEffect(() => {
    dispatch(getUserDetails(id));
    let { userInfo } = userDetail;
    setEmail(userInfo.user.email);
    setName(userInfo.user.name);
    setIsAdmin(userInfo.user.isAdmin);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <Container>
      <Row className="align-items-center justify-content-center">
        <Col>
          <div className="py-3">
            <h4>Profile</h4>
          </div>

          <Form onSubmit={submitHandler}>
            <Form.Group className="my-5">
              <div>
                {" "}
                <Form.Label>
                  {" "}
                  <h5>Name</h5>
                </Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </div>

              <div className="my-5">
                {" "}
                <Form.Label>
                  <h5>Email</h5>
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter name"
                  value={email}
                  onChange={(e) => setEmail(email)}
                ></Form.Control>
              </div>
              <div>
                {" "}
                <Form.Group controlId="isadmin">
                  <Form.Check
                    type="checkbox"
                    label="Is Admin"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  ></Form.Check>
                </Form.Group>
              </div>
              <Button type="submit" variant="primary" className="my-3">
                Update
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminUpdateUser;
