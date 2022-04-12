import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";

function Product({ product }) {
  const { _id, image, name, rating, numReviews, price } = product;

  return (
    <Card style={{ width: "18rem" }}>
      <Link to={`/products/${_id}`}>
        <Card.Img variant="top" src={image} />
      </Link>

      <Card.Body>
        <Card.Title>{name}</Card.Title>

        <Ratings ratings={rating} numberOfRatings={numReviews}></Ratings>
      </Card.Body>

      <Card.Body>
        <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>${price}</p>
      </Card.Body>
    </Card>
  );
}

export default Product;
