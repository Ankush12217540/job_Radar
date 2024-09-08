"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setIsLoggedIn(sessionStorage.getItem("isLoggedIn"));
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="flex flex-col md:flex-row justify-between gap-8 p-2 m-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-blue-700 text-2xl font-bold">
          Job Radar
        </Link>

        {/* Hamburger menu for login and register */}
        {isMenuOpen && !isLoggedIn && (
          <div className="md:hidden flex gap-2 mt-4">
            <Link
              href="/login"
              className="text-white bg-blue-500 rounded-md px-4 py-2 text-lg font-bold"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="text-white bg-orange-400 rounded-md px-4 py-2 text-lg font-bold"
            >
              Register
            </Link>
          </div>
        )}

        {/* Hamburger button for smaller screens */}
        <div>
          <button onClick={toggleMenu} className="md:hidden">
            {isMenuOpen ? <IoMdClose /> : <CiMenuBurger />}
          </button>
        </div>
      </div>

      {/* Main menu for larger screens */}
      <div className="flex items-center gap-4 justify-between">
        <Link
          href="/"
          className="text-white bg-red-700 p-2 rounded-md font-bold text-lg"
        >
          Private Jobs
        </Link>

        <Link
          href="/government-jobs"
          className="text-white bg-green-700 p-2 rounded-md font-bold text-lg"
        >
          Government Jobs
        </Link>

        {/* Mock Tests with Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="text-lg text-white font-bold bg-yellow-700 p-2 rounded-md flex items-center"
          >
            Mock Tests
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md flex flex-col text-black">
              <Link
                href="/mocks/private"
                className="hover:bg-gray-200 px-4 py-2"
              >
                Private
              </Link>
              <Link
                href="/mocks/government"
                className="hover:bg-gray-200 px-4 py-2"
              >
                Government
              </Link>
            </div>
          )}
        </div>
      </div>

      <div
        className={`hidden ${
          isLoggedIn ? "hidden" : "md:flex"
        } items-center justify-between gap-4`}
      >
        <Link
          href="/login"
          className="text-white bg-blue-500 rounded-md px-4 py-2 text-lg font-bold"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="text-white bg-orange-400 rounded-md px-4 py-2 text-lg font-bold"
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
 