import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading";

const ProductDetailsPage = ({ addToCart, cart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        // Fetch main product
        const res = await fetch(`https://shop.sprwforge.com/api/v1/product/${id}`);
        const data = await res.json();
        setProduct(data?.data ?? null);

        // Fetch related products
        if (data?.data?.categories?.length > 0) {
          const catSlug = data.data.categories[0].slug;
          const relatedRes = await fetch(
            `https://shop.sprwforge.com/api/v1/all?category=${catSlug}&per_page=4`
          );
          const relatedData = await relatedRes.json();
          setRelatedProducts(
            relatedData?.data?.result?.data?.filter((p) => p.id !== data.data.id) ?? []
          );
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    setQuantity(1);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  if (loading) return <Loading />;
  if (!product) return <p className="text-center mt-20">Product not found.</p>;

  return (
    <div className="p-6 flex flex-col md:flex-row gap-8 pt-[200px]">
      {/* Main Image */}
      <div className="flex flex-col">
        <img
          src={`https://shop.sprwforge.com/uploads/${product.image}`}
          alt={product.title}
          className="w-full md:w-96 h-96 object-contain border rounded mb-4"
        />
        {/* Thumbnails */}
        <div className="flex gap-2">
          <img
            src={`https://shop.sprwforge.com/uploads/${product.image}`}
            alt={product.title}
            className="w-20 h-20 object-contain border rounded"
          />
          <img
            src={`https://shop.sprwforge.com/uploads/${product.image}`}
            alt={product.title}
            className="w-20 h-20 object-contain border rounded"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-blue-600 font-bold mb-2">€{product.selling}</p>
          <p className="text-gray-700 mb-4">{product.brands}</p>
          {product.badge && (
            <p className="text-white bg-green-500 inline-block px-2 py-1 rounded mb-4">
              {product.badge}
            </p>
          )}
          <p className="text-gray-600">{product.description ?? "No description available."}</p>

          {/* Quantity selector */}
          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              +
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={handleAddToCart}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-10 w-full">
          <h2 className="text-xl font-semibold mb-4">Related Products</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <li
                key={item.id}
                className="border p-3 rounded shadow-sm hover:shadow-lg cursor-pointer"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img
                  src={`https://shop.sprwforge.com/uploads/${item.image}`}
                  alt={item.title}
                  className="w-full h-40 object-contain mb-2 rounded"
                />
                <h3 className="font-semibold text-sm">{item.title}</h3>
                <p className="text-blue-600 font-bold">€{item.selling}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
