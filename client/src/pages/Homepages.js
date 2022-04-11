import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import Product from "../components/Product.js";
function Homepages() {
  const [products, setProducts] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };

    getProducts();
  }, []);

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
