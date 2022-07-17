import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// Reducers import
import { productListReducer, productDetailsReducer } from "./redux-reducers/productReducers";
import { cartReducer } from "./redux-reducers/cartReducers";
import { userLoginReducer } from "./redux-reducers/userReducers";

// getting data from local storage
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

//initial state
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    userLogin: {
      userInfo: userInfoFromStorage,
    },
  },
};

const persistConfig = {
  key: "cartItems",
  storage,
};

const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const middleware = [thunk];

const store = configureStore({
  reducer: persistedReducer,
  initialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(
      {
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      },
      composeWithDevTools(applyMiddleware(...middleware))
    ),
});

export default store;
