import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser, faSignOutAlt, faHome, faStore, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext"; // Import the authentication context

const RoomNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth(); // Use the logout function from the context

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('#room-navbar')) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div id="room-navbar" className="fixed right-8 bottom-24 z-20">
      <button
        onClick={toggleMenu}
        className="menu-button p-2 rounded-md shadow-lg"
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="hamburger-color w-6 h-6" />
      </button>
      {isOpen && (
        <div className="expanded-menu rounded-md shadow-lg p-4 mt-2 flex flex-col items-center">
          <Link to="/" className="block mb-4 text-center" onClick={closeMenu}>
            <FontAwesomeIcon icon={faHome} className="text-white w-6 h-6 hover:text-gray-600 transition-all" />
            <p className="text-xs text-white mt-1">Home</p>
          </Link>
          <Link to="/profile" className="block mb-4 text-center" onClick={closeMenu}>
            <FontAwesomeIcon icon={faUser} className="text-white w-6 h-6 hover:text-gray-600 transition-all" />
            <p className="text-xs text-white mt-1">Profile</p>
          </Link>
          <Link to="/shop" className="block mb-4 text-center" onClick={closeMenu}>
            <FontAwesomeIcon icon={faStore} className="text-white w-6 h-6 hover:text-gray-600 transition-all" />
            <p className="text-xs text-white mt-1">Shop</p>
          </Link>
          <Link to="/checkout" className="block mb-4 text-center" onClick={closeMenu}>
            <FontAwesomeIcon icon={faShoppingCart} className="text-white w-6 h-6 hover:text-gray-600 transition-all" />
            <p className="text-xs text-white mt-1">Checkout</p>
          </Link>
          <button onClick={logout} className="block text-center">
            <FontAwesomeIcon icon={faSignOutAlt} className="text-white w-6 h-6 hover:text-gray-600 transition-all" />
            <p className="text-xs text-white mt-1">Logout</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default RoomNavbar;
