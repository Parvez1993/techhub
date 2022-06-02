import React from "react";
import { Spinner } from "react-bootstrap";

function Loader() {
  return (
    <div className="d-flex justify-content-center my-5 mx-2 align-items-center">
      {" "}
      <Spinner animation="grow" />
      <Spinner animation="grow" />
      <Spinner animation="grow" />
    </div>
  );
}

export default Loader;
