import React from "react";
import { Col, Row } from "react-bootstrap";
import SearchBar from "../components/SearchBar";

function ProductPage() {
  return (
    <>
      <SearchBar />
      <Row>
        <Col lg={3}></Col>
        <Col lg={9}></Col>
      </Row>
    </>
  );
}

export default ProductPage;
