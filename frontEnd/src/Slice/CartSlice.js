import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
import toast from "react-hot-toast";
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItem: [] };

const orderCalculate = (state) => {
  state.deliveryCharge = 59;
  state.gstPercentage = 18;

  state.itemPrice = state.cartItem.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  state.shippingPrice = state.itemPrice >= 499 ? 0 : state.deliveryCharge;
  state.taxPrice = Number(
    ((state.gstPercentage / 100) * state.itemPrice).toFixed(2)
  );
  state.totalPrice = Number(
    (state.itemPrice + state.taxPrice + state.shippingPrice).toFixed(2)
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existProduct = state.cartItem.find(
        (item) => item._id === product._id
      );
      if (existProduct) {
        const value = existProduct.quantity + quantity;
        if (value > existProduct.countInStock) {
          existProduct.quantity = existProduct.countInStock;
        } else {
          existProduct.quantity += quantity;
        }
      } else {
        state.cartItem.push({ ...product, quantity });
      }

      orderCalculate(state);
      toast.success("Product added to cart !");
    },
    updateCartQuantity: (state, action) => {
      const { id, qty } = action.payload;

      state.cartItem = state.cartItem.map((product) =>
        product._id === id ? { ...product, quantity: qty } : product
      );
      orderCalculate(state);
    },
    removeFromCart: (state, action) => {
      state.cartItem = state.cartItem.filter(
        (product) => product._id != action.payload
      );
      orderCalculate(state);

      toast.error("Item deleted from cart");
    },
    removeWholeCart:(state,action)=>{
      state.cartItem = []
      localStorage.removeItem("cart");
      // orderCalculate(state);
    }
  },
});

export default cartSlice.reducer;
export const { addToCart, updateCartQuantity, removeFromCart,removeWholeCart } =
  cartSlice.actions;
