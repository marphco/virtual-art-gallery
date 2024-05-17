import React, { useEffect, useState } from 'react';
import FavoritesCard from '../components/FavoritesCard';

const Profile = () => {
  const [favoriteArt, setFavoriteArt] = useState([]);

  useEffect(() => {
    // Function to fetch favorite art data from the Chicago Art Institute API
    const fetchFavoriteArt = async () => {
      try {
        const response = await fetch('https://api.artic.edu/api/v1/artworks?ids=129884,27992,14609');
        const data = await response.json();

        const formattedArt = data.data.map(art => ({
          id: art.id,
          title: art.title,
          imageUrl: art.image_url,
          description: art.thumbnail ? art.thumbnail.alt_text : 'No description available',
        }));

        setFavoriteArt(formattedArt);
      } catch (error) {
        console.error('Error fetching favorite art:', error);
      }
    };

    fetchFavoriteArt();
  }, []);

  const handleDelete = (id) => {
    setFavoriteArt(favoriteArt.filter(art => art.id !== id));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6">Welcome!</h1>
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Favorite Art</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteArt.map((art, index) => (
            <FavoritesCard key={index} art={art} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
