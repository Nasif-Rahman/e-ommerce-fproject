import React, { useState, useRef, useEffect } from "react";
import { FiSearch, FiShoppingCart, FiChevronDown, FiMail, FiPhone } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const NavBar = ({ searchTerm, setSearchTerm, cart }) => {
  const [selectedLocale, setSelectedLocale] = useState("en"); // Default to English
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [languages, setLanguages] = useState([]); // Store API languages
  const dropdownRef = useRef(null);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();

  // Fetch common API data for languages
  useEffect(() => {
    const fetchCommonData = async () => {
      try {
        const res = await fetch("https://shop.sprwforge.com/api/v1/common");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log("Common API response:", data);
        if (data?.data?.languages) {
          setLanguages(data.data.languages);
        }
      } catch (err) {
        console.error("Error fetching common data:", err);
      }
    };

    fetchCommonData();
  }, []);

  // Fetch product suggestions
  useEffect(() => {
    if (!searchTerm) {
      setSuggestions([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        setLoading(true);
        console.log("Fetching with searchTerm:", searchTerm);
        const res = await fetch(
          `https://shop.sprwforge.com/api/v1/products?search=${encodeURIComponent(searchTerm)}`
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log("Full Search response:", data);

        let results = [];
        if (data?.data?.result?.data && Array.isArray(data.data.result.data)) {
          results = data.data.result.data;
          console.log("Filtered products:", results);
        } else {
          console.warn("No products array found. Available paths:", {
            "data.result.data": data?.data?.result?.data,
            "data.data": data?.data,
            "data.result": data?.data?.result,
          });
        }

        setSuggestions(results);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  // Handle click outside to close dropdown and suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setSearchTerm]);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      alert("You are logged out!");
    } else {
      navigate("/login");
    }
  };

  const handleSuggestionClick = (product) => {
    navigate(`/product/${product.id}`);
    setSearchTerm("");
    setSuggestions([]);
  };

  const handleLanguageSelect = (code) => {
    setSelectedLocale(code);
    setDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <nav>
      {/* Top bar */}
      <div className="flex items-center justify-between container mx-auto py-5 sm:px-0 px-6">
        <div className="flex items-center gap-4 relative">
          {/* Language Switcher */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 border px-3 py-2 rounded-md shadow-sm hover:bg-gray-100 transition"
            >
              <span className="capitalize">
                {languages.find((lang) => lang.code === selectedLocale)?.name || "English"}
              </span>
              <FiChevronDown className="text-gray-600" />
            </button>
            {dropdownOpen && (
              <ul className="absolute top-full left-0 mt-1 w-40 bg-white border rounded-md shadow-lg z-50">
                {languages.map((language) => (
                  <li
                    key={language.code}
                    onClick={() => handleLanguageSelect(language.code)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <span className="capitalize">{language.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Email & Phone */}
          <p className="hidden lg:flex items-center gap-1 text-gray-700">
            <FiMail className="text-gray-500" />
            <a href="mailto:webzedcontact@gmail.com">Mail: webzedcontact@gmail.com</a>
          </p>
          <p className="hidden sm:flex items-center gap-1 text-gray-700">
            <FiPhone className="text-gray-500" />
            <a href="tel:4534345656">Helpline: 4534345656</a>
          </p>
        </div>

        {/* Login & Cart */}
        <div className="flex items-center gap-6">
          <button
            onClick={handleLoginLogout}
            className="relative overflow-hidden px-5 py-2 rounded bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-lg hover:shadow-xl transition-all"
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>

          <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
            <FiShoppingCart className="text-2xl" />
            {cart && cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1 rounded-full">
                {cart.length}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="border-t flex items-center py-5 px-6 shadow-sm">
        <div className="container mx-auto flex items-center gap-6">
          {/* Logo */}
          <div className="cursor-pointer flex-shrink-0" onClick={() => navigate("/")}>
            <img
              src="https://shop.sprwforge.com/uploads/header-logo.svg"
              alt="Logo"
              className="w-auto h-10"
            />
          </div>

          {/* Search bar with suggestions */}
          <div className="relative flex-1 z-[1000]" ref={searchContainerRef}>
            <input
              type="text"
              placeholder="Search Here"
              value={searchTerm}
              onChange={(e) => {
                console.log("Search term changed to:", e.target.value);
                setSearchTerm(e.target.value);
              }}
              className="w-full bg-gray-100 text-gray-700 placeholder-gray-600 px-4 py-2 rounded-lg outline-none focus:ring-1 focus:ring-blue-700"
            />
            <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />

            {searchTerm && (
              <div className="absolute left-0 w-full mt-1 z-50">
                {loading ? (
                  <div className="bg-white border rounded-lg shadow-md p-3 text-gray-700">
                    Loading...
                  </div>
                ) : suggestions.length > 0 ? (
                  <ul className="bg-white border rounded-lg shadow-lg max-h-64 overflow-y-auto">
                    {suggestions.map((product) => (
                      <li
                        key={product.id || Math.random()}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-blue-50 cursor-pointer border-b last:border-b-0"
                        onClick={() => handleSuggestionClick(product)}
                      >
                        {product.image ? (
                          <img
                            src={`https://shop.sprwforge.com/uploads/${product.image}`}
                            alt={product.title || "Product"}
                            className="w-10 h-10 object-cover rounded"
                            onError={(e) => {
                              console.log(`Image load failed for ${e.target.src}`);
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "block";
                            }}
                          />
                        ) : null}
                        <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center hidden">
                          <span className="text-gray-500 text-xs">No Image</span>
                        </div>
                        <div className="flex-1">
                          <span className="text-gray-800 block truncate">{product.title}</span>
                          {product.selling && (
                            <span className="text-sm text-gray-500 block">${product.selling}</span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : searchTerm.length > 0 && !loading ? (
                  <div className="bg-white border rounded-lg shadow-md p-3 text-gray-700">
                    No results found for "{searchTerm}"
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;