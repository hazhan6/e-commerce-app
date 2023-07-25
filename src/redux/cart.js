import { getFromLocalStorage, saveToLocalStorage } from "../utils";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  cart: getFromLocalStorage("cart"),
  totalItem: 0,
};

const carts = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      const cartItem = {
        ...action.payload.product,
        quantity: action.payload.quantity,
      };
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === cartItem.id
      );

      if (existingItemIndex !== -1) {
        state.cart[existingItemIndex].quantity += cartItem.quantity;
      } else {
        state.cart.push(cartItem);
      }

      saveToLocalStorage({ key: "cart", data: state.cart });
    },
    updateCart: (state, action) => {
      const { id, quantity } = action.payload;
      const cartItem = state.cart.find((item) => item.id === id);
      if (cartItem) {
        cartItem.quantity = quantity;
        saveToLocalStorage({ key: "cart", data: state.cart });
      }
    },
    deleteProductFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      saveToLocalStorage({ key: "cart", data: state.cart });
    },
    clearCart: (state) => {
      state.cart = [];
      saveToLocalStorage({ key: "cart", data: state.cart });
    },
    getCartTotal: (state) => {
      state.totalItem = state.cart.length;
    },
  },
});

export const {
  addProductToCart,
  updateCart,
  deleteProductFromCart,
  clearCart,
  getCartTotal,
} = carts.actions;
export default carts.reducer;
