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

  return (
    <footer className="bg-gray-300 text-white mt-12 flex justify-center">
      <div className="container mx-auto gap-6 p-8">
        <div>
          <div className="text-white text-xl font-semibold cursor-pointer pb-5" onClick={() => navigate("/")}>
            <img
              src="https://shop.sprwforge.com/uploads/header-logo.svg"
              alt="Logo"
              className="w-auto h-8 sm:h-10"
            />
          </div>
          <h3 className="text-lg text-black font-bold mb-3">Shop by Category</h3>
          <ul className="grid grid-cols-6 items-center justify-start">
            {categories.map((cat) => (
              <li
                key={cat.id ?? cat.slug}
                onClick={() => navigate(`/category/${cat.slug}`)}
                className="cursor-pointer padionxestwed text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]"
              >
                {cat.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
