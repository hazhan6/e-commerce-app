import { configureStore } from "@reduxjs/toolkit";
import products from "./products";
import cart from "./cart";
import auth from "./auth";
import user from "./user";

export const store = configureStore({
  reducer: {
    products: products,
    cart: cart,
    auth: auth,
    user: user,
  },
});
