import React from "react";
import { updateCartQuantity, removeFromCart } from "../Slice/CartSlice";
import { Link } from "react-router-dom";


const CartProduct = ({ product, onQuantityChange, onRemove }) => {

  const qty = [...Array(product.countInStock).keys()].map((i) => i + 1);

  // return (
  //   <div className="flex items-center justify-between bg-gray-700 text-gray-100 rounded-lg p-4 mb-4 shadow-md">
  //    <Link to={`/product/${product._id}`}>
  //      {/* Product Image */}
  //     <img
  //       src={product.image}
  //       alt={product.name}
  //       className="w-24 h-24 object-cover rounded-md"
  //     />
  //    </Link>
    

  //     {/* Product Details */}
  //     <div className="flex-1 ml-4">
  //       <h2 className="font-bold text-lg">{product.name}</h2>
  //       <p className="text-gray-400 text-sm">{product.brand}</p>
  //       <p className="text-gray-400 text-sm">{product.category}</p>
  //       <p className="mt-2 font-semibold">₹{product.price.toFixed(2)}</p>
  //     </div>

  //     {/* Quantity Selector */}
  //     <div className="flex flex-col items-center">
  //       <select
  //         className="select select-bordered w-20 text-center bg-gray-600 text-gray-100"
  //         value={product.quantity}
  //         onChange={(e) => onQuantityChange(product._id, Number(e.target.value))}
  //       >
  //        {/* {product.quantity > Math.max(...qty)} */}
  //         {qty.map( (qty) => (
  //             <option key={qty} value={qty}>
  //               {qty}
  //             </option>
  //           ))}
  //       </select>
            
  //       {/* Remove Button */}
  //       <button
  //         className="btn btn-sm btn-error mt-2"
  //         onClick={() => onRemove(product._id)}
  //       >
  //         Remove
  //       </button>
  //     </div>
  //   </div>
  // );


return (
  <div className="flex flex-col sm:flex-row items-center sm:items-stretch justify-between bg-gray-800 text-gray-100 rounded-2xl mb-5 shadow-lg hover:shadow-xl transition">
    {/* Product Image */}
    <Link to={`/product/${product._id}`} className="flex-shrink-0">
      <img
        src={product.image}
        alt={product.name}
        className="w-[300px] h-[150px]  sm:w-[300px] sm:h-[200px]   rounded-t-2xl sm:rounded-xl border border-gray-700 hover:scale-105 transition"
      />
    </Link>

    {/* Product Details */}
    <div className="flex-1 w-full sm:ml-6 p-5 text-center sm:text-left">
      <h2 className="font-semibold text-lg leading-tight">{product.name}</h2>
      <p className="text-gray-400 text-sm mt-1">{product.brand}</p>
      <p className="text-gray-400 text-sm">{product.category}</p>
      <p className="mt-3 font-bold text-lg text-green-400">
        ₹{product.price.toFixed(2)}
      </p>
    </div>

    {/* Actions */}
    <div className="flex sm:flex-col flex-row justify-center items-center gap-3 p-5 w-full sm:w-auto">
      <select
        className="w-24 rounded-lg bg-gray-700 border border-gray-600 px-2 py-1 text-center text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
        value={product.quantity}
        onChange={(e) => onQuantityChange(product._id, Number(e.target.value))}
      >
        {qty.map((qty) => (
          <option key={qty} value={qty}>
            {qty}
          </option>
        ))}
      </select>

      <button
        className="px-4 py-1.5 text-sm rounded-lg bg-red-600 hover:bg-red-700 transition font-medium shadow-sm"
        onClick={() => onRemove(product._id)}
      >
        Remove
      </button>
    </div>
  </div>
);





};

export default CartProduct;
