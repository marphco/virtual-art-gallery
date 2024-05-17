import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Navbar = () => {
  const isLoggedIn = Auth.loggedIn(); 
  const username = isLoggedIn ? Auth.getProfile().username : null;
  console.log(username)

  const handleLogout = () => {
    Auth.logout(); 
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/">Home</Link>
        </li>
        {isLoggedIn ? (
          <>
          <li className="navbar-item">
            <Link to="/profile">Profile</Link>
          </li>
          <li className="navbar-item">
            <span>{username}</span>
          </li>
          <li className="navbar-item">
            <Link to="/" onClick={handleLogout}>Logout</Link>
          </li>
          </>
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