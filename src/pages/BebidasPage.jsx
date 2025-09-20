import { useEffect, useState } from "react";
import Ourallproduct from "../components/Ourallproduct";
import Sidebar from "../components/Sidebar";

const BebidasPage = ({ searchTerm = "" }) => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // মূল products copy
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [sortBy, setSortBy] = useState("default"); // sorting state
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
        setProducts(items);
        setAllProducts(items);
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
      // medium price filter = মধ্যের 50% প্রাইস
      const prices = sorted.map((p) => p.selling);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      const midMin = min + (max - min) * 0.25;
      const midMax = min + (max - min) * 0.75;
      sorted = sorted.filter((p) => p.selling >= midMin && p.selling <= midMax);
    }
    setProducts(sorted);
  }, [sortBy, allProducts]);

  const filteredProducts = products.filter((p) =>
    p.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handlePriceFilter = (min, max) => {
  const filtered = allProducts.filter(
    (p) => p.selling >= min && p.selling <= max
  );
  setProducts(filtered);
  setCurrentPage(1);
};

  return (
    <div className="grid grid-cols-12 container mx-auto pt-[200px] ">
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

      <div className="p-6 col-span-9">
        <button
          class="bg-green-500 text-white w-14 h-14 rounded-full flex justify-center items-center shadow-lg hover:bg-green-600 transition-all duration-300 ease-out group z-50 hover:scale-105 active:scale-95 fixed bottom-[10%] right-[1%]"
          aria-label="Chat on WhatsApp"
        >
          <div class="absolute -right-1 -top-1 z-10">
            <div class="flex h-6 w-6 items-center justify-center">
              <span
                class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"
              ></span>
              <span
                class="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white"
              >
                1
              </span>
            </div>
          </div>

          <svg
            viewBox="0 0 16 16"
            class="w-7 h-7"
            fill="currentColor"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"
            ></path>
          </svg>

          <span
            class="absolute inset-0 rounded-full border-4 border-white/30 scale-100 animate-pulse"
          ></span>

          <div
            class="absolute right-full mr-3 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 whitespace-nowrap"
          >
            <div class="bg-gray-800 text-white text-sm px-3 py-1 rounded shadow-lg">
              Do you need help?
            </div>
            <div
              class="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"
            ></div>
          </div>
        </button>

        <div className="flex justify-between items-center mb-4 text-gray-600">
          <div>
            {products.length > 0 ? (
              <p>
                Showing {(currentPage - 1) * perPage + 1} to{" "}
                {Math.min(currentPage * perPage, totalResults)} of{" "}
                {totalResults} results
              </p>
            ) : (
              <p>No products found</p>
            )}
          </div>

          <div className="relative z-10">
            <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700 
                      shadow-sm hover:shadow-md focus:shadow-md 
                      focus:outline-none focus:ring-2 focus:ring-blue-400 
                      transition duration-200 ease-in-out transform 
                      hover:-translate-y-0.5"
          >
            {/* <option value="default">Defa</option> */}
            <option value="low">Low</option>
            <option value="medium">Avg</option>
            <option value="high">High</option>
          </select>

          </div>
        </div>

        <Ourallproduct products={filteredProducts} />

        {/* Pagination buttons */}
        <div className="flex justify-center mt-6 gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded"
          >
            Prev
          </button>
          <span className="px-3 py-1">
            Page {currentPage} of {Math.ceil(totalResults / perPage)}
          </span>
          <button
            onClick={() =>
              setCurrentPage((p) =>
                Math.min(p + 1, Math.ceil(totalResults / perPage))
              )
            }
            disabled={currentPage === Math.ceil(totalResults / perPage)}
            className="px-3 py-1 border rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BebidasPage;
