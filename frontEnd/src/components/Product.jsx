import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className="block max-w-sm rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white dark:bg-gray-900"
  
    >
      <figure className="overflow-hidden">
        <img
          src={product.image} // Removed 'public/' as per Vite/static assets
          alt={product.name}
          className="w-full h-64 sm:h-72 md:h-80 object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </figure>

      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 truncate">
          {product.name}
        </h2>

        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="inline-block bg-purple-100 text-purple-700 text-sm font-semibold px-3 py-1 rounded-full">
            ₹{product.price}
          </span>

        <div className="flex items-center flex-wrap">
            <Rating value={product.rating} review={product.numReviews} />
            <span className="ml-3 text-gray-700 dark:text-gray-300">{product.numReviews} reviews</span>
        </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
