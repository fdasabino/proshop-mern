import React from "react";
import { Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";

//components
import Header from "./components/Header";
import Footer from "./components/Footer";

//screens
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";

const App = () => {
  return (
    <>
      <Header toast={toast} />
      <main>
        <Container>
          <ToastContainer
            position="top-center"
            theme="dark"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Routes>
            <Route exact path="/" element={<HomeScreen toast={toast} />} />
            <Route path="/product/:id" element={<ProductScreen toast={toast} />} />
            <Route path="/cart">
              <Route path=":id" element={<CartScreen toast={toast} />} />
              <Route path="" element={<CartScreen toast={toast} />} />
            </Route>
            <Route path="/login" element={<LoginScreen toast={toast} />} />
            <Route path="/register" element={<RegisterScreen toast={toast} />} />
            <Route path="/profile" element={<ProfileScreen toast={toast} />} />
            <Route path="/shipping" element={<ShippingScreen toast={toast} />} />
            <Route path="/payment" element={<PaymentMethodScreen toast={toast} />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
