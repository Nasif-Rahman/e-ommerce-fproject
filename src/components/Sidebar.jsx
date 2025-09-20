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
    <div className="container mx-auto top-[200px] sticky z-80 z-[999]">
      <div className="lg:hidden p-4 relative z-50">
        {/* <button onClick={() => setIsOpen(!isOpen)}>
          <FiMenu size={24} />
        </button> */}
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
      <div
        className={`
          fixed lg:sticky top-[300px] p-7 lg:p-[0] lg:top-0 left-0 h-full bg-white 2xl:border-r  
          transform transition-transform duration-300 z-[999]
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}
      >
        <h2 className="font-bold mb-4 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[20px] 2xl:text-[24px]">
          Categories
        </h2>

        <button
          onClick={() => {
            onSelectCategory(null);
            setIsOpen(false);
          }}
          className="block mb-2 text-left hover:Link-manu-bar focus:Link-manu-bar w-fit hover:bg-gray-900 focus:bg-gray-900 focus:py-[15px] focus:px-[30px]  hover:py-[15px] hover:px-[30px]  focus:text-white hover:text-white duration-200 text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
        >
          <span onClick={goTop}>All Products</span>
        </button>

        {categories.length > 0 ? (
          categories.map((cat) => (
            <button
              key={cat.id ?? cat.slug}
              onClick={() => {
                onSelectCategory(cat.slug ?? "");
                setIsOpen(false);
              }}
              className="block mb-3 text-left hover:Link-manu-bar focus:Link-manu-bar w-fit hover:bg-gray-900 focus:bg-gray-900 focus:py-[15px] focus:px-[30px]  hover:py-[15px] hover:px-[30px]  focus:text-white hover:text-white duration-200 text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
            >
              <span onClick={goTop}>{cat.title ?? "Untitled"}</span>
            </button>
          ))
        ) : (
          <p>No categories available</p>
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
              className="border px-2 py-1 rounded w-20"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="border px-2 py-1 rounded w-20"
            />
            <button
              onClick={handlePriceGo}
              className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
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
