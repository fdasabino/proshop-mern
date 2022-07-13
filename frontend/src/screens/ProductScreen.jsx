import React, { useEffect } from "react";
import Rating from "../components/Rating";
import LoadingSpinner from "../components/LoadingSpinner";
import Message from "../components/Message";

import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../redux-actions/productActions";
import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button, ListGroupItem } from "react-bootstrap";

const ProductScreen = () => {
  const params = useParams();

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(params.id));
  }, [dispatch, params.id]);

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
              <ListGroupItem>
                <Button className="btn-block" type="button" disabled={product.countInStock === 0}>
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
