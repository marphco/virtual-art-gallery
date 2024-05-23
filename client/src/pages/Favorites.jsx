import React, { useEffect } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_DATA } from '../utils/queries'; 
import { REMOVE_ART } from "../utils/mutations";

const Favorites = () => {
    const { loading, error, data, refetch } = useQuery(GET_USER_DATA); 

    const [removeArt] = useMutation(REMOVE_ART, {
        refetchQueries: [{ query: GET_USER_DATA }] 
    });

    useEffect(() => {
        refetch();
    }, [refetch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    
    const favorites = data.me.savedArt;

    const handleRemoveArt = async (artId) => {
        try {
            await removeArt({
                variables: { artId }
            });
            console.log("Artwork removed successfully!");
            refetch();
        } catch (error) {
            console.error("Error removing artwork:", error);
        }
    };

    return (
        <div>
            <h2>Your Favorites</h2>
            <ul>
                {favorites.map((art) => (
                    <li key={art.id} className="p-2 border border-gray-300 rounded-md shadow-sm m-2">
                        <div className="mb-2">
                            {art.artist_titles.map((artist, index) => (
                                <span key={index} className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-md mr-2 mb-1">{artist}</span>
                            ))}
                        </div>
                        <img src={art.imageUrl} alt={art.title} className="w-52 h-auto rounded-lg mb-4" />
                        <h3 className="text-lg font-semibold mb-2">{art.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{art.description}</p>
                        <button onClick={() => handleRemoveArt(art.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600">
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Favorites;