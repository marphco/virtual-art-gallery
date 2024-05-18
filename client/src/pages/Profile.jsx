import React, { useEffect, useState } from "react";
import FavoritesCard from "../components/FavoritesCard";

const Profile = () => {
  const [favoriteArt, setFavoriteArt] = useState([]);

  useEffect(() => {
    // Function to fetch favorite art data from the Chicago Art Institute API
    const fetchFavoriteArt = async () => {
      try {
        const response = await fetch(
          "https://api.artic.edu/api/v1/artworks?fields=id,title,artist_titles,image_id,thumbnail&limit=6"
        );
        const data = await response.json();

        // Filter out artworks without images
        const formattedArt = data.data
          .filter((art) => art.image_id) // Only include artworks with an image_id
          .map((art) => ({
            id: art.id,
            title: art.title,
            artist: `artist_name ${art.artist_titles}`,
            imageUrl: `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`,
            description: art.thumbnail
              ? art.thumbnail.alt_text
              : "No description available",
          }));

        setFavoriteArt(formattedArt);
      } catch (error) {
        console.error("Error fetching favorite art:", error);
      }
    };

    fetchFavoriteArt();
  }, []);

  const handleDelete = (id) => {
    setFavoriteArt(favoriteArt.filter((art) => art.id !== id));
  };


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
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6 pt-20">
      {" "}
      {/* Adjusted padding-top */}
      <h1 className="text-4xl font-bold mb-6">Welcome!</h1>
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Favorite Art</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteArt.map(art => (
            <FavoritesCard key={art.id} art={art} onDelete={handleDelete} onRemoveFavorite={removeFavorite}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;



// import React from 'react';
// import { useQuery } from '@apollo/client';
// import { GET_ARTWORK } from '../utils/queries'; 
// Define your GraphQL query
// const GET_FAVORITE_ART = gql`
//   query GetFavoriteArt {
//     favoriteArt {
//       id
//       title
//       artist
//       imageUrl
//       description
//     }
//   }
// `;


// const Profile = () => {
//   const { loading, error, data } = useQuery(GET_ARTWORK);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <div>
//       <h1>Artwork Gallery</h1>
//       <div className="artwork-container">
//         {data.artwork.map(artwork => (
//           <div key={artwork.id} className="artwork-item">
//             <img src={artwork.image_id} alt={artwork.title} />
//             <h2>{artwork.title}</h2>
//             <p>{artwork.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Profile;