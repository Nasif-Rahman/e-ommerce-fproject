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
  if (!product) return <p className="text-center mt-20 text-gray-500">Product not found.</p>;

  return (
    <div className="container mx-auto p-6 pt-[150px]">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left: Product Images */}
        <div className="flex flex-col lg:w-1/2 gap-4">
          <div className="border rounded-lg p-4 bg-white shadow hover:shadow-lg transition-shadow duration-300">
            <img
              src={`https://shop.sprwforge.com/uploads/${product.image}`}
              alt={product.title}
              className="w-full h-[300px] object-contain rounded-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
          {/* Thumbnails */}
          <div className="flex gap-3 mt-2">
            <img
              src={`https://shop.sprwforge.com/uploads/${product.image}`}
              alt={product.title}
              className="w-16 h-16 object-contain border rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
            />
            <img
              src={`https://shop.sprwforge.com/uploads/${product.image}`}
              alt={product.title}
              className="w-16 h-16 object-contain border rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="lg:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-3">{product.title}</h1>
            <p className="text-xl font-semibold text-blue-600 mb-3">€{product.selling}</p>
            {product.brands && (
              <p className="text-gray-600 mb-3 font-medium">Brand: {product.brands}</p>
            )}
            {product.badge && (
              <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                {product.badge}
              </span>
            )}


            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center border rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 bg-blue-200 text-black rounded-lg shadow hover:bg-gray-700 transition-colors duration-300"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="px-6 py-2 bg-green-100 text-gray rounded-lg shadow hover:bg-gray-700 transition-colors duration-300"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-3 bg-white shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img
                  src={`https://shop.sprwforge.com/uploads/${item.image}`}
                  alt={item.title}
                  className="w-full h-32 object-contain mb-2 rounded-lg hover:scale-105 transition-transform duration-300"
                />
                <h3 className="text-sm font-medium mb-1">{item.title}</h3>
                <p className="text-blue-600 font-semibold text-sm">€{item.selling}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
