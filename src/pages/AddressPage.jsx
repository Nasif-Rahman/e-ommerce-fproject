// AddressPage.jsx
import { useState } from "react";

const AddressPage = ({ addresses, setAddresses }) => {
  const [address, setAddress] = useState("");

  const handleAdd = () => {
    if (address.trim() !== "") {
      setAddresses([...addresses, address]);
      setAddress("");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Address</h1>
      <input
        type="text"
        placeholder="Enter shipping address"
        className="border p-2 w-full mb-2"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button
        onClick={handleAdd}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Add Address
      </button>

      <ul className="mt-4">
        {addresses.map((a, i) => (
          <li key={i} className="border p-2 mb-1 rounded">
            {a}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressPage;
