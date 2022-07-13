import React, { useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, ListGroupItem, Image, Form, Button, Card } from "react-bootstrap";
import Message from "../components/Message";
import { addToCart } from "../redux-actions/cartActions";

const CartScreen = () => {
  const { id } = useParams();
  const productId = id;

  const location = useLocation();
  const qty = new URLSearchParams(location.search).get("qty");

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return <div>CartScreen</div>;
};

export default CartScreen;
