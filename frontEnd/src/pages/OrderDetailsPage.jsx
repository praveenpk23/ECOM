import React from "react";
import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../Slice/orderApiSlice";

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const { data: order, isLoading, error } = useGetOrderByIdQuery(orderId);

  if (isLoading) return <p>Loading order details...</p>;

  if (error) {
    const errorMessage =
      error?.data?.message || error?.error || JSON.stringify(error);
    return <p className="text-red-500">Error: {errorMessage}</p>;
  }

  if (!order) return <p>No order found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-900 text-gray-100 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-green-400">Order Details</h1>

      {/* Order Info */}
      <div className="mb-4">
        <h2 className="font-semibold text-xl mb-1">Order ID:</h2>
        <p>{order.orderId}</p>
        <p>User: {order.user}</p>
        <p>Placed on: {new Date(order.createdAt).toLocaleString()}</p>
      </div>

      {/* Shipping Address */}
      <div className="mb-4">
        <h2 className="font-semibold text-xl mb-1">Shipping Address:</h2>
        <p>{order.shippingAddress.fullName}</p>
        <p>{order.shippingAddress.addressLine1}</p>
        {order.shippingAddress.addressLine2 && (
          <p>{order.shippingAddress.addressLine2}</p>
        )}
        <p>
          {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
          {order.shippingAddress.pincode}
        </p>
        <p>{order.shippingAddress.country}</p>
        <p>Phone: {order.shippingAddress.phone}</p>
      </div>

      {/* Items */}
      <div className="mb-4">
        <h2 className="font-semibold text-xl mb-1">Items:</h2>
        {order.items.map((item) => (
          <div
            key={item.productId}
            className="flex justify-between border-b border-gray-700 py-2"
          >
            <span>{item.productId.name || item.productId}</span>
            <span>
              {item.quantity} × ₹{item.price} = ₹{item.quantity * item.price}
            </span>
          </div>
        ))}
      </div>

      {/* Price Summary */}
      <div className="mb-4">
        <h2 className="font-semibold text-xl mb-1">Price Summary:</h2>
        <p>Items Price: ₹{order.itemPrice}</p>
        <p>Shipping: ₹{order.shippingPrice}</p>
        <p>Tax: ₹{order.taxPrice}</p>
        <p className="font-bold">Total: ₹{order.totalPrice}</p>
      </div>

      {/* Order Status */}
      <div className="mb-4">
        <h2 className="font-semibold text-xl mb-1">Order Status:</h2>
        <p>Current Status: {order.status}</p>
        {order.statusUpdates.map((s, index) => (
          <p key={index}>
            {s.status} at {new Date(s.updatedAt).toLocaleString()}
          </p>
        ))}
      </div>

      {/* Payment Info */}
      <div className="mb-4">
        <h2 className="font-semibold text-xl mb-1">Payment:</h2>
        <p>Method: {order.paymentMethod || "N/A"}</p>
        <p>
          Paid:{" "}
          {order.isPaid
            ? `Yes (${new Date(order.paidAt).toLocaleString()})`
            : "No"}
        </p>
      </div>

      {/* Delivery Info */}
      <div className="mb-4">
        <h2 className="font-semibold text-xl mb-1">Delivery:</h2>
        <p>
          Delivered:{" "}
          {order.isDelivered
            ? `Yes (${new Date(order.deliveredAt).toLocaleString()})`
            : "No"}
        </p>
      </div>

      {/* Return Info */}
      <div className="mb-4">
        <h2 className="font-semibold text-xl mb-1">Return Info:</h2>
        <p>Return Requested: {order.isReturnRequested ? "Yes" : "No"}</p>
        <p>Return Status: {order.returnStatus}</p>
        {order.ReturnDetails?.requestedAt && (
          <p>Requested At: {new Date(order.ReturnDetails.requestedAt).toLocaleString()}</p>
        )}
        {order.ReturnDetails?.reason && <p>Reason: {order.ReturnDetails.reason}</p>}
        {order.ReturnDetails?.statusUpdates?.length > 0 && (
          <div>
            <p>Status Updates:</p>
            {order.ReturnDetails.statusUpdates.map((s, i) => (
              <p key={i}>
                {s.status} at {new Date(s.updatedAt).toLocaleString()}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailsPage;
