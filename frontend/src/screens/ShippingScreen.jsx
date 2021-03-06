import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../redux-actions/cartActions";

import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = ({ toast }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress?.address);
  const [city, setCity] = useState(shippingAddress?.city);
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode);
  const [country, setCountry] = useState(shippingAddress?.country);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!userInfo) {
      navigate("/login");
      toast.info("You need to be logged in to continue...");
    } else {
      dispatch(saveShippingAddress({ address, city, postalCode, country }));
      navigate("/login?redirect=/payment");
    }
  };

  return (
    <Row>
      <Col md={12} sm={12}>
        <FormContainer>
          <CheckoutSteps step1 step2 userInfo={userInfo} />
          <h1>Shipping Details</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Form.Group>
            <hr />
            <Form.Group controlId="address">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </Form.Group>
            <hr />
            <Form.Group controlId="address">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Postal Code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </Form.Group>
            <hr />
            <Form.Group controlId="address">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </Form.Group>
            <hr />
            <Button type="submit" variant="primary">
              Continue to Payment
            </Button>
          </Form>
        </FormContainer>
      </Col>
    </Row>
  );
};

export default ShippingScreen;
