import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Navbar = () => {
  const isLoggedIn = Auth.loggedIn();
  const handleLogout = () => {
    Auth.logout();
  };

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between border-b border-gray-600 bg-white z-10">
      <ul className="flex p-4">
        <li className="mr-10 font-roboto">
          <Link to="/" className="text-gray-700 hover:text-black transition-shadow">
            Home
          </Link>
        </li>
        {isLoggedIn ? (
          <>
            <li className="mr-10 font-roboto">
              <Link to="/profile" className="text-gray-700 hover:text-black transition-shadow">
                Profile
              </Link>
            </li>
            <li className="font-roboto">
              <Link to="/" onClick={handleLogout} className="text-gray-700 hover:text-black transition-shadow">
                Logout
              </Link>
            </li>
            <li className="mr-10 font-roboto">
              <Link to="/shop" className="text-gray-700 hover:text-black transition-shadow">
                Shop
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="mr-10 font-roboto">
              <Link to="/login" className="text-gray-700 hover:text-black transition-shadow">
                Login
              </Link>
            </li>
            <li className="font-roboto">
              <Link to="/signup" className="text-gray-700 hover:text-black transition-shadow">
                Signup
              </Link>
            </li>
            <li className="mr-10 font-roboto">
              <Link to="/shop" className="text-gray-700 hover:text-black transition-shadow">
                Shop
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
