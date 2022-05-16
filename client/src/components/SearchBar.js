import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (e.target.value.trim()) {
      navigate(`/search/${e.target.value}`);
    } else {
      navigate("/");
    }
  };
  return (
    <Form className="d-flex ms-4" onSubmit={submitHandler}>
      <Form.Control
        type="text"
        size="sm"
        onChange={submitHandler}
      ></Form.Control>
    </Form>
  );
}

export default SearchBar;
