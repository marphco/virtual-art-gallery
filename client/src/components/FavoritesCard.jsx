import React from 'react';

const FavoritesCard = ({ art }) => {
    return (
        <div className="favorites-card">
            <img src={art.imageUrl} alt={art.title} className="fav-art" />
            <div className="fav-card-content">
                <h3 className="fav-art-title">{art.title}</h3>
                <p className="fav-art-description">{art.description}</p>
            </div>
        </div>
    );
};

export default FavoritesCard