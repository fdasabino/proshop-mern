import { configureStore } from "@reduxjs/toolkit";

const initialState = {};

const store = configureStore({
  reducer: {},
  initialState,
  devTools: process.env.NODE_ENV !== "production", //only show devTools when in production
});
export default store;
