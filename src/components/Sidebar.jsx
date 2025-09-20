import { useState } from "react";
import { LiaBarsSolid } from "react-icons/lia";
import { VscChromeClose } from "react-icons/vsc";

const Sidebar = ({ categories = [], onSelectCategory, onPriceFilter }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handlePriceGo = () => {
    const min = minPrice ? parseFloat(minPrice) : 0;
    const max = maxPrice ? parseFloat(maxPrice) : Infinity;
    onPriceFilter(min, max);
    setIsOpen(false); // Collapse sidebar on small screens after filtering
    goTop();
  };

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Hamburger for small screens */}
      <div className="lg:hidden p-4 relative z-[1000]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-black text-[24px] focus:outline-none"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <VscChromeClose /> : <LiaBarsSolid />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed lg:sticky top-0 p-4 lg:p-0 left-0 h-full bg-white border-r lg:border-r-0
          transform transition-transform duration-300 z-[999]
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 w-64`}
      >
        {/* All Products Button */}
        <button
          onClick={() => {
            onSelectCategory(null);
            setIsOpen(false);
            goTop();
          }}
          className="block mb-2 text-left w-full px-4 py-2 rounded-lg
                     bg-transparent text-gray-800
                     transition-all duration-300 ease-in-out
                     hover:bg-gray-900 hover:text-white hover:scale-105
                     focus:bg-gray-900 focus:text-white focus:scale-105"
          role="button"
          tabIndex={0}
        >
          All Products
        </button>

        {/* Category Buttons */}
        {categories.length > 0 ? (
          categories.map((cat) => (
            <button
              key={cat.id ?? cat.slug}
              onClick={() => {
                onSelectCategory(cat.slug ?? "");
                setIsOpen(false);
                goTop();
              }}
              className="block mb-3 text-left w-full px-4 py-1 rounded-lg
                         bg-transparent text-gray-800
                         transition-all duration-300 ease-in-out
                         hover:bg-gray-900 hover:text-white hover:scale-105
                         focus:bg-gray-900 focus:text-white focus:scale-105"
              role="button"
              tabIndex={0}
            >
              {cat.title ?? "Untitled"}
            </button>
          ))
        ) : (
          <p className="text-gray-500">No categories available</p>
        )}

        {/* Price Filter */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Price</h3>
          <div className="flex items-center gap-2 flex-col sm:flex-row">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="border px-2 py-1 rounded w-full sm:w-20 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="border px-2 py-1 rounded w-full sm:w-20 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={handlePriceGo}
              className="px-3 py-1 bg-gray-300 text-black rounded w-full sm:w-auto hover:bg-gray-700 hover:text-white transition-all duration-300"
              role="button"
              tabIndex={0}
            >
              Go
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for small screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[998]"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
};

export default Sidebar;