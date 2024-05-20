import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartSolid,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import PropTypes from "prop-types";
import "../App.css";

function Modal({ art, onClose, onSave }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
  }, [art, onClose, onSave]);

  const handleSaveClick = () => {
    setIsFavorite(true);
    if (typeof onSave === "function") {
      console.log("onSave called with art:", art);
      onSave(art);
    } else {
      console.error("onSave is not a function", onSave);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-8 relative max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-[40rem] h-[40rem] mx-auto mb-4">
          <img
            src={art.texture.image.src}
            alt={art.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <h2 className="text-2xl font-bold mt-4">{art.title}</h2>
        <p className="text-lg">
          <strong>Artist:</strong> {art.artist}
        </p>
        <p className="mt-2">{art.description}</p>
        <button
          className="absolute bottom-4 left-32 bg-transparent text-black border border-black px-4 py-2 rounded hover:text-red-600 flex items-center space-x-2"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faTimes} className="hover:text-green-600" />
          <span>Close</span>
        </button>
        <button
          className="absolute bottom-4 right-32 bg-transparent text-black border border-black px-4 py-2 rounded hover:text-green-600 flex items-center space-x-2"
          onClick={handleSaveClick}
        >
          <FontAwesomeIcon
            icon={isFavorite ? faHeartSolid : faHeartRegular}
            className="heart-icon"
          />
          <span>Save</span>
        </button>
      </div>
    </div>
  );
}

Modal.propTypes = {
  art: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Modal;
