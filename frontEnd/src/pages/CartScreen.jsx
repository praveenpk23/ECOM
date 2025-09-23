import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartProduct from "../components/CartComp";
import CartProductFromDB from "../components/CartCompFromDB";
import { updateCartQuantity, removeFromCart , removeWholeCart } from "../Slice/CartSlice";
import { useNavigate } from "react-router-dom";
import { useGetUserProfileQuery } from "../Slice/userApiSlice";
import {
  useGetCartQuery,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
} from "../Slice/cartApiSlice";
import { useCreateOrderMutation } from '../Slice/orderApiSlice'
import toast from "react-hot-toast";
const CartScreen = () => {
  const dispatch = useDispatch();

  const {
    data,
    isLoading: loading,
    error,
    isError,
    refetch,
  } = useGetUserProfileQuery();
  const {
    data: cartData,
    isLoading,
    error: isCartError,
    refetch: isCartRefetch,
  } = useGetCartQuery();
  const [updateCartItem] = useUpdateCartItemMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();
  const [createOrder, {isLoading:orderCreatingLoad}] = useCreateOrderMutation();
  console.log("cartData from CartScreen", cartData);
  const cart = useSelector((state) => state.cart);
  // const data = useSelector((state) => state.user.value);
  // console.log(cart);
  const deliveryCharge = 59;

  // const state = useSelector((state)=>state.cart)
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleUpdate = async (item, qty) => {
    try {
      console.log("updating cart item", item, qty);
      await updateCartItem({ id: item, quantity: qty }).unwrap();
      toast.success("Cart updated");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (itemId) => {
    console.log(itemId, "item deleted");
    try {
      await deleteCartItem(itemId).unwrap();
      dispatch(removeWholeCart());

      toast.success("Item removed from cart");
    } catch (err) {
      console.log(err);
    }
  };

  // const handleOrder = async (cart, paymentMethod) => {
  //   if (data) {
  //     if(data?.shippingDetails?.address){
  //             console.log("handle Ordering", data, cart, paymentMethod);
  //     }else{
  //     navigate("/profile?redirect=cart");
  //     }
  //   } else {
  //     navigate("/login?redirect=cart");
  //   }
  // };

   const handleOrder = async (cart,paymentMethod) => {
    // const orderData = {
    //   items: [cart.items.map((v)=>{return {productId:v.productId._id , quantity:v.productId.quantity , price:v.productId.price}})],
    //   shippingAddress: {
    //     fullName: data.name,
    //     addressLine1: data.shippingDetails.address,
    //     // addressLine2: 'Apt 4B',
    //     city: data.shippingDetails.city,
    //     state: data.shippingDetails.state,
    //     pincode: data.shippingDetails.pincode,
    //     country: data.shippingDetails.country,
    //     phone: data.shippingDetails.phoneNumber
    //   },
    //   itemPrice: cart.itemPrice,
    //   shippingPrice: cart.shippingPrice,
    //   taxPrice: cart.taxPrice,
    //   totalPrice: cart.totalPrice,
    //   paymentMethod: paymentMethod,
    //   // isPaid: true,
    //   // paidAt: new Date().toISOString()
    // };
   const orderData = {
  items: cart.items.map(v => ({
    productId: typeof v.productId === 'string' ? v.productId : v.productId._id,
    quantity: v.quantity,
    price: v.productId.price || v.price // fallback if price is stored at v.price
  })),
  shippingAddress: {
    fullName: data.name,
    addressLine1: data.shippingDetails.address,
    city: data.shippingDetails.city,
    state: data.shippingDetails.state,
    pincode: data.shippingDetails.pincode,
    country: data.shippingDetails.country,
    phone: data.shippingDetails.phoneNumber
  },
  itemPrice: cart.itemPrice,
  shippingPrice: cart.shippingPrice,
  taxPrice: cart.taxPrice,
  totalPrice: cart.totalPrice,
  paymentMethod: paymentMethod
};

    console.log(orderData)
    try {
      const newOrder = await createOrder(orderData).unwrap();
      toast.success("Order Place , Thank you !")
      isCartRefetch();
      console.log('Order created:', newOrder);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {loading || isLoading ? (
        <div>
          <p>Loading....</p>
        </div>
      ) : (
        <>
          {data && cartData ? (
            <>
              {cartData?.items.length === 0 ? (
                <>
                  <div className="flex justify-center items-center pt-10">
                    <div className="max-w-3xl mx-auto inline-block text-center ">
                      <div role="alert" className="alert alert-error px-10 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 shrink-0 stroke-current"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>Cart is empty , no items in cart.</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-center py-10  items-end flex-wrap-reverse  flex-cols">
                    <section className="py-10 xl:py-0  ">
                      <div className="grid grid-cols-1">
                        {/* {cart.length > 0 && (
                    
                  )} */}
                        <>
                          {cartData?.items.map((product) => (
                            <CartProductFromDB
                              product={product}
                              onQuantityChange={(id, qty) =>
                                handleUpdate(id, qty)
                              }
                              onRemove={(id) => handleDelete(id)}
                              key={product._id}
                            />
                          ))}
                        </>
                      </div>
                    </section>
                    <section className="p-8 mx-4 rounded-2xl bg-gray-900 text-gray-100 shadow-xl border border-gray-700">
                      <h2 className="text-2xl font-bold mb-6 text-center text-green-400">
                        Order Summary
                      </h2>

                      <div className="space-y-3 mb-6">
                        {cartData?.items.map((item) => (
                          <div
                            key={item._id}
                            className="flex justify-between items-center text-sm border-b border-gray-700 pb-2"
                          >
                            <span className="font-medium text-gray-300 px-2">
                              {item.productId.name}
                            </span>
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
                        {cartData?.shippingPrice === 0 ? (
                          <>
                            <p className="flex justify-between">
                              <span className=" text-red-500">Delivery</span>
                              <span className="line-through text-red-500">
                                ₹59
                              </span>
                            </p>
                            <p className="flex justify-between font-medium text-green-400">
                              <span>Delivery</span>
                              <span>FREE</span>
                            </p>
                            <p className="flex justify-between text-gray-300">
                              <span>GST ({cartData.gstPercentage}%)</span>
                              <span>₹{cartData.taxPrice}</span>
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="flex justify-between text-gray-300">
                              <span>Delivery</span>
                              <span>₹{cartData.shippingPrice}</span>
                            </p>
                            <p className="flex justify-between text-gray-300">
                              <span>GST ({cartData.gstPercentage}%)</span>
                              <span>₹{cartData.taxPrice}</span>
                            </p>
                          </>
                        )}
                      </div>

                      <div className="flex justify-between items-center border-t border-gray-700 pt-4 mb-6">
                        <span className="font-bold text-lg text-gray-200">
                          Final Total
                        </span>
                        <span className="font-extrabold text-2xl text-green-400">
                          ₹{cartData.totalPrice}
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
                        onClick={() => handleOrder(cartData, "COD")}
                        className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 font-semibold text-lg shadow-lg transition"
                        disabled={orderCreatingLoad}
                      >
                        Buy Now
                      </button>
                    </section>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
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
                                onQuantityChange={(id, qty) =>
                                  dispatch(updateCartQuantity({ id, qty }))
                                }
                                onRemove={(id) => dispatch(removeFromCart(id))}
                                key={product._id}
                              />
                            ))}
                          </>
                        </div>
                      </section>
                      <section className="p-8 mx-4 rounded-2xl bg-gray-900 text-gray-100 shadow-xl border border-gray-700">
                        <h2 className="text-2xl font-bold mb-6 text-center text-green-400">
                          Order Summary
                        </h2>

                        <div className="space-y-3 mb-6">
                          {cart.cartItem.map((item) => (
                            <div
                              key={item._id}
                              className="flex justify-between items-center text-sm border-b border-gray-700 pb-2"
                            >
                              <span className="font-medium text-gray-300 px-2">
                                {item.name}
                              </span>
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
                          {cart?.shippingPrice === 0 ? (
                            <>
                              <p className="flex justify-between">
                                <span className=" text-red-500">Delivery</span>
                                <span className="line-through text-red-500">
                                  ₹{cart.deliveryCharge}
                                </span>
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
                          <span className="font-bold text-lg text-gray-200">
                            Final Total
                          </span>
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
                          onClick={() => handleOrder(cart, "COD")}
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 shrink-0 stroke-current"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>Cart is empty , no items in cart.</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default CartScreen;
