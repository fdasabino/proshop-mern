import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Row, Col, ListGroup, Image, Card, Button, ListGroupItem } from "react-bootstrap";
import Rating from "../components/Rating";

const ProductScreen = () => {
  const [product, setProduct] = useState({});
  const params = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${params.id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [params.id]);

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
