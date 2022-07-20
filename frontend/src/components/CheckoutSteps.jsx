import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ step1, step2, step3, step4, userInfo }) => {
  return (
    <>
      <hr />
      <Nav className="justify-content-center flex-nowrap py-4 px-0 m-0">
        <Nav.Item className="px-0 m-0">
          {step1 ? (
            <LinkContainer to={userInfo ? "/cart" : "/login"}>
              <Nav.Link>{userInfo ? <small>Cart</small> : <small>Login</small>}</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Login</Nav.Link>
          )}
        </Nav.Item>

        <Nav.Item className="px-0 m-0">
          {step2 ? (
            <LinkContainer to="/shipping">
              <Nav.Link>
                <small>Shipping Details</small>
              </Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Shipping Details/</Nav.Link>
          )}
        </Nav.Item>

        <Nav.Item className="px-0 m-0">
          {step3 ? (
            <LinkContainer to="/payment">
              <Nav.Link>
                <small>Payment Method</small>
              </Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>
              <small>Payment Method</small>
            </Nav.Link>
          )}
        </Nav.Item>

        <Nav.Item className="px-0 m-0">
          {step4 ? (
            <LinkContainer to="/placeorder">
              <Nav.Link>
                <small>Order</small>
              </Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>
              <small>Complete Order</small>
            </Nav.Link>
          )}
        </Nav.Item>
      </Nav>
      <hr />
    </>
  );
};

export default CheckoutSteps;
