"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "flowbite-react";
const Navbar = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <>
      <nav className="flex-between w-full mb-10 pt-12 pb-4 sticky">
        <Link href="/" className="flex gap-2 flex-center logo_text">
          🔥MoveMate AI
        </Link>
        <div className="sm:flex hidden">
          <div className="flex gap-3 md:gap-5">
            <Button
              className="orange_btn min-w-fit focus:outline-none focus:ring focus:ring-red-800 border-none"
              as={Link}
              href="/webcamtester"
            >
              Let's Start
            </Button>
          </div>
        </div>
        <div className="sm:hidden flex relative">
          <div className="flex">
            <Image
              src="/images/menu.svg"
              width={37}
              height={37}
              className="rounded-full"
              alt="menu"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <div className="flex gap-3 md:gap-5">
                  <Button
                    className="orange_btn min-w-fit focus:outline-none focus:ring focus:ring-red-800 border-none"
                    as={Link}
                    href="/webcamtester"
                  >
                    Let's Start
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
