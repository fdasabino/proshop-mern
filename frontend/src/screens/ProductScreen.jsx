import React from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button, ListGroupItem } from "react-bootstrap";
import Rating from "../components/Rating";
import products from "../products";

const ProductScreen = () => {
  const params = useParams();
  const product = products.find((p) => p._id === params.id);
  return (
    <>
      <Link className="btn btn-secondary my-3" to="/">
        Go Back
      </Link>
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
    </>
  );
};

export default ProductScreen;
