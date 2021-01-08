import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Transition } from "@tailwindui/react";
import { HiChevronDown, HiClipboardCheck } from "react-icons/hi";
import "alpinejs";

import { ReactComponent as Logo } from "../../images/logo.svg";
const Header = ({ users }) => {
  const auth = useSelector(state => state.auth);

  const { user, isLogged } = auth;

  const [show, setShow] = useState(false);
  const container = useRef(null);

  const handleLogout = async () => {
    try {
      await axios.get("/user/logout");
      localStorage.removeItem("firstLogin");
      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  };

  const userLink = () => {
    return (
      <nav className="nav-bg">
        <div className="container mx-auto">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:underline focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLineoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>

                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLineJoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-start sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center"></div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4 items-center">
                  <Logo className="w-6" />
                  <Link
                    to="/"
                    className="py-2 rounded-md  text-base font-medium text-white"
                  >
                    U RESCUE ME
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-end ">
              {/* <div className="flex-shrink-0 flex items-center"></div> */}
              <div className="flex-shrink-0 flex items-center"></div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <Link
                    to="/about-us"
                    className="px-3 py-2 rounded-md text-base font-medium text-white hover:underline"
                  >
                    About Us
                  </Link>
                  <Link
                    to="/features"
                    className="px-3 py-2 rounded-md text-base font-medium text-white hover:underline"
                  >
                    Features
                  </Link>
                  <Link
                    to="/contact"
                    className="px-3 py-2 rounded-md text-base font-medium text-white hover:underline"
                  >
                    Contact
                  </Link>
                </div>
              </div>

              <div
                ref={container}
                className="relative px-3 py-2"
                x-data="open = false"
              >
                <button
                  className="menu focus:outline-none focus:shadow-solid   inline-flex justify-center items-end rounded-md  text-base font-medium text-white"
                  onClick={() => setShow(!show)}
                >
                  Hello {user.firstName} <HiChevronDown />
                </button>

                <Transition
                  show={show}
                  enter="transition ease-out duration-100 transform"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in duration-75 transform"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className="origin-top-right absolute  z-10 right-0 w-36 py-2 mt-1 nav-bg rounded shadow-md ">
                    <Link
                      to="/dashboard"
                      className="px-3 rounded-md  text-base font-medium text-white"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-3 py-2  rounded-md text-base font-medium
                      text-white"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/"
                      onClick={handleLogout}
                      className="px-3 py-2 rounded-md text-base font-medium
                    text-white "
                    >
                      Logout
                    </Link>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  };
  return (
    <header>
      {isLogged ? (
        userLink()
      ) : (
        <nav className="nav-bg">
          <div className="container mx-auto">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <button
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:underline focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>

                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLineoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>

                  <svg
                    className="hidden h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLineJoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex-1 flex items-center justify-start sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center"></div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4 items-center">
                    <Logo className="w-6" />
                    <Link
                      to="/"
                      className="py-2 rounded-md  text-base font-medium text-white"
                    >
                      U RESCUE ME
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-end ">
                <div className="flex-shrink-0 flex items-center"></div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    <Link
                      to="/about-us"
                      className="px-3 py-2 rounded-md text-base font-medium text-white hover:underline"
                    >
                      About Us
                    </Link>
                    <Link
                      to="/features"
                      className="px-3 py-2 rounded-md text-base font-medium text-white hover:underline"
                    >
                      Features
                    </Link>
                    <Link
                      to="/contact"
                      className="px-3 py-2 rounded-md text-base font-medium text-white hover:underline"
                    >
                      Contact
                    </Link>
                    <Link
                      to="/login"
                      className="px-3 py-2 rounded-md text-base font-medium
                  text-white hover:underline"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
