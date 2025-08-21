import React, { useState } from "react";
import Rating from "./Rating"; // Assuming you have this component
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { addToCart } from "../Slice/CartSlice";
const Details = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!product) {
    return (
      <div className="p-8 text-center text-gray-500">Product not found.</div>
    );
  }
  const qtyCount = [...Array(product.countInStock).keys()];
    const [selectedQty, setSelectedQty] = useState(qtyCount[0] + 1); // default value
const handleChange =(e)=>{
    setSelectedQty(Number(e.target.value)); // get the selected value
}



  return (
    // <div className="bg-gray-800 dark:bg-gray-100 min-h-screen py-8">
    <div className="max-w-6xl mx-auto lg:p-20 sm:p-10 p-6">
      <div  className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 items-stretch ">
        {/* Left side - Image */}
        <div className="overflow-hidden rounded-lg shadow-lg aspect-w-16 aspect-h-9 max-w-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right side - Details */}
        <div  className=" flex items-center py-6 px-8 rounded-lg shadow-lg text-white  bg-gray-800 dark:text-gray-100">
          <div className="flex flex-col justify-start">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-gray-100">
                {product.name}
              </h1>
              <p className="text-sm text-gray-400 mb-4">
                Brand: <span className="font-medium">{product.brand}</span> |
                Category:{" "}
                <span className="font-medium">{product.category}</span>
              </p>

              <div className="flex items-center mb-4">
                <Rating value={product.rating} review={product.numReviews} />
                <span className="ml-3 text-gray-300">
                  {product.numReviews} reviews
                </span>
              </div>

              <p className="text-2xl font-semibold text-purple-600 mb-4">
                ₹{product.price ? product.price.toFixed(2) : "0.00"}
              </p>

              <p
                className={`mb-4 font-semibold ${
                  product.countInStock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </p>

              <p className="text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            {product.countInStock > 0 && (
              <div className="mt-6">
                <label
                  htmlFor="qty"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Quantity:
                </label>
                <select value={selectedQty} onChange={handleChange}  className="w-full text-center select bg-gray-700 text-gray-900 dark:text-gray-100  rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  {qtyCount.map((qty) => (
                    <option className="text-center" key={qty+1} value={qty + 1}>{qty + 1}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Add to Cart Button */}
            <button
              disabled={product.countInStock === 0}
              onClick={() => dispatch(addToCart({ product, quantity: selectedQty }))}
              className={`mt-6 w-full py-3 rounded-md font-semibold text-white transition-colors duration-300 ${
                product.countInStock > 0
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {product.countInStock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Details;
