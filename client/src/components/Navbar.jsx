import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import icon from "../assets/icon.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = Auth.loggedIn();

  const handleLogout = () => {
    Auth.logout();
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // useEffect to close the menu on screen resize if screen size is large
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Nav id="supernav" className="bg-white shadow-md p-1 relative">
      <div className="flex items-center justify-between w-full">
        <div id="navbar-logo" className="mr-10">
          <Link to="/">
            <img src={icon} alt="Panorama" className="h-10" />
          </Link>
        </div>
        <button onClick={toggleMenu} className="text-gray-700 pr-6 lg:hidden">
          {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>
      <div className={`flex nav-desktop lg:flex ${isOpen ? "flex" : "hidden"} flex-col lg:flex-row lg:items-center lg:space-x-8`}>
        <ul className="flex flex-col lg:flex-row">
          {isLoggedIn ? (
            <>
              <li className="font-roboto">
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-black transition-shadow"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
              </li>
              <li className="font-roboto">
                <Link
                  to="/shop"
                  className="text-gray-700 hover:text-black transition-shadow"
                  onClick={() => setIsOpen(false)}
                >
                  Shop-Art
                </Link>
              </li>
              <li className="font-roboto">
                <Link
                  to="/checkout"
                  className="checkout text-gray-700 lg:fixed lg:top-10 lg:right-9 hover:text-black transition-shadow flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                  Checkout
                </Link>
              </li>
              <li className="font-roboto log-out">
                <Link
                  to="/"
                  onClick={handleLogout}
                  className="text-700 hover:text-black transition-shadow"
                >
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
             <ul className="flex flex-col sm:flex-row-reverse sm:gap-5 font-roboto space-y-3 sm:space-y-0">
  <li className="order-last sm:order-first flex font-roboto sign-up">
    <Link
      to="/signup"
      className="flex text-white-700 hover:text-black transition-shadow"
      onClick={() => setIsOpen(false)}
    >
      Sign up
    </Link>
  </li>
  <li className="order-first sm:order-last flex items-center justify-center text-gray-700 hover:text-black transition-shadow">
    <Link
      to="/login"
      className="flex items-center justify-center text-gray-700 hover:text-black transition-shadow"
      onClick={() => setIsOpen(false)}
    >
      Login
    </Link>
  </li>
</ul>
            </>
          )}
        </ul>
      </div>
    </Nav>
  );
};

export default Navbar;
