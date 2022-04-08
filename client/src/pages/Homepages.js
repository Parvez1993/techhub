import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import products from "../products";

function Homepages() {
  return (
    <>
      <Container>
        <Row>
          {products.map((item, k) => {
            return (
              <Col key={k} className="my-5">
                {" "}
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      {item.rating} | {item.numReviews} reviews
                    </Card.Text>
                  </Card.Body>

                  <Card.Body>
                    <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      ${item.price}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default Homepages;
