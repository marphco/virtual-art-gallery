import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth"; // Import your AuthService

const Navbar = () => {
  const isLoggedIn = Auth.loggedIn(); // Check if user is logged in using AuthService

  const handleLogout = () => {
    Auth.logout(); // Call logout method from AuthService
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/">Home</Link>
        </li>
        {isLoggedIn ? (
          <li className="navbar-item">
            <Link to="/" onClick={handleLogout}>Logout</Link>
          </li>
        ) : (
          <>
            <li className="navbar-item">
              <Link to="/login">Login</Link>
            </li>
            <li className="navbar-item">
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;