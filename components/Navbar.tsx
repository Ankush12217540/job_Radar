"use client";
import { useState } from "react";
import Link from "next/link";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { redirect } from "next/dist/server/api-utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  
  return (
    <nav className="flex justify-between items-start p-4  my-2">
      <div className="flex items-center gap-x-8">
        <div className="flex flex-col items-start justify-center">
          <Link href={"/"} className={"text-2xl font-bold"}>
            Job Radar
          </Link>
          {isOpen && (
            <div className="md:hidden mt-4 flex flex-col items-start gap-y-4 ">
              <Link href="/" className="hover:text-zinc-400">
                Jobs
              </Link>
              <Link href="/mocks" className="hover:text-zinc-400">
                Mock Exams
              </Link>

              <div className="flex flex-col md:flex-row gap-4">
                <Link
                  href={"/login"}
                  className="py-2 px-6 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white"
                >
                  Login
                </Link>
                <Link
                  href={"/register"}
                  className="py-2 px-6 rounded-full bg-orange-500 text-white"
                >
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="hidden md:flex items-center gap-x-8">
          <Link href="/" className="hover:text-zinc-400">
            Jobs
          </Link>
          <Link href="/mocks" className="hover:text-zinc-400">
            Mock Exams
          </Link>
        </div>
      </div>

      <div className="hidden md:flex gap-x-4">
        <Link
          href={"/login"}
          className="py-2 px-6 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white"
        >
          Login
        </Link>
        <Link
          href={"/register"}
          className="py-2 px-6 rounded-full bg-orange-500 text-white"
        >
          Register
        </Link>
      </div>

      <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          {isOpen ? <IoMdClose size={24} /> : <CiMenuBurger size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
