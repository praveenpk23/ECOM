import React from "react";
import { useGetOrdersQuery } from "../Slice/orderApiSlice";
import { Link } from "react-router-dom";

const OrdersPage = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  if (isLoading) return <p>Loading orders...</p>;

  if (error) {
    const errorMessage =
      error?.data?.message || error?.error || JSON.stringify(error);
    return <p className="text-red-500">Error: {errorMessage}</p>;
  }

  if (!orders || orders.length === 0)
    return <p>No orders found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-900 text-gray-100 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-green-400">My Orders</h1>

      <div className="grid gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-lg">
                Order ID: {order.orderId}
              </h2>
              <span
                className={`px-2 py-1 rounded ${
                  order.status === "Delivered"
                    ? "bg-green-600"
                    : order.status === "Cancelled"
                    ? "bg-red-600"
                    : "bg-yellow-500"
                }`}
              >
                {order.status}
              </span>
            </div>

            <p className="text-gray-300 mb-2">
              Total: ₹{order.totalPrice} | Items: {order.items.length}
            </p>

            <p className="text-gray-400 mb-2">
              Placed on: {new Date(order.createdAt).toLocaleString()}
            </p>

            <Link
              to={`/order/${order._id}`}
              className="inline-block mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded font-medium transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
