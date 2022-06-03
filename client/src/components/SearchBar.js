import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./styles/Search.css";
function SearchBar() {
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (e.target.value.trim()) {
      navigate(`/products/search/${e.target.value}`);
    } else {
      navigate("/products");
    }
  };
  return (
    // <Form className="d-flex ms-4" onSubmit={submitHandler}>
    //   <input
    //     type="text"
    //     size="sm"
    //     className="search"
    //     onChange={submitHandler}
    //   ></input>
    // </Form>
    <div className="form-group has-search">
      <span className="fa fa-search form-control-feedback"></span>
      <input
        type="text"
        className="form-control"
        placeholder="Search"
        onChange={submitHandler}
      />
    </div>
  );
}

export default SearchBar;
