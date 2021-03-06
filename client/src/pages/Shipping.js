import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../redux/actions/cartActions";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
function Shipping() {
  const cart = useSelector((state) => state);
  const { shipping } = cart;
  const [address, setAddress] = useState(shipping?.address);
  const [city, setCity] = useState(shipping?.address);
  const [postalCode, setPostalCode] = useState(shipping?.postalCode);
  const [country, setCountry] = useState(shipping?.country);

  const navigate = useNavigate("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <>
      <div style={{ minHeight: "70vh" }}>
        <FormContainer>
          <CheckoutSteps step1 step2 />
          <h1>Shipping</h1>
          <Form onSubmit={submitHandler} className="my-5">
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="postalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter postal code"
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country"
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Continue
            </Button>
          </Form>
        </FormContainer>
      </div>
    </>
  );
}

export default Shipping;
