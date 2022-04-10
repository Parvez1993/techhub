import React from "react";
import { Link, useParams } from "react-router-dom";
import { Alert, Button, Col, Container, Row, Table } from "react-bootstrap";
import products from "../products";
import Ratings from "../components/Ratings";

function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p._id === id);
  return (
    <div className="my-5 py-5">
      {product ? (
        <Container>
          <Row>
            <Col lg={5}>
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.image}
                  className="w-100"
                />
              ) : (
                ""
              )}
            </Col>
            <Col lg={4}>
              <div>
                <h4 className="display-6">Item Name: {product.name}</h4>
                <p className="text-muted">Product Price: ${product.price}</p>
                <Ratings
                  ratings={product.rating}
                  numberOfRatings={product.numReviews}
                ></Ratings>
                <p>Description: {product.description}</p>
              </div>
            </Col>
            <Col lg={3}>
              <h5 className="text-center">Your Cart</h5>{" "}
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <td>Item</td>
                    <td>Amount</td>
                    <td>Price</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{product.name}</td>
                    <td>1</td>
                    <td>{product.price}</td>
                  </tr>
                </tbody>
              </Table>
              <Button className="bg-dark">Add to Cart </Button>
            </Col>
          </Row>
        </Container>
      ) : (
        <Alert variant="warning" className="text-center">
          <p> No Such Product Exists !!! Search Another Product</p>
          <h3>
            {" "}
            <Link to="/">Go Back</Link>
          </h3>
        </Alert>
      )}
    </div>
  );
}

export default ProductDetail;
