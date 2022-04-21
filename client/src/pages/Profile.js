import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDetails } from "../redux/actions/userDetailsAction";

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userLogin);
  const { userInfo } = user;
  const { id } = useParams();

  const navigate = useNavigate();

  console.log("bal", user);

  useEffect(() => {
    if (userInfo.user._id === id) {
      dispatch(getUserDetails(id, userInfo.token));
    } else {
      navigate("/login");
    }
  }, [dispatch, id, navigate, userInfo.user._id]);

  return (
    <div>
      <Row>
        <Col md={3}>
          <Form></Form>
        </Col>
      </Row>
    </div>
  );
}

export default Profile;
