import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
  Card,
  Button,
  ListGroupItem,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import {
  createOrder,
  getOrderDetails,
  payOrder,
} from "../redux/actions/orderActions";
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET } from "../redux/constants/OrderConstants";

function OrderScreen() {
  const { id: orderId } = useParams();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.userLogin.userInfo);
  const orderDetails = useSelector((state) => state.orderDetails);

  const [sdkReady, setSdkReady] = useState(false);

  const { loading, error, order } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const addPayPalScript = async () => {
    const { data: clientId } = await axios.get("/api/config/paypal");

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      }
    } else {
      setSdkReady(true);
    }
  }, [dispatch, orderId, successPay, order]);

  //   Calculate prices

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  return loading ? (
    "loading"
  ) : error ? (
    <Alert variant="danger">{error}</Alert>
  ) : (
    <>
      <Container>
        <div className="mt-5">
          <h3>Order {order._id}</h3>
        </div>

        <Row className="my-5">
          <Col md={6}>
            <ListGroup>
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  {" "}
                  <strong>Name: </strong>
                  {order.user.name}
                </p>
                <p>
                  {" "}
                  <strong>Email: </strong>
                  {order.user.email}
                </p>
                <p>
                  <strong>Address: </strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p className="my-2">
                  <strong>Method: </strong>
                </p>
                <p className="my-3">{order.paymentMethod}</p>
                {order.isPaid ? (
                  <Alert variant="success">Paid on {order.paidAt}</Alert>
                ) : (
                  <Alert variant="danger">Not Paid</Alert>
                )}
              </ListGroup.Item>
            </ListGroup>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Alert variant="danger">Your cart is empty</Alert>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}

                  {order.isDelivered ? (
                    <Alert variant="success">
                      Delivered on {order.isDeliveredAt}
                    </Alert>
                  ) : (
                    <Alert variant="danger">Not Delivered </Alert>
                  )}
                </ListGroup>
              )}
            </ListGroup.Item>
          </Col>
          {/* ///////////////////////////////// list ///////////////////////////////// */}

          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${order.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>${order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                {!order.isPaid && (
                  <ListGroup.Item>
                    {loadingPay && "loading"}
                    {!sdkReady ? (
                      "loading"
                    ) : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default OrderScreen;