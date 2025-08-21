import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {cartItem:[]}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,action)=>{
          const {product,quantity} = action.payload
            const existProduct = state.cartItem.find((item)=>item._id === product._id);
            if(existProduct){
                const value = existProduct.quantity + quantity
                if(value > existProduct.countInStock){
                       existProduct.quantity = existProduct.countInStock
                }else{
                    existProduct.quantity += quantity
                }
            }else{
                state.cartItem.push({ ...product, quantity });
            }

            // Save to localStorage
            localStorage.setItem("cart", JSON.stringify(state));
            // localStorage.setItem("cart", JSON.stringify({cartItem:state.cartItem}));
           
      },
      updateCartQuantity:(state,action)=>{
            const {id,qty} = action.payload;

           state.cartItem = state.cartItem.map((product)=>(
            product._id === id ? {...product,quantity:qty} : product
           ))
            // Save to localStorage
            localStorage.setItem("cart", JSON.stringify(state));
      },
      removeFromCart:(state,action)=>{
       state.cartItem = state.cartItem.filter((product)=> product._id != action.payload);
       
            // Save to localStorage
            localStorage.setItem("cart", JSON.stringify(state));
        
      }
    }

})

export default cartSlice.reducer;
export const {addToCart,updateCartQuantity,removeFromCart} = cartSlice.actions;
