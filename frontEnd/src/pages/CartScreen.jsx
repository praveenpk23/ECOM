import React from "react";
import { useSelector,useDispatch } from "react-redux";
import CartProduct from "../components/CartComp";
import { updateCartQuantity, removeFromCart } from "../Slice/CartSlice";
const CartScreen = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cartItem);
  console.log(cart);
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl"> My Cart </h1>

      {cart.length > 0 ? (
        <>
          <div className="flex justify-center items-center flex-col">
            <section className="max-w-7xl mx-auto py-7 ">
              <div className="grid xl:grid-cols-3 md:grid-cols-2  gap-5 sm:grid-cols-1">
                {cart.length > 0 && (
                  <>
                    {cart.map((product) => (
                      <CartProduct
                        product={product}
                        onQuantityChange={(id, qty) =>dispatch(updateCartQuantity({ id, qty }))}
                        onRemove={(id) => dispatch(removeFromCart(id))}
                        key={product._id} 
                      />
                    ))}
                  </>
                )}
              </div>
            </section>
          </div>
        </>
      ) : (
        <>
          <p>No Item in cart</p>
        </>
      )}
    </div>
  );
};

export default CartScreen;
