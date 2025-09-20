import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

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

  // Split categories into 4 columns for display
  const columns = 4;
  const catPerCol = Math.ceil(categories.length / columns);
  const categoryColumns = Array.from({ length: columns }, (_, i) =>
    categories.slice(i * catPerCol, (i + 1) * catPerCol)
  );

  return (
    <footer className="bg-white ml-8 mt-12 border-t border-gray-400">
      <div className="container mx-auto py-10">
        {/* Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8 font-bold text-gray-800">
          {categoryColumns.map((col, colIdx) => (
            <ul key={colIdx} className="flex flex-col gap-2">
              {col.map((cat) => (
                <li
                  key={cat.id ?? cat.slug}
                  onClick={() => navigate(`/category/${cat.slug}`)}
                  className="cursor-pointer hover:text-orange-500 text-sm sm:text-base"
                >
                  {cat.title}
                </li>
              ))}
            </ul>
          ))}
        </div>

        {/* Logo */}
        <div className="flex justify-center mt-4">
          <img
            src="https://shop.sprwforge.com/uploads/header-logo.svg"
            alt="Logo"
            className="h-10 sm:h-12"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
