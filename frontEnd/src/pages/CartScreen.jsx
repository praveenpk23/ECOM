  import React, { useEffect, useState } from "react";
  import { useSelector,useDispatch } from "react-redux";
  import CartProduct from "../components/CartComp";
  import { updateCartQuantity, removeFromCart } from "../Slice/CartSlice";
  const CartScreen = () => {
    const dispatch = useDispatch();
    // const [total,setTotal] = useState(0);
    // const [isFreeDelivery,setIsFreeDelivery] = useState(false);
    const cart = useSelector((state) => state.cart);
    console.log(cart);
    const deliveryCharge = 59;
  // const totalCalculate = () => {
  //   let subtotal = 0;
  //   cart.forEach((item) => {
  //     subtotal += item.price * item.quantity;
  //   });

  //   let total = subtotal + deliveryCharge;

  //   if (subtotal >= 599) {
  //     setTotal(subtotal); // free delivery
  //     setIsFreeDelivery(true);
  //   } else {
  //     setTotal(total); // normal delivery included
  //     setIsFreeDelivery(false);
  //   }
  // };

  // useEffect(()=>{
  // totalCalculate();
  // },[cart])

    return (
      <div className="container mx-auto p-5 ">
        <h1 className="text-4xl  "> My Cart </h1>

        {cart.cartItem.length > 0 ? (
          <>
            <div className="flex justify-center py-10  items-end flex-wrap-reverse  flex-cols">
              <section className=" py-7 ">
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
              <section className="p-10 mx-4 rounded-2xl bg-green-300">
    <h2 className="text-xl font-bold mb-4">Order Summary</h2>

    {cart.cartItem.map((item) => (
      <p key={item._id}>
        {item.name} = ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
      </p>
    ))}

    {cart.shippingPrice === 0 ? (
      <>
        {/* <p>Subtotal = ₹{total}</p> */}
        <p className="line-through text-red-600">Delivery = ₹{cart.deliveryCharge}</p>
        <p className="text-green-700">Delivery = FREE</p>
        <p>GST(8%) = {cart.taxPrice}</p>
        <p className="font-bold text-lg">Final Total = ₹{cart.totalPrice}</p>
      </>
    ) : (
      <>
        {/* <p>Subtotal = ₹{total - deliveryCharge}</p> */}
        <p>Delivery = ₹{cart.shippingPrice}</p>
        <p>GST(8%) = {cart.taxPrice}</p>
        <p className="font-bold text-lg">Final Total = ₹{cart.totalPrice}</p>
      </>
    )}
    <div className="mt-4">
    <div className="flex items-center mb-3">
      <input type="checkbox" checked readOnly className="mr-2" />
      <label>Cash on Delivery (Default)</label>
    </div>
    <button
      onClick={() =>
        dispatch(
          createOrder({
            cart,
            paymentMethod: "COD",
          })
        )
      }
      className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700"
    >
      Buy Now
    </button>
  </div>

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
