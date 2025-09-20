// CheckoutPage.jsx

const CheckoutPage = ({ cart, addresses }) => {
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.selling * item.quantity,
    0
  );

  return (
    <div className="p-6 pt-[200px]">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <h2 className="font-semibold mb-2">Shipping Address</h2>
      {addresses.length === 0 ? <p>No address added</p> : <p>{addresses[0]}</p>}

      <h2 className="font-semibold mt-4 mb-2">Order Summary</h2>
      <ul>
        {cart.map((item) => (
          
          <li key={item.id}>
            {item.title} x {item.quantity} = €{item.selling * item.quantity}
          </li>
        ))}
      </ul>

      <div className="mt-4 font-bold text-lg">Total: €{totalPrice}</div>

      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Place Order
      </button>
    </div>
  );
};

export default CheckoutPage;
