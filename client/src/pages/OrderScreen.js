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
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import {
  deliverOrder,
  getOrderDetails,
  payOrder,
} from "../redux/actions/orderActions";
import { PayPalButton } from "react-paypal-button-v2";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVERY_RESET,
} from "../redux/constants/OrderConstants";
import Loader from "../components/Loader";

function OrderScreen() {
  const { id: orderId } = useParams();
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  const [sdkReady, setSdkReady] = useState(false);

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDelivery);

  const { success: successDeliver } = orderDeliver;

  const user = useSelector((state) => state.userLogin);
  const { userInfo } = user;

  // paypal step 1
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  console.log(isPending);

  //paypal step2
  const loadPayPalScript = async () => {
    const { data } = await axios.get("/api/config/paypal");

    paypalDispatch({
      type: "resetOptions",
      value: {
        "client-id": data,
        currency: "USD",
      },
    });
    paypalDispatch({
      type: "setLoadingStatus",
      value: "pending",
    });
  };

  const addPayPalScript = async () => {
    const { data } = await axios.get("/api/config/paypal");

    paypalDispatch({
      type: "resetOptions",
      value: {
        "client-id": data,
        currency: "USD",
      },
    });
    paypalDispatch({
      type: "setLoadingStatus",
      value: "pending",
    });

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVERY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      }
    } else {
      setSdkReady(true);
    }
  }, [dispatch, orderId, successPay, order, successDeliver]);

  //   Calculate prices

  //handle delivery

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
              currency_code: "USD",
            },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const onError = (err) => {
    return Window.Alert(err);
  };

  return (
    <>
      {loading ? (
        <Loader />
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
                {" "}
                <ListGroup>
                  <ListGroup.Item>
                    <h3>Shipping</h3>
                    <p>
                      {" "}
                      <strong>Name: </strong>
                      {order ? order.user.name : ""}
                    </p>
                    <p>
                      {" "}
                      <strong>Email: </strong>
                      {order ? order.user.email : ""}
                    </p>
                    <p>
                      <strong>Address: </strong>
                      {order.shippingAddress.address},{" "}
                      {order.shippingAddress.city}
                      {order.shippingAddress.postalCode},{" "}
                      {order.shippingAddress.country}
                    </p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h3>Payment Method</h3>
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
                  <h3>Order Items</h3>
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
                              {item.qty} x ${item.price} = $
                              {item.qty * item.price}
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
                      <h3>Order Summary</h3>
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
                        {loadingPay && <Loader />}
                        {!sdkReady ? (
                          <Loader />
                        ) : (
                          // <PayPalButton
                          //   amount={order.totalPrice}
                          //   onSuccess={successPaymentHandler}
                          // />
                          <PayPalButtons
                            createOrder={createOrder}
                            onApprove={successPaymentHandler}
                            onError={onError}
                          />
                        )}
                      </ListGroup.Item>
                    )}
                  </ListGroup>

                  {userInfo.user.isAdmin && order.isPaid && !order.isDelivered && (
                    <ListGroup.Item>
                      <Button
                        type="button"
                        className="btn btn-block"
                        onClick={deliverHandler}
                      >
                        Mark as delivered
                      </Button>
                    </ListGroup.Item>
                  )}
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
}

export default OrderScreen;
