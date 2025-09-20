import { useState } from "react";
import { LiaBarsSolid } from "react-icons/lia";
import { VscChromeClose } from "react-icons/vsc";

const Sidebar = ({ categories = [], onSelectCategory, onPriceFilter }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isOpen, setIsOpen] = useState(false); // For small screens

  const handlePriceGo = () => {
    const min = minPrice ? parseFloat(minPrice) : 0;
    const max = maxPrice ? parseFloat(maxPrice) : Infinity;
    onPriceFilter(min, max);
    setIsOpen(false); // collapse sidebar on small screens after filtering
    goTop();
  };

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="container mx-auto top-[200px] sticky z-[999]">
      {/* Hamburger for small screens */}
      <div className="lg:hidden p-4 relative z-50">
        <div className="lg:hidden relative top-[-11px] -left-6">
          <div
            className={`transition-transform duration-300 ease-in-out ${
              isOpen ? "opacity-100" : "opacity-0 -translate-x-2"
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <VscChromeClose className="text-black text-[24px] absolute" />
          </div>
          <div
            className={`transition-transform duration-300 ease-in-out ${
              isOpen ? "opacity-0 translate-x-2" : "opacity-100"
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <LiaBarsSolid className="text-black text-[24px] absolute" />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed lg:sticky top-[300px] p-7 lg:p-0 lg:top-0 left-0 h-full bg-white 2xl:border-r
          transform transition-transform duration-300 z-[999]
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
       

        {/* All Products Button */}
        {/* <button
          onClick={() => {
            onSelectCategory(null);
            setIsOpen(false);
          }}
          className="block mb-2 text-left w-fit px-4 py-2 rounded-lg
                     bg-transparent text-gray-800
                     transition-all duration-300 ease-in-out
                     hover:bg-gray-900 hover:text-white hover:scale-105
                     focus:bg-gray-900 focus:text-white focus:scale-105"
        >
          <span onClick={goTop}>All Products</span>
        </button> */}

        {/* Category Buttons */}
        {categories.length > 0 ? (
          categories.map((cat) => (
            <button
              key={cat.id ?? cat.slug}
              onClick={() => {
                onSelectCategory(cat.slug ?? "");
                setIsOpen(false);
              }}
              className="block mb-3 text-left w-fit px-4 py-1 rounded-lg
                         bg-transparent text-gray-800
                         transition-all duration-300 ease-in-out
                         hover:bg-gray-900 hover:text-white hover:scale-105
                         focus:bg-gray-900 focus:text-white focus:scale-105"
            >
              <span onClick={goTop}>{cat.title ?? "Untitled"}</span>
            </button>
          ))
        ) : (
          <p className="text-gray-500">No categories available</p>
        )}

        {/* Price Filter */}
        <div className="mt-6 lg:block hidden">
          <h3 className="font-semibold mb-2">Price</h3>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="border px-2 py-1 rounded w-20 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="border px-2 py-1 rounded w-20 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={handlePriceGo}
              className="px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-700 hover:text-white transition-all duration-300"
            >
              Go
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for small screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-10 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
