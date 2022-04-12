import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import Product from "../components/Product.js";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/actions/productActions.js";
function Homepages() {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  if (loading) {
    return <h2>Loading</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <>
      <Container>
        <Row>
          {products &&
            products.map((item, k) => {
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
