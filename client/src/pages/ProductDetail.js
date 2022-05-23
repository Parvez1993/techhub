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
import {
  createProductReview,
  detailProducts,
} from "../redux/actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../redux/constants/ProductConstants";
function ProductDetail() {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;
  const [render, setRender] = useState(false);

  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.userLogin.userInfo);
  const productReviewCreate = useSelector((state) => state.productCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
    }
    if (!product || !product._id || product._id !== id) {
      dispatch(detailProducts(id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }

    if (render) {
      setRender(false);
    }
  }, [dispatch, id, successProductReview]);

  if (loading) {
    return <h2>Loading</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    );

    setRender(true);
  };
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

          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Alert>No Reviews</Alert>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Ratings
                      ratings={review.rating}
                      numberOfRatings={product.numReviews}
                    />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {successProductReview && (
                    <Alert variant="success">
                      Review submitted successfully
                    </Alert>
                  )}
                  {loadingProductReview && "loading......"}
                  {errorProductReview && (
                    <Alert variant="danger">{errorProductReview}</Alert>
                  )}
                  {user.user ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type="submit"
                        variant="primary"
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Alert>
                      Please <Link to="/login">sign in</Link> to write a review{" "}
                    </Alert>
                  )}
                </ListGroup.Item>
              </ListGroup>
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
