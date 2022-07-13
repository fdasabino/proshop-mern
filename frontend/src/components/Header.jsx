import React from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  return (
    <header className="fixed-top">
      <Navbar
        className="bg-light shadow p-3"
        bg="bg-light"
        variant="light"
        expand="lg"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="mx-5">Proshop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="" />
        </Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-5 text-center">
            <LinkContainer to="/cart">
              <Nav.Link className="mx-auto">
                <FaShoppingCart /> Cart
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link className="mx-auto">
                <FaUser /> Login
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
