import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import desktopInstructions from "../assets/desktop-instructions.svg";
import mobileInstructions from "../assets/mobile-instructions.svg";

// InfoModal component to display instructions modal
const InfoModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle modal open/close state
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // Close modal
  const closeModal = () => {
    setIsOpen(false);
  };
  
  // Close modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".modal-content") &&
        !event.target.closest("#info-button")
      ) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      <button
        id="info-button"
        onClick={toggleModal}
        className="menu-button p-2 rounded-md shadow-lg fixed right-8 bottom-40 z-20"
      >
        <FontAwesomeIcon
          icon={faInfoCircle}
          className="hamburger-color w-6 h-6"
        />
      </button>
      {isOpen && (
        <div
          id="info-modal"
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
        >
          <div className="modal-content relative bg-white bg-opacity-80 rounded-lg shadow-lg p-4 w-4/5 md:w-1/2 max-w-md">
            <button
              onClick={toggleModal}
              className="modal-close-button absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
            </button>
            <div className="overflow-y-auto">
              <img
                src={
                  window.innerWidth >= 992
                    ? desktopInstructions
                    : mobileInstructions
                }
                alt="Instructions"
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoModal;
