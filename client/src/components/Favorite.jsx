import React, { useState, useEffect } from 'react';
import { SAVE_ART , REMOVE_ART } from '../utils/mutations'
 
const Favorites = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { saveArt } = SAVE_ART;
  const { removeArt } = REMOVE_ART;

  useEffect(() => {
    const fetchArtworks = async () => {
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
          imageUrl: art.image_id ? `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg` : null 
        }));
        setArtworks(formattedArt);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await removeArt({ variables: { artId: id } });
      // Update state or refetch data as needed
    } catch (error) {
      console.error('Error removing artwork:', error);
    }
  };

  const addToFavorites = async (artData) => {
    try {
      await saveArt({ variables: { artData } });
      // Update state or refetch data as needed
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Artwork</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {artworks.map((artwork) => (
          <div key={artwork.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{artwork.title}</h2>
              <p className="text-gray-700 mb-2">Description: {artwork.description}</p>
              <p className="text-gray-700 mb-2">Artist Titles: {artwork.artist_titles.join(", ")}</p>
              <button
                onClick={() => handleDelete(artwork.id)}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>


              <button
                onClick={() => addToFavorites(artwork.id)}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                add to favorites
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;