import React, { useState, useEffect } from "react";
import Rating from "../components/Rating";
import LoadingSpinner from "../components/LoadingSpinner";
import Message from "../components/Message";

import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../redux-actions/productActions";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Image, Button, ListGroupItem, Form } from "react-bootstrap";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <>
      <Link className="btn btn-secondary my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h3>{product.name}</h3>
              </ListGroupItem>
              <ListGroupItem>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
              </ListGroupItem>
              <ListGroupItem>
                <h5>${product.price}</h5>
              </ListGroupItem>
              <ListGroupItem>
                <small>
                  <strong>{product.description}</strong>
                </small>
              </ListGroupItem>
              <ListGroupItem>
                {product.countInStock > 0 ? (
                  <h5> In Stock</h5>
                ) : (
                  <h5 className="text-danger"> Out of Stock</h5>
                )}
              </ListGroupItem>
              {product.countInStock > 0 && (
                <ListGroupItem>
                  <Row>
                    <Col className="pt-2">Quantity:</Col>
                    <Col>
                      <Form.Select
                        className="bg-light form_select"
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} defaultValue={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Row>
                </ListGroupItem>
              )}
              <ListGroupItem>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
