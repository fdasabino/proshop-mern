import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../redux-actions/cartActions";

import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentMethodScreen = ({ toast }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  const navigate = useNavigate();

  const { shippingAddress } = cart;
  if (!shippingAddress) {
    navigate("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  const submitHandler = (e) => {
    e.preventDefault();
    if (!userInfo) {
      navigate("/login");
      toast.info("You need to be logged in to continue...");
    } else {
      dispatch(savePaymentMethod(paymentMethod));
      navigate("/login?redirect=/placeorder");
    }
  };

  return (
    <Row>
      <Col>
        <FormContainer>
          <CheckoutSteps step1 step2 step3 userInfo={userInfo} />
          <h1>Payment Method</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label as="legend">Select Payment Method</Form.Label>
            </Form.Group>
            <Col>
              <Form.Check
                type="radio"
                label="Paypal or Credit Card"
                id="Paypal"
                name="paymentMethod"
                value="Paypal"
                onChange={(e) => setPaymentMethod(e.target.value)}
                checked
              ></Form.Check>
            </Col>
            <hr />
            <Button type="submit" variant="primary">
              Continue
            </Button>
          </Form>
        </FormContainer>
      </Col>
    </Row>
  );
};

export default PaymentMethodScreen;
