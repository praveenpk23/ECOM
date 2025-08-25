  import React, { useEffect, useState } from "react";
  import { useSelector,useDispatch } from "react-redux";
  import CartProduct from "../components/CartComp";
  import { updateCartQuantity, removeFromCart } from "../Slice/CartSlice";
  const CartScreen = () => {
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    console.log(cart);
    const deliveryCharge = 59;
 
    const state = useSelector((state)=>state.cart)

    useEffect(()=>{
      console.log("USEef")
        localStorage.setItem("cart", JSON.stringify(state));
    },[state])

    return (
      <div className="container mx-auto p-5 ">
        <h1 className="text-4xl font-bold text-center "> Our Cart </h1>

        {cart.cartItem.length > 0 ? (
          <>
            <div className="flex justify-center py-10  items-end flex-wrap-reverse  flex-cols">
              <section className="py-10 xl:py-0  ">
                <div className="grid grid-cols-1">
                  {/* {cart.length > 0 && (
                    
                  )} */}
                  <>
                      {cart.cartItem.map((product) => (
                        <CartProduct
                          product={product}
                          onQuantityChange={(id, qty) =>dispatch(updateCartQuantity({ id, qty }))}
                          onRemove={(id) => dispatch(removeFromCart(id))}
                          key={product._id} 
                        />
                      ))}
                    </>
                </div>
              </section> 
<section className="p-8 mx-4 rounded-2xl bg-gray-900 text-gray-100 shadow-xl border border-gray-700">
  <h2 className="text-2xl font-bold mb-6 text-center text-green-400">Order Summary</h2>

  <div className="space-y-3 mb-6">
    {cart.cartItem.map((item) => (
      <div
        key={item._id}
        className="flex justify-between items-center text-sm border-b border-gray-700 pb-2"
      >
        <span className="font-medium text-gray-300 px-2">{item.name}</span>
        <span className="text-gray-400">
          ₹{item.price} × {item.quantity}
        </span>
        <span className="font-semibold text-gray-200 px-1">
          ₹{item.price * item.quantity}
        </span>
      </div>
    ))}
  </div>

  <div className="space-y-2 text-sm mb-6">
    {cart.shippingPrice === 0 ? (
      <>
        <p className="flex justify-between">
          <span className=" text-red-500">Delivery</span>
          <span className="line-through text-red-500">₹{cart.deliveryCharge}</span>
        </p>
        <p className="flex justify-between font-medium text-green-400">
          <span>Delivery</span>
          <span>FREE</span>
        </p>  
        <p className="flex justify-between text-gray-300">
          <span>GST ({cart.gstPercentage}%)</span>
          <span>₹{cart.taxPrice}</span>
        </p>
      </>
    ) : (
      <>
        <p className="flex justify-between text-gray-300">
          <span>Delivery</span>
          <span>₹{cart.shippingPrice}</span>
        </p>
        <p className="flex justify-between text-gray-300">
          <span>GST ({cart.gstPercentage}%)</span>
          <span>₹{cart.taxPrice}</span>
        </p>
      </>
    )}
  </div>

  <div className="flex justify-between items-center border-t border-gray-700 pt-4 mb-6">
    <span className="font-bold text-lg text-gray-200">Final Total</span>
    <span className="font-extrabold text-2xl text-green-400">
      ₹{cart.totalPrice}
    </span>
  </div>

  {/* Payment Method */}
  <div className="mb-6">
    <label className="flex items-center gap-2 text-gray-300">
      <input
        type="checkbox"
        checked
        readOnly
        className="w-4 h-4 text-green-500 rounded focus:ring-green-400"
      />
      Cash on Delivery (Default)
    </label>
  </div>

  {/* Buy Now Button */}
  <button
    onClick={() =>
      dispatch(
        createOrder({
          cart,
          paymentMethod: "COD",
        })
      )
    }
    className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 font-semibold text-lg shadow-lg transition"
  >
    Buy Now
  </button>
</section>


            </div>
          </>
        ) : (
          <>
         <div className="flex justify-center items-center pt-10">
           <div className="max-w-3xl mx-auto inline-block text-center ">
            <div role="alert" className="alert alert-error px-10 ">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Cart is empty , no items in cart.</span>
        </div>
          </div>
         </div>
          </>
        )}
      </div>
    );
  };

  export default CartScreen;
