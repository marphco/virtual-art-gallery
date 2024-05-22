// src/components/SavedArtworks.jsx

import React from "react";
import PropTypes from "prop-types";

function SavedArtworks({ savedArtworks }) {
  if (!savedArtworks || savedArtworks.length === 0) {
    return <p>No saved artworks.</p>;
  }

  return (
    <div className="saved-artworks">
      <h2>Saved Artworks</h2>
      <ul>
        {savedArtworks.map((art, index) => (
          <li key={index} className="art-item">
            <img
              src={`https://www.artic.edu/iiif/2/${art.image_id}/full/200,/0/default.jpg`}
              alt={art.title}
              width="100"
              className="art-image"
            />
            <p>{art.title}</p>
            <p>{art.artist_title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

SavedArtworks.propTypes = {
  savedArtworks: PropTypes.array.isRequired,
};

export default SavedArtworks;
