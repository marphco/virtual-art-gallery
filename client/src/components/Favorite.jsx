import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_ART } from '../utils/mutations';

const Favorite = () => {
  const [artwork, setArtwork] = useState([]);
  const [saveArt] = useMutation(SAVE_ART);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.artic.edu/api/v1/artworks?fields=id,title,artist_titles,image_id,thumbnail&limit=6"
        );
        const data = await response.json();

        const formattedArt = data.data.map((art) => ({
          id: art.id,
          title: art.title,
          artist_titles: art.artist_titles,
          description: art.thumbnail ? art.thumbnail.alt_text : "No description available",
          imageUrl: art.image_id
            ? `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`
            : null,
        }));

        setArtwork(formattedArt);
      } catch (error) {
        console.error("Error fetching artwork:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddToFavorites = async (art) => {
    try {
      await saveArt({ variables: { artData: art } });
      console.log("Artwork saved successfully!");
    } catch (error) {
      console.error("Error saving artwork:", error);
    }
  };

  return (
    <div>
      <ul>
        {artwork.map((art) => (
          <li key={art.id} className="p-2 border border-gray-300 rounded-md shadow-sm m-2">
            <div className="mb-2">
              {art.artist_titles.map((artist, index) => (
                <span key={index} className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-md mr-2 mb-1">{artist}</span>
              ))}
            </div>
            <img src={art.imageUrl} alt={art.title} className="w-52 h-auto rounded-lg mb-4" />
            <h3 className="text-lg font-semibold mb-2">{art.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{art.description}</p>
            <button onClick={() => handleAddToFavorites(art)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Add to Favorites
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorite;