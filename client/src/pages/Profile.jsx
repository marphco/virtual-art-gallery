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


  const removeFavorite = async (id) => {
    try {
      await fetch(`/api/favorite-art/${id}`, {
        method: 'DELETE',
      });

      setFavoriteArt(prevFavoriteArt => prevFavoriteArt.filter(art => art.id !== id));
    } catch (error) {
      console.error('Error removing favorite art:', error);
    }
  };

  return (
    <div className="profile-container">
      <h1 className="profile-username">Welcome!</h1>
      <div className="favorite-art-container">
        <h2>Favorite Art</h2>
        <div className="art-grid">
          {favoriteArt.map(art => (
            <FavoritesCard key={art.id} art={art} onRemoveFavorite={removeFavorite}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
