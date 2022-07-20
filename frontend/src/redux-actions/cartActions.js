import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";
import { toast } from "react-toastify";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch(
    {
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    },
    toast.success(`Added ${qty} x ${data.name} to cart`)
  );
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: id });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  toast.error("Item removed from cart...");
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
  toast.success("Shipping address added successfully...");
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
  localStorage.setItem("paymentMethod", JSON.stringify(data));
  toast.success(`Payment method selected: ${data}`);
};
