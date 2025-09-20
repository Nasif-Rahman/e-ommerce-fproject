import { useEffect, useState, useRef } from "react";
import Ourallproduct from "../components/Ourallproduct";
import Sidebar from "../components/Sidebar";

const SortingDropdown = ({ sortBy, setSortBy }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { value: "default", label: "Featured" },
    { value: "low", label: "Low" },
    { value: "medium", label: "Avg" },
    { value: "high", label: "High" },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((o) => o.value === sortBy)?.label;

  return (
    <div className="relative z-10" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm hover:shadow-md flex items-center justify-between w-40 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
      >
        {selectedLabel}
        <svg
          className={`w-4 h-4 ml-2 transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul className="absolute left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden z-20">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                setSortBy(option.value);
                setOpen(false);
              }}
              className={`px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white ${
                sortBy === option.value ? "bg-blue-500 text-white" : ""
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const BebidasPage = ({ searchTerm = "" }) => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [sortBy, setSortBy] = useState("default");
  const perPage = 30;

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://shop.sprwforge.com/api/v1/products?all_categories=true&sidebar_data=true"
        );
        const data = await res.json();
        setCategories(data?.data?.all_categories ?? []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = selectedCategory
          ? `https://shop.sprwforge.com/api/v1/all?category=${selectedCategory}&page=${currentPage}`
          : `https://shop.sprwforge.com/api/v1/products?page=${currentPage}`;

        const res = await fetch(url);
        const data = await res.json();
        const items = data?.data?.result?.data ?? [];
        setAllProducts(items);
        setProducts(items);
        setTotalResults(data?.data?.result?.total ?? 0);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [selectedCategory, currentPage]);

  // Sorting
  useEffect(() => {
    let sorted = [...allProducts];
    if (sortBy === "low") {
      sorted.sort((a, b) => a.selling - b.selling);
    } else if (sortBy === "high") {
      sorted.sort((a, b) => b.selling - a.selling);
    } else if (sortBy === "medium") {
      const prices = sorted.map((p) => p.selling);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      const midMin = min + (max - min) * 0.25;
      const midMax = min + (max - min) * 0.75;
      sorted = sorted.filter((p) => p.selling >= midMin && p.selling <= midMax);
    }
    setProducts(sorted);
  }, [sortBy, allProducts]);

  // Search filter
  const filteredProducts = products.filter((p) =>
    p.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Price filter
  const handlePriceFilter = (min, max) => {
    const filtered = allProducts.filter((p) => p.selling >= min && p.selling <= max);
    setProducts(filtered);
    setCurrentPage(1);
  };

  // Pagination
  const totalPages = Math.ceil(totalResults / perPage);
  const pagination = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 2 && i <= currentPage + 2)
    ) {
      pagination.push(i);
    } else if (i === currentPage - 3 || i === currentPage + 3) {
      pagination.push("...");
    }
  }

  return (
    <div className="grid grid-cols-12 container mx-auto">
      {/* Sidebar */}
      <div className="col-span-3 p-6">
        <Sidebar
          categories={categories}
          onSelectCategory={(slug) => {
            setSelectedCategory(slug);
            setCurrentPage(1);
          }}
          onPriceFilter={handlePriceFilter}
        />
      </div>

      {/* Products */}
      <div className="p-6 col-span-9">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 text-gray-600">
          <div>
            {products.length > 0 ? (
              <p>
                Showing {(currentPage - 1) * perPage + 1} to{" "}
                {Math.min(currentPage * perPage, totalResults)} of {totalResults} results
              </p>
            ) : (
              <p>No products found</p>
            )}
          </div>

          {/* Sorting */}
          <SortingDropdown sortBy={sortBy} setSortBy={setSortBy} />
        </div>

        {/* Product Grid */}
        <Ourallproduct products={filteredProducts} />

        {/* Pagination */}
        <div className="flex justify-center mt-6 gap-2 flex-wrap items-center">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {pagination.map((p, idx) =>
            p === "..." ? (
              <span key={`dots-${idx}`} className="px-2 py-1">
                ...
              </span>
            ) : (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`px-3 py-1 border rounded ${
                  currentPage === p ? "bg-gray-500 text-white" : ""
                }`}
              >
                {p}
              </button>
            )
          )}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BebidasPage;
