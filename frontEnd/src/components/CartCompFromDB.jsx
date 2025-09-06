import React from "react";
import { updateCartQuantity, removeFromCart } from "../Slice/CartSlice";
import { Link } from "react-router-dom";


const CartProductFromDB = ({ product, onQuantityChange, onRemove }) => {

  const qty = [...Array(product.productId.countInStock).keys()].map((i) => i + 1);


return (
  <div className="flex flex-col sm:flex-row items-center sm:items-stretch justify-between bg-gray-800 text-gray-100 rounded-2xl mb-5 shadow-lg hover:shadow-xl transition">
    {/* Product Image */}
    <Link to={`/product/${product.productId._id}`} className="flex-shrink-0">
      <img
        src={product.productId.image}
        alt={product.productId.name}
        className="w-[300px] h-[150px]  sm:w-[300px] sm:h-[200px]   rounded-t-2xl sm:rounded-xl border border-gray-700 hover:scale-105 transition"
      />
    </Link>

    {/* Product Details */}
    <div className="flex-1 w-full sm:ml-6 p-5 text-center sm:text-left">
      <h2 className="font-semibold text-lg leading-tight">{product.productId.name}</h2>
      <p className="text-gray-400 text-sm mt-1">{product.productId.brand}</p>
      <p className="text-gray-400 text-sm">{product.productId.category}</p>
      <p className="mt-3 font-bold text-lg text-green-400">
        ₹{product.price.toFixed(2)}
      </p>
    </div>
       

    {/* Actions */}
    <div className="flex sm:flex-col flex-row justify-center items-center gap-3 p-5 w-full sm:w-auto">
      <select
        className="w-24 rounded-lg bg-gray-700 border border-gray-600 px-2 py-1 text-center text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
        value={product.quantity}
        onChange={(e) => onQuantityChange(product.productId._id, Number(e.target.value))}
      >
        {qty.map((qty) => (
          <option key={qty} value={qty}>
            {qty}
          </option>
        ))}
      </select>

      <button
        className="px-4 py-1.5 text-sm rounded-lg bg-red-600 hover:bg-red-700 transition font-medium shadow-sm"
        onClick={() => onRemove(product.productId._id)}
      >
        Remove
      </button>
    </div>
  </div>
);





};

export default CartProductFromDB;
