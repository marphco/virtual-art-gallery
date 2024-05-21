import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { Nav } from "react-bootstrap"
import icon from "../assets/icon.svg"
const Navbar = () => {
  const isLoggedIn = Auth.loggedIn();
  const handleLogout = () => {
    Auth.logout();
  };
  return (
    <Nav id="supernav">
        <ul className="flex">
        <div id="navbar-logo">
          <Link to="/" ><img src={icon} alt="Panorama" /></Link>
          </div>
        {isLoggedIn ? (
          <>
          <div className="menu">
            <li className="font-roboto">
              <Link to="/favorite" className="text-gray-700 hover:text-black transition-shadow">
                Favorite
              </Link>
            </li>
            <li className="font-roboto log-out">
              <Link to="/" onClick={handleLogout} className="text-white-700 hover:text-black transition-shadow">
                Logout
              </Link>
            </li>
            </div>
          </>
        ) : (
          <>
          <div className="menu">
            <li className="font-roboto">
              <Link to="/login" className="text-gray-700 hover:text-black transition-shadow">
                Login
              </Link>
            </li>
            <li className="font-roboto sign-up">
              <Link to="/signup" className="transition-shadow">
                Sign up
              </Link>
            </li>
            {/* <li className="mr-10 font-roboto">
              <Link to="/shop" className="text-gray-700 hover:text-black transition-shadow">
                Shop
              </Link>
            </li> */}
            </div>
          </>
        )}
      </ul>
      <button id="installButton" className="hidden">Install App</button>
    </Nav>
  );
};
export default Navbar;









