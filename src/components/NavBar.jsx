import React, { useState, useRef, useEffect } from 'react';
import { FiSearch, FiShoppingCart, FiChevronDown, FiMail, FiPhone } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const locales = [
  "en-GB","ar-SA","zh-CN","de-DE","es-ES","fr-FR","hi-IN","it-IT",
  "in-ID","ja-JP","ko-KR","nl-NL","no-NO","pl-PL","pt-BR","sv-SE",
  "fi-FI","th-TH","tr-TR","uk-UA","vi-VN","ru-RU","he-IL",
];

const NavBar = ({ searchTerm, setSearchTerm, cart }) => {
  const [selectedLocale, setSelectedLocale] = useState(locales[0]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Set default locale based on browser
  useEffect(() => {
    const browserLang = new Intl.Locale(navigator.language).language;
    const match = locales.find(
      (locale) => new Intl.Locale(locale).language === browserLang
    );
    if (match) setSelectedLocale(match);
  }, []);

  const intlLocale = new Intl.Locale(selectedLocale);
  const langName = new Intl.DisplayNames([selectedLocale], { type: "language" }).of(intlLocale.language);
  const otherLocales = locales.filter(loc => loc !== selectedLocale);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      alert("You are logged out!");
    } else {
      navigate("/login");
    }
  };

  // Scroll hide/show states
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setScrolled(currentScrollPos > 50);

      if (currentScrollPos < 50) {
        setIsVisible(true);
      } else if (currentScrollPos > prevScrollPos) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
     
    >
      {/* Top bar */}
      <div className="flex items-center justify-between container mx-auto py-5 sm:px-0 px-6">
        <div className="flex items-center gap-4 relative">
          {/* Language Switcher */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(prev => !prev)}
              className="flex items-center gap-2 border px-3 py-2 rounded-md shadow-sm hover:bg-gray-100 transition"
            >
              <span className="capitalize">{langName}</span>
              <FiChevronDown className="text-gray-600" />
            </button>

            {dropdownOpen && (
              <ul className="absolute mt-2 bg-white shadow-lg rounded-md border w-40 max-h-56 overflow-y-auto z-50">
                {otherLocales.map(locale => {
                  const otherIntl = new Intl.Locale(locale);
                  const otherLangName = new Intl.DisplayNames([locale], { type: "language" }).of(otherIntl.language);
                  return (
                    <li
                      key={locale}
                      className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${selectedLocale === locale ? "bg-gray-50 font-medium" : ""}`}
                      onClick={() => {
                        setSelectedLocale(locale);
                        setDropdownOpen(false);
                      }}
                    >
                      {otherLangName}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Email & Phone */}
          <p className="hidden lg:flex items-center gap-1 text-gray-700">
            <FiMail className="text-gray-500" /> <a href="mailto:webzedcontact@gmail.com">Mail: webzedcontact@gmail.com</a>
          </p>
          <p className="hidden sm:flex items-center gap-1 text-gray-700">
            <FiPhone className="text-gray-500" /> <a href="tel:4534345656">Helpline: 4534345656</a>
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

          {/* Search bar */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search Here"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full shadow-md border border-gray-300 px-10 py-3 rounded-xl outline-none focus:ring-1 focus:ring-blue-700"
            />
            <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
