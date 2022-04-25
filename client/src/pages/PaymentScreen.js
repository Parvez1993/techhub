import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../redux/actions/cartActions";

function PaymentScreen() {
  const cart = useSelector((state) => state.cart);
  const { shipping } = cart;
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  if (!shipping) {
    navigate("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod({ paymentMethod }));
    navigate("/placeorder");
  };
  return (
    <>
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <div className="my-5">
          <h1>Payment</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="method">
              <Form.Label>Select method</Form.Label>
              <Form.Check
                type="radio"
                label="paypal or credit card"
                id="paypal"
                name="paymentMethod"
                value="payPal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <Form.Check
                type="radio"
                label="Stripe"
                id="paypal"
                name="paymentMethod"
                value="Stripe"
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary" className="my-3">
              Continue
            </Button>
          </Form>
        </div>
      </FormContainer>
    </>
  );
}

export default PaymentScreen;
