import React, { useEffect } from "react";
import { Alert, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../redux/actions/orderActions";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "./Loader";

function OrderList() {
  const orderList = useSelector((state) => state.orderlist);
  const { loading: loadingOrders, error: errorOrders, orders } = orderList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  return (
    <div>
      {" "}
      <h2>My Orders</h2>
      {loadingOrders ? (
        <Loader />
      ) : errorOrders ? (
        <Alert variant="danger">{errorOrders}</Alert>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/orders/${order._id}`}>
                    <Button className="btn-sm" variant="light">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default OrderList;
