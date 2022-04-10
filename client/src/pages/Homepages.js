import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import products from "../products";
import Product from "../components/Product.js";
function Homepages() {
  return (
    <>
      <Container>
        <Row>
          {products.map((item, k) => {
            return (
              <Col key={k} className="my-5" sm={12} md={6} lg={4} xl={3}>
                <Product product={item} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default Homepages;
