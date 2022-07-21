import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShippingFast, FaMoneyBillWave, FaListAlt } from "react-icons/fa";
import { Button, Row, Col, ListGroup, Image, Card, Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { Link } from "react-router-dom";

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);

  //calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  //shipping
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10);

  //shipping
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));

  //total payable
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const placeOrderHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 userInfo />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Shipping details <FaShippingFast />
              </h2>
              <br />
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}
              </p>
              <p>
                <strong>City: </strong>
                {cart.shippingAddress.city}
              </p>
              <p>
                <strong>Postal Code: </strong>
                {cart.shippingAddress.postalCode}
              </p>
              <p>
                <strong>Country: </strong>
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <br />
            <ListGroup.Item>
              <h2>
                Payment Method <FaMoneyBillWave />
              </h2>
              <br />
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>
            <br />
            <ListGroup.Item>
              <h2>
                Items <FaListAlt />
              </h2>
              <br />
              {cart.cartItems.length === 0 ? (
                <Message>Your Cart is empty</Message>
              ) : (
                <Accordion flush>
                  <Accordion.Item>
                    <Accordion.Header>Review your order</Accordion.Header>
                    <Accordion.Body>
                      <ListGroup variant="flush">
                        {cart.cartItems.map((item, index) => (
                          <ListGroup.Item key={index}>
                            <Row className="text-center">
                              <Col md={1}>
                                <Image src={item.image} alt={item.name} fluid rounded />
                              </Col>
                              <Col>
                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                              </Col>
                              <Col md={4}>
                                {item.qty} x ${item.price} = ${item.qty * item.price}
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card variant="">
            <ListGroup>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>$ {cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>$ {cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>$ {cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Payable:</Col>
                  <Col>$ {cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Button
                    className="btn btn-block"
                    disabled={cart.cartItems.length === 0}
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </Button>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
