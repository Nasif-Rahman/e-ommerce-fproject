import { useNavigate } from "react-router-dom";

const Ourallproduct = ({ products }) => {
  const navigate = useNavigate();

  if (!products || products.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No products available.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <li
          key={product.id}
          className="bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer overflow-hidden group"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <div className="relative w-full h-[220px] sm:h-[240px] md:h-[260px] lg:h-[280px] overflow-hidden rounded-t-xl">
            <img
              src={`https://shop.sprwforge.com/uploads/${product.image}`}
              alt={product.title}
              className="w-full h-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
            <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-lg shadow">
              €{product.selling}
            </span>
          </div>
          <div className="p-4 text-center">
            <h2 className="text-sm sm:text-[13px] md:text-[14px] lg:text-[15px] font-semibold text-gray-800 truncate">
              {product.title}
            </h2>
            <p className="mt-2 text-gray-500 text-xs sm:text-sm">
              {product.description?.slice(0, 50)}{product.description && product.description.length > 50 ? "..." : ""}
            </p>
            {/* <button
              className="mt-3 w-full bg-blue-500 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-600 transition"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              View Product
            </button> */}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Ourallproduct;
