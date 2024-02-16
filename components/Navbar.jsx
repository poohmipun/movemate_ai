"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const Navbar = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <>
      <nav className="flex-between w-full mb-10 pt-12 pb-4 ">
        <Link href="/" className="flex gap-2 flex-center logo_text">
          MoveMateAI 🔥
        </Link>
        <div className="sm:flex hidden">
          <div className="flex gap-3 md:gap-5">
            <Link href="/exercise" className="orange_btn">
              Demo
            </Link>
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
                  <Link href="/exercise" className="orange_btn">
                    Demo
                  </Link>
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
