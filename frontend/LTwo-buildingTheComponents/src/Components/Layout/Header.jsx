import { useState } from "react";
import { FaGear, FaCartArrowDown } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

export const Header = () => {
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || false);
  const [cartCount] = useState(0);

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
          <div className="flex items-center">
            <span className="text-2xl font-semibold dark:text-white">CodeBook</span>
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
            <button className="relative text-gray-700 dark:text-white hover:opacity-75 transition">
              <FaCartArrowDown size={20} />
              {cartCount > 0 && (
                <span className="text-white text-sm absolute -top-2 left-2 bg-rose-500 px-1 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              className="cursor-pointer text-2xl text-gray-700 dark:text-white hover:opacity-75 transition"
              aria-label="Profile"
            >
              <CgProfile />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
