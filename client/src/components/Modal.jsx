import React from 'react';
import '../App.css'; // Assuming you have some styles for the modal here

function Modal({ art, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={art.texture.image.src} alt={art.title} className="modal-image" />
        <h2>{art.title}</h2>
        <p><strong>Artist:</strong> {art.artist}</p>
        <p>{art.description}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Modal;
