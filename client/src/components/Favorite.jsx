// import React from 'react';
// import { useQuery, useMutation } from '@apollo/client';
// import { GET_ARTWORK, DELETE_ARTWORK } from '../utils/queries';

// const Favorite = () => {
//   const { loading, error, data } = useQuery(GET_ARTWORK);
//   const [deleteArtwork] = useMutation(DELETE_ARTWORK, {
//     refetchQueries: [{ query: GET_ARTWORK }]
//   });

//   const handleDelete = (id) => {
//     deleteArtwork({ variables: { id } });
//   };

//   if (loading) return <p className="text-center text-gray-600">Loading...</p>;
//   if (error) return <p className="text-center text-red-600">Error: {error.message}</p>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold text-center mb-6">Artwork</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {data.artwork.map((artwork) => (
//           <div key={artwork.id} className="bg-white shadow-md rounded-lg overflow-hidden">
//             <img
//               src={artwork.image_id}
//               alt={artwork.title}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h2 className="text-xl font-semibold mb-2">{artwork.title}</h2>
//               <p className="text-gray-700 mb-2">Description: {artwork.description}</p>
//               <p className="text-gray-700 mb-2">Artist Titles: {artwork.artist_titles}</p>
//               <button
//                 onClick={() => handleDelete(artwork.id)}
//                 className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Favorite;

import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ARTWORK, DELETE_ARTWORK } from '../utils/queries';

const Favorites = () => {
  const { loading, error, data } = useQuery(GET_ARTWORK);
  const [deleteArtwork] = useMutation(DELETE_ARTWORK, {
    refetchQueries: [{ query: GET_ARTWORK }]
  });

  const handleDelete = (id) => {
    deleteArtwork({ variables: { id } });
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Artwork</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.artwork.map((artwork) => (
          <div key={artwork.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src={artwork.image_id}
              alt={artwork.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{artwork.title}</h2>
              <p className="text-gray-700 mb-2">Description: {artwork.description}</p>
              <p className="text-gray-700 mb-2">Artist Titles: {artwork.artist_titles}</p>
              <button
                onClick={() => handleDelete(artwork.id)}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;