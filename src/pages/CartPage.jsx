import React from "react";
import { useNavigate } from "react-router-dom";

const CartPage = ({ cart, increment, decrement, removeItem }) => {
  const navigate = useNavigate();
  const totalPrice = cart.reduce((acc, item) => acc + item.selling * item.quantity, 0);

  return (
    <div className="p-6 pt-[200px]">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="border">
              <th className="p-2 text-left">Product</th>
              <th className="p-2">Price</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Total</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id} className="border">
                <td className="p-2">{item.title}</td>
                <td className="p-2">€{item.selling}</td>
                <td className="p-2">
                  <button onClick={() => decrement(item.id)} className="px-2">-</button>
                  {item.quantity}
                  <button onClick={() => increment(item.id)} className="px-2">+</button>
                </td>
                <td className="p-2">€{item.selling * item.quantity}</td>
                <td className="p-2">
                  {/* <button
                    
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button> */}
                  <button
                    onClick={() => removeItem(item.id)}
                    class="group relative flex h-14 w-14 flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-red-800 bg-red-400 hover:bg-red-600"
                  >
                    <svg
                      viewBox="0 0 1.625 1.625"
                      class="absolute -top-7 fill-white delay-100 group-hover:top-6 group-hover:animate-[spin_1.4s] group-hover:duration-1000"
                      height="15"
                      width="15"
                    >
                      <path
                        d="M.471 1.024v-.52a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099h-.39c-.107 0-.195 0-.195-.195"
                      ></path>
                      <path
                        d="M1.219.601h-.163A.1.1 0 0 1 .959.504V.341A.033.033 0 0 0 .926.309h-.26a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099v-.39a.033.033 0 0 0-.032-.033"
                      ></path>
                      <path
                        d="m1.245.465-.15-.15a.02.02 0 0 0-.016-.006.023.023 0 0 0-.023.022v.108c0 .036.029.065.065.065h.107a.023.023 0 0 0 .023-.023.02.02 0 0 0-.007-.016"
                      ></path>
                    </svg>
                    <svg
                      width="16"
                      fill="none"
                      viewBox="0 0 39 7"
                      class="origin-right duration-500 group-hover:rotate-90"
                    >
                      <line stroke-width="4" stroke="white" y2="5" x2="39" y1="5"></line>
                      <line
                        stroke-width="3"
                        stroke="white"
                        y2="1.5"
                        x2="26.0357"
                        y1="1.5"
                        x1="12"
                      ></line>
                    </svg>
                    <svg width="16" fill="none" viewBox="0 0 33 39" class="">
                      <mask fill="white" id="path-1-inside-1_8_19">
                        <path
                          d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                        ></path>
                      </mask>
                      <path
                        mask="url(#path-1-inside-1_8_19)"
                        fill="white"
                        d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                      ></path>
                      <path stroke-width="4" stroke="white" d="M12 6L12 29"></path>
                      <path stroke-width="4" stroke="white" d="M21 6V29"></path>
                    </svg>
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="mt-4 font-bold text-lg">Total: €{totalPrice}</div>
      {cart.length > 0 && (
        <button
          onClick={() => navigate("/checkout")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );
};

export default CartPage;
