import React from 'react';

const FavoritesCard = ({ art, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
      <img
        src={art.imageUrl}
        alt={art.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <div className="text-xl font-semibold mb-2 font-serif h-14 overflow-y-auto">
            {art.title}
          </div>
          <div className="text-gray-700 mb-4 h-115 overflow-hidden">
            <p>{art.description}</p>
          </div>
        </div>
        <button
          className="mt-4 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
          onClick={() => onDelete(art.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default FavoritesCard;

