import React from "react";
import { Container } from "react-bootstrap";
import Swal from "sweetalert2";
import { Routes, Route } from "react-router-dom";

//components
import Header from "./components/Header";
import Footer from "./components/Footer";

//screens
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";

const toast = Swal.mixin({
  toast: true,
  position: "top-start",
  timer: 6000,
  timerProgressBar: true,
  showConfirmButton: false,
});

const App = () => {
  return (
    <>
      <Header toast={toast} />
      <main>
        <Container>
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart">
              <Route path=":id" element={<CartScreen />} />
              <Route path="" element={<CartScreen />} />
            </Route>
            <Route path="/login" element={<LoginScreen toast={toast} />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
