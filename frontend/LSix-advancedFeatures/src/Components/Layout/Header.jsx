import { useState } from "react";
import { Link } from "react-router-dom";
import { FaGear, FaCartArrowDown } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { useCart } from "../../context";

export const Header = () => {
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || false);
  const { cartList } = useCart();

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
    
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <header>
      <nav className="bg-white dark:bg-gray-900">
        <div className="border-b border-slate-200 dark:border-b-0 flex flex-wrap justify-between items-center mx-auto max-w-7xl px-4 md:px-6 py-3">
          <Link to="/" className="flex items-center hover:opacity-75 transition">
            <span className="text-2xl font-semibold dark:text-white">CodeBook</span>
          </Link>
          
          <div className="hidden md:flex gap-6">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">
              Products
            </Link>
          </div>

          <div className="flex items-center gap-5">
            <button 
              onClick={handleDarkMode}
              className="cursor-pointer text-xl text-gray-700 dark:text-white hover:opacity-75 transition"
              aria-label="Toggle dark mode"
            >
              <FaGear />
            </button>
            <button 
              className="cursor-pointer text-xl text-gray-700 dark:text-white hover:opacity-75 transition"
              aria-label="Search"
            >
              <CiSearch />
            </button>
            <Link to="/cart" className="relative text-gray-700 dark:text-white hover:opacity-75 transition">
              <FaCartArrowDown size={20} />
              {cartList.length > 0 && (
                <span className="text-white text-sm absolute -top-2 left-2 bg-rose-500 px-1 rounded-full">
                  {cartList.length}
                </span>
              )}
            </Link>
            <Link to="/login" className="cursor-pointer text-2xl text-gray-700 dark:text-white hover:opacity-75 transition">
              <CgProfile />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};
