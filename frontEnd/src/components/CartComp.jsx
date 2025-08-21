import React from "react";
import { updateCartQuantity, removeFromCart } from "../Slice/CartSlice";
import { Link } from "react-router-dom";


const CartProduct = ({ product, onQuantityChange, onRemove }) => {

  const qty = [...Array(product.countInStock).keys()].map((i) => i + 1);

  return (
    <div className="flex items-center justify-between bg-gray-700 text-gray-100 rounded-lg p-4 mb-4 shadow-md">
     <Link to={`/product/${product._id}`}>
       {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-24 h-24 object-cover rounded-md"
      />
     </Link>
    

      {/* Product Details */}
      <div className="flex-1 ml-4">
        <h2 className="font-bold text-lg">{product.name}</h2>
        <p className="text-gray-400 text-sm">{product.brand}</p>
        <p className="text-gray-400 text-sm">{product.category}</p>
        <p className="mt-2 font-semibold">₹{product.price.toFixed(2)}</p>
      </div>

      {/* Quantity Selector */}
      <div className="flex flex-col items-center">
        <select
          className="select select-bordered w-20 text-center bg-gray-600 text-gray-100"
          value={product.quantity}
          onChange={(e) => onQuantityChange(product._id, Number(e.target.value))}
        >
         {/* {product.quantity > Math.max(...qty)} */}
          {qty.map( (qty) => (
              <option key={qty} value={qty}>
                {qty}
              </option>
            ))}
        </select>
            
        {/* Remove Button */}
        <button
          className="btn btn-sm btn-error mt-2"
          onClick={() => onRemove(product._id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartProduct;
