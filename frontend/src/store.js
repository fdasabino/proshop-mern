import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { productListReducer } from "./redux-reducers/productReducers";

const initialState = {};

const reducer = combineReducers({ productList: productListReducer });

const middleware = [thunk];

const store = configureStore(
  {
    reducer,
    initialState,
  },
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;