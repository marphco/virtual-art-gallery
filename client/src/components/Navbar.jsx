import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { Nav, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import icon from "../assets/icon.svg";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const Navbar = ({ showModal, setShowModal, activeForm, setActiveForm }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = Auth.loggedIn();

  const handleLogout = () => {
    Auth.logout();
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
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
                  <Link
                    to="/"
                    onClick={handleLogout}
                    className="text-700 hover:text-black transition-shadow"
                  >
                <li className="font-roboto log-out">
                    Logout
                </li>
                  </Link>
              </>
            ) : (
              <>
                <Link className="order-last sm:order-first flex font-roboto sign-up" onClick={() => {
                      setShowModal(true);
                      setActiveForm('login');
                      setIsOpen(false);
                    }}>
                  <button
                    className="flex text-white-700 hover:text-black transition-shadow"
                  >
                    Login / Sign up
                  </button>
                </Link>
              </>
            )}
          </ul>
        </div>
      </Nav>

      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'
        centered
        className="login-signup-modal fixed inset-0 flex items-center justify-center z-50 w-full bg-gray-200 bg-opacity-50 backdrop-blur"
      >
        <Modal.Body className="relative rounded-lg mt-24 mx-auto w-full max-w-3xl p-4">
          {activeForm === 'login' ? (
            <LoginForm handleModalClose={() => setShowModal(false)} setActiveForm={setActiveForm} activeForm={activeForm} />
          ) : (
            <SignUpForm handleModalClose={() => setShowModal(false)} setActiveForm={setActiveForm} activeForm={activeForm} />
          )}
        </Modal.Body>
      </Modal>
    </> 
  );
};

export default Navbar;
