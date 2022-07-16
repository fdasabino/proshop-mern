import React, { useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaRegHeart, FaRegTrashAlt, FaLongArrowAltRight } from "react-icons/fa";
import { Row, Col, ListGroup, ListGroupItem, Image, Form, Button, Card } from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../redux-actions/cartActions";

const CartScreen = () => {
  const { id } = useParams();
  const productId = id;

  const location = useLocation();
  const qty = new URLSearchParams(location.search).get("qty");

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const navigate = useNavigate();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
      navigate("/cart");
    }
  }, [dispatch, productId, qty, navigate]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    navigate("/cart");
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <>
      <h1>Shopping Cart</h1>
      <Row className="text-center">
        {cartItems.length === 0 ? (
          <Col md={12}>
            <Image
              fluid
              src="https://res.cloudinary.com/frank2021/image/upload/v1657797774/proshop/empty-cart_fzakua.png"
              alt="empty-cart"
            />
            <Message variant="info" className="text-center">
              Your Cart is Empty! <br /> But it doesn't have to be! <br />
              <Link to="/">
                Back to products <FaRegHeart color="red" />
              </Link>
            </Message>
          </Col>
        ) : (
          <>
            {/* left colum */}
            <Col sm={12} md={8}>
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroupItem key={item.product}>
                    <Row>
                      <Col md={2}>
                        <Button
                          type="button"
                          variant="secondary"
                          className="my-1 btn-secondary mx-2"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <FaRegTrashAlt color="red" />
                        </Button>
                      </Col>
                      <Col md={2} className="my-1">
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={3} className="my-1">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={2} className="my-1">
                        ${item.price}
                      </Col>
                      <Col md={2}>
                        <Form.Select
                          className="bg-light form_select"
                          as="select"
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(addToCart(item.product, Number(e.target.value)))
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Col>

            {/* Right column */}
            <Col sm={12} md={4}>
              <hr />
              <h2 className="mb-2">Order Summary</h2>
              <hr />
              <Card>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    {/* cart items */}
                    <div className="d-flex justify-content-start align-items-center">
                      <div className="">
                        <h2>Your cart:</h2>
                      </div>
                      <FaLongArrowAltRight className="mx-3" />
                      <div className="">
                        <h2>({cartItems.reduce((acc, item) => acc + Math.round(item.qty), 0)})</h2>
                      </div>
                    </div>
                    <hr />
                    {/* subtotal */}
                    <div className="d-flex justify-content-start align-items-center">
                      <div className="">
                        <h2>Subtotal:</h2>
                      </div>
                      <FaLongArrowAltRight className="mx-3" />
                      <div className="">
                        <h2>
                          $
                          {cartItems
                            .reduce((acc, item) => acc + item.qty * item.price, 0)
                            .toFixed(2)}
                        </h2>
                      </div>
                    </div>
                    <hr />
                    {/* button */}
                    <Button
                      type="button"
                      className="btn-block"
                      disabled={cartItems.length === 0}
                      onClick={checkoutHandler}
                    >
                      Proceed to Checkout
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </>
        )}
      </Row>
    </>
  );
};

export default CartScreen;
