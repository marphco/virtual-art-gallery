import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client'; // Import the useQuery hook from Apollo Client
import FavoritesCard from '../components/FavoritesCard';
import { GET_ARTWORK } from '../utils/queries'; // Import the GET_ARTWORK query

const Profile = () => {
  const [favoriteArt, setFavoriteArt] = useState([]);
  
  // Use the useQuery hook to execute the GET_ARTWORK query
  const { loading, error, data } = useQuery(GET_ARTWORK, {
    variables: { id: "129884,27992,14609" } // Pass the desired artwork IDs as variables
  });

  useEffect(() => {
    if (!loading && data) {
      // Extract the artwork data from the query result and format it
      const formattedArt = data.artwork.map(art => ({
        id: art.id,
        title: art.title,
        imageUrl: art.imageUrl,
        description: art.description ? art.description : 'No description available',
      }));
      
      // Set the formatted artwork data to the state
      setFavoriteArt(formattedArt);
    }
  }, [loading, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching favorite art: {error.message}</p>;

  return (
    <div className="profile-container">
      <h1 className="profile-username">Welcome!</h1>
      <div className="favorite-art-container">
        <h2>Favorite Art</h2>
        <div className="art-grid">
          {favoriteArt.map((art, index) => (
            <FavoritesCard key={index} art={art} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
