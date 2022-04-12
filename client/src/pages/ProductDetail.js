import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";
import Ratings from "../components/Ratings";
import { useDispatch, useSelector } from "react-redux";
import { detailProducts } from "../redux/actions/productActions";

function ProductDetail() {
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const productDetail = useSelector((state) => state.productDetail);

  const cart = useSelector((state) => state.cart);

  console.log(cart);
  const { loading, error, product } = productDetail;

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  useEffect(() => {
    dispatch(detailProducts(id));
  }, [dispatch, id]);

  if (loading) {
    return <h2>Loading</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }
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
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
              <Button className="bg-dark" onClick={addToCartHandler}>
                Add to Cart{" "}
              </Button>
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
