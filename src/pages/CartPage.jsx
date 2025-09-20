import React from "react";
import { useNavigate } from "react-router-dom";

const CartPage = ({ cart, increment, decrement, removeItem }) => {
  const navigate = useNavigate();
  const totalPrice = cart.reduce((acc, item) => acc + item.selling * item.quantity, 0);

  return (
    <div className="p-6 pt-[200px] max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center md:justify-between border rounded-lg p-4 shadow hover:shadow-lg transition-shadow bg-white"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4 flex-1">
                <img
                  src={`https://shop.sprwforge.com/uploads/${item.image}`}
                  alt={item.title}
                  className="w-24 h-24 object-contain rounded-lg border p-1 bg-gray-50"
                />
                <div>
                  <h2 className="font-semibold text-lg">{item.title}</h2>
                  <p className="text-blue-600 font-bold">€{item.selling}</p>
                  {item.brands && (
                    <p className="text-gray-500 text-sm">Brand: {item.brands}</p>
                  )}
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2 mt-4 md:mt-0">
                <button
                  onClick={() => decrement(item.id)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                >
                  -
                </button>
                <span className="px-3 py-1 border rounded">{item.quantity}</span>
                <button
                  onClick={() => increment(item.id)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                >
                  +
                </button>
              </div>

              {/* Total & Delete */}
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <p className="font-semibold text-lg">€{item.selling * item.quantity}</p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          ))}

          {/* Total Price */}
          <div className="mt-6 flex flex-col md:flex-row justify-between items-center bg-gray-100 p-4 rounded-lg">
            <p className="text-xl font-bold">Total: €{totalPrice}</p>
            <button
              onClick={() => navigate("/checkout")}
              className="mt-2 md:mt-0 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
