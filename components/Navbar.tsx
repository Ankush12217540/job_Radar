"use client";
import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");

  return (
    <nav className="flex flex-wrap justify-between items-center p-4 border-b">
      <Link href="/" className="text-3xl font-bold text-blue-600">
        Job Radar
      </Link>

      {/* Menu items, available on all screen sizes */}
      <div className="w-full lg:w-auto flex  lg:flex-row items-center gap-2 lg:gap-y-0 lg:gap-x-8 text-lg text-gray-800 mt-4 lg:mt-0">
        <Link href="/" className="hover:text-blue-500 border rounded-md p-2">
          Private Jobs
        </Link>
        <Link
          href="/government-jobs"
          className="hover:text-blue-500 border rounded-md p-2"
        >
          Government Jobs
        </Link>

        <Menubar>
          <MenubarMenu>
            <MenubarTrigger className="hover:text-blue-500 text-lg p-2">
              Mock Tests
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <Link href="/mocks/private">Private Tests</Link>
              </MenubarItem>
              <MenubarItem>
                <Link href="/mocks/government">Government Tests</Link>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>

      {/* Login and Register Buttons */}
      <div
        className={`w-full lg:w-auto ${
          isLoggedIn ? "hidden" : "flex"
        } flex flex-col lg:flex-row gap-y-2 lg:gap-x-4 mt-4 lg:mt-0`}
      >
        <Link href="/login">
          <Button variant="outline" className="w-full lg:w-auto">
            Login
          </Button>
        </Link>
        <Link href="/register">
          <Button className="w-full lg:w-auto bg-orange-500 text-white hover:bg-orange-600">
            Register
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
